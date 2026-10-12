"use client"

import { useState } from "react"
import { Globe, MapPin, Building2, User, Sparkles } from "lucide-react"

interface Partner {
  id: string
  country: string
  institution: string
  location: string
  collaborator: string
  focus: string
  role: string
  // Approximate SVG coordinates for map view (viewBox 0 0 1000 500)
  x: number
  y: number
  region: "International" | "India"
}

const partners: Partner[] = [
  {
    id: "lille",
    country: "France",
    institution: "University of Lille 1 S&T",
    location: "Lille, France",
    collaborator: "Dr. Tanmoy Mondal",
    focus: "Document Analysis & Pattern Recognition",
    role: "International Research Collaborator",
    x: 488,
    y: 160,
    region: "International",
  },
  {
    id: "lut",
    country: "Sweden",
    institution: "LUT University",
    location: "Lappeenranta / Sweden Hub",
    collaborator: "Dr. Rajkumar Saini",
    focus: "AI in Fertility Science & Sperm Motility",
    role: "International Research Collaborator",
    x: 540,
    y: 125,
    region: "International",
  },
  {
    id: "hkbu",
    country: "Hong Kong",
    institution: "Hong Kong Baptist University",
    location: "Kowloon, Hong Kong",
    collaborator: "Prof. Yiu-Ming Cheung",
    focus: "Federated Learning with Medical Segmentation",
    role: "Post-Doc Collaboration / Former Institute",
    x: 775,
    y: 265,
    region: "International",
  },
  {
    id: "iisc",
    country: "India",
    institution: "Indian Institute of Science (IISc)",
    location: "Bangalore, India",
    collaborator: "Prof. Anirban Chakraborty",
    focus: "PEFT-based FL Vulnerabilities & Inversion Attacks",
    role: "Current Postdoctoral Host",
    x: 680,
    y: 298,
    region: "India",
  },
  {
    id: "isi",
    country: "India",
    institution: "Indian Statistical Institute (ISI)",
    location: "Kolkata, India",
    collaborator: "Prof. Umapada Pal",
    focus: "Self-Supervised Learning & Medical AI",
    role: "Ph.D. Alma Mater & Ongoing Collaboration",
    x: 720,
    y: 265,
    region: "India",
  },
  {
    id: "iitkgp",
    country: "India",
    institution: "IIT Kharagpur",
    location: "Kharagpur, India",
    collaborator: "Dr. Saumik Bhattacharya",
    focus: "Medical Image Analysis & SSL Architectures",
    role: "Academic Research Partner",
    x: 712,
    y: 272,
    region: "India",
  },
  {
    id: "nitdgp",
    country: "India",
    institution: "NIT Durgapur",
    location: "Durgapur, India",
    collaborator: "Dr. Sayantari Ghosh",
    focus: "Foreground Imbalance in Brachytherapy Segmentation",
    role: "Academic Research Partner",
    x: 716,
    y: 260,
    region: "India",
  },
]

export function CollaborationMap() {
  const [activePartner, setActivePartner] = useState<Partner>(partners[0])

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center pb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
            <Globe className="h-3.5 w-3.5" />
            Global Research Network
          </div>
          <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            International & National Collaborations
          </h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Partners in France, Sweden, Hong Kong, and leading Indian institutes
        </p>
      </div>

      {/* Interactive Map Visual */}
      <div className="relative mt-6 overflow-hidden rounded-xl border border-slate-100 bg-slate-950 p-4 dark:border-slate-800">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />

        <svg
          viewBox="0 0 1000 480"
          className="relative z-10 h-64 sm:h-80 w-full select-none"
        >
          <defs>
            <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
            </linearGradient>
            <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Simplified stylized continent outlines */}
          {/* North America outline */}
          <path
            d="M 120 100 Q 180 80 250 90 Q 280 150 240 220 Q 180 240 140 190 Z"
            fill="#1e293b"
            opacity="0.4"
          />
          {/* South America outline */}
          <path
            d="M 230 260 Q 300 280 280 380 Q 240 430 210 350 Z"
            fill="#1e293b"
            opacity="0.4"
          />
          {/* Europe outline */}
          <path
            d="M 460 110 Q 540 90 560 160 Q 520 200 450 170 Z"
            fill="#1e293b"
            opacity="0.55"
          />
          {/* Africa outline */}
          <path
            d="M 470 210 Q 550 210 560 300 Q 510 390 460 310 Z"
            fill="#1e293b"
            opacity="0.4"
          />
          {/* Asia outline */}
          <path
            d="M 570 110 Q 820 90 850 230 Q 750 330 630 250 Z"
            fill="#1e293b"
            opacity="0.6"
          />
          {/* Australia outline */}
          <path
            d="M 780 340 Q 860 330 870 410 Q 800 430 760 380 Z"
            fill="#1e293b"
            opacity="0.4"
          />

          {/* Connection arcs radiating from India primary hub (x: 690, y: 290) to International partners */}
          {/* To France */}
          <path
            d="M 680 298 Q 570 170 488 160"
            fill="none"
            stroke="url(#arcGrad)"
            strokeWidth="1.75"
            strokeDasharray="4 4"
            className="animate-pulse"
          />
          {/* To Sweden */}
          <path
            d="M 680 298 Q 610 160 540 125"
            fill="none"
            stroke="url(#arcGrad)"
            strokeWidth="1.75"
            strokeDasharray="4 4"
          />
          {/* To Hong Kong */}
          <path
            d="M 720 265 Q 750 250 775 265"
            fill="none"
            stroke="url(#arcGrad)"
            strokeWidth="1.75"
            strokeDasharray="4 4"
          />

          {/* Render partner pins */}
          {partners.map((p) => {
            const isSelected = activePartner.id === p.id
            const isPrimary = p.id === "iisc" || p.id === "isi"

            return (
              <g
                key={p.id}
                className="cursor-pointer transition-transform duration-200"
                onClick={() => setActivePartner(p)}
              >
                {/* Glow ring */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isSelected ? 18 : isPrimary ? 12 : 9}
                  fill="url(#hubGlow)"
                  className="animate-ping"
                  style={{ animationDuration: isSelected ? "2s" : "4s" }}
                />

                {/* Outer marker */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isSelected ? 8 : isPrimary ? 6 : 4.5}
                  fill={isSelected ? "#38bdf8" : isPrimary ? "#60a5fa" : "#94a3b8"}
                  stroke="#ffffff"
                  strokeWidth={isSelected ? "2.5" : "1.5"}
                />

                {/* Label on map */}
                <text
                  x={p.x}
                  y={p.y - 12}
                  textAnchor="middle"
                  fill={isSelected ? "#38bdf8" : "#cbd5e1"}
                  fontSize={isSelected ? "11" : "9"}
                  fontWeight={isSelected ? "bold" : "500"}
                  className="pointer-events-none drop-shadow-md"
                >
                  {p.country}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Floating details overlay on the map */}
        <div className="relative mt-2 rounded-lg border border-slate-800 bg-slate-900/90 p-3.5 backdrop-blur-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-sky-400 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                  {activePartner.country} • {activePartner.role}
                </span>
              </div>
              <h4 className="mt-1 text-sm font-bold text-white sm:text-base">
                {activePartner.institution}
              </h4>
            </div>
            <div className="text-xs text-slate-300">
              <span className="font-semibold text-sky-300">Lead: </span>
              {activePartner.collaborator}
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-300 border-t border-slate-800 pt-2">
            <span className="font-medium text-slate-400">Collaboration Focus: </span>
            {activePartner.focus}
          </p>
        </div>
      </div>

      {/* Grid of partner cards to click & explore */}
      <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {partners.map((p) => {
          const isSelected = activePartner.id === p.id
          return (
            <button
              key={p.id}
              onClick={() => setActivePartner(p)}
              type="button"
              className={`rounded-xl border p-3 text-left transition-all duration-200 ${
                isSelected
                  ? "border-blue-500 bg-blue-50/60 shadow-sm dark:border-blue-500 dark:bg-blue-950/40"
                  : "border-slate-100 bg-slate-50/50 hover:border-slate-200 hover:bg-white dark:border-slate-800 dark:bg-slate-800/30 dark:hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[0.7rem] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {p.country}
                </span>
                <span className="text-[0.65rem] text-slate-400">{p.region}</span>
              </div>
              <div className="mt-1 font-semibold text-xs text-slate-900 dark:text-slate-100 line-clamp-1">
                {p.institution}
              </div>
              <div className="mt-1 text-[0.7rem] text-slate-500 dark:text-slate-400 line-clamp-1">
                {p.collaborator}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
