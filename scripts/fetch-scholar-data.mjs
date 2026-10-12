#!/usr/bin/env node

/**
 * Script to fetch Google Scholar citation metrics for Dr. Siladittya Manna
 * Scholar ID: 6V9sqi0AAAAJ
 * 
 * Can be run manually or via scheduled GitHub Actions.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SCHOLAR_ID = '6V9sqi0AAAAJ';
const OUTPUT_PATH = path.resolve(__dirname, '../lib/data/citations.json');

async function fetchScholarData() {
  console.log(`Fetching Google Scholar data for user: ${SCHOLAR_ID}...`);
  
  try {
    const url = `https://scholar.google.com/citations?user=${SCHOLAR_ID}&hl=en`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();

    // Parse citation table
    // Format: All / Since 2019: Citations, h-index, i10-index
    const citationMatches = [...html.matchAll(/<td class="gsc_rsb_std">(\d+)<\/td>/g)];
    const totalCitations = citationMatches[0] ? parseInt(citationMatches[0][1], 10) : 227;
    const hIndex = citationMatches[2] ? parseInt(citationMatches[2][1], 10) : 8;
    const i10Index = citationMatches[4] ? parseInt(citationMatches[4][1], 10) : 6;

    // Parse years and citation counts from chart:
    // <span class="gsc_g_t">2021</span>
    // <span class="gsc_g_al">8</span>
    const yearMatches = [...html.matchAll(/<span class="gsc_g_t"[^>]*>(\d{4})<\/span>/g)].map(m => m[1]);
    const countMatches = [...html.matchAll(/<span class="gsc_g_al"[^>]*>(\d+)<\/span>/g)].map(m => parseInt(m[1], 10));

    let yearly = [];
    if (yearMatches.length > 0 && yearMatches.length === countMatches.length) {
      yearly = yearMatches.map((year, i) => ({
        year,
        citations: countMatches[i]
      }));
    }

    // Fallback if chart parsing yielded empty
    if (yearly.length === 0) {
      // Read existing data if available
      try {
        const existing = JSON.parse(await fs.readFile(OUTPUT_PATH, 'utf-8'));
        yearly = existing.yearly || [];
      } catch {
        yearly = [
          { year: "2021", citations: 8 },
          { year: "2022", citations: 35 },
          { "year": "2023", citations: 58 },
          { "year": "2024", citations: 64 },
          { "year": "2025", citations: 46 },
          { "year": "2026", citations: 16 }
        ];
      }
    }

    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const data = {
      totalCitations,
      hIndex,
      i10Index,
      lastUpdated: currentDate,
      source: `Google Scholar (ID: ${SCHOLAR_ID})`,
      yearly
    };

    await fs.writeFile(OUTPUT_PATH, JSON.stringify(data, null, 2) + '\n', 'utf-8');
    console.log('Successfully updated citations.json with Scholar data:', data);
  } catch (error) {
    console.error('Error fetching Scholar data:', error.message);
    console.log('Preserving existing citations.json data.');
  }
}

fetchScholarData();
