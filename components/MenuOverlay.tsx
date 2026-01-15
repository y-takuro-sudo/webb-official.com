'use client'

import { useEffect, useRef } from 'react'
import { useViewStore } from '@/store/useViewStore'
import { MENU_ITEMS } from '@/constants/data'
import { TabType } from '@/types'
import gsap from 'gsap'

export default function MenuOverlay() {
  const { isMenuOpen, setActiveTab, activeTab } = useViewStore()
  const menuRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuRef.current || !itemsRef.current) return

    const items = itemsRef.current.children

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
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.3,
        }
      )
    } else {
      gsap.to(items, {
        y: -50,
        opacity: 0,
        duration: 0.3,
        stagger: 0.04,
        ease: 'power2.in',
      })

      gsap.to(menuRef.current, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.6,
        ease: 'power4.inOut',
        delay: 0.15,
      })
    }
  }, [isMenuOpen])

  const handleItemClick = (tabId: TabType) => {
    setActiveTab(tabId)
  }

  return (
    <nav
      ref={menuRef}
      className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
      style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
    >
      <div ref={itemsRef} className="flex flex-col items-center gap-2 md:gap-4">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={`text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-black transition-all duration-300 hover:scale-[1.02] ${
              activeTab === item.id
                ? 'opacity-100'
                : 'opacity-40 hover:opacity-100'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
        <p className="text-xs tracking-widest text-black/40">
          WEBB Inc. / Tokyo
        </p>
        <div className="flex gap-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest text-black/40 hover:text-black transition-colors"
          >
            IG
          </a>
          <a
            href="https://vimeo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest text-black/40 hover:text-black transition-colors"
          >
            VM
          </a>
        </div>
      </div>
    </nav>
  )
}
