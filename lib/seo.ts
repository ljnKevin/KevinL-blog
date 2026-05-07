import { env } from '~/env.mjs'

export const seo = {
  title: 'KevinL | AI 应用开发者与产品型工程师',
  description:
    'KevinL 的个人网站，展示 AI 应用开发、产品工程、技术文章、个人项目与影像创作。',
  url: new URL(
    process.env.NODE_ENV === 'production'
      ? env.NEXT_PUBLIC_SITE_URL
      : 'http://localhost:3000'
  ),
} as const
