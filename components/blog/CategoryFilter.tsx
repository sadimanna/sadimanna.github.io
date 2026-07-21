'use client'

interface CategoryFilterProps {
  categories: { name: string; count: number }[]
  activeCategory: string | null
  onSelect: (category: string | null) => void
}

export function CategoryFilter({ categories, activeCategory, onSelect }: CategoryFilterProps) {
  return (
    <div className="blog-category-filter" role="group" aria-label="Filter by category">
      <button
        onClick={() => onSelect(null)}
        className={`blog-category-chip ${activeCategory === null ? 'blog-category-chip-active' : ''}`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => onSelect(activeCategory === cat.name ? null : cat.name)}
          className={`blog-category-chip ${activeCategory === cat.name ? 'blog-category-chip-active' : ''}`}
        >
          {cat.name}
          <span className="blog-category-chip-count">{cat.count}</span>
        </button>
      ))}
    </div>
  )
}
