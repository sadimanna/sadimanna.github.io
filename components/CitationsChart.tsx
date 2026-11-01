"use client"

import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import citationData from "@/lib/data/citations.json"

interface YearlyData {
  year: string
  citations: number
}

// Colours come from the homepage tokens in app/home.css (.chart rules), not from props.
export function CitationsChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const yearly: YearlyData[] = citationData.yearly || []
  const totalCitations = citationData.totalCitations || 246
  const hIndex = citationData.hIndex || 8
  const i10Index = citationData.i10Index || 8
  const lastUpdated = citationData.lastUpdated || "October 2026"

  return (
    <div className="chart">
      <div className="chart__head">
        <h3>Citations per Year</h3>
        <p className="label">Auto-synced from Google Scholar</p>
      </div>

      <dl className="chart__figures">
        <div>
          <dt>Total Citations</dt>
          <dd>{totalCitations}</dd>
        </div>
        <div>
          <dt>h-index</dt>
          <dd>{hIndex}</dd>
        </div>
        <div>
          <dt>i10-index</dt>
          <dd>{i10Index}</dd>
        </div>
      </dl>

      <figure className="chart__plot" aria-label={`Citations per year, ${yearly.map((y) => `${y.year}: ${y.citations}`).join(", ")}`}>
        {isMounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yearly} margin={{ top: 8, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 13 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 13 }} allowDecimals={false} />
              <Tooltip
                cursor={{ className: "chart__cursor" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="chart__tip">
                        <p>Year: {payload[0].payload.year}</p>
                        <p>
                          <b>{payload[0].value}</b> citations
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="citations" maxBarSize={48} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="chart__loading label">Loading chart…</p>
        )}
      </figure>

      <div className="chart__foot label">
        <span>Updated automatically via GitHub Actions</span>
        <span>As of {lastUpdated}</span>
      </div>
      <div className="links">
        <a href="https://scholar.google.com/citations?user=6V9sqi0AAAAJ&hl=en" target="_blank" rel="noopener noreferrer">
          View Google Scholar Profile
        </a>
      </div>
    </div>
  )
}
