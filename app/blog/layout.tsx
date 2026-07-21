import type { Metadata } from 'next'
import 'katex/dist/katex.min.css'
import 'highlight.js/styles/github-dark-dimmed.css'

export const metadata: Metadata = {
  title: 'Blog — Dr. Siladittya Manna',
  description: 'Technical blog on federated learning, self-supervised learning, medical AI, and trustworthy machine learning.',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
