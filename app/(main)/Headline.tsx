'use client'

import { motion } from 'framer-motion'
import Balancer from 'react-wrap-balancer'

import { ExternalLinkIcon, SparkleIcon } from '~/assets'
import { SocialLink } from '~/components/links/SocialLink'
import { Button } from '~/components/ui/Button'
import { siteContent } from '~/content/site-content'

function ExplorationMark({ text }: { text: string }) {
  return (
    <span className="group inline-flex items-center">
      <SparkleIcon className="mr-1 inline-flex transform-gpu transition-transform duration-500 group-hover:rotate-180" />
      <span>{text}</span>
    </span>
  )
}

export function Headline() {
  const { hero } = siteContent.home

  return (
    <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="max-w-3xl">
        <motion.p
          className="mb-4 inline-flex items-center rounded-full border border-emerald-700/10 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800 dark:border-emerald-300/10 dark:bg-emerald-400/10 dark:text-emerald-200"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
        >
          {hero.badge}
        </motion.p>
        <motion.h1
          className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 100,
            duration: 0.3,
          }}
        >
          {hero.title}
        </motion.h1>
        <motion.p
          className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 85,
            duration: 0.3,
            delay: 0.1,
          }}
        >
          <Balancer>{hero.description}</Balancer>
        </motion.p>
        <motion.div
          className="mt-6 flex flex-wrap gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 90,
            delay: 0.18,
          }}
        >
          {hero.tags.map((item) => (
            <span
              key={item}
              className="rounded-full border border-zinc-900/10 bg-white/70 px-3 py-1 dark:border-white/10 dark:bg-zinc-900/60"
            >
              {item}
            </span>
          ))}
        </motion.div>
        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            damping: 50,
            stiffness: 90,
            delay: 0.25,
          }}
        >
          <Button href="/projects">{hero.actions.projects}</Button>
          <Button href="/about" variant="secondary">
            {hero.actions.about}
          </Button>
          <a
            href={`mailto:${siteContent.identity.email}`}
            className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-emerald-700 underline decoration-emerald-600/20 underline-offset-4 transition hover:decoration-emerald-600 dark:text-emerald-300"
          >
            {hero.actions.contact}
            <ExternalLinkIcon className="h-4 w-4" />
          </a>
        </motion.div>
        <motion.div
          className="mt-6 flex gap-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            damping: 50,
            stiffness: 90,
            duration: 0.35,
            delay: 0.25,
          }}
        >
          <SocialLink
            href={siteContent.identity.githubProfileUrl}
            aria-label={hero.socialLabels.github}
            platform="github"
          />
          <SocialLink
            href={`mailto:${siteContent.identity.email}`}
            aria-label={hero.socialLabels.email}
            platform="mail"
          />
        </motion.div>
      </div>
      <motion.aside
        className="rounded-2xl border border-zinc-900/10 bg-white/70 p-6 shadow-sm shadow-zinc-800/5 dark:border-white/10 dark:bg-zinc-900/50"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 110, delay: 0.2 }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-500">
          {hero.snapshot.eyebrow}
        </p>
        <dl className="mt-5 space-y-4">
          {hero.snapshot.rows.map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs text-zinc-500 dark:text-zinc-500">
                {label}
              </dt>
              <dd className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 border-t border-zinc-900/10 pt-5 text-sm font-medium text-emerald-700 dark:border-white/10 dark:text-emerald-300">
          <ExplorationMark text={hero.snapshot.footer} />
        </div>
      </motion.aside>
    </div>
  )
}
