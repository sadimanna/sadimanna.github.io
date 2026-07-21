'use client'

import Link from 'next/link'

interface TagCloudProps {
  tags: { name: string; count: number }[]
  maxDisplay?: number
}

export function TagCloud({ tags, maxDisplay = 20 }: TagCloudProps) {
  const displayedTags = tags.slice(0, maxDisplay)
  const maxCount = Math.max(...displayedTags.map((t) => t.count))
  const minCount = Math.min(...displayedTags.map((t) => t.count))

  const getWeight = (count: number): 'sm' | 'md' | 'lg' | 'xl' => {
    if (maxCount === minCount) return 'md'
    const ratio = (count - minCount) / (maxCount - minCount)
    if (ratio < 0.25) return 'sm'
    if (ratio < 0.5) return 'md'
    if (ratio < 0.75) return 'lg'
    return 'xl'
  }

  return (
    <div className="blog-tagcloud">
      <h3 className="blog-tagcloud-title">Tags</h3>
      <div className="blog-tagcloud-list">
        {displayedTags.map((tag) => (
          <Link
            key={tag.name}
            href={`/blog/tag/${encodeURIComponent(tag.name)}/`}
            className={`blog-tagcloud-item blog-tagcloud-${getWeight(tag.count)}`}
          >
            #{tag.name}
            <span className="blog-tagcloud-count">{tag.count}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
