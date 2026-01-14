'use client'

import { useEffect, useRef } from 'react'
import { useThemeStore } from '@/store/useThemeStore'
import gsap from 'gsap'

export default function Hero() {
  const { theme, currentCategory } = useThemeStore()
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current) return

    const tl = gsap.timeline()

    tl.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
    ).fromTo(
      subtitleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    )
  }, [])

  useEffect(() => {
    if (!titleRef.current) return

    gsap.to(titleRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        if (titleRef.current) {
          titleRef.current.textContent =
            currentCategory === 'ALL' ? 'WEBB' : currentCategory
          gsap.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
          })
        }
      },
    })
  }, [currentCategory])

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center items-center relative px-4"
    >
      <h2
        ref={titleRef}
        className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-light tracking-tight leading-none"
      >
        WEBB
      </h2>
      <p
        ref={subtitleRef}
        className="text-sm md:text-base tracking-[0.4em] mt-8 opacity-60"
      >
        FILM / PHOTO / DESIGN
      </p>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest opacity-40">SCROLL</span>
          <div className="w-px h-12 bg-current opacity-20" />
        </div>
      </div>
    </section>
  )
}
