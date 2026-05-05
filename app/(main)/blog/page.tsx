import Balancer from 'react-wrap-balancer'

import { Container } from '~/components/ui/Container'

import { BlogPosts } from './BlogPosts'

const description =
  '写博客文章是我比较喜欢的沉淀分享方式，我希望能够把好用的技术知识传递给更多的人。我比较喜欢围绕着技术为主的话题，但是也会写一些非技术的话题，比如感想、旅游、生活随笔等等。'
export const metadata = {
  title: '我的博客',
  description,
  openGraph: {
    title: '我的博客',
    description,
  },
  twitter: {
    title: '我的博客',
    description,
    card: 'summary_large_image',
  },
}

// TODO: add pagination or infinite scroll
export default function BlogPage() {
  return (
    <Container className="mt-14 sm:mt-20">
      <header className="max-w-3xl border-b border-zinc-900/10 pb-10 dark:border-white/10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
          Blog
        </p>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          欢迎光临我的博客
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400">
          <Balancer>{description}</Balancer>
        </p>
      </header>
      <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 lg:grid-cols-2 lg:gap-6">
        <BlogPosts limit={20} />
      </div>
    </Container>
  )
}

export const revalidate = 60
