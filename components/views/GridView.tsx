'use client'

import { useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { useViewStore } from '@/store/useViewStore'
import { Project, Category } from '@/libs/microcms'
import { TabType } from '@/types'

interface GridViewProps {
  category: Exclude<TabType, 'LANDING' | 'ABOUT'>
  initialProjects: Project[]
}

// Map TabType to CMS Category
const TAB_TO_CMS_CATEGORY: Record<string, Category> = {
  COMMERCIAL: 'COMMERCIAL',
  MV: 'MV',
  JAMES_WEBB: 'JAMES_WEBB',
}

// Display labels for categories
const CATEGORY_LABELS: Record<string, string> = {
  COMMERCIAL: 'COMMERCIAL',
  MV: 'MV',
  JAMES_WEBB: 'JAMES WEBB',
}

export default function GridView({ category, initialProjects }: GridViewProps) {
  const { openModal } = useViewStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)

  const cmsCategory = TAB_TO_CMS_CATEGORY[category]
  const displayLabel = CATEGORY_LABELS[category]

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((p) => p.category.includes(cmsCategory))
  }, [initialProjects, cmsCategory])

  // Initialize Lenis for internal scroll
  useEffect(() => {
    if (!containerRef.current) return

    const lenis = new Lenis({
      wrapper: containerRef.current,
      content: containerRef.current.firstElementChild as HTMLElement,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [category])

  // Animate items on mount
  useEffect(() => {
    if (!gridRef.current) return

    const items = gridRef.current.children

    gsap.fromTo(
      items,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2,
      }
    )
  }, [category, filteredProjects])

  const handleProjectClick = (project: Project) => {
    openModal(project)
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-y-auto overflow-x-hidden bg-white"
    >
      <div className="min-h-full">
        {/* Header */}
        <div className="pt-32 pb-8 px-8 md:px-16">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight text-black">
            {displayLabel}
          </h2>
          <p className="text-sm tracking-widest mt-4 text-black/50">
            {filteredProjects.length} PROJECTS
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-8 md:px-16 pb-32"
        >
          {filteredProjects.map((project) => {
            const thumbnailUrl =
              project.thumbnail?.url ||
              'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&q=80'

            return (
              <article
                key={project.id}
                className="relative overflow-hidden cursor-pointer group"
                onClick={() => handleProjectClick(project)}
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={thumbnailUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 transition-opacity duration-500 bg-white/0 group-hover:bg-black/20" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-xs tracking-widest mb-2 text-white/60">
                      {project.year}
                    </span>
                    <h3 className="text-xl md:text-2xl font-light text-white">
                      {project.title}
                    </h3>
                    {project.client && (
                      <p className="text-sm mt-2 text-white/80">
                        {project.client}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg text-black/40">
              No projects found
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
