import { type Metadata } from 'next'

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

const title = '关于 KevinL'
const description =
  'KevinL 是 AI 应用开发者与产品型工程师，关注把 AI 能力、产品判断和工程实现结合起来。'

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

const strengths = [
  {
    title: '从需求走到产品',
    description:
      '先弄清楚用户、场景和约束，再决定技术方案。关注的是可被使用的结果，而不是只完成一个功能点。',
    icon: SparkleIcon,
  },
  {
    title: '把 AI 能力产品化',
    description:
      '对 AI 应用的兴趣不止停留在模型调用，更关注工作流、交互设计、数据边界和真实使用体验。',
    icon: LightningIcon,
  },
  {
    title: '工程落地与长期维护',
    description:
      '熟悉 Next.js、TypeScript、内容系统、数据库、登录、邮件与部署，能独立把一个产品跑起来并持续迭代。',
    icon: Layers3Icon,
  },
  {
    title: '写作和视觉表达',
    description:
      '习惯用 Obsidian 管理知识和输出文章，也用照片、视频记录生活。表达能力是我理解产品的一部分。',
    icon: PencilSwooshIcon,
  },
] as const

const workflow = [
  '先判断要解决的问题是否真实，再决定做多重。',
  '用最小可用版本验证方向，避免一开始堆过多复杂度。',
  '重视信息架构、视觉层级和可维护性，让用户和后来维护的人都少受苦。',
  '把项目、文章和复盘沉淀下来，形成可以持续复用的知识库。',
] as const

export default function AboutPage() {
  return (
    <Container className="mt-14 sm:mt-20">
      <header className="max-w-3xl border-b border-zinc-900/10 pb-10 dark:border-white/10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
          About
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          我是 KevinL，AI 应用开发者、产品型工程师。
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400">
          热爱开发、设计、创新，享受生活，也长期在未知领域中探索。
          我希望把技术实现、产品判断和内容表达结合起来，做真正能被人使用的 AI
          应用。
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/projects">查看项目</Button>
          <Button href="/blog" variant="secondary">
            阅读文章
          </Button>
          <a
            href="mailto:ljnkevin1994@gmail.com"
            className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-emerald-700 underline decoration-emerald-600/20 underline-offset-4 transition hover:decoration-emerald-600 dark:text-emerald-300"
          >
            联系我
            <ExternalLinkIcon className="h-4 w-4" />
          </a>
        </div>
      </header>

      <section className="mt-12 grid gap-5 sm:grid-cols-2">
        {strengths.map(({ title, description, icon: Icon }) => (
          <article
            key={title}
            className="rounded-2xl border border-zinc-900/10 bg-white/70 p-6 dark:border-white/10 dark:bg-zinc-900/50"
          >
            <Icon className="h-5 w-5 text-emerald-700 dark:text-emerald-300" />
            <h2 className="mt-4 text-base font-bold text-zinc-900 dark:text-zinc-100">
              {title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {description}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
            Work Style
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            我的工作方式
          </h2>
          <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            我更喜欢把复杂问题拆小，再用清晰的产品目标和稳定的工程实现去推进。
          </p>
        </div>
        <ol className="space-y-4">
          {workflow.map((item, index) => (
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

      <section className="mt-16 rounded-3xl border border-zinc-900/10 bg-zinc-950 p-6 text-zinc-100 dark:border-white/10 sm:p-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Public Proof
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight">
            我会优先用公开项目和文章证明能力。
          </h2>
          <p className="mt-4 text-sm leading-7 text-zinc-400">
            目前最值得看的两个项目是这个个人站和独立照片站。它们分别代表我的产品化工程能力和长期表达方式。
          </p>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {featuredProjects.map((project) => (
            <article
              key={project.name}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <h3 className="text-base font-bold text-white">{project.name}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {project.description}
              </p>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-300 hover:text-emerald-200"
              >
                GitHub
                <ExternalLinkIcon className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </section>
    </Container>
  )
}
