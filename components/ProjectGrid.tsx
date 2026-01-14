'use client'

import { useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import { useThemeStore, Category } from '@/store/useThemeStore'
import { PROJECTS, CATEGORIES } from '@/constants/data'
import gsap from 'gsap'

export default function ProjectGrid() {
  const { currentCategory, setCategory, theme } = useThemeStore()
  const gridRef = useRef<HTMLDivElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)

  const filteredProjects = useMemo(() => {
    if (currentCategory === 'ALL') return PROJECTS
    return PROJECTS.filter((p) => p.category === currentCategory)
  }, [currentCategory])

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
        stagger: 0.08,
        ease: 'power3.out',
      }
    )
  }, [currentCategory])

  const getGridClass = (aspectRatio: string, index: number) => {
    const baseClass = 'relative overflow-hidden cursor-pointer group'

    if (aspectRatio === '9:16') {
      return `${baseClass} col-span-1 row-span-2`
    }
    if (aspectRatio === '1:1') {
      return `${baseClass} col-span-1 row-span-1 aspect-square`
    }
    if (index % 5 === 0) {
      return `${baseClass} col-span-2 row-span-1`
    }
    return `${baseClass} col-span-1 row-span-1`
  }

  return (
    <section className="px-4 md:px-8 lg:px-16 py-16">
      <div
        ref={filterRef}
        className="flex flex-wrap gap-4 md:gap-8 mb-12 md:mb-16"
      >
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setCategory(category as Category)}
            className={`text-sm md:text-base tracking-widest uppercase transition-all duration-300 pb-1 ${
              currentCategory === category
                ? 'border-b border-current'
                : 'opacity-40 hover:opacity-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
      >
        {filteredProjects.map((project, index) => (
          <article
            key={project.id}
            className={getGridClass(project.aspectRatio, index)}
          >
            <div className="relative w-full h-full min-h-[300px] md:min-h-[400px]">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  theme === 'DARK'
                    ? 'bg-black/60 group-hover:bg-black/40'
                    : 'bg-white/0 group-hover:bg-black/20'
                }`}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span
                  className={`text-xs tracking-widest mb-2 ${
                    theme === 'DARK' ? 'text-white/60' : 'text-white'
                  }`}
                >
                  {project.category} / {project.year}
                </span>
                <h3
                  className={`text-xl md:text-2xl font-light ${
                    theme === 'DARK' ? 'text-white' : 'text-white'
                  }`}
                >
                  {project.title}
                </h3>
                <p
                  className={`text-sm mt-2 ${
                    theme === 'DARK' ? 'text-white/80' : 'text-white/90'
                  }`}
                >
                  {project.client}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
