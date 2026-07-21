'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { BlogPostCard } from '@/components/blog/BlogPostCard'
import { BlogSearch } from '@/components/blog/BlogSearch'
import { CategoryFilter } from '@/components/blog/CategoryFilter'
import { TagCloud } from '@/components/blog/TagCloud'
import { ArrowLeft, Rss, BookOpen } from 'lucide-react'

interface PostMeta {
  slug: string
  title: string
  date: string
  categories: string[]
  tags: string[]
  excerpt: string
  readingTime: number
}

interface BlogListingClientProps {
  posts: PostMeta[]
  categories: { name: string; count: number }[]
  tags: { name: string; count: number }[]
}

export function BlogListingClient({ posts, categories, tags }: BlogListingClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredPosts = useMemo(() => {
    let result = posts

    // Filter by category
    if (activeCategory) {
      result = result.filter((p) => p.categories.includes(activeCategory))
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.categories.some((c) => c.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    return result
  }, [posts, searchQuery, activeCategory])

  return (
    <div className="blog-page">
      {/* Navigation */}
      <nav className="blog-nav">
        <Link href="/" className="blog-nav-back">
          <ArrowLeft className="w-4 h-4" />
          <span>Portfolio</span>
        </Link>
        <a href="/rss.xml" className="blog-nav-rss" aria-label="RSS Feed" target="_blank" rel="noopener noreferrer">
          <Rss className="w-4 h-4" />
          <span>RSS</span>
        </a>
      </nav>

      {/* Hero */}
      <header className="blog-hero">
        <div className="blog-hero-glow" />
        <div className="blog-hero-content">
          <div className="blog-hero-icon">
            <img
              src="/theowl.png"
              alt="Blog"
              className="w-12 h-12 object-contain"
            />
          </div>
          <h1 className="blog-hero-title">The Owl</h1>
          <p className="blog-hero-subtitle">
            A collection of my thoughts and insights on machine learning.
          </p>
          <div className="blog-hero-stats">
            <span>{posts.length} articles</span>
            <span className="blog-hero-dot">·</span>
            <span>{categories.length} categories</span>
            <span className="blog-hero-dot">·</span>
            <span>{tags.length} tags</span>
          </div>
        </div>
      </header>

      {/* Search & Filters */}
      <section className="blog-controls">
        <BlogSearch onSearch={setSearchQuery} totalResults={filteredPosts.length} />
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
      </section>

      {/* Main content area */}
      <div className="blog-main">
        {/* Post Grid */}
        <section className="blog-grid-section">
          {filteredPosts.length > 0 ? (
            <div className="blog-grid">
              {filteredPosts.map((post) => (
                <BlogPostCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  date={post.date}
                  readingTime={post.readingTime}
                  excerpt={post.excerpt}
                  categories={post.categories}
                  tags={post.tags}
                />
              ))}
            </div>
          ) : (
            <div className="blog-empty">
              <p className="blog-empty-title">No posts found</p>
              <p className="blog-empty-subtitle">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </section>

        {/* Sidebar */}
        <aside className="blog-sidebar">
          <TagCloud tags={tags} />
        </aside>
      </div>
    </div>
  )
}
