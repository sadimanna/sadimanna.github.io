import { getAllPosts, getAllTags } from '@/lib/blog'
import { BlogPostCard } from '@/components/blog/BlogPostCard'
import Link from 'next/link'
import { ArrowLeft, Tag } from 'lucide-react'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const tags = await getAllTags()
  const slugs = new Set<string>()
  tags.forEach((tag) => {
    slugs.add(tag.name)
    slugs.add(encodeURIComponent(tag.name))
  })
  return Array.from(slugs).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const tag = decodeURIComponent(slug)
  return {
    title: `#${tag} — Blog — Dr. Siladittya Manna`,
    description: `All blog posts tagged with "${tag}".`,
  }
}

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params
  const tag = decodeURIComponent(slug)
  const allPosts = await getAllPosts()
  const posts = allPosts.filter((p) => p.tags.includes(tag))

  return (
    <div className="blog-page">
      <nav className="blog-nav">
        <Link href="/blog/" className="blog-nav-back">
          <span>All Posts</span>
        </Link>
      </nav>

      <header className="blog-archive-header">
        <div className="blog-archive-icon blog-archive-icon-tag">
          <Tag className="w-6 h-6" />
        </div>
        <h1 className="blog-archive-title">#{tag}</h1>
        <p className="blog-archive-count">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </p>
      </header>

      <div className="blog-archive-list">
        <h2 className="blog-visually-hidden">Articles</h2>
        <div className="blog-grid">
        {posts.map((post) => (
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
      </div>
    </div>
  )
}
