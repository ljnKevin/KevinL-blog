import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { BlogPosts } from '~/app/(main)/blog/BlogPosts'
import { Headline } from '~/app/(main)/Headline'
import { featuredProjects } from '~/app/(main)/projects/project-data'
import {
  ExternalLinkIcon,
  Layers3Icon,
  LightningIcon,
  PencilSwooshIcon,
  SparkleIcon,
} from '~/assets'
import { Button } from '~/components/ui/Button'
import { Container } from '~/components/ui/Container'
import {
  favoriteApps,
  keepSportRecordUrl,
  spotifyPlaylistEmbedUrl,
  spotifyPlaylistUrl,
} from '~/config/profile'
import { siteContent } from '~/content/site-content'

const capabilityIcons = {
  lightning: LightningIcon,
  sparkle: SparkleIcon,
  layers: Layers3Icon,
  pencil: PencilSwooshIcon,
} as const

const appIconClasses = {
  linear: 'bg-[#222326]',
  raycast: 'bg-[#151515]',
} as const

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <header className="max-w-2xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-8 text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      )}
    </header>
  )
}

export default function BlogHomePage() {
  const { home } = siteContent

  return (
    <>
      <Container className="mt-10">
        <Headline />
      </Container>

      <Container className="mt-20 sm:mt-24">
        <div>
          <section className="rounded-3xl border border-zinc-900/10 bg-white/70 p-6 shadow-sm shadow-zinc-800/5 dark:border-white/10 dark:bg-zinc-900/50 sm:p-8">
            <SectionHeading
              eyebrow={home.capabilities.eyebrow}
              title={home.capabilities.title}
              description={home.capabilities.description}
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {home.capabilities.items.map(({ title, description, icon }) => {
                const Icon = capabilityIcons[icon]

                return (
                  <div
                    key={title}
                    className="rounded-2xl border border-zinc-900/10 bg-zinc-50/70 p-5 dark:border-white/10 dark:bg-zinc-800/35"
                  >
                    <Icon className="h-5 w-5 text-emerald-700 dark:text-emerald-300" />
                    <h3 className="mt-4 text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                      {description}
                    </p>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </Container>

      <Container className="mt-20 sm:mt-24">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow={home.featuredProjects.eyebrow}
              title={home.featuredProjects.title}
              description={home.featuredProjects.description}
            />
            <Button href="/projects" variant="secondary" className="w-fit">
              {home.featuredProjects.viewAllLabel}
            </Button>
          </div>
          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project) => (
              <article
                key={project.name}
                className="group rounded-3xl border border-zinc-900/10 bg-white/70 p-6 transition hover:-translate-y-0.5 hover:border-emerald-600/30 dark:border-white/10 dark:bg-zinc-900/50 dark:hover:border-emerald-300/30 sm:p-7"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-500">
                  <span>{project.role}</span>
                  <span>·</span>
                  <span>{project.year}</span>
                  <span>·</span>
                  <span>{project.status}</span>
                </div>
                <h3 className="mt-4 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {project.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800 ring-1 ring-emerald-700/10 dark:bg-emerald-400/10 dark:text-emerald-200 dark:ring-emerald-300/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 text-emerald-700 transition hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200"
                    >
                      {home.featuredProjects.githubLabel}
                      <ExternalLinkIcon className="h-4 w-4" />
                    </a>
                  ) : null}
                  {project.demoUrl?.startsWith('http') ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 text-zinc-700 transition hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
                    >
                      {home.featuredProjects.visitLabel}
                      <ExternalLinkIcon className="h-4 w-4" />
                    </a>
                  ) : project.demoUrl ? (
                    <Link
                      href={project.demoUrl}
                      className="inline-flex items-center gap-1.5 text-zinc-700 transition hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
                    >
                      {home.featuredProjects.visitLabel}
                      <ExternalLinkIcon className="h-4 w-4" />
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>

      <Container className="mt-20 sm:mt-24">
        <section className="overflow-hidden rounded-3xl bg-zinc-950 text-zinc-100 ring-1 ring-zinc-900/10 dark:ring-white/10">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                {home.running.eyebrow}
              </p>
              <h2 className="mt-3 max-w-xl text-2xl font-bold tracking-tight sm:text-3xl">
                {home.running.title}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                {home.running.description}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2">
                <a
                  href={keepSportRecordUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-emerald-300 transition-colors hover:text-emerald-200 focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  {home.running.keepLabel}
                  <ExternalLinkIcon className="h-4 w-4" />
                </a>
                <Link
                  href="/about#running"
                  className="inline-flex min-h-10 items-center text-sm font-semibold text-zinc-300 transition-colors hover:text-white focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
                >
                  {home.running.aboutLabel}
                </Link>
              </div>
            </div>

            <div className="border-t border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                {home.running.timelineEyebrow}
              </p>
              <ol className="relative mt-7 space-y-7 before:absolute before:bottom-3 before:left-[5px] before:top-3 before:w-px before:bg-white/10">
                {home.running.steps.map(([title, description], index) => (
                  <li key={title} className="relative flex gap-5">
                    <span
                      className={`relative z-10 mt-1.5 h-[11px] w-[11px] flex-none rounded-full ring-4 ring-zinc-950 ${
                        index === 2 ? 'bg-emerald-300' : 'bg-zinc-600'
                      }`}
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-100">
                        {title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-zinc-500">
                        {description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </Container>

      <Container className="mt-20 sm:mt-24">
        <section className="border-y border-zinc-900/10 py-12 dark:border-white/10 sm:py-14">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:gap-14">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                {home.soundtrack.eyebrow}
              </p>
              <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <h2 className="max-w-xl text-balance text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
                    {home.soundtrack.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-pretty text-base leading-8 text-zinc-600 dark:text-zinc-400">
                    {home.soundtrack.description}
                  </p>
                </div>
                <a
                  href={spotifyPlaylistUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-10 flex-none items-center gap-2 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-800 focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:text-emerald-300 dark:hover:text-emerald-200"
                >
                  {home.soundtrack.openLabel}
                  <ExternalLinkIcon className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-7 overflow-hidden rounded-2xl bg-zinc-950 shadow-[0_14px_36px_rgba(9,9,11,0.18)] ring-1 ring-zinc-950/10 dark:ring-white/10">
                <iframe
                  title={home.soundtrack.iframeTitle}
                  src={spotifyPlaylistEmbedUrl}
                  width="100%"
                  height="352"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="block w-full"
                />
              </div>
            </div>

            <aside>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                {home.tools.eyebrow}
              </p>
              <h2 className="mt-3 text-balance text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                {home.tools.title}
              </h2>
              <p className="mt-4 text-pretty text-base leading-8 text-zinc-600 dark:text-zinc-400">
                {home.tools.description}
              </p>

              <ul className="mt-7 divide-y divide-zinc-900/10 dark:divide-white/10">
                {favoriteApps.map((app) => (
                  <li
                    key={app.name}
                    className="group flex gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <span
                      className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl p-2 shadow-sm ring-1 ring-white/10 transition-transform duration-200 ease-out motion-reduce:transition-none [@media(hover:hover)]:group-hover:-translate-y-0.5 ${appIconClasses[app.iconStyle]}`}
                      aria-hidden="true"
                    >
                      <Image
                        src={app.icon}
                        alt=""
                        width={24}
                        height={24}
                        unoptimized
                        className="h-6 w-6"
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                          {app.name}
                        </h3>
                        <span className="text-xs text-zinc-500 dark:text-zinc-500">
                          {app.category}
                        </span>
                      </div>
                      <p className="mt-1 text-pretty text-base leading-7 text-zinc-600 dark:text-zinc-400">
                        {app.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>
      </Container>

      <Container className="mt-20 sm:mt-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section>
            <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <PencilSwooshIcon className="h-5 w-5 flex-none" />
              <span className="ml-2">{home.recentArticlesTitle}</span>
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <BlogPosts limit={4} />
            </div>
          </section>
          <aside className="h-fit rounded-3xl border border-zinc-900/10 bg-white/70 p-6 dark:border-white/10 dark:bg-zinc-900/50 lg:sticky lg:top-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
              {home.beyondCode.eyebrow}
            </p>
            <h2 className="mt-3 text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {home.beyondCode.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {home.beyondCode.description}
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm font-semibold">
              <Link
                href="/media"
                className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200"
              >
                {home.beyondCode.mediaLabel}
                <ExternalLinkIcon className="h-4 w-4" />
              </Link>
              <a
                href={siteContent.links.photosUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
              >
                {home.beyondCode.photosLabel}
                <ExternalLinkIcon className="h-4 w-4" />
              </a>
            </div>
          </aside>
        </div>
      </Container>
    </>
  )
}

export const revalidate = 60
