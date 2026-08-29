import { siteContent } from '~/content/site-content'

export type FeaturedProject = {
  name: string
  description: string
  role: string
  year: string
  status: string
  githubUrl?: string
  demoUrl?: string
  techStack: readonly string[]
  highlights: readonly string[]
}

export const featuredProjects: readonly FeaturedProject[] =
  siteContent.projects.items
