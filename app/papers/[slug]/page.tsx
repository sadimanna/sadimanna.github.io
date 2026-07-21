import { getAllPapers, getPaperBySlug } from '@/lib/papers'
import { PaperPostClient } from '@/components/papers/PaperPostClient'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const papers = await getAllPapers()
  return papers.map((paper) => ({ slug: paper.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const paper = await getPaperBySlug(slug)
  return {
    title: `${paper.title} — Dr. Siladittya Manna`,
    description: paper.title,
  }
}

export default async function PaperPostPage({ params }: PageProps) {
  const { slug } = await params
  const papers = await getAllPapers()
  const paper = await getPaperBySlug(slug)

  const currentIndex = papers.findIndex((p) => p.slug === slug)
  const prevPaper = currentIndex < papers.length - 1
    ? { slug: papers[currentIndex + 1].slug, title: papers[currentIndex + 1].title }
    : null
  const nextPaper = currentIndex > 0
    ? { slug: papers[currentIndex - 1].slug, title: papers[currentIndex - 1].title }
    : null

  return (
    <PaperPostClient
      title={paper.title}
      authors={paper.authors}
      journal={paper.journal}
      year={paper.year}
      citations={paper.citations}
      category={paper.category}
      topics={paper.topics}
      contentHtml={paper.contentHtml}
      headings={paper.headings}
      link={paper.link}
      code={paper.code}
      bibtex={paper.bibtex}
      prevPaper={prevPaper}
      nextPaper={nextPaper}
    />
  )
}
