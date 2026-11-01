"use client"


interface Partner {
  id: string
  country: string
  institution: string
  location: string
  collaborator: string
  focus: string
  role: string
  // Positions in a 1000 x 480 equirectangular-style frame, used by the diagram
  x: number
  y: number
  region: "International" | "National"
}

const partners: Partner[] = [
  {
    id: "lille",
    country: "France",
    institution: "University of Lille 1 S&T",
    location: "Lille, France",
    collaborator: "Dr. Tanmoy Mondal",
    focus: "Domain Adaptive Object Detection",
    role: "International Research Collaborator",
    x: 488,
    y: 160,
    region: "International",
  },
  {
    id: "hildesheim",
    country: "Germany",
    institution: "University of Hildesheim",
    location: "Hildesheim, Germany",
    collaborator: "Dr. Koyel Ghosh",
    focus: "LLM Adaptation for Low-Resource Languages",
    role: "International Research Collaborator",
    x: 512,
    y: 150,
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
    region: "National",
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
    region: "National",
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
    region: "National",
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
    region: "National",
  },
]

export function CollaborationMap() {
  const groups: Partner["region"][] = ["International", "National"]

  const hub = partners.find((p) => p.id === "iisc")!
  const international = partners.filter((p) => p.region === "International")
  const national = partners.filter((p) => p.region === "National")
  // Crop of the old map's 1000 x 480 coordinate space, Europe to East Asia
  const view = { x: 450, y: 95, w: 370, h: 235 }
  const gridX = Array.from({ length: 9 }, (_, i) => view.x + 10 + i * 45)
  const gridY = Array.from({ length: 5 }, (_, i) => view.y + 15 + i * 50)

  return (
    <div className="partners">
      <div className="chart__head">
        <h3>International &amp; National Collaborations</h3>
        <p className="label">Partners in France, Germany, Sweden, Hong Kong, and leading Indian institutes</p>
      </div>

      <figure className="partners__map">
        <svg
          viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
          role="img"
          aria-label="Diagram of collaborator locations: Lille, Hildesheim and LUT University in Europe, Hong Kong, and IISc Bangalore, ISI Kolkata, IIT Kharagpur and NIT Durgapur in India, linked to the IISc hub"
        >
          {gridX.map((x) => (
            <line key={`gx${x}`} className="map__grid" x1={x} y1={view.y} x2={x} y2={view.y + view.h} />
          ))}
          {gridY.map((y) => (
            <line key={`gy${y}`} className="map__grid" x1={view.x} y1={y} x2={view.x + view.w} y2={y} />
          ))}
          {international.map((p) => (
            <line key={`l${p.id}`} className="map__link" x1={hub.x} y1={hub.y} x2={p.x} y2={p.y} />
          ))}
          {national.map((p) => (
            <circle key={p.id} className="map__dot map__dot--national" cx={p.x} cy={p.y} r={3} />
          ))}
          {international.map((p) => (
            <g key={p.id}>
              <circle className="map__dot" cx={p.x} cy={p.y} r={4} />
              <text className="map__label" x={p.x} y={p.y - 9} textAnchor="middle">{p.country}</text>
            </g>
          ))}
          <circle className="map__hub" cx={hub.x} cy={hub.y} r={6} />
          <text className="map__label" x={hub.x - 10} y={hub.y + 4} textAnchor="end">India</text>
        </svg>
        <figcaption>Collaborators by location, linked to the current host at IISc Bangalore.</figcaption>
      </figure>
      <div className="partners__groups">
      {groups.map((region) => (
        <div key={region} className="partners__group">
          <h4 className="label">{region}</h4>
          <ul className="index">
            {partners
              .filter((p) => p.region === region)
              .map((p) => (
                <li key={p.id}>
                  <p className="partners__inst">
                    {p.institution}
                    <span className="label">, {p.location}</span>
                  </p>
                  <p>
                    {p.collaborator}: {p.focus}
                  </p>
                  <p className="label">{p.role}</p>
                </li>
              ))}
          </ul>
        </div>
      ))}
      </div>
    </div>
  )
}
