'use client'

import { useEffect, useRef } from 'react'
import { useThemeStore } from '@/store/useThemeStore'
import gsap from 'gsap'

interface ThemeWrapperProps {
  children: React.ReactNode
}

export default function ThemeWrapper({ children }: ThemeWrapperProps) {
  const { theme, isTransitioning } = useThemeStore()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapperRef.current || !overlayRef.current) return

    const isDark = theme === 'DARK'
    const bgColor = isDark ? '#0A0A0A' : '#FFFFFF'
    const textColor = isDark ? '#FFFFFF' : '#0A0A0A'

    const tl = gsap.timeline()

    tl.to(overlayRef.current, {
      scaleY: 1,
      duration: 0.6,
      ease: 'power4.inOut',
      transformOrigin: 'bottom',
    })
      .to(
        wrapperRef.current,
        {
          backgroundColor: bgColor,
          color: textColor,
          duration: 0,
        },
        0.5
      )
      .to(overlayRef.current, {
        scaleY: 0,
        duration: 0.6,
        ease: 'power4.inOut',
        transformOrigin: 'top',
      })

    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <div
      ref={wrapperRef}
      className="min-h-screen bg-webb-light text-webb-dark dark:bg-webb-dark dark:text-webb-light transition-none"
    >
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] pointer-events-none"
        style={{
          backgroundColor: theme === 'DARK' ? '#0A0A0A' : '#FFFFFF',
          transform: 'scaleY(0)',
        }}
      />
      {children}
    </div>
  )
}
