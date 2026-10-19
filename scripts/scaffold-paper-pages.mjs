// Scaffolds a static project page for every publication in app/page.tsx,
// except theses.
//
//   node scripts/scaffold-paper-pages.mjs           # create missing pages only
//   node scripts/scaffold-paper-pages.mjs --force   # also regenerate scaffolded pages
//
// Pages are written to public/papers/<slug>/index.html and use the markup of the
// hand-built fedlora-gia page. Styles, icons and the theme/BibTeX script are
// shared from public/papers/static/ (css/paper.css, icons/, js/paper.js), so
// every page references them as ../static/...
//
// Existing pages are never touched unless --force is passed, and even then only
// pages this script generated (marked with GENERATOR_META) are overwritten, so
// hand-built pages such as fedlora-gia are safe.

import fs from "fs"
import path from "path"

const ROOT = process.cwd()
const PAGE_TSX = path.join(ROOT, "app", "page.tsx")
const OUT_DIR = path.join(ROOT, "public", "papers")
const SITE_URL = "https://sadimanna.github.io"
const SELF_NAMES = ["S Manna", "Siladittya Manna"]
const GENERATOR_META = `<meta name="generator" content="scripts/scaffold-paper-pages.mjs">`
// Pages from the previous (Bulma) version of this script, safe to regenerate.
const LEGACY_MARKER = `static/css/bulma.min.css`
const force = process.argv.includes("--force")

function loadPublications() {
  const src = fs.readFileSync(PAGE_TSX, "utf8")
  const start = src.indexOf("const publications = [")
  if (start === -1) throw new Error("Could not find `const publications = [` in app/page.tsx")
  const open = src.indexOf("[", start)
  let depth = 0
  let end = -1
  for (let i = open; i < src.length; i++) {
    if (src[i] === "[") depth++
    else if (src[i] === "]" && --depth === 0) {
      end = i
      break
    }
  }
  return new Function(`return ${src.slice(open, end + 1)}`)()
}

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

const splitAuthors = (authors) => authors.split(",").map((a) => a.trim()).filter(Boolean)

function arxivId(pub) {
  const m = `${pub.link} ${pub.doi} ${pub.journal}`.match(/(\d{4}\.\d{4,5})(v\d+)?/)
  return m && /arxiv/i.test(`${pub.link} ${pub.doi} ${pub.journal}`) ? m[1] : null
}

function venue(pub) {
  if (pub.journal) return pub.journal
  return pub.type === "preprint" ? "arXiv preprint" : ""
}

function bibtex(pub) {
  const authors = splitAuthors(pub.authors)
  const lastName = (authors[0] || "author").split(" ").pop().toLowerCase().replace(/[^a-z]/g, "")
  const firstWord = pub.title.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(" ").find((w) => w.length > 3) || "paper"
  const key = `${lastName}${pub.year}${firstWord}`
  const bibAuthors = authors
    .map((a) => {
      const parts = a.split(" ")
      const last = parts.pop()
      return parts.length ? `${last}, ${parts.join(" ")}` : last
    })
    .join(" and ")
  const arxiv = arxivId(pub)
  const fields = [`  title={${pub.title}}`, `  author={${bibAuthors}}`]
  let kind = "article"
  if (pub.type === "conference" || pub.type === "workshop") {
    kind = "inproceedings"
    fields.push(`  booktitle={${pub.journal}}`)
  } else if (pub.type === "preprint" || (arxiv && /arxiv/i.test(pub.journal))) {
    kind = "article"
    fields.push(`  journal={arXiv preprint arXiv:${arxiv ?? ""}}`)
  } else if (pub.journal) {
    fields.push(`  journal={${pub.journal}}`)
  }
  fields.push(`  year={${pub.year}}`)
  if (pub.doi) fields.push(`  doi={${pub.doi}}`)
  fields.push(`  url={${SITE_URL}/papers/${pub.slug}/}`)
  return `@${kind}{${key},\n${fields.join(",\n")}\n}`
}

const ICON_IMG = {
  pdf: `<img src="../static/icons/pdf-document.svg" alt="" aria-hidden="true">`,
  arxiv: `<img src="../static/icons/Arxiv.svg" alt="" aria-hidden="true">`,
  github: `<img src="../static/icons/Github.svg" alt="" aria-hidden="true">`,
  doi: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.6 13.4a1 1 0 0 1 0-1.4l3.5-3.5a3 3 0 1 1 4.2 4.2l-2 2-1.4-1.4 2-2a1 1 0 1 0-1.4-1.4l-3.5 3.5a1 1 0 0 1-1.4 0zm2.8-2.8a1 1 0 0 1 0 1.4l-3.5 3.5a3 3 0 1 1-4.2-4.2l2-2 1.4 1.4-2 2a1 1 0 1 0 1.4 1.4l3.5-3.5a1 1 0 0 1 1.4 0z"/></svg>`,
  bibtex: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>`,
}

function linkButton(href, icon, label, external = true) {
  const target = external ? ` target="_blank" rel="noopener noreferrer"` : ""
  return `    <span class="link-block">
      <a class="external-link button is-normal is-rounded is-dark" href="${esc(href)}"${target}>
        <span class="icon">${ICON_IMG[icon]}</span>
        <span>${label}</span>
      </a>
    </span>`
}

function linkButtons(pub) {
  const arxiv = arxivId(pub)
  const hasLink = pub.link && pub.link !== "#"
  const buttons = []
  if (arxiv) buttons.push(linkButton(`https://arxiv.org/pdf/${arxiv}`, "pdf", "Paper"))
  else if (hasLink) buttons.push(linkButton(pub.link, "pdf", "Paper"))
  else buttons.push(`    <!-- TODO: Add the paper link (e.g. publisher page or PDF) once available -->`)
  if (arxiv) buttons.push(linkButton(`https://arxiv.org/abs/${arxiv}`, "arxiv", "arXiv"))
  if (pub.code) buttons.push(linkButton(pub.code, "github", "Code"))
  else
    buttons.push(`    <!-- TODO: Add the code repository or delete this comment
${linkButton("https://github.com/sadimanna/REPO", "github", "Code")}
    -->`)
  if (pub.doi && !/arxiv/i.test(pub.doi)) buttons.push(linkButton(`https://doi.org/${pub.doi}`, "doi", "DOI"))
  buttons.push(linkButton("#bibtex", "bibtex", "BibTeX", false))
  return buttons.join("\n")
}

function authorLinks(pub) {
  return splitAuthors(pub.authors)
    .map((a) => (SELF_NAMES.includes(a) ? `    <a href="${SITE_URL}/">${esc(a)}</a>` : `    <span>${esc(a)}</span>`))
    .join("\n")
}

function moreWorks(pub, all) {
  return all
    .filter((p) => p.id !== pub.id)
    .sort((a, b) => b.year - a.year)
    .slice(0, 6)
    .map((p) => `      <li><a href="../${p.slug}/">${esc(p.title)}</a> <span class="muted">${esc(venue(p))} ${p.year}</span></li>`)
    .join("\n")
}

function renderPage(pub, all) {
  const title = esc(pub.title)
  const authors = esc(pub.authors)
  const description = esc(pub.abstract)
  const url = `${SITE_URL}/papers/${pub.slug}/`
  const venueLabel = [venue(pub), pub.year].filter(Boolean).join(" ")
  const ld = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: pub.title,
    description: pub.abstract,
    author: splitAuthors(pub.authors).map((name) => ({ "@type": "Person", name })),
    datePublished: String(pub.year),
    publisher: venue(pub) ? { "@type": "Organization", name: venue(pub) } : undefined,
    url,
    ...(pub.doi ? { sameAs: `https://doi.org/${pub.doi}` } : {}),
  }

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${GENERATOR_META}
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="author" content="${authors}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${url}">

<!-- Open Graph / Twitter -->
<meta property="og:type" content="article">
<meta property="og:site_name" content="Siladittya Manna">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${url}">
<!-- TODO: Add a 1200x630px preview image at ./static/img/social_preview.png and uncomment
<meta property="og:image" content="${url}static/img/social_preview.png">
-->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">

<!-- Academic / Google Scholar -->
<meta name="citation_title" content="${title}">
${splitAuthors(pub.authors).map((a) => `<meta name="citation_author" content="${esc(a)}">`).join("\n")}
<meta name="citation_publication_date" content="${pub.year}">
${venue(pub) ? `<meta name="citation_${pub.type === "journal" ? "journal" : "conference"}_title" content="${esc(venue(pub))}">\n` : ""}${pub.doi ? `<meta name="citation_doi" content="${esc(pub.doi)}">\n` : ""}<script type="application/ld+json">
${JSON.stringify(ld, null, 2).replace(/</g, "\\u003c")}
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../static/css/paper.css">
</head>
<body>
<button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode">◐</button>

<header class="wrap" style="padding-bottom:48px">
  ${venueLabel ? `<div class="venue">${esc(venueLabel)}</div>` : "<!-- TODO: Add the venue -->"}
  <h1>${title}</h1>
  <!-- TODO: Link co-author names to their homepages (replace <span> with <a href="...">) -->
  <p class="authors">
${authorLinks(pub)}
  </p>
  <!-- TODO: Add author affiliations
  <p class="affil">Indian Institute of Science, Bengaluru, India</p>
  -->

  <div class="publication-links">
${linkButtons(pub)}
  </div>
</header>

<!-- TODO: Teaser figure and TL;DR. Put the image in ./static/img/ and uncomment.
<div class="wrap" style="padding-bottom:48px">
  <figure style="margin-top:24px">
    <div class="fig" style="max-width:700px;margin:0 auto"><img src="static/img/teaser.png" alt=""></div>
    <figcaption><b>Figure title.</b> Figure description.</figcaption>
  </figure>
  <p class="tldr"><b>TL;DR</b> One-sentence summary of the paper.</p>
</div>
-->

<section class="alt" id="abstract">
  <div class="wrap">
    <h2>Abstract</h2>
    <!-- TODO: Replace with the full paper abstract -->
    <p>${description}</p>
  </div>
</section>

<!-- TODO: Method / results sections. Put images in ./static/img/ and uncomment.
<section id="method">
  <div class="wrap">
    <h2>Method</h2>
    <p>Method description.</p>
    <figure>
      <div class="fig"><img src="static/img/method.png" alt=""></div>
      <figcaption>Figure description.</figcaption>
    </figure>
  </div>
</section>
-->

<section id="more">
  <div class="wrap">
    <h2>More works</h2>
    <ul class="contrib">
${moreWorks(pub, all)}
    </ul>
    <p class="center"><a href="${SITE_URL}/#publications">All publications &rarr;</a></p>
  </div>
</section>

<section class="alt" id="bibtex">
  <div class="wrap">
    <h2>BibTeX</h2>
    <div class="bib">
      <button class="copy" id="copyBib">Copy</button>
<pre id="bibText">${esc(bibtex(pub))}</pre>
    </div>
  </div>
</section>

<footer class="wrap">
  <a href="${SITE_URL}/#publications">&larr; Back to Siladittya Manna's homepage</a><br>
  Page template inspired by <a href="https://nerfies.github.io" target="_blank" rel="noopener">Nerfies</a>.
</footer>

<script src="../static/js/paper.js"></script>
</body>
</html>
`
}

const publications = loadPublications().filter((p) => p.type !== "thesis")
for (const p of publications) {
  if (!p.slug) throw new Error(`Publication ${p.id} ("${p.title}") needs a \`slug\` (used as its folder name in public/papers/)`)
}
let created = 0
let skipped = 0
const protectedPages = []

for (const pub of publications) {
  const dir = path.join(OUT_DIR, pub.slug)
  const file = path.join(dir, "index.html")
  if (fs.existsSync(file)) {
    const existing = fs.readFileSync(file, "utf8")
    const generated = existing.includes(GENERATOR_META) || existing.includes(LEGACY_MARKER)
    if (!force || !generated) {
      if (force) protectedPages.push(pub.slug)
      skipped++
      continue
    }
  }
  for (const sub of ["img", "pdf"]) {
    const subDir = path.join(dir, "static", sub)
    fs.mkdirSync(subDir, { recursive: true })
    const keep = path.join(subDir, ".gitkeep")
    if (!fs.existsSync(keep)) fs.writeFileSync(keep, "")
  }
  fs.writeFileSync(file, renderPage(pub, publications))
  created++
  console.log(`wrote public/papers/${pub.slug}/index.html`)
}

if (protectedPages.length) console.log(`\nleft hand-built pages untouched: ${protectedPages.join(", ")}`)
console.log(`\n${created} written, ${skipped} skipped (use --force to regenerate scaffolded pages).`)
