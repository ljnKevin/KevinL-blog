import { type Metadata } from 'next'

import { Projects } from '~/app/(main)/projects/Projects'
import { Container } from '~/components/ui/Container'
import { siteContent } from '~/content/site-content'

const { title, description } = siteContent.projects.metadata
export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
  },
} satisfies Metadata

export default function ProjectsPage() {
  const { hero } = siteContent.projects

  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
          {hero.eyebrow}
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          {hero.title}
        </h1>
        <p className="mt-6 text-base leading-8 text-zinc-600 dark:text-zinc-400">
          {hero.description}
        </p>
      </header>
      <div className="mt-16 sm:mt-20">
        <Projects />
      </div>
    </Container>
  )
}

export const revalidate = 3600
