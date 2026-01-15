'use client'

import { useEffect, useRef } from 'react'
import { useViewStore, VALID_TABS } from '@/store/useViewStore'
import { Project } from '@/libs/microcms'
import { TabType } from '@/types'
import gsap from 'gsap'
import LandingView from './views/LandingView'
import GridView from './views/GridView'
import AboutView from './views/AboutView'
import MenuOverlay from './MenuOverlay'
import ProjectDetailModal from './ProjectDetailModal'

interface LayoutProps {
  projects: Project[]
}

export default function Layout({ projects }: LayoutProps) {
  const { activeTab, theme, isMenuOpen, toggleMenu, isTransitioning, setActiveTab, setActiveTabDirect } = useViewStore()
  const viewContainerRef = useRef<HTMLDivElement>(null)
  const isDark = theme === 'DARK'
  const isInitialized = useRef(false)

  // Initialize from URL on mount
  useEffect(() => {
    if (isInitialized.current) return
    isInitialized.current = true

    const params = new URLSearchParams(window.location.search)
    const viewParam = params.get('view') as TabType | null

    if (viewParam && VALID_TABS.includes(viewParam)) {
      setActiveTabDirect(viewParam)
      // Replace current history state with tab info
      window.history.replaceState({ tab: viewParam }, '', `/?view=${viewParam}`)
    } else {
      // Set initial state for landing
      window.history.replaceState({ tab: 'LANDING' }, '', '/')
    }
  }, [setActiveTabDirect])

  // Listen for browser back/forward
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const tab = event.state?.tab as TabType | undefined
      if (tab && VALID_TABS.includes(tab)) {
        setActiveTabDirect(tab)
      } else {
        setActiveTabDirect('LANDING')
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [setActiveTabDirect])

  // View transition animation
  useEffect(() => {
    if (!viewContainerRef.current) return

    gsap.fromTo(
      viewContainerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' }
    )
  }, [activeTab])

  const renderCurrentView = () => {
    switch (activeTab) {
      case 'LANDING':
        return <LandingView />
      case 'COMMERCIAL':
        return <GridView category="COMMERCIAL" initialProjects={projects} />
      case 'MV':
        return <GridView category="MV" initialProjects={projects} />
      case 'JAMES_WEBB':
        return <GridView category="JAMES_WEBB" initialProjects={projects} />
      case 'ABOUT':
        return <AboutView />
      default:
        return <LandingView />
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Background Layer for theme transition */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isDark ? 'bg-black' : 'bg-white'
        }`}
      />

      {/* Logo - Top Left */}
      <button
        onClick={() => setActiveTab('LANDING')}
        className="fixed top-8 left-8 z-[200] mix-blend-difference cursor-pointer"
        aria-label="Go to top"
      >
        <h1 className="text-lg md:text-xl tracking-[0.3em] font-light text-white">
          WEBB
          <span className="text-xs ml-1 opacity-60">Inc.</span>
        </h1>
      </button>

      {/* Menu Trigger - Top Right */}
      <button
        onClick={toggleMenu}
        className="fixed top-8 right-8 z-[200] p-2"
        aria-label="Toggle menu"
      >
        <div className="flex flex-col gap-1.5">
          <span
            className={`block w-7 h-[2px] transition-all duration-300 origin-center ${
              isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            } ${isDark && !isMenuOpen ? 'bg-white' : 'bg-black'}`}
          />
          <span
            className={`block w-7 h-[2px] transition-all duration-300 ${
              isMenuOpen ? 'opacity-0 scale-x-0' : ''
            } ${isDark && !isMenuOpen ? 'bg-white' : 'bg-black'}`}
          />
          <span
            className={`block w-7 h-[2px] transition-all duration-300 origin-center ${
              isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            } ${isDark && !isMenuOpen ? 'bg-white' : 'bg-black'}`}
          />
        </div>
      </button>

      {/* Current View */}
      <div
        ref={viewContainerRef}
        className={`absolute inset-0 transition-opacity duration-300 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {renderCurrentView()}
      </div>

      {/* Menu Overlay */}
      <MenuOverlay />

      {/* Project Detail Modal */}
      <ProjectDetailModal />
    </div>
  )
}
