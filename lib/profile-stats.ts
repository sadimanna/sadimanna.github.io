import citationData from "@/lib/data/citations.json"

export const profileStats = [
  {
    label: "Publications",
    value: "13",
  },
  {
    label: "Journal Papers",
    value: "07",
  },
  {
    label: "Conference Papers",
    value: "05",
  },
  {
    label: "Workshop Papers",
    value: "01",
  },
  {
    label: "Pre-print Papers",
    value: "03",
  },
  {
    label: "Citations",
    value: String(citationData.totalCitations || 246),
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
