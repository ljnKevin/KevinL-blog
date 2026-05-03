import { clsxm } from '@zolplay/utils'

export function Prose({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={clsxm(
        'prose max-w-none dark:prose-invert',
        'prose-p:my-7 prose-p:leading-8',
        'prose-headings:scroll-mt-24 prose-headings:tracking-tight',
        'prose-a:text-emerald-700 prose-a:decoration-emerald-600/25 prose-a:underline-offset-4 hover:prose-a:decoration-emerald-600 dark:prose-a:text-emerald-300 dark:prose-a:decoration-emerald-300/30',
        'prose-blockquote:border-l-emerald-500 prose-blockquote:bg-zinc-100/60 prose-blockquote:py-1 prose-blockquote:pr-4 prose-blockquote:not-italic dark:prose-blockquote:bg-white/5',
        'prose-code:rounded-md prose-code:bg-zinc-200/45 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-zinc-800 dark:prose-code:bg-white/10 dark:prose-code:text-zinc-100',
        'prose-pre:rounded-2xl prose-pre:border prose-pre:border-white/10 prose-pre:bg-zinc-950',
        'prose-img:rounded-2xl prose-img:border prose-img:border-zinc-900/10 dark:prose-img:border-white/10',
        className
      )}
    >
      {children}
    </div>
  )
}
