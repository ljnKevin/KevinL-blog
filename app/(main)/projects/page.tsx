import { type Metadata } from 'next'

import { Projects } from '~/app/(main)/projects/Projects'
import { Container } from '~/components/ui/Container'

const title = '我的项目'
const description =
  'KevinL 的精选项目，展示 AI 应用开发、产品工程、个人网站、影像产品和业务自动化方向的实践。'
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

export default function ProjectsPage() {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
          Projects
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          用项目记录我是怎么做产品的。
        </h1>
        <p className="mt-6 text-base leading-8 text-zinc-600 dark:text-zinc-400">
          我会把项目当成产品来做：先明确它解决什么问题，再考虑内容、交互、技术栈和长期维护。
          这里会区分公开作品和私有案例，只展示适合公开的信息。
        </p>
      </header>
      <div className="mt-16 sm:mt-20">
        <Projects />
      </div>
    </Container>
  )
}

export const revalidate = 3600
