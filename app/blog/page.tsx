import { getAllPostsMeta, getAllCategories, getAllTags } from '@/lib/blog'
import { BlogListingClient } from '@/components/blog/BlogListingClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Dr. Siladittya Manna',
  description:
    'Technical blog on federated learning, self-supervised learning, medical AI, and trustworthy machine learning research.',
}

export default async function BlogPage() {
  const [posts, categories, tags] = await Promise.all([
    getAllPostsMeta(),
    getAllCategories(),
    getAllTags(),
  ])

  return <BlogListingClient posts={posts} categories={categories} tags={tags} />
}
