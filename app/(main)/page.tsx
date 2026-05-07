import Link from 'next/link'
import React from 'react'

import { BlogPosts } from '~/app/(main)/blog/BlogPosts'
import { Headline } from '~/app/(main)/Headline'
import { featuredProjects } from '~/app/(main)/projects/project-data'
import {
  BriefcaseIcon,
  ExternalLinkIcon,
  Layers3Icon,
  LightningIcon,
  PencilSwooshIcon,
  SparkleIcon,
} from '~/assets'
import { Button } from '~/components/ui/Button'
import { Container } from '~/components/ui/Container'

const capabilities = [
  {
    title: 'AI 应用开发',
    description:
      '关注从想法到可用产品的完整链路，能把 AI 能力包装成明确、稳定、可交付的用户体验。',
    icon: LightningIcon,
  },
  {
    title: '产品工程思维',
    description:
      '不只实现功能，也会拆解目标用户、使用场景、信息架构和迭代优先级。',
    icon: SparkleIcon,
  },
  {
    title: '前端与全栈实现',
    description:
      '熟悉 Next.js、TypeScript、内容系统、数据库、登录、邮件、部署等产品化基础设施。',
    icon: Layers3Icon,
  },
  {
    title: '内容表达与审美',
    description:
      '长期写作、拍照、做个人项目，重视信息表达、视觉秩序和长期复利。',
    icon: PencilSwooshIcon,
  },
] as const

const workSignals = [
  ['定位', 'AI 应用开发者 / 产品型工程师'],
  ['优势', '把产品判断、工程实现和内容表达连起来'],
  ['偏好', '小步快跑、快速验证、持续打磨'],
  ['联系', 'ljnkevin1994@gmail.com'],
] as const

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
  return (
    <>
      <Container className="mt-10">
        <Headline />
      </Container>

      <Container className="mt-20 sm:mt-24">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section className="rounded-3xl border border-zinc-900/10 bg-white/70 p-6 shadow-sm shadow-zinc-800/5 dark:border-white/10 dark:bg-zinc-900/50 sm:p-8">
            <SectionHeading
              eyebrow="Capabilities"
              title="招聘方可以先看这四件事。"
              description="我更适合需要把新技术落到实际产品里的团队：既能写代码，也会关注需求、路径、表达和最终体验。"
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {capabilities.map(({ title, description, icon: Icon }) => (
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
              ))}
            </div>
          </section>

          <aside className="rounded-3xl border border-zinc-900/10 bg-zinc-950 p-6 text-zinc-100 shadow-sm shadow-zinc-800/10 dark:border-white/10 dark:bg-zinc-950/70">
            <BriefcaseIcon className="h-6 w-6 text-emerald-300" />
            <h2 className="mt-5 text-lg font-bold">快速判断</h2>
            <dl className="mt-5 space-y-4">
              {workSignals.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs text-zinc-500">{label}</dt>
                  <dd className="mt-1 text-sm leading-6 text-zinc-200">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <Button
              href="mailto:ljnkevin1994@gmail.com"
              className="mt-6 w-full bg-emerald-400 text-zinc-950 hover:bg-emerald-300"
            >
              发邮件联系
            </Button>
          </aside>
        </div>
      </Container>

      <Container className="mt-20 sm:mt-24">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Featured Projects"
              title="先看能证明我做事方式的项目。"
              description="第一版先把两个最相关的公开项目放在最前面：主站本身，以及独立照片站。"
            />
            <Button href="/projects" variant="secondary" className="w-fit">
              查看全部项目
            </Button>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
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
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-emerald-700 transition hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200"
                  >
                    GitHub
                    <ExternalLinkIcon className="h-4 w-4" />
                  </a>
                  {project.demoUrl.startsWith('http') ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 text-zinc-700 transition hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
                    >
                      访问作品
                      <ExternalLinkIcon className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link
                      href={project.demoUrl}
                      className="inline-flex items-center gap-1.5 text-zinc-700 transition hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
                    >
                      访问作品
                      <ExternalLinkIcon className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>

      <Container className="mt-20 sm:mt-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section>
            <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <PencilSwooshIcon className="h-5 w-5 flex-none" />
              <span className="ml-2">近期文章：看长期思考和技术沉淀</span>
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <BlogPosts limit={4} />
            </div>
          </section>
          <aside className="h-fit rounded-3xl border border-zinc-900/10 bg-white/70 p-6 dark:border-white/10 dark:bg-zinc-900/50 lg:sticky lg:top-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
              Beyond Code
            </p>
            <h2 className="mt-3 text-lg font-bold text-zinc-900 dark:text-zinc-100">
              生活影像也是个人表达的一部分。
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              照片放在独立照片站，视频先用抖音入口承接。这里不喧宾夺主，只作为招聘方理解我的审美和表达方式的补充。
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm font-semibold">
              <Link
                href="/media"
                className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200"
              >
                查看影像入口
                <ExternalLinkIcon className="h-4 w-4" />
              </Link>
              <a
                href="https://kevinl.me/photos"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
              >
                直接访问照片站
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
