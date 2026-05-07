import { type Metadata } from 'next'

import {
  ExternalLinkIcon,
  EyeOpenIcon,
  PencilSwooshIcon,
  SparkleIcon,
} from '~/assets'
import { Container } from '~/components/ui/Container'

const title = '影像'
const description = 'KevinL 的影像入口，包含独立照片站和抖音视频内容。'

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

const mediaLinks = [
  {
    title: '照片站',
    label: 'Photography',
    description:
      '独立照片站，用来展示照片作品和 EXIF 信息。这里更适合看我的审美、观察方式和生活记录。',
    href: 'https://kevinl.me/photos',
    cta: '访问照片站',
    icon: EyeOpenIcon,
  },
  {
    title: '抖音',
    label: 'Short Video',
    description:
      '短视频内容会发布在抖音。第一版先作为外部入口，后续可以挑选代表视频做精选展示。',
    href: 'https://v.douyin.com/3fP50R7U204/',
    cta: '打开抖音主页',
    icon: SparkleIcon,
  },
] as const

export default function MediaPage() {
  return (
    <Container className="mt-14 sm:mt-20">
      <header className="max-w-3xl border-b border-zinc-900/10 pb-10 dark:border-white/10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
          Media
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          影像是我理解世界的另一种方式。
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400">
          主站优先服务招聘方快速了解我，影像内容放在这里作为补充：照片展示观察和审美，短视频展示表达和生活状态。
        </p>
      </header>

      <section className="mt-12 grid gap-5 lg:grid-cols-2">
        {mediaLinks.map(
          ({ title, label, description, href, cta, icon: Icon }) => (
            <article
              key={title}
              className="group relative overflow-hidden rounded-3xl border border-zinc-900/10 bg-white/70 p-6 transition hover:-translate-y-0.5 hover:border-emerald-600/30 dark:border-white/10 dark:bg-zinc-900/50 dark:hover:border-emerald-300/30 sm:p-8"
            >
              <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl transition group-hover:bg-emerald-500/20" />
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800 ring-1 ring-emerald-700/10 dark:bg-emerald-400/10 dark:text-emerald-200 dark:ring-emerald-300/10">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-500">
                  {label}
                </p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                  {description}
                </p>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200"
                >
                  {cta}
                  <ExternalLinkIcon className="h-4 w-4" />
                </a>
              </div>
            </article>
          )
        )}
      </section>

      <section className="mt-12 rounded-3xl border border-zinc-900/10 bg-zinc-950 p-6 text-zinc-100 dark:border-white/10 sm:p-8">
        <PencilSwooshIcon className="h-6 w-6 text-emerald-300" />
        <h2 className="mt-5 text-2xl font-bold tracking-tight">
          后续会把这里变成精选影像页。
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
          第一版先做稳定入口。等内容积累后，可以在这里手动挑 3-6
          个代表视频和照片专题，让招聘方不用跳平台也能快速理解我的表达能力。
        </p>
      </section>
    </Container>
  )
}

export const revalidate = 3600
