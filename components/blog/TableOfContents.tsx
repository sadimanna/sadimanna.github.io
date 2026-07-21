'use client'

import { useState, useEffect } from 'react'
import { List, ChevronRight } from 'lucide-react'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  headings: Heading[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first heading that is intersecting
        const visibleEntries = entries.filter((e) => e.isIntersecting)
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id)
        }
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      }
    )

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="blog-toc" aria-label="Table of contents">
      <button
        className="blog-toc-header"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-expanded={!isCollapsed}
      >
        <List className="blog-toc-icon" />
        <span className="blog-toc-title">Table of Contents</span>
        <ChevronRight
          className={`blog-toc-chevron ${isCollapsed ? '' : 'blog-toc-chevron-open'}`}
        />
      </button>
      <ul className={`blog-toc-list ${isCollapsed ? 'blog-toc-list-collapsed' : ''}`}>
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`blog-toc-item ${heading.level === 3 ? 'blog-toc-item-nested' : ''}`}
          >
            <a
              href={`#${heading.id}`}
              className={`blog-toc-link ${activeId === heading.id ? 'blog-toc-link-active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById(heading.id)
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  setActiveId(heading.id)
                }
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
