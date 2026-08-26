'use client'

import { parseDateTime } from '@zolplay/utils'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'
import Balancer from 'react-wrap-balancer'

import { BlogPostStateLoader } from '~/app/(main)/blog/BlogPostStateLoader'
import { BlogReactions } from '~/app/(main)/blog/BlogReactions'
import {
  CalendarIcon,
  CursorClickIcon,
  HourglassIcon,
  PencilSwooshIcon,
  ScriptIcon,
  UTurnLeftIcon,
} from '~/assets'
import { ClientOnly } from '~/components/ClientOnly'
import { PostBody } from '~/components/PostBody'
import { Prose } from '~/components/Prose'
import { Button } from '~/components/ui/Button'
import { Container } from '~/components/ui/Container'
import { getMarkdownHeadings } from '~/lib/markdown'
import { prettifyNumber } from '~/lib/math'
import { type PostDetail } from '~/sanity/schemas/post'

import { BlogPostCard } from './BlogPostCard'
import { BlogPostTableOfContents } from './BlogPostTableOfContents'

export function BlogPostPage({
  post,
  views,
  reactions,
  relatedViews,
}: {
  post: PostDetail
  views?: number
  reactions?: number[]
  relatedViews: number[]
}) {
  const publishedDate = parseDateTime({
    date: new Date(post.publishedAt),
  })?.format('YYYY/MM/DD')
  const headings =
    typeof post.body === 'string'
      ? getMarkdownHeadings(post.body)
      : post.headings

  return (
    <Container className="mt-12 lg:mt-20">
      <div className="w-full items-start md:flex md:justify-between md:gap-8 xl:relative">
        <aside className="hidden w-[176px] shrink-0 lg:block">
          <div className="sticky top-4 pt-24">
            <BlogPostTableOfContents headings={headings} />
          </div>
        </aside>
        <div className="max-w-3xl md:flex-1 md:shrink-0">
          <Button
            href="/blog"
            variant="secondary"
            aria-label="返回博客页面"
            className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-900/10 bg-white/90 shadow-none ring-0 transition hover:border-emerald-600/30 hover:bg-emerald-50 dark:border-white/10 dark:bg-zinc-900/80 dark:hover:border-emerald-300/30 dark:hover:bg-emerald-400/10 lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0"
          >
            <UTurnLeftIcon className="h-8 w-8 stroke-zinc-500 transition group-hover:stroke-emerald-700 dark:stroke-zinc-500 dark:group-hover:stroke-emerald-300" />
          </Button>
          <article data-postid={post._id}>
            <header className="relative border-b border-zinc-900/10 pb-10 dark:border-white/10">
              <motion.div
                className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-zinc-500 dark:text-zinc-400"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.15,
                  type: 'spring',
                  stiffness: 150,
                  damping: 20,
                }}
              >
                <time
                  dateTime={post.publishedAt}
                  className="inline-flex items-center gap-1.5"
                >
                  <CalendarIcon />
                  <span>{publishedDate}</span>
                </time>
                <span className="inline-flex items-center gap-1.5">
                  <ScriptIcon />
                  <span>{post.categories?.join(', ')}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <HourglassIcon />
                  <span>{post.readingTime.toFixed(0)}分钟阅读</span>
                </span>
              </motion.div>
              <motion.h1
                className="mt-6 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.2,
                }}
              >
                <Balancer>{post.title}</Balancer>
              </motion.h1>
              <motion.p
                className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  type: 'spring',
                  stiffness: 150,
                  damping: 20,
                  delay: 0.23,
                }}
              >
                {post.description}
              </motion.p>
              <motion.div
                className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-zinc-500 dark:text-zinc-500"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.15,
                  type: 'spring',
                  stiffness: 150,
                  damping: 20,
                  delay: 0.255,
                }}
              >
                <span
                  className="inline-flex items-center gap-1.5"
                  title={views?.toString()}
                >
                  <CursorClickIcon />
                  <span>{prettifyNumber(views ?? 0, true)}次点击</span>
                </span>
              </motion.div>

              <motion.div
                className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-zinc-900/10 bg-zinc-100 dark:border-white/10 dark:bg-zinc-800"
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  type: 'spring',
                  stiffness: 120,
                  damping: 20,
                  delay: 0.3,
                }}
              >
                <Image
                  src={post.mainImage.asset.url}
                  alt={post.title}
                  className="select-none object-cover"
                  placeholder="blur"
                  blurDataURL={post.mainImage.asset.lqip}
                  unoptimized
                  fill
                  sizes="(max-width: 1024px) 100vw, 768px"
                />
              </motion.div>
            </header>
            <Prose className="mt-10">
              <PostBody value={post.body} />
            </Prose>
          </article>
        </div>
        <aside className="hidden w-[96px] shrink-0 lg:block">
          <div className="sticky top-4 flex justify-end pt-24">
            <BlogReactions
              _id={post._id}
              mood={post.mood}
              reactions={reactions}
            />
          </div>
        </aside>
      </div>

      {post.related && post.related.length > 0 ? (
        <section className="mb-12 mt-24 border-t border-zinc-900/10 pt-12 dark:border-white/10">
          <h2 className="mb-6 flex items-center justify-center text-lg font-bold text-zinc-900 dark:text-zinc-100">
            <PencilSwooshIcon className="h-5 w-5 flex-none" />
            <span className="ml-2">相关文章</span>
          </h2>

          <div className="mt-6 grid grid-cols-1 justify-center gap-5 md:grid-cols-[repeat(auto-fit,75%)] lg:grid-cols-[repeat(auto-fit,45%)] lg:gap-6">
            {post.related.map((post, idx) => (
              <BlogPostCard
                post={post}
                views={relatedViews[idx] ?? 0}
                key={post._id}
              />
            ))}
          </div>
        </section>
      ) : null}

      <ClientOnly>
        <BlogPostStateLoader post={post} />
      </ClientOnly>
    </Container>
  )
}
