import { getAllPapersMeta, getAllPaperCategories, getAllPaperTopics } from '@/lib/papers'
import { PapersListingClient } from '@/components/papers/PapersListingClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Publications — Dr. Siladittya Manna',
  description:
    'Peer-reviewed research contributions to the scientific community in federated learning, self-supervised learning, and medical AI.',
}

export default async function PapersPage() {
  const [papers, categories, topics] = await Promise.all([
    getAllPapersMeta(),
    getAllPaperCategories(),
    getAllPaperTopics(),
  ])

  return <PapersListingClient papers={papers} categories={categories} topics={topics} />
}
