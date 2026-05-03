import { parseDateTime } from '@zolplay/utils'
import Image from 'next/image'
import Link from 'next/link'

import {
  CalendarIcon,
  CursorClickIcon,
  HourglassIcon,
  ScriptIcon,
} from '~/assets'
import { prettifyNumber } from '~/lib/math'
import { type Post } from '~/sanity/schemas/post'

export function BlogPostCard({ post, views }: { post: Post; views: number }) {
  const { title, slug, mainImage, publishedAt, categories, readingTime } = post
  const publishedDate = parseDateTime({ date: new Date(publishedAt) })?.format(
    'YYYY/MM/DD'
  )

  return (
    <Link
      href={`/blog/${slug}`}
      prefetch={false}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-zinc-900/10 bg-white/70 p-3 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-600/30 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 dark:border-white/10 dark:bg-zinc-900/45 dark:hover:border-emerald-300/30 dark:hover:bg-zinc-900"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-zinc-900/10 bg-zinc-100 dark:border-white/10 dark:bg-zinc-800">
        <Image
          src={mainImage.asset.url}
          alt={title}
          className="object-cover transition duration-300 group-hover:scale-[1.025]"
          placeholder="blur"
          blurDataURL={mainImage.asset.lqip}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
        />
      </div>
      <article className="flex flex-1 flex-col px-1 pb-1 pt-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {categories?.slice(0, 2).map((category) => (
            <span
              key={category}
              className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800 ring-1 ring-emerald-700/10 dark:bg-emerald-400/10 dark:text-emerald-200 dark:ring-emerald-300/10"
            >
              {category}
            </span>
          ))}
        </div>

        <h2 className="line-clamp-2 text-lg font-bold leading-7 tracking-tight text-zinc-900 transition-colors group-hover:text-emerald-800 dark:text-zinc-50 dark:group-hover:text-emerald-200 md:text-xl">
          {title}
        </h2>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {post.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-zinc-500 dark:text-zinc-500">
          <span className="inline-flex items-center gap-1.5">
            <CalendarIcon />
            <span>{publishedDate}</span>
          </span>
          {Array.isArray(categories) && categories.length > 0 && (
            <span className="inline-flex min-w-0 items-center gap-1.5">
              <ScriptIcon />
              <span className="truncate">{categories.join(', ')}</span>
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-zinc-900/10 pt-4 text-xs font-semibold text-zinc-500 dark:border-white/10 dark:text-zinc-500">
          <span className="inline-flex items-center gap-1.5">
            <CursorClickIcon />
            <span>{prettifyNumber(views, true)}次点击</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <HourglassIcon />
            <span>{readingTime.toFixed(0)}分钟阅读</span>
          </span>
        </div>
      </article>
    </Link>
  )
}
