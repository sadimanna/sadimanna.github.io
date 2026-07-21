'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, ExternalLink, FileText } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface PaperMeta {
  slug: string
  title: string
  authors: string
  journal: string
  year: number
  citations: number
  type: string
  link: string
  category: string
  topics: string[]
  featured: boolean
  code?: string
  bibtex?: string
}

interface PapersListingClientProps {
  papers: PaperMeta[]
  categories: { name: string; count: number }[]
  topics: { name: string; count: number }[]
}

export function PapersListingClient({ papers, categories, topics }: PapersListingClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredPapers = useMemo(() => {
    let result = papers

    // Filter by category
    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.authors.toLowerCase().includes(q) ||
          p.journal.toLowerCase().includes(q) ||
          p.topics.some((t) => t.toLowerCase().includes(q))
      )
    }

    return result
  }, [papers, searchQuery, activeCategory])

  return (
    <div className="blog-page">
      {/* Navigation */}
      <nav className="blog-nav">
        <Link href="/" className="blog-nav-back">
          <ArrowLeft className="w-4 h-4" />
          <span>Portfolio</span>
        </Link>
      </nav>

      {/* Hero */}
      <header className="blog-hero">
        <div className="blog-hero-glow" />
        <div className="blog-hero-content">
          <div className="blog-hero-icon">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="blog-hero-title">Publications</h1>
          <p className="blog-hero-subtitle">
            Peer-reviewed research contributions to the scientific community, exploring federated learning, self-supervised methods, and medical AI.
          </p>
          <div className="blog-hero-stats">
            <span>{papers.length} papers</span>
            <span className="blog-hero-dot">·</span>
            <span>{categories.length} categories</span>
            <span className="blog-hero-dot">·</span>
            <span>{topics.length} topics</span>
          </div>
        </div>
      </header>

      {/* Search & Filters */}
      <section className="blog-controls">
        <div className="blog-search-container">
          <div className="blog-search-wrapper">
            <input
              type="text"
              placeholder="Search papers by title, author, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="blog-search-input"
            />
          </div>
        </div>

        <div className="blog-category-filter">
          <button
            className={`blog-category-chip ${activeCategory === null ? 'blog-category-chip-active' : ''}`}
            onClick={() => setActiveCategory(null)}
          >
            All Papers
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              className={`blog-category-chip ${activeCategory === cat.name ? 'blog-category-chip-active' : ''}`}
              onClick={() => setActiveCategory(cat.name)}
            >
              {cat.name}
              <span className="blog-category-chip-count">{cat.count}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Main content area */}
      <div className="blog-main">
        {/* Post Grid */}
        <section className="blog-grid-section">
          {filteredPapers.length > 0 ? (
            <div className="grid grid-cols-1 gap-5">
              {filteredPapers.map((pub) => (
                <Card
                  key={pub.slug}
                  className="border-gray-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md bg-white"
                >
                  <CardHeader>
                    <div className="mb-3 flex flex-wrap gap-2">
                      {pub.featured && <Badge className="bg-blue-600 text-white hover:bg-blue-700">Featured</Badge>}
                      <Badge variant="secondary">{pub.category}</Badge>
                      {pub.topics.map((topic) => (
                        <Badge key={topic} variant="outline" className="bg-white">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-xl leading-snug text-gray-900">{pub.title}</CardTitle>
                    <CardDescription className="mt-3 text-sm leading-6">
                      <span className="font-medium text-gray-800">{pub.authors}</span>
                      <br />
                      <span className="italic">{pub.journal}</span> • {pub.year}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Button asChild size="sm" variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Link href={`/papers/${pub.slug}/`}>
                          Project Page
                        </Link>
                      </Button>
                      {pub.link && (
                        <Button asChild size="sm" variant="outline" className="bg-white">
                          <Link href={pub.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Paper
                          </Link>
                        </Button>
                      )}
                      {pub.code ? (
                        <Button asChild size="sm" variant="outline" className="bg-white">
                          <Link href={pub.code} target="_blank" rel="noopener noreferrer">
                            Code
                          </Link>
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" disabled>
                          Code
                        </Button>
                      )}
                      {pub.bibtex ? (
                        <Button asChild size="sm" variant="outline" className="bg-white">
                          <Link href={pub.bibtex} target="_blank" rel="noopener noreferrer">
                            BibTeX
                          </Link>
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" disabled>
                          BibTeX
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="blog-empty">
              <p className="blog-empty-title">No papers found</p>
              <p className="blog-empty-subtitle">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </section>

        {/* Sidebar */}
        <aside className="blog-sidebar">
          <div className="blog-tag-cloud">
            <h3 className="blog-tag-cloud-title">Topics</h3>
            <div className="blog-tag-cloud-tags">
              {topics.map((topic) => (
                <span key={topic.name} className="blog-tag-pill">
                  {topic.name} <span className="text-gray-400 text-xs ml-1">{topic.count}</span>
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
