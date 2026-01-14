export interface Project {
  id: string
  title: string
  client: string
  category: 'COMMERCIAL' | 'MV' | 'JAMES WEBB'
  year: number
  thumbnail: string
  videoUrl?: string
  description: string
  credits?: {
    director?: string
    cinematographer?: string
    editor?: string
    producer?: string
  }
  aspectRatio: '16:9' | '4:3' | '1:1' | '9:16'
  featured: boolean
}

export interface MenuItem {
  id: string
  label: string
  href: string
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}
