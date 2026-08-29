/**
 * 网站固定文案集中在这里。
 * 日常修改时，通常只需要调整引号中的文字或链接，不要删除字段名、逗号和括号。
 * 如果不确定某句话在哪里，可以直接搜索页面上看到的原文。
 * 博客文章仍在 /studio 内容后台中管理。
 */

// 个人信息
const identity = {
  name: 'KevinL',
  email: 'kevinl.seegen@gmail.com',
  githubProfileUrl: 'https://github.com/ljnKevin',
  repositoryUrl: 'https://github.com/ljnKevin/kevinl-blog',
} as const

// 常用外部链接
const links = {
  keepSportRecordUrl:
    'https://m.gotokeep.com/fd-page/shareSportRecord?shareid=6a8ef64a3655f30001401bfa&title_type=group_a',
  spotifyPlaylistUrl:
    'https://open.spotify.com/playlist/3DZej1IHp8WzyVGomsSwtj',
  spotifyPlaylistEmbedUrl:
    'https://open.spotify.com/embed/playlist/3DZej1IHp8WzyVGomsSwtj?utm_source=generator&theme=0',
  photosUrl: 'https://kevinl.me/photos',
  douyinUrl: 'https://v.douyin.com/3fP50R7U204/',
} as const

export const siteContent = {
  identity,
  links,

  // 顶部导航
  navigation: {
    mobileTrigger: '前往',
    mobileTitle: '站内导航',
    mobileCloseLabel: '关闭菜单',
    items: [
      { href: '/', text: '首页' },
      { href: '/about', text: '关于' },
      { href: '/blog', text: '博客' },
      { href: '/projects', text: '项目' },
      { href: '/media', text: '影像' },
      { href: '/guestbook', text: '留言墙' },
    ],
  },

  // 首页
  home: {
    hero: {
      badge: 'AI Application Developer',
      title: '我是 KevinL，AI 应用开发者、产品型工程师。',
      description:
        '热爱开发、设计、创新，享受生活，也长期在未知领域中探索。我希望把技术实现、产品判断和内容表达结合起来，做真正能被人使用的 AI 应用。',
      tags: ['AI 应用开发', '产品工程', '前端与全栈', '内容表达', '长期跑步'],
      actions: {
        projects: '查看项目',
        about: '了解我',
        contact: '联系我',
      },
      socialLabels: {
        github: '我的 GitHub',
        email: '我的邮箱',
      },
      snapshot: {
        eyebrow: 'Recruiter Snapshot',
        rows: [
          ['方向', 'AI 应用开发 / 产品型工程师'],
          ['关注', '把想法做成可用产品'],
          ['生活', '跑步、摄影与持续写作'],
          ['联系', identity.email],
        ],
        footer: '持续探索',
      },
    },
    capabilities: {
      eyebrow: 'Capabilities',
      title: '我关注把想法推进到可用产品。',
      description:
        '围绕 AI 应用、产品判断、工程实现和内容表达，持续把新技术转化为清晰、稳定、可交付的体验。',
      items: [
        {
          icon: 'lightning',
          title: 'AI 应用开发',
          description:
            '关注从想法到可用产品的完整链路，能把 AI 能力包装成明确、稳定、可交付的用户体验。',
        },
        {
          icon: 'sparkle',
          title: '产品工程思维',
          description:
            '不只实现功能，也会拆解目标用户、使用场景、信息架构和迭代优先级。',
        },
        {
          icon: 'layers',
          title: '前端与全栈实现',
          description:
            '熟悉 Next.js、TypeScript、内容系统、数据库、登录、邮件、部署等产品化基础设施。',
        },
        {
          icon: 'pencil',
          title: '内容表达与审美',
          description:
            '长期写作、拍照、做个人项目，重视信息表达、视觉秩序和长期复利。',
        },
      ],
    },
    featuredProjects: {
      eyebrow: 'Featured Projects',
      title: '一些正在持续打磨的项目。',
      description:
        '这里收集我做过的个人网站、影像产品和 AI/自动化方向实践，记录从想法、设计到工程落地的过程。',
      viewAllLabel: '查看全部项目',
      githubLabel: 'GitHub',
      visitLabel: '访问作品',
    },
    running: {
      eyebrow: 'Running',
      title: '跑步让我相信，稳定的节奏比短暂的冲刺更可靠。',
      description:
        '它是运动，也是整理思绪的时间。一次次出发、感受状态、调整节奏，让我更习惯用长期视角面对生活和工作。',
      keepLabel: '查看 Keep 运动数据',
      aboutLabel: '了解跑步对我的影响',
      timelineEyebrow: 'Keep moving',
      steps: [
        ['出发', '先迈出第一步'],
        ['调整', '根据真实反馈找到节奏'],
        ['继续', '把一次行动变成长期习惯'],
      ],
    },
    soundtrack: {
      eyebrow: 'Soundtrack',
      title: '音乐帮我找到进入状态的节奏。',
      description:
        '跑步时让身体继续向前，工作时把外界噪音留在身后。这份歌单是我最近愿意反复播放的声音。',
      openLabel: '在 Spotify 打开',
      iframeTitle: 'KevinL 的 Spotify 歌单',
    },
    tools: {
      eyebrow: 'Daily tools',
      title: '我喜欢的 App，也透露了我如何生活和工作。',
      description:
        '我偏爱目标清楚、反馈直接，能减少摩擦、让思路和行动保持连贯的工具。',
      items: [
        {
          name: 'Linear',
          icon: '/images/apps/linear.svg',
          iconStyle: 'linear',
          category: '项目',
          description: '管理项目、梳理优先级，让复杂协作保持清晰节奏。',
        },
        {
          name: 'Raycast',
          icon: '/images/apps/raycast.svg',
          iconStyle: 'raycast',
          category: '效率',
          description: '用键盘快速完成搜索、启动和日常操作，减少重复切换。',
        },
      ],
    },
    recentArticlesTitle: '近期文章：看长期思考和技术沉淀',
    beyondCode: {
      eyebrow: 'Beyond Code',
      title: '影像记录我如何观察生活。',
      description:
        '照片放在独立照片站，视频先用抖音入口承接。它们和跑步一起，构成工作之外真实、持续的生活。',
      mediaLabel: '查看影像入口',
      photosLabel: '直接访问照片站',
    },
  },

  // 关于页
  about: {
    metadata: {
      title: '关于 KevinL',
      description:
        '了解 KevinL 的产品观、工作方式，以及跑步和长期行动如何影响他做产品。',
    },
    hero: {
      eyebrow: 'About',
      title: '比起给自己贴标签，我更在意长期做出什么。',
      description:
        '我喜欢进入陌生问题，理解它、拆开它，再把想法做成真正有人愿意使用的产品。技术、产品、写作和影像对我不是彼此分开的兴趣，它们共同决定了我如何观察、思考和表达。',
    },
    story: {
      eyebrow: 'What Drives Me',
      title: '好奇心把我带向未知，长期行动让我把想法留下来。',
      description:
        '我不希望这里再重复一份技能清单。更能说明我的，是面对问题时的选择，以及那些愿意长期坚持的事情。',
      chapters: [
        {
          number: '01',
          title: '先理解，再动手',
          description:
            '面对新的领域，我会先弄清真实问题、使用场景和限制条件。技术很重要，但它应该服务于更清楚的判断。',
        },
        {
          number: '02',
          title: '让产品判断进入实现',
          description:
            '我在意的不只是功能能否运行，也包括信息是否清楚、操作是否自然，以及产品能否继续迭代。',
        },
        {
          number: '03',
          title: '用表达沉淀思考',
          description:
            '项目、文章、照片和视频是不同的表达方式。它们帮助我复盘判断，也让我持续观察工作之外的真实生活。',
        },
      ],
    },
    running: {
      eyebrow: 'Running',
      title: '跑步是我和长期主义相处的方式。',
      intro:
        '我喜欢它简单、诚实的反馈。状态有起伏，计划会被打乱，但仍然可以从当下重新找到节奏，继续向前。',
      detail:
        '对我来说，跑步不只是体能训练。它给我一段不被消息打断的时间，也让我反复练习如何开始、如何调整，以及如何把一件事做得足够久。这种习惯也影响着我做产品：尊重真实反馈，不过度透支，为长期迭代留出空间。',
      principles: [
        ['先开始', '不等所有条件完美，先完成今天能够完成的一步。'],
        ['找节奏', '关注当下的真实状态，在目标和反馈之间持续调整。'],
        ['做长期', '不把一次爆发当成答案，更看重能够重复的行动。'],
      ],
      keepLabel: '查看 Keep 运动数据',
    },
    workStyle: {
      eyebrow: 'Work Style',
      title: '我的工作方式',
      description:
        '我更喜欢把复杂问题拆小，再用清晰的产品目标和稳定的工程实现去推进。',
      steps: [
        '先判断要解决的问题是否真实，再决定做多重。',
        '用最小可用版本验证方向，避免一开始堆过多复杂度。',
        '重视信息架构、视觉层级和可维护性，让用户和后来维护的人都少受苦。',
        '把项目、文章和复盘沉淀下来，形成可以持续复用的知识库。',
      ],
    },
    closing: {
      eyebrow: 'In The Long Run',
      title: '希望找到价值观和做事节奏都彼此契合的团队。',
      description:
        '我看重清晰目标、真实反馈和长期迭代，也希望和愿意把产品认真做好的人一起工作。如果你在寻找既能落地、也愿意理解问题的人，欢迎联系我。',
      contactLabel: '和我聊聊',
      projectsLabel: '查看项目',
    },
  },

  // 项目页
  projects: {
    metadata: {
      title: '我的项目',
      description:
        'KevinL 的精选项目，展示 AI 应用开发、产品工程、个人网站、影像产品和业务自动化方向的实践。',
    },
    hero: {
      eyebrow: 'Projects',
      title: '用项目记录我是怎么做产品的。',
      description:
        '我会把项目当成产品来做：先明确它解决什么问题，再考虑内容、交互、技术栈和长期维护。这里会区分公开作品和私有案例，只展示适合公开的信息。',
    },
    labels: {
      github: 'GitHub',
      visit: '访问作品',
      highlights: '项目亮点',
    },
    items: [
      {
        name: 'KevinL Blog',
        description:
          '以个人简历窗口为目标的博客与作品集网站，承载技术文章、项目、留言、Newsletter 与内容后台。',
        role: 'Owner / Full-stack',
        year: '2026',
        status: '持续迭代',
        githubUrl: 'https://github.com/ljnKevin/KevinL-blog',
        demoUrl: '/',
        techStack: [
          'Next.js',
          'TypeScript',
          'Sanity',
          'Tailwind CSS',
          'Drizzle',
        ],
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
        demoUrl: links.photosUrl,
        techStack: ['Next.js', 'Photography', 'EXIF', 'Image Workflow'],
        highlights: [
          '把照片从博客中拆成独立影像站，保持主站聚焦个人简历与技术内容。',
          '用 EXIF 信息补充照片上下文，让作品不只是图片列表，而是可阅读的创作记录。',
          '通过主站影像入口承接招聘方对审美、表达和生活状态的进一步了解。',
        ],
      },
      {
        name: '企业经营报表自动化系统',
        description:
          '为中小企业经营管理场景搭建的报表自动化原型，将销售、退货、回款、应收、客户和商品等数据整理为可演示、可扩展的经营分析页面。',
        role: 'Owner / Data Product',
        year: '2026',
        status: '私有案例',
        techStack: ['PostgreSQL', 'dbt', 'Cube.js', 'FastAPI', 'Next.js'],
        highlights: [
          '梳理从业务系统数据同步、本地数据库、数据模型、指标口径到前端报表页面的完整链路。',
          '围绕销售、退货、回款、应收、客户和商品等经营主题，替代每月手工加工报表的流程。',
          '项目使用脱敏/模拟数据展示，只呈现业务问题、技术架构和交付成果，不公开源码、客户数据或接口细节。',
        ],
      },
    ],
  },

  // 影像页
  media: {
    metadata: {
      title: '影像',
      description: 'KevinL 的影像入口，包含独立照片站和抖音视频内容。',
    },
    hero: {
      eyebrow: 'Media',
      title: '影像是我理解世界的另一种方式。',
      description:
        '主站优先服务招聘方快速了解我，影像内容放在这里作为补充：照片展示观察和审美，短视频展示表达和生活状态。',
    },
    links: [
      {
        icon: 'eye',
        title: '照片站',
        label: 'Photography',
        description:
          '独立照片站，用来展示照片作品和 EXIF 信息。这里更适合看我的审美、观察方式和生活记录。',
        href: links.photosUrl,
        cta: '访问照片站',
      },
      {
        icon: 'sparkle',
        title: '抖音',
        label: 'Short Video',
        description:
          '短视频内容会发布在抖音。第一版先作为外部入口，后续可以挑选代表视频做精选展示。',
        href: links.douyinUrl,
        cta: '打开抖音主页',
      },
    ],
  },

  // 页脚
  footer: {
    openSourcePrefix: '网站已开源：',
    repositoryLabel: 'GitHub',
    totalViewsLabel: '总浏览量',
    viewsCountSuffix: '次浏览',
    lastVisitorLabel: '最近访客来自',
  },
} as const
