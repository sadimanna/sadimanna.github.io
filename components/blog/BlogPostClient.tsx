'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TableOfContents } from '@/components/blog/TableOfContents'
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Tag,
  FolderOpen,
  ChevronLeft,
  Share2,
  Check,
} from 'lucide-react'

interface Heading {
  id: string
  text: string
  level: number
}

interface PostNav {
  slug: string
  title: string
}

interface BlogPostClientProps {
  title: string
  date: string
  readingTime: number
  categories: string[]
  tags: string[]
  contentHtml: string
  headings: Heading[]
  prevPost: PostNav | null
  nextPost: PostNav | null
}

export function BlogPostClient({
  title,
  date,
  readingTime,
  categories,
  tags,
  contentHtml,
  headings,
  prevPost,
  nextPost,
}: BlogPostClientProps) {
  const [copied, setCopied] = useState(false)

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

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
          <Link href="/blog/" className="blog-nav-back">
            <ChevronLeft className="w-4 h-4" />
            <span>All Posts</span>
          </Link>
          <button onClick={handleShare} className="blog-nav-share" aria-label="Share post">
            {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Share'}</span>
          </button>
        </nav>

        {/* Post Header */}
        <header className="blog-post-header">
          {/* Categories */}
          <div className="blog-post-header-categories">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/blog/category/${encodeURIComponent(cat)}/`}
                className="blog-category-badge"
              >
                <FolderOpen className="w-3 h-3" />
                {cat}
              </Link>
            ))}
          </div>

          <h1 className="blog-post-title">{title}</h1>

          <div className="blog-post-meta">
            <span className="blog-post-meta-item">
              <Calendar className="w-4 h-4" />
              {formattedDate}
            </span>
            <span className="blog-post-meta-item">
              <Clock className="w-4 h-4" />
              {readingTime} min read
            </span>
          </div>

          {/* Tags */}
          <div className="blog-post-header-tags">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${encodeURIComponent(tag)}/`}
                className="blog-tag-pill"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </Link>
            ))}
          </div>
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
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}/`} className="blog-post-nav-link blog-post-nav-prev">
              <ArrowLeft className="w-4 h-4" />
              <div>
                <span className="blog-post-nav-label">Previous</span>
                <span className="blog-post-nav-title">{prevPost.title}</span>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextPost ? (
            <Link href={`/blog/${nextPost.slug}/`} className="blog-post-nav-link blog-post-nav-next">
              <div>
                <span className="blog-post-nav-label">Next</span>
                <span className="blog-post-nav-title">{nextPost.title}</span>
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
