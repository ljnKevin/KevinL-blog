import Link from 'next/link'

import { ExternalLinkIcon } from '~/assets'
import { siteContent } from '~/content/site-content'

import { featuredProjects } from './project-data'

function ProjectDemoLink({ href }: { href: string }) {
  const isExternal = href.startsWith('http')

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-700 transition hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
      >
        {siteContent.projects.labels.visit}
        <ExternalLinkIcon className="h-4 w-4" />
      </a>
    )
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-700 transition hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
    >
      {siteContent.projects.labels.visit}
      <ExternalLinkIcon className="h-4 w-4" />
    </Link>
  )
}

export function Projects() {
  return (
    <ul role="list" className="space-y-8">
      {featuredProjects.map((project) => (
        <li
          key={project.name}
          className="rounded-3xl border border-zinc-900/10 bg-white/70 p-6 shadow-sm shadow-zinc-800/5 dark:border-white/10 dark:bg-zinc-900/50 sm:p-8"
        >
          <article className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-500">
                <span>{project.role}</span>
                <span>·</span>
                <span>{project.year}</span>
                <span>·</span>
                <span>{project.status}</span>
              </div>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                {project.name}
              </h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800 ring-1 ring-emerald-700/10 dark:bg-emerald-400/10 dark:text-emerald-200 dark:ring-emerald-300/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-4">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200"
                  >
                    {siteContent.projects.labels.github}
                    <ExternalLinkIcon className="h-4 w-4" />
                  </a>
                ) : null}
                {project.demoUrl && <ProjectDemoLink href={project.demoUrl} />}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-900/10 bg-zinc-50/80 p-5 dark:border-white/10 dark:bg-zinc-800/35">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                {siteContent.projects.labels.highlights}
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </li>
      ))}
    </ul>
  )
}
