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
import { ExternalLink, TrendingUp, Award, BookCheck } from "lucide-react"
import Link from "next/link"

interface YearlyData {
  year: string
  citations: number
}

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
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              <TrendingUp className="h-3.5 w-3.5" />
              Impact Trajectory
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Auto-synced from Google Scholar
            </span>
          </div>
          <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Citations per Year
          </h3>
        </div>

        <Link
          href="https://scholar.google.com/citations?user=6V9sqi0AAAAJ&hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View Google Scholar Profile
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-3 my-6">
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-center dark:border-slate-800 dark:bg-slate-800/40">
          <div className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            {totalCitations}
          </div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Total Citations
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-center dark:border-slate-800 dark:bg-slate-800/40">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 sm:text-3xl">
            {hIndex}
          </div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            h-index
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-center dark:border-slate-800 dark:bg-slate-800/40">
          <div className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            {i10Index}
          </div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            i10-index
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="h-64 w-full">
        {isMounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yearly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.6} />
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
                allowDecimals={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(59, 130, 246, 0.08)" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-md dark:border-slate-700 dark:bg-slate-800">
                        <p className="font-semibold text-slate-800 dark:text-slate-200">
                          Year: {payload[0].payload.year}
                        </p>
                        <p className="font-bold text-blue-600 dark:text-blue-400">
                          {payload[0].value} citations
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar
                dataKey="citations"
                fill="#2563eb"
                radius={[6, 6, 0, 0]}
                maxBarSize={48}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-slate-400">
            Loading chart…
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-[0.75rem] text-slate-500 dark:text-slate-400">
        <span>Updated automatically via GitHub Actions</span>
        <span>As of {lastUpdated}</span>
      </div>
    </div>
  )
}
