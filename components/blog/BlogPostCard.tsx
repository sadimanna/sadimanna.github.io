'use client'

import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

interface BlogPostCardProps {
  slug: string
  title: string
  date: string
  readingTime: number
  excerpt: string
  categories: string[]
  tags: string[]
}

export function BlogPostCard({
  slug,
  title,
  date,
  readingTime,
  excerpt,
  categories,
  tags,
}: BlogPostCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link href={`/blog/${slug}/`} className="group block">
      <article className="blog-card">
        <div className="blog-card-inner">
          {/* Categories */}
          {categories.length > 0 && (
            <div className="blog-card-categories">
              {categories.map((cat) => (
                <span key={cat} className="blog-category-badge">
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h2 className="blog-card-title">{title}</h2>

          {/* Meta */}
          <div className="blog-card-meta">
            <span className="blog-card-meta-item">
              <Calendar className="blog-card-meta-icon" />
              {formattedDate}
            </span>
            <span className="blog-card-meta-item">
              <Clock className="blog-card-meta-icon" />
              {readingTime} min read
            </span>
          </div>

          {/* Excerpt */}
          <p className="blog-card-excerpt">{excerpt}</p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="blog-card-tags">
              {tags.slice(0, 4).map((tag) => (
                <span key={tag} className="blog-tag-pill">
                  #{tag}
                </span>
              ))}
              {tags.length > 4 && (
                <span className="blog-tag-pill blog-tag-more">+{tags.length - 4}</span>
              )}
            </div>
          )}

          {/* Read More */}
          <div className="blog-card-readmore">
            <span>Read article</span>
            <ArrowRight className="blog-card-readmore-icon" />
          </div>
        </div>
      </article>
    </Link>
  )
}
