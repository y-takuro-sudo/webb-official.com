import { create } from 'zustand'
import { TabType, Theme } from '@/types'
import { Project } from '@/libs/microcms'

interface ViewState {
  activeTab: TabType
  previousTab: TabType | null
  theme: Theme
  isMenuOpen: boolean
  isTransitioning: boolean
  // Modal state
  isModalOpen: boolean
  selectedProject: Project | null
  // Actions
  setActiveTab: (tab: TabType, pushHistory?: boolean) => void
  setActiveTabDirect: (tab: TabType) => void // For popstate (no animation)
  toggleMenu: () => void
  setMenuOpen: (open: boolean) => void
  setTransitioning: (transitioning: boolean) => void
  openModal: (project: Project) => void
  closeModal: () => void
}

// Valid tab types for URL validation
export const VALID_TABS: TabType[] = ['LANDING', 'COMMERCIAL', 'MV', 'JAMES_WEBB', 'ABOUT']

export const useViewStore = create<ViewState>((set, get) => ({
  activeTab: 'LANDING',
  previousTab: null,
  theme: 'LIGHT',
  isMenuOpen: false,
  isTransitioning: false,
  isModalOpen: false,
  selectedProject: null,

  setActiveTab: (tab, pushHistory = true) => {
    const currentTab = get().activeTab
    if (currentTab === tab) {
      set({ isMenuOpen: false })
      return
    }

    set({
      isTransitioning: true,
      previousTab: currentTab,
      isMenuOpen: false,
    })

    setTimeout(() => {
      set({
        activeTab: tab,
        theme: 'LIGHT', // Always light theme
      })

      // Update URL
      if (pushHistory && typeof window !== 'undefined') {
        const url = tab === 'LANDING' ? '/' : `/?view=${tab}`
        window.history.pushState({ tab }, '', url)
      }

      setTimeout(() => {
        set({ isTransitioning: false })
      }, 600)
    }, 300)
  },

  // Direct tab change without animation (for browser back/forward)
  setActiveTabDirect: (tab) => {
    set({
      activeTab: tab,
      theme: 'LIGHT', // Always light theme
      isMenuOpen: false,
    })
  },

  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  setMenuOpen: (open) => set({ isMenuOpen: open }),
  setTransitioning: (transitioning) => set({ isTransitioning: transitioning }),

  openModal: (project) => {
    set({
      isModalOpen: true,
      selectedProject: project,
    })
  },

  closeModal: () => {
    set({
      isModalOpen: false,
    })
    // Delay clearing the project data for smooth exit animation
    setTimeout(() => {
      set({ selectedProject: null })
    }, 500)
  },
}))
