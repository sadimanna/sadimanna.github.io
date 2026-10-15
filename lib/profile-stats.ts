import citationData from "@/lib/data/citations.json"

export const profileStats = [
  {
    label: "Publications",
    value: "15",
  },
  {
    label: "Journal Papers",
    value: "08",
  },
  {
    label: "Conference Papers",
    value: "06",
  },
  {
    label: "Workshop Papers",
    value: "01",
  },
  {
    label: "Pre-print Papers",
    value: "05",
  },
  {
    label: "Citations",
    value: String(citationData.totalCitations || 240),
  },
  {
    label: "h-index",
    value: String(citationData.hIndex || 8),
  },
  {
    label: "Collaborators",
    value: "7+",
  },
]

export const publicationMetrics = [
  {
    value: "4",
    label: "Q1 Journals",
    theme: "indigo",
  },
  {
    value: "3",
    label: "Q2 Journals",
    theme: "indigo",
  },
  {
    value: "1",
    label: "A Conferences",
    theme: "emerald",
  },
  {
    value: "4",
    label: "B Conferences",
    theme: "emerald",
  },
]
