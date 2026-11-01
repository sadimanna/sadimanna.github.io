'use client'

import { useState } from 'react'

interface CategoryFilterProps {
  categories: { name: string; count: number }[]
  activeCategory: string | null
  onSelect: (category: string | null) => void
}

const SHOWN = 10

export function CategoryFilter({ categories, activeCategory, onSelect }: CategoryFilterProps) {
  const [showAll, setShowAll] = useState(false)
  const activeIndex = categories.findIndex((c) => c.name === activeCategory)
  const visible = showAll ? categories : categories.filter((_, i) => i < SHOWN || i === activeIndex)

  return (
    <div className="blog-category-filter" role="group" aria-label="Filter by category">
      <button
        onClick={() => onSelect(null)}
        className={`blog-category-chip ${activeCategory === null ? 'blog-category-chip-active' : ''}`}
      >
        All
      </button>
      {visible.map((cat) => (
        <button
          key={cat.name}
          onClick={() => onSelect(activeCategory === cat.name ? null : cat.name)}
          className={`blog-category-chip ${activeCategory === cat.name ? 'blog-category-chip-active' : ''}`}
        >
          {cat.name}
          <span className="blog-category-chip-count">{cat.count}</span>
        </button>
      ))}
      {categories.length > SHOWN && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="blog-category-more"
          aria-expanded={showAll}
        >
          {showAll ? 'Fewer categories' : `All ${categories.length} categories`}
        </button>
      )}
    </div>
  )
}
