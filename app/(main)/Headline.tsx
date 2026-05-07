'use client'

import { motion } from 'framer-motion'
import Balancer from 'react-wrap-balancer'

import { ExternalLinkIcon, SparkleIcon } from '~/assets'
import { SocialLink } from '~/components/links/SocialLink'
import { Button } from '~/components/ui/Button'

function ExplorationMark() {
  return (
    <span className="group inline-flex items-center">
      <SparkleIcon className="mr-1 inline-flex transform-gpu transition-transform duration-500 group-hover:rotate-180" />
      <span>持续探索</span>
    </span>
  )
}

export function Headline() {
  return (
    <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="max-w-3xl">
        <motion.p
          className="mb-4 inline-flex items-center rounded-full border border-emerald-700/10 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800 dark:border-emerald-300/10 dark:bg-emerald-400/10 dark:text-emerald-200"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
        >
          AI Application Developer
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
          我是 KevinL，AI 应用开发者、产品型工程师。
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
          <Balancer>
            热爱开发、设计、创新，享受生活，也长期在未知领域中探索。
            我希望把技术实现、产品判断和内容表达结合起来，做真正能被人使用的 AI
            应用。
          </Balancer>
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
          {['AI 应用开发', '产品工程', '前端与全栈', '内容表达'].map((item) => (
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
          <Button href="/projects">查看项目</Button>
          <Button href="/about" variant="secondary">
            了解我
          </Button>
          <a
            href="mailto:ljnkevin1994@gmail.com"
            className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-emerald-700 underline decoration-emerald-600/20 underline-offset-4 transition hover:decoration-emerald-600 dark:text-emerald-300"
          >
            联系我
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
            href="https://github.com/ljnKevin"
            aria-label="我的 GitHub"
            platform="github"
          />
          <SocialLink
            href="mailto:ljnkevin1994@gmail.com"
            aria-label="我的邮箱"
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
          Recruiter Snapshot
        </p>
        <dl className="mt-5 space-y-4">
          {[
            ['方向', 'AI 应用开发 / 产品型工程师'],
            ['关注', '把想法做成可用产品'],
            ['项目', '个人站与摄影影像站'],
            ['联系', 'ljnkevin1994@gmail.com'],
          ].map(([label, value]) => (
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
          <ExplorationMark />
        </div>
      </motion.aside>
    </div>
  )
}
