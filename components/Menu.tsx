'use client'

import { useEffect, useRef } from 'react'
import { useThemeStore, Category } from '@/store/useThemeStore'
import { CATEGORIES } from '@/constants/data'
import gsap from 'gsap'

export default function Menu() {
  const { isMenuOpen, setMenuOpen, setCategory, currentCategory, theme } =
    useThemeStore()
  const menuRef = useRef<HTMLDivElement>(null)
  const menuItemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuRef.current || !menuItemsRef.current) return

    const items = menuItemsRef.current.children

    if (isMenuOpen) {
      gsap.to(menuRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.8,
        ease: 'power4.inOut',
      })

      gsap.fromTo(
        items,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.3,
        }
      )
    } else {
      gsap.to(items, {
        y: -50,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.in',
      })

      gsap.to(menuRef.current, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.6,
        ease: 'power4.inOut',
        delay: 0.2,
      })
    }
  }, [isMenuOpen])

  const handleCategoryClick = (category: string) => {
    setCategory(category as Category)
    setMenuOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setMenuOpen(!isMenuOpen)}
        className="fixed top-8 right-8 z-[1001] mix-blend-difference"
        aria-label="Toggle menu"
      >
        <div className="flex flex-col gap-1.5">
          <span
            className={`block w-8 h-0.5 bg-current transition-transform duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-8 h-0.5 bg-current transition-opacity duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-8 h-0.5 bg-current transition-transform duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </div>
      </button>

      <nav
        ref={menuRef}
        className={`fixed inset-0 z-[1000] flex items-center justify-center ${
          theme === 'DARK'
            ? 'bg-webb-dark text-webb-light'
            : 'bg-webb-light text-webb-dark'
        }`}
        style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      >
        <div ref={menuItemsRef} className="flex flex-col items-center gap-4">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`text-5xl md:text-7xl lg:text-8xl font-light tracking-tight hover:italic transition-all duration-300 ${
                currentCategory === category ? 'italic opacity-100' : 'opacity-40 hover:opacity-100'
              }`}
            >
              {category}
            </button>
          ))}
          <a
            href="/about"
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight opacity-40 hover:opacity-100 hover:italic transition-all duration-300 mt-8"
          >
            ABOUT
          </a>
        </div>
      </nav>
    </>
  )
}
