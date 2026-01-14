'use client'

import { useThemeStore } from '@/store/useThemeStore'
import Link from 'next/link'

export default function Header() {
  const { theme } = useThemeStore()

  return (
    <header className="fixed top-0 left-0 w-full z-[100] mix-blend-difference">
      <div className="flex justify-between items-center px-8 py-8">
        <Link href="/" className="group">
          <h1 className="text-xl md:text-2xl tracking-[0.3em] font-light">
            WEBB
            <span className="text-xs md:text-sm ml-2 opacity-60 group-hover:opacity-100 transition-opacity">
              Inc.
            </span>
          </h1>
        </Link>
      </div>
    </header>
  )
}
