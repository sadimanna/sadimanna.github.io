'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X, Command } from 'lucide-react'

interface BlogSearchProps {
  onSearch: (query: string) => void
  totalResults?: number
}

export function BlogSearch({ onSearch, totalResults }: BlogSearchProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
      if (e.key === 'Escape') {
        inputRef.current?.blur()
        setQuery('')
        onSearch('')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onSearch])

  const handleChange = (value: string) => {
    setQuery(value)
    onSearch(value)
  }

  const clearSearch = () => {
    setQuery('')
    onSearch('')
    inputRef.current?.focus()
  }

  return (
    <div className={`blog-search-wrapper ${isFocused ? 'blog-search-focused' : ''}`}>
      <Search className="blog-search-icon" />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search posts by title, tag, or category..."
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="blog-search-input"
        aria-label="Search blog posts"
      />
      {query ? (
        <button onClick={clearSearch} className="blog-search-clear" aria-label="Clear search">
          <X className="w-4 h-4" />
        </button>
      ) : (
        <kbd className="blog-search-kbd">
          <Command className="w-3 h-3" />
          <span>K</span>
        </kbd>
      )}
      {query && totalResults !== undefined && (
        <span className="blog-search-results">
          {totalResults} {totalResults === 1 ? 'result' : 'results'}
        </span>
      )}
    </div>
  )
}
