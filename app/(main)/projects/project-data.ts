export const featuredProjects = [
  {
    name: 'KevinL Blog',
    description:
      '以个人简历窗口为目标的博客与作品集网站，承载技术文章、项目、留言、Newsletter 与内容后台。',
    role: 'Owner / Full-stack',
    year: '2026',
    status: '持续迭代',
    githubUrl: 'https://github.com/ljnKevin/KevinL-blog',
    demoUrl: '/',
    techStack: ['Next.js', 'TypeScript', 'Sanity', 'Tailwind CSS', 'Drizzle'],
    highlights: [
      '用 App Router 组织博客、项目、留言和后台管理等完整个人站能力。',
      '整合 Sanity、Neon、Upstash、Clerk、Resend，覆盖内容、交互和订阅链路。',
      '围绕招聘方浏览路径重新设计首页，让项目、能力和联系方式更靠前。',
    ],
  },
  {
    name: 'Exif Photo Blog',
    description:
      '独立照片站，用来展示摄影作品和照片背后的 EXIF 信息，让生活影像成为个人品牌的一部分。',
    role: 'Owner / Product Engineer',
    year: '2026',
    status: '线上运行',
    githubUrl: 'https://github.com/ljnKevin/exif-photo-blog',
    demoUrl: 'https://kevinl.me/photos',
    techStack: ['Next.js', 'Photography', 'EXIF', 'Image Workflow'],
    highlights: [
      '把照片从博客中拆成独立影像站，保持主站聚焦个人简历与技术内容。',
      '用 EXIF 信息补充照片上下文，让作品不只是图片列表，而是可阅读的创作记录。',
      '通过主站影像入口承接招聘方对审美、表达和生活状态的进一步了解。',
    ],
  },
] as const
