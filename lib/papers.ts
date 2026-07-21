import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';

const papersDirectory = path.join(process.cwd(), 'content', 'papers');

export interface PaperMeta {
  slug: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  citations: number;
  doi: string;
  type: string;
  link: string;
  category: string;
  topics: string[];
  featured: boolean;
  code?: string;
  bibtex?: string;
  readingTime: number;
}

export interface Paper extends PaperMeta {
  contentHtml: string;
  headings: { id: string; text: string; level: number }[];
}

function computeReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function extractHeadings(html: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  const regex = /<h([2-3])\s+id="([^"]*)"[^>]*>(.*?)<\/h[2-3]>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = match[3].replace(/<[^>]*>/g, '').trim();
    headings.push({
      level: parseInt(match[1], 10),
      id: match[2],
      text,
    });
  }
  return headings;
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse as any)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex)
    .use(rehypeHighlight, { detect: true, ignoreMissing: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'prepend',
      properties: { className: ['heading-anchor'], ariaHidden: true, tabIndex: -1 },
      content: {
        type: 'element',
        tagName: 'span',
        properties: { className: ['anchor-icon'] },
        children: [{ type: 'text', value: '#' }],
      },
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);
  return result.toString();
}

function getPaperSlugs(): string[] {
  if (!fs.existsSync(papersDirectory)) return [];
  return fs
    .readdirSync(papersDirectory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

function readPaperFile(slug: string): { data: Record<string, any>; content: string } {
  const fullPath = path.join(papersDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return matter(fileContents);
}

export async function getPaperBySlug(slug: string): Promise<Paper> {
  const { data, content } = readPaperFile(slug);
  const contentHtml = await markdownToHtml(content);
  const headings = extractHeadings(contentHtml);
  const readingTime = computeReadingTime(content);

  return {
    slug,
    title: data.title || slug,
    authors: data.authors || '',
    journal: data.journal || '',
    year: data.year || new Date().getFullYear(),
    citations: data.citations || 0,
    doi: data.doi || '',
    type: data.type || '',
    link: data.link || '',
    category: data.category || '',
    topics: data.topics || [],
    featured: data.featured || false,
    code: data.code || '',
    bibtex: data.bibtex || '',
    readingTime,
    contentHtml,
    headings,
  };
}

export async function getAllPapers(): Promise<Paper[]> {
  const slugs = getPaperSlugs();
  const papers = await Promise.all(slugs.map((slug) => getPaperBySlug(slug)));
  // Sort by year descending, then citations descending
  return papers.sort((a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year;
    }
    return b.citations - a.citations;
  });
}

export async function getAllPapersMeta(): Promise<PaperMeta[]> {
  const papers = await getAllPapers();
  return papers.map(({ contentHtml, headings, ...meta }) => meta);
}

export async function getAllPaperCategories(): Promise<{ name: string; count: number }[]> {
  const papers = await getAllPapers();
  const map = new Map<string, number>();
  papers.forEach((paper) => {
    if (paper.category) {
      map.set(paper.category, (map.get(paper.category) || 0) + 1);
    }
  });
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getAllPaperTopics(): Promise<{ name: string; count: number }[]> {
  const papers = await getAllPapers();
  const map = new Map<string, number>();
  papers.forEach((paper) => {
    paper.topics.forEach((topic) => map.set(topic, (map.get(topic) || 0) + 1));
  });
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
