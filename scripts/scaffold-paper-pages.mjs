// Scaffolds a static project page (Academic Project Page Template) for every
// publication in app/page.tsx, except theses.
//
//   node scripts/scaffold-paper-pages.mjs           # create missing pages only
//   node scripts/scaffold-paper-pages.mjs --force   # overwrite existing pages
//
// Pages are written to public/papers/paper_<id>/index.html and share the
// template's CSS/JS from public/papers/static/. Existing pages are never
// touched unless --force is passed, so it is safe to re-run after adding a paper.

import fs from "fs"
import path from "path"

const ROOT = process.cwd()
const PAGE_TSX = path.join(ROOT, "app", "page.tsx")
const OUT_DIR = path.join(ROOT, "public", "papers")
const SITE_URL = "https://sadimanna.github.io"
const SELF_NAMES = ["S Manna", "Siladittya Manna"]
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
  fields.push(`  url={${SITE_URL}/papers/paper_${pub.id}/}`)
  return `@${kind}{${key},\n${fields.join(",\n")}\n}`
}

function linkButton(href, icon, label) {
  return `                <span class="link-block">
                  <a href="${esc(href)}" target="_blank" rel="noopener noreferrer"
                  class="external-link button is-normal is-rounded is-dark">
                    <span class="icon"><i class="${icon}"></i></span>
                    <span>${label}</span>
                  </a>
                </span>`
}

function linkButtons(pub) {
  const arxiv = arxivId(pub)
  const hasLink = pub.link && pub.link !== "#"
  const buttons = []
  if (arxiv) buttons.push(linkButton(`https://arxiv.org/pdf/${arxiv}`, "fas fa-file-pdf", "Paper"))
  else if (hasLink) buttons.push(linkButton(pub.link, "fas fa-file-pdf", "Paper"))
  else buttons.push(`                <!-- TODO: Add the paper link (e.g. publisher page or PDF) once available -->`)

  buttons.push(`                <!-- TODO: Add supplementary material (put the PDF in ./static/pdfs/) or delete this comment
${linkButton("static/pdfs/supplementary_material.pdf", "fas fa-file-pdf", "Supplementary")}
                -->`)
  buttons.push(`                <!-- TODO: Add the code repository or delete this comment
${linkButton("https://github.com/sadimanna/REPO", "fab fa-github", "Code")}
                -->`)
  if (arxiv) buttons.push(linkButton(`https://arxiv.org/abs/${arxiv}`, "ai ai-arxiv", "arXiv"))
  if (pub.doi && !/arxiv/i.test(pub.doi)) buttons.push(linkButton(`https://doi.org/${pub.doi}`, "fas fa-link", "DOI"))
  return buttons.join("\n")
}

function authorBlocks(pub) {
  const authors = splitAuthors(pub.authors)
  return authors
    .map((a, i) => {
      const sep = i < authors.length - 1 ? "," : ""
      const name = SELF_NAMES.includes(a) ? `<a href="${SITE_URL}/" target="_blank">${esc(a)}</a>` : esc(a)
      return `              <span class="author-block">${name}${sep}</span>`
    })
    .join("\n")
}

function moreWorks(pub, all) {
  return all
    .filter((p) => p.id !== pub.id)
    .sort((a, b) => b.year - a.year)
    .slice(0, 6)
    .map(
      (p) => `        <a href="../paper_${p.id}/" class="work-item">
          <div class="work-info">
            <h5>${esc(p.title)}</h5>
            <span class="work-venue">${esc(venue(p))} ${p.year}</span>
          </div>
          <i class="fas fa-arrow-right"></i>
        </a>`
    )
    .join("\n")
}

function renderPage(pub, all) {
  const title = esc(pub.title)
  const authors = esc(pub.authors)
  const description = esc(pub.abstract)
  const url = `${SITE_URL}/papers/paper_${pub.id}/`
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

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Primary Meta Tags -->
  <meta name="title" content="${title} - ${authors}">
  <meta name="description" content="${description}">
  <!-- TODO: Add 5-10 relevant keywords -->
  <meta name="keywords" content="self-supervised learning, deep learning, computer vision, medical imaging">
  <meta name="author" content="${authors}">
  <meta name="robots" content="index, follow">

  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Siladittya Manna">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${url}">
  <!-- TODO: Add a 1200x630px preview image at ./static/images/social_preview.png and uncomment
  <meta property="og:image" content="${url}static/images/social_preview.png">
  -->

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">

  <!-- Academic / Google Scholar -->
  <meta name="citation_title" content="${title}">
${splitAuthors(pub.authors).map((a) => `  <meta name="citation_author" content="${esc(a)}">`).join("\n")}
  <meta name="citation_publication_date" content="${pub.year}">
${venue(pub) ? `  <meta name="citation_${pub.type === "journal" ? "journal" : "conference"}_title" content="${esc(venue(pub))}">` : ""}
${pub.doi ? `  <meta name="citation_doi" content="${esc(pub.doi)}">` : ""}

  <meta name="theme-color" content="#2563eb">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://ajax.googleapis.com">
  <link rel="preconnect" href="https://cdn.jsdelivr.net">

  <title>${title} | Siladittya Manna</title>

  <link rel="icon" type="image/x-icon" href="../static/images/favicon.ico">

  <link rel="stylesheet" href="../static/css/bulma.min.css">
  <link rel="stylesheet" href="../static/css/index.css">
  <link rel="preload" href="../static/css/bulma-carousel.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <link rel="preload" href="../static/css/bulma-slider.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <link rel="preload" href="../static/css/fontawesome.all.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <link rel="preload" href="https://cdn.jsdelivr.net/gh/jpswalsh/academicons@1/css/academicons.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript>
    <link rel="stylesheet" href="../static/css/bulma-carousel.min.css">
    <link rel="stylesheet" href="../static/css/bulma-slider.min.css">
    <link rel="stylesheet" href="../static/css/fontawesome.all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/jpswalsh/academicons@1/css/academicons.min.css">
  </noscript>

  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <script defer src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script defer src="../static/js/fontawesome.all.min.js"></script>
  <script defer src="../static/js/bulma-carousel.min.js"></script>
  <script defer src="../static/js/bulma-slider.min.js"></script>
  <script defer src="../static/js/index.js"></script>

  <script type="application/ld+json">
${JSON.stringify(ld, null, 2).replace(/</g, "\\u003c")}
  </script>
</head>
<body>

  <!-- Scroll to Top Button -->
  <button class="scroll-to-top" onclick="scrollToTop()" title="Scroll to top" aria-label="Scroll to top">
    <i class="fas fa-chevron-up"></i>
  </button>

  <!-- More Works Dropdown -->
  <div class="more-works-container">
    <button class="more-works-btn" onclick="toggleMoreWorks()" title="View more works">
      <i class="fas fa-flask"></i>
      More Works
      <i class="fas fa-chevron-down dropdown-arrow"></i>
    </button>
    <div class="more-works-dropdown" id="moreWorksDropdown">
      <div class="dropdown-header">
        <h4>More Works</h4>
        <button class="close-btn" onclick="toggleMoreWorks()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="works-list">
        <a href="${SITE_URL}/#publications" class="work-item">
          <div class="work-info">
            <h5>&larr; All publications</h5>
            <span class="work-venue">sadimanna.github.io</span>
          </div>
          <i class="fas fa-home"></i>
        </a>
${moreWorks(pub, all)}
      </div>
    </div>
  </div>

  <main id="main-content">
  <section class="hero">
    <div class="hero-body">
      <div class="container is-max-desktop">
        <div class="columns is-centered">
          <div class="column has-text-centered">
            <h1 class="title is-1 publication-title">${title}</h1>
            <div class="is-size-5 publication-authors">
              <!-- TODO: Link co-author names to their homepages; mark equal contribution with <sup>*</sup> -->
${authorBlocks(pub)}
            </div>

            <div class="is-size-5 publication-authors">
              <!-- TODO: Add author affiliations -->
              <span class="author-block">${esc(venue(pub))}${venue(pub) ? " " : ""}${pub.year}</span>
              <!-- <span class="eql-cntrb"><small><br><sup>*</sup>Indicates Equal Contribution</small></span> -->
            </div>

            <div class="column has-text-centered">
              <div class="publication-links">
${linkButtons(pub)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- TODO: Teaser video/figure. Put the file in ./static/videos/ (or ./static/images/) and uncomment.
  <section class="hero teaser">
    <div class="container is-max-desktop">
      <div class="hero-body">
        <video poster="" id="tree" autoplay controls muted loop height="100%" preload="metadata">
          <source src="static/videos/banner_video.mp4" type="video/mp4">
        </video>
        <h2 class="subtitle has-text-centered">
          Teaser description.
        </h2>
      </div>
    </div>
  </section>
  -->

  <!-- Paper abstract -->
  <section class="section hero is-light">
    <div class="container is-max-desktop">
      <div class="columns is-centered has-text-centered">
        <div class="column is-four-fifths">
          <h2 class="title is-3">Abstract</h2>
          <div class="content has-text-justified">
            <!-- TODO: Replace with the full paper abstract -->
            <p>
              ${description}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End paper abstract -->

  <!-- TODO: Image carousel of key figures/results. Put images in ./static/images/ and uncomment.
  <section class="hero is-small">
    <div class="hero-body">
      <div class="container">
        <div id="results-carousel" class="carousel results-carousel">
          <div class="item">
            <img src="static/images/carousel1.jpg" alt="First result" loading="lazy"/>
            <h2 class="subtitle has-text-centered">First image description.</h2>
          </div>
          <div class="item">
            <img src="static/images/carousel2.jpg" alt="Second result" loading="lazy"/>
            <h2 class="subtitle has-text-centered">Second image description.</h2>
          </div>
        </div>
      </div>
    </div>
  </section>
  -->

  <!-- TODO: YouTube video presentation. Replace VIDEO_ID and uncomment.
  <section class="hero is-small is-light">
    <div class="hero-body">
      <div class="container">
        <h2 class="title is-3">Video Presentation</h2>
        <div class="columns is-centered has-text-centered">
          <div class="column is-four-fifths">
            <div class="publication-video">
              <iframe src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  -->

  <!-- TODO: Video carousel. Put videos in ./static/videos/ and uncomment.
  <section class="hero is-small">
    <div class="hero-body">
      <div class="container">
        <h2 class="title is-3">Results</h2>
        <div id="results-carousel" class="carousel results-carousel">
          <div class="item item-video1">
            <video poster="" id="video1" controls muted loop height="100%" preload="metadata">
              <source src="static/videos/carousel1.mp4" type="video/mp4">
            </video>
          </div>
        </div>
      </div>
    </div>
  </section>
  -->

  <!-- TODO: Poster. Put the PDF in ./static/pdfs/poster.pdf and uncomment.
  <section class="hero is-small is-light">
    <div class="hero-body">
      <div class="container">
        <h2 class="title">Poster</h2>
        <iframe src="static/pdfs/poster.pdf" width="100%" height="550"></iframe>
      </div>
    </div>
  </section>
  -->

  <!-- BibTeX citation -->
  <section class="section" id="BibTeX">
    <div class="container is-max-desktop content">
      <div class="bibtex-header">
        <h2 class="title">BibTeX</h2>
        <button class="copy-bibtex-btn" onclick="copyBibTeX()" title="Copy BibTeX to clipboard">
          <i class="fas fa-copy"></i>
          <span class="copy-text">Copy</span>
        </button>
      </div>
      <pre id="bibtex-code"><code>${esc(bibtex(pub))}</code></pre>
    </div>
  </section>
  <!-- End BibTeX citation -->
  </main>

  <footer class="footer">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-8">
          <div class="content">
            <p>
              <a href="${SITE_URL}/#publications">&larr; Back to Siladittya Manna's homepage</a>
            </p>
            <p>
              This page was built using the <a href="https://github.com/eliahuhorwitz/Academic-project-page-template" target="_blank">Academic Project Page Template</a> which was adopted from the <a href="https://nerfies.github.io" target="_blank">Nerfies</a> project page.
              You are free to borrow the source code of this website, we just ask that you link back to this page in the footer. <br> This website is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/" target="_blank">Creative
              Commons Attribution-ShareAlike 4.0 International License</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>

</body>
</html>
`
}

const publications = loadPublications().filter((p) => p.type !== "thesis")
let created = 0
let skipped = 0

for (const pub of publications) {
  const dir = path.join(OUT_DIR, `paper_${pub.id}`)
  const file = path.join(dir, "index.html")
  if (fs.existsSync(file) && !force) {
    skipped++
    continue
  }
  for (const sub of ["images", "videos", "pdfs"]) {
    const subDir = path.join(dir, "static", sub)
    fs.mkdirSync(subDir, { recursive: true })
    const keep = path.join(subDir, ".gitkeep")
    if (!fs.existsSync(keep)) fs.writeFileSync(keep, "")
  }
  fs.writeFileSync(file, renderPage(pub, publications))
  created++
  console.log(`created public/papers/paper_${pub.id}/index.html`)
}

console.log(`\n${created} created, ${skipped} already existed (use --force to overwrite).`)
