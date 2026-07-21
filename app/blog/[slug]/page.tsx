import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { BlogPostClient } from '@/components/blog/BlogPostClient'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  return {
    title: `${post.title} — Dr. Siladittya Manna`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const posts = await getAllPosts()
  const post = await getPostBySlug(slug)

  const currentIndex = posts.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex < posts.length - 1
    ? { slug: posts[currentIndex + 1].slug, title: posts[currentIndex + 1].title }
    : null
  const nextPost = currentIndex > 0
    ? { slug: posts[currentIndex - 1].slug, title: posts[currentIndex - 1].title }
    : null

  return (
    <BlogPostClient
      title={post.title}
      date={post.date}
      readingTime={post.readingTime}
      categories={post.categories}
      tags={post.tags}
      contentHtml={post.contentHtml}
      headings={post.headings}
      prevPost={prevPost}
      nextPost={nextPost}
    />
  )
}
