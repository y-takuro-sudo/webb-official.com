import { create } from 'zustand'

export type Theme = 'LIGHT' | 'DARK'
export type Category = 'ALL' | 'COMMERCIAL' | 'MV' | 'JAMES WEBB'

interface ThemeState {
  theme: Theme
  currentCategory: Category
  isMenuOpen: boolean
  isTransitioning: boolean
  setCategory: (category: Category) => void
  toggleMenu: () => void
  setMenuOpen: (open: boolean) => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'LIGHT',
  currentCategory: 'ALL',
  isMenuOpen: false,
  isTransitioning: false,

  setCategory: (category) => {
    set({ isTransitioning: true })

    setTimeout(() => {
      set({
        currentCategory: category,
        theme: category === 'JAMES WEBB' ? 'DARK' : 'LIGHT',
      })

      setTimeout(() => {
        set({ isTransitioning: false })
      }, 100)
    }, 50)
  },

  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  setMenuOpen: (open) => set({ isMenuOpen: open }),
}))
