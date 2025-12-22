"use client"

import { useState, useEffect } from "react"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Section {
  id: string
  title: string
  element: HTMLElement | null
}

interface TableOfContentsProps {
  sections: Array<{ id: string; title: string }>
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>("")
  const [isVisible, setIsVisible] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const sectionElements: Section[] = sections.map(({ id, title }) => ({
      id,
      title,
      element: document.getElementById(id),
    }))

    const observerOptions = {
      rootMargin: "-20% 0px -80% 0px",
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    sectionElements.forEach(({ element }) => {
      if (element) {
        observer.observe(element)
      }
    })

    // Show TOC after a short delay
    const timer = setTimeout(() => setIsVisible(true), 1000)

    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [sections])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden xl:block">
      <div className={`bg-transparent backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/50 transition-all duration-300 ${
        isCollapsed ? "p-2 w-12" : "p-3 w-48"
      }`}>
        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full justify-center mb-2 p-1 h-8 bg-transparent hover:bg-gray-50/30"
        >
          {isCollapsed ? (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          )}
        </Button>

        {/* Navigation Items - only show when not collapsed */}
        {!isCollapsed && (
          <nav className="space-y-1">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection(section.id)}
                className={`w-full justify-start text-left h-auto py-1 px-2 text-xs transition-all duration-300 bg-transparent hover:bg-gray-50/30 ${
                  activeSection === section.id
                    ? "text-blue-700 font-medium transform scale-110 translate-x-3 text-sm py-2 px-3"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center gap-2 w-full">
                  <ChevronRight 
                    className={`transition-all duration-300 ${
                      activeSection === section.id 
                        ? "w-4 h-4 text-blue-600" 
                        : "w-3 h-3 text-gray-400"
                    }`}
                  />
                  <span className="truncate">{section.title}</span>
                </div>
              </Button>
            ))}
          </nav>
        )}

        {/* Collapsed State - Show active section only */}
        {isCollapsed && activeSection && (
          <div className="mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection(activeSection)}
              className="w-full justify-center text-center h-auto py-2 px-2 text-xs bg-transparent hover:bg-gray-50/30 text-blue-700 font-medium"
            >
              <div className="flex flex-col items-center gap-1">
                <ChevronRight className="w-3 h-3 text-blue-600" />
                <span className="text-xs leading-tight">
                  {sections.find(s => s.id === activeSection)?.title}
                </span>
              </div>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
