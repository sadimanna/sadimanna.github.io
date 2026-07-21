'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  ArrowRight,
  Tag,
  FolderOpen,
  ChevronLeft,
  Share2,
  Check,
  ExternalLink,
} from 'lucide-react'

interface Heading {
  id: string
  text: string
  level: number
}

interface PaperNav {
  slug: string
  title: string
}

interface PaperPostClientProps {
  title: string
  authors: string
  journal: string
  year: number
  citations: number
  category: string
  topics: string[]
  contentHtml: string
  headings: Heading[]
  link: string
  code?: string
  bibtex?: string
  prevPaper: PaperNav | null
  nextPaper: PaperNav | null
}

export function PaperPostClient({
  title,
  authors,
  journal,
  year,
  citations,
  category,
  topics,
  contentHtml,
  headings,
  link,
  code,
  bibtex,
  prevPaper,
  nextPaper,
}: PaperPostClientProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({ title, url })
    } else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Scroll progress indicator
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Reading progress bar */}
      <div className="blog-progress-bar" style={{ width: `${progress}%` }} />

      <div className="blog-post-page">
        {/* Navigation */}
        <nav className="blog-nav">
          <Link href="/papers/" className="blog-nav-back">
            <ChevronLeft className="w-4 h-4" />
            <span>All Publications</span>
          </Link>
          <button onClick={handleShare} className="blog-nav-share" aria-label="Share paper">
            {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Share'}</span>
          </button>
        </nav>

        {/* Post Header */}
        <header className="blog-post-header">
          {/* Category */}
          {category && (
            <div className="blog-post-header-categories">
              <span className="blog-category-badge">
                <FolderOpen className="w-3 h-3" />
                {category}
              </span>
            </div>
          )}

          <h1 className="blog-post-title text-4xl font-bold leading-tight mt-4 mb-4">{title}</h1>

          <div className="text-lg text-gray-700 mb-6">
            <p className="font-semibold">{authors}</p>
            <p className="italic">{journal}, {year} &bull; {citations} citations</p>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {link && (
              <Button asChild variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href={link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Read Paper
                </Link>
              </Button>
            )}
            {code && (
              <Button asChild variant="outline">
                <Link href={code} target="_blank" rel="noopener noreferrer">
                  Source Code
                </Link>
              </Button>
            )}
            {bibtex && (
              <Button asChild variant="outline">
                <Link href={bibtex} target="_blank" rel="noopener noreferrer">
                  BibTeX
                </Link>
              </Button>
            )}
          </div>

          {/* Topics */}
          {topics.length > 0 && (
            <div className="blog-post-header-tags mt-4">
              {topics.map((topic) => (
                <span key={topic} className="blog-tag-pill">
                  <Tag className="w-3 h-3" />
                  {topic}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Content + ToC layout */}
        <div className="blog-post-layout">
          {/* Sidebar ToC (desktop) */}
          <aside className="blog-post-sidebar">
            <div className="blog-post-sidebar-sticky">
              <TableOfContents headings={headings} />
            </div>
          </aside>

          {/* Article Content */}
          <article
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>

        {/* Post Navigation */}
        <nav className="blog-post-nav">
          {prevPaper ? (
            <Link href={`/papers/${prevPaper.slug}/`} className="blog-post-nav-link blog-post-nav-prev">
              <ArrowLeft className="w-4 h-4" />
              <div>
                <span className="blog-post-nav-label">Previous</span>
                <span className="blog-post-nav-title">{prevPaper.title}</span>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextPaper ? (
            <Link href={`/papers/${nextPaper.slug}/`} className="blog-post-nav-link blog-post-nav-next">
              <div>
                <span className="blog-post-nav-label">Next</span>
                <span className="blog-post-nav-title">{nextPaper.title}</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </div>
    </>
  )
}
