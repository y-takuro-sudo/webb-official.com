import { createClient } from 'microcms-js-sdk'

// Types - Match MicroCMS schema
export type Category = 'JAMES_WEBB' | 'COMMERCIAL' | 'MV'

export interface MicroCMSImage {
  url: string
  height: number
  width: number
}

export interface Project {
  id: string
  title: string
  category: Category[]
  thumbnail?: MicroCMSImage
  videourl?: string
  year?: string
  client?: string
  description?: string      // Rich Text HTML
  credits?: string          // Text Area
  gallery?: MicroCMSImage[] // Array of images
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface ProjectsResponse {
  contents: Project[]
  totalCount: number
  offset: number
  limit: number
}

// Check if CMS is configured
const isCMSConfigured = (): boolean => {
  const domain = process.env.MICROCMS_SERVICE_DOMAIN
  const apiKey = process.env.MICROCMS_API_KEY

  // Debug logging for build time
  console.log('[MicroCMS] Environment check:')
  console.log(`  - MICROCMS_SERVICE_DOMAIN: ${domain ? `"${domain}"` : 'NOT SET'}`)
  console.log(`  - MICROCMS_API_KEY: ${apiKey ? `"${apiKey.substring(0, 8)}..."` : 'NOT SET'}`)

  return !!(domain && apiKey)
}

// Lazy client initialization
let _client: ReturnType<typeof createClient> | null = null

const getClient = (): ReturnType<typeof createClient> | null => {
  if (!isCMSConfigured()) {
    return null
  }

  if (!_client) {
    _client = createClient({
      serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
      apiKey: process.env.MICROCMS_API_KEY!,
    })
  }

  return _client
}

// Fetch all projects
export async function getProjects(limit: number = 100): Promise<Project[]> {
  const client = getClient()
  if (!client) {
    console.log('CMS client not configured')
    return []
  }

  try {
    const response = await client.get<ProjectsResponse>({
      endpoint: 'projects',
      queries: { limit },
    })

    console.log(`Fetched ${response.contents.length} projects from CMS`)
    return response.contents
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return []
  }
}

// Fetch projects by category
export async function getProjectsByCategory(
  category: Category,
  limit: number = 100
): Promise<Project[]> {
  const client = getClient()
  if (!client) {
    return []
  }

  try {
    const response = await client.get<ProjectsResponse>({
      endpoint: 'projects',
      queries: {
        limit,
        filters: `category[contains]${category}`,
      },
    })

    return response.contents
  } catch (error) {
    console.error('Failed to fetch projects by category:', error)
    return []
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  const client = getClient()
  if (!client) {
    return null
  }

  try {
    const project = await client.get<Project>({
      endpoint: 'projects',
      contentId: id,
    })

    return project
  } catch (error) {
    console.error('Failed to fetch project:', error)
    return null
  }
}

// Fallback data for development when CMS is empty
export const FALLBACK_PROJECTS: Project[] = []

// Helper to get projects with fallback
export async function getProjectsWithFallback(): Promise<Project[]> {
  if (!isCMSConfigured()) {
    console.log('Using fallback data (CMS not configured)')
    return FALLBACK_PROJECTS
  }

  const projects = await getProjects()

  if (projects.length === 0) {
    console.log('Using fallback data (CMS returned empty)')
    return FALLBACK_PROJECTS
  }

  // Merge CMS data with fallback for categories that have no CMS content
  const cmsCategories = new Set(projects.flatMap((p) => p.category))
  const fallbackForMissingCategories = FALLBACK_PROJECTS.filter(
    (p) => !p.category.some((c) => cmsCategories.has(c))
  )

  return [...projects, ...fallbackForMissingCategories]
}
