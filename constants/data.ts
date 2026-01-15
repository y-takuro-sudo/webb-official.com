import { MenuItem } from '@/types'

export const MENU_ITEMS: MenuItem[] = [
  { id: 'LANDING', label: 'TOP' },
  { id: 'COMMERCIAL', label: 'COMMERCIAL' },
  { id: 'MV', label: 'MV' },
  { id: 'JAMES_WEBB', label: 'JAMES WEBB' },
  { id: 'ABOUT', label: 'ABOUT US' },
]

// Map tab type to CMS category
export const TAB_TO_CATEGORY: Record<string, string> = {
  COMMERCIAL: 'COMMERCIAL',
  MV: 'MV',
  JAMES_WEBB: 'JAMES WEBB',
}
