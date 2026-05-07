import React from 'react'

import { CursorClickIcon, UsersIcon } from '~/assets'
import { PeekabooLink } from '~/components/links/PeekabooLink'
import { Container } from '~/components/ui/Container'
import { kvKeys } from '~/config/kv'
import { env } from '~/env.mjs'
import { prettifyNumber } from '~/lib/math'
import { withTimeout } from '~/lib/promise'
import { redis } from '~/lib/redis'

const OPTIONAL_REDIS_TIMEOUT = 700

async function TotalPageViews() {
  let views: number
  if (env.VERCEL_ENV === 'production') {
    try {
      const result = await withTimeout(
        redis.incr(kvKeys.totalPageViews),
        OPTIONAL_REDIS_TIMEOUT
      )
      if (typeof result !== 'number') {
        return null
      }
      views = result
    } catch {
      return null
    }
  } else {
    views = 345678
  }

  return (
    <span className="flex items-center justify-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 md:justify-start">
      <UsersIcon className="h-4 w-4" />
      <span title={`${Intl.NumberFormat('en-US').format(views)}次浏览`}>
        总浏览量&nbsp;
        <span className="font-medium">{prettifyNumber(views, true)}</span>
      </span>
    </span>
  )
}

type VisitorGeolocation = {
  country: string
  city?: string
  flag: string
}
async function LastVisitorInfo() {
  let lastVisitor: VisitorGeolocation | undefined = undefined
  if (env.VERCEL_ENV === 'production') {
    try {
      const visitors = await withTimeout(
        redis.mget<(VisitorGeolocation | null)[]>(
          kvKeys.lastVisitor,
          kvKeys.currentVisitor
        ),
        OPTIONAL_REDIS_TIMEOUT
      )

      if (!visitors) {
        throw new Error('Visitor data timed out')
      }

      const [lv, cv] = visitors
      lastVisitor = lv ?? undefined
      if (cv) {
        void withTimeout(
          redis.set(kvKeys.lastVisitor, cv),
          OPTIONAL_REDIS_TIMEOUT
        ).catch(() => undefined)
      }
    } catch {
      lastVisitor = undefined
    }
  }

  if (!lastVisitor) {
    lastVisitor = {
      country: 'US',
      flag: '🇺🇸',
    }
  }

  return (
    <span className="flex items-center justify-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 md:justify-start">
      <CursorClickIcon className="h-4 w-4" />
      <span>
        最近访客来自&nbsp;
        {[lastVisitor.city, lastVisitor.country].filter(Boolean).join(', ')}
      </span>
      <span className="font-medium">{lastVisitor.flag}</span>
    </span>
  )
}

export function Footer() {
  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <p className="text-sm text-zinc-500/80 dark:text-zinc-400/80">
                &copy; {new Date().getFullYear()} KevinL 网站已开源：
                <PeekabooLink href="https://github.com/ljnKevin/kevinl-blog">
                  GitHub
                </PeekabooLink>
              </p>
            </div>
          </Container.Inner>
          <Container.Inner className="mt-6">
            <div className="flex flex-col items-center justify-start gap-2 sm:flex-row">
              <React.Suspense>
                <TotalPageViews />
              </React.Suspense>
              <React.Suspense>
                <LastVisitorInfo />
              </React.Suspense>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  )
}
