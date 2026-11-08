"use client"

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

type RailProps = {
  /** Accessible name for the carousel region */
  label: string
  /** Optional heading rendered on the left of the control bar */
  heading?: ReactNode
  /** Number of cards visible at full width (steps down on small screens in CSS) */
  visible?: number
  /** Rows of cards; with 2 rows the cards fill column by column */
  rows?: number
  /** Auto-advance interval in ms */
  interval?: number
  className?: string
  children: ReactNode
}

/**
 * A horizontal, scroll-snapped rail of cards that advances on its own.
 * Auto-advance pauses on hover, keyboard focus, touch, when off-screen, when the
 * user presses pause, and never starts under prefers-reduced-motion.
 */
export function Rail({ label, heading, visible = 3, rows = 1, interval = 6000, className = "", children }: RailProps) {
  const track = useRef<HTMLUListElement>(null)
  const [paused, setPaused] = useState(false)
  const [hold, setHold] = useState(false)
  const [onScreen, setOnScreen] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [overflows, setOverflows] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    const el = track.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.4 })
    io.observe(el)
    const ro = new ResizeObserver(() => setOverflows(el.scrollWidth > el.clientWidth + 4))
    ro.observe(el)
    return () => {
      io.disconnect()
      ro.disconnect()
    }
  }, [])

  const step = useCallback(
    (dir: 1 | -1) => {
      const el = track.current
      const first = el?.firstElementChild as HTMLElement | null
      if (!el || !first) return
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0
      const width = first.getBoundingClientRect().width + gap
      const behavior: ScrollBehavior = reduced ? "auto" : "smooth"
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
      const atStart = el.scrollLeft <= 4
      if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior })
      else if (dir === -1 && atStart) el.scrollTo({ left: el.scrollWidth, behavior })
      else el.scrollBy({ left: dir * width, behavior })
    },
    [reduced],
  )

  const running = overflows && onScreen && !paused && !hold && !reduced

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => step(1), interval)
    return () => window.clearInterval(id)
  }, [running, interval, step])

  return (
    <div
      className={`rail ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHold(false)
      }}
      style={{ "--rail-n": visible, "--rail-rows": rows } as CSSProperties}
    >
      <div className="rail__bar">
        {heading}
        {overflows && (
          <div className="rail__ctrls">
            <button type="button" className="rail__btn" onClick={() => step(-1)} aria-label={`Previous: ${label}`}>
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            {!reduced && (
              <button
                type="button"
                className="rail__btn"
                onClick={() => setPaused((p) => !p)}
                aria-pressed={paused}
                aria-label={paused ? `Resume auto-scroll: ${label}` : `Pause auto-scroll: ${label}`}
              >
                {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
              </button>
            )}
            <button type="button" className="rail__btn" onClick={() => step(1)} aria-label={`Next: ${label}`}>
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      <ul ref={track} className="rail__track" tabIndex={0} onPointerDown={(e) => e.pointerType !== "mouse" && setPaused(true)}>
        {children}
      </ul>
    </div>
  )
}
