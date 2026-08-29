import { type Metadata } from 'next'

import { ExternalLinkIcon, EyeOpenIcon, SparkleIcon } from '~/assets'
import { Container } from '~/components/ui/Container'
import { siteContent } from '~/content/site-content'

const { title, description } = siteContent.media.metadata

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

const mediaIcons = {
  eye: EyeOpenIcon,
  sparkle: SparkleIcon,
} as const

export default function MediaPage() {
  const { media } = siteContent

  return (
    <Container className="mt-14 sm:mt-20">
      <header className="max-w-3xl border-b border-zinc-900/10 pb-10 dark:border-white/10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
          {media.hero.eyebrow}
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          {media.hero.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400">
          {media.hero.description}
        </p>
      </header>

      <section className="mt-12 grid gap-5 lg:grid-cols-2">
        {media.links.map(({ title, label, description, href, cta, icon }) => {
          const Icon = mediaIcons[icon]

          return (
            <article
              key={title}
              className="group relative overflow-hidden rounded-3xl border border-zinc-900/10 bg-white/70 p-6 transition hover:-translate-y-0.5 hover:border-emerald-600/30 dark:border-white/10 dark:bg-zinc-900/50 dark:hover:border-emerald-300/30 sm:p-8"
            >
              <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl transition group-hover:bg-emerald-500/20" />
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800 ring-1 ring-emerald-700/10 dark:bg-emerald-400/10 dark:text-emerald-200 dark:ring-emerald-300/10">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-500">
                  {label}
                </p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                  {description}
                </p>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200"
                >
                  {cta}
                  <ExternalLinkIcon className="h-4 w-4" />
                </a>
              </div>
            </article>
          )
        })}
      </section>
    </Container>
  )
}

export const revalidate = 3600
