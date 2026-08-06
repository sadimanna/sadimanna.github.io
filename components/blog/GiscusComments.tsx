'use client'

import { useEffect, useRef } from 'react'

const GISCUS_SCRIPT_ID = 'giscus-script'

export function GiscusComments() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.innerHTML = ''

    const existingScript = document.getElementById(GISCUS_SCRIPT_ID)
    if (existingScript) {
      existingScript.remove()
    }

    const script = document.createElement('script')
    script.id = GISCUS_SCRIPT_ID
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    script.setAttribute('data-repo', 'sadimanna/sadimanna.github.io')
    script.setAttribute('data-repo-id', 'MDEwOlJlcG9zaXRvcnkzMDQ2MDU3NTM=')
    script.setAttribute('data-category', 'Q&A')
    script.setAttribute('data-category-id', 'DIC_kwDOEifqOc4DC0OD')
    script.setAttribute('data-mapping', 'title')
    script.setAttribute('data-strict', '1')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', 'light_high_contrast')
    script.setAttribute('data-lang', 'en')
    script.setAttribute('data-loading', 'lazy')

    const giscusContainer = document.createElement('div')
    giscusContainer.className = 'giscus'
    container.appendChild(giscusContainer)
    container.appendChild(script)

    return () => {
      document.getElementById(GISCUS_SCRIPT_ID)?.remove()
    }
  }, [])

  return <div ref={containerRef} className="mt-10" />
}
