import { type Metadata } from 'next'

import { ExternalLinkIcon } from '~/assets'
import { Button } from '~/components/ui/Button'
import { Container } from '~/components/ui/Container'
import { keepSportRecordUrl } from '~/config/profile'
import { siteContent } from '~/content/site-content'

const { title, description } = siteContent.about.metadata

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

export default function AboutPage() {
  const { about } = siteContent

  return (
    <Container className="mt-14 sm:mt-20">
      <header className="max-w-3xl border-b border-zinc-900/10 pb-10 dark:border-white/10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
          {about.hero.eyebrow}
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          {about.hero.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400">
          {about.hero.description}
        </p>
      </header>

      <section className="mt-14 grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-14">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
            {about.story.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            {about.story.title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            {about.story.description}
          </p>
        </header>

        <ol className="border-t border-zinc-900/10 dark:border-white/10">
          {about.story.chapters.map((chapter) => (
            <li
              key={chapter.number}
              className="grid gap-3 border-b border-zinc-900/10 py-7 dark:border-white/10 sm:grid-cols-[48px_minmax(0,1fr)] sm:gap-5"
            >
              <span className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                {chapter.number}
              </span>
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  {chapter.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                  {chapter.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="running"
        className="mt-16 scroll-mt-10 border-y border-zinc-900/10 py-12 dark:border-white/10 sm:py-14"
      >
        <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
              {about.running.eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {about.running.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              {about.running.intro}
            </p>
          </div>

          <div>
            <p className="max-w-2xl text-base leading-8 text-zinc-700 dark:text-zinc-300">
              {about.running.detail}
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {about.running.principles.map(([title, description], index) => (
                <article key={title} className="relative pt-6">
                  <div className="absolute left-0 top-0 flex items-center">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        index === 2
                          ? 'bg-emerald-500 dark:bg-emerald-300'
                          : 'bg-zinc-300 dark:bg-zinc-700'
                      }`}
                      aria-hidden="true"
                    />
                    {index < 2 ? (
                      <span
                        className="ml-2 hidden h-px w-24 bg-zinc-900/10 dark:bg-white/10 sm:block"
                        aria-hidden="true"
                      />
                    ) : null}
                  </div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {description}
                  </p>
                </article>
              ))}
            </div>

            <a
              href={keepSportRecordUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-7 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-800 focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:text-emerald-300 dark:hover:text-emerald-200"
            >
              {about.running.keepLabel}
              <ExternalLinkIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
            {about.workStyle.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {about.workStyle.title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            {about.workStyle.description}
          </p>
        </div>
        <ol className="space-y-4">
          {about.workStyle.steps.map((item, index) => (
            <li
              key={item}
              className="flex gap-4 rounded-2xl border border-zinc-900/10 bg-white/70 p-5 dark:border-white/10 dark:bg-zinc-900/50"
            >
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-800 ring-1 ring-emerald-700/10 dark:bg-emerald-400/10 dark:text-emerald-200 dark:ring-emerald-300/10">
                {index + 1}
              </span>
              <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                {item}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16 overflow-hidden rounded-3xl bg-zinc-950 p-6 text-zinc-100 ring-1 ring-zinc-900/10 dark:ring-white/10 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              {about.closing.eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              {about.closing.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-400">
              {about.closing.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${siteContent.identity.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-300 px-3 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              {about.closing.contactLabel}
              <ExternalLinkIcon className="h-4 w-4" />
            </a>
            <Button href="/projects" variant="secondary">
              {about.closing.projectsLabel}
            </Button>
          </div>
        </div>
      </section>
    </Container>
  )
}
