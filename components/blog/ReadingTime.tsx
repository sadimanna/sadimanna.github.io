import { Clock } from 'lucide-react'

interface ReadingTimeProps {
  minutes: number
  className?: string
}

export function ReadingTime({ minutes, className = '' }: ReadingTimeProps) {
  return (
    <span className={`blog-reading-time ${className}`}>
      <Clock className="blog-reading-time-icon" />
      <span>{minutes} min read</span>
    </span>
  )
}
