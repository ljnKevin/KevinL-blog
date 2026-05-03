'use client'

import { clsxm } from '@zolplay/utils'
import { motion, useScroll, type Variants } from 'framer-motion'
import React from 'react'

interface HeadingNode {
  _type: 'span'
  text: string
  _key: string
}

interface Node {
  _type: 'block'
  style: 'h1' | 'h2' | 'h3' | 'h4'
  _key: string
  children?: HeadingNode[]
}

type OutlineItem = { style: string; text: string; id: string }

const parseOutline = (nodes: Node[]): OutlineItem[] => {
  if (!nodes || nodes.length === 0) {
    return []
  }

  return nodes
    .filter((node) => node._type === 'block' && node.style.startsWith('h'))
    .map((node) => {
      return {
        style: node.style,
        text: node.children?.[0]?.text ?? '',
        id: node._key,
      }
    })
}

const listVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.08,
      delay: 0.255,
      type: 'spring',
      stiffness: 150,
      damping: 20,
    },
  },
} satisfies Variants
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 5,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
  },
} satisfies Variants

export function BlogPostTableOfContents({ headings }: { headings: Node[] }) {
  const outline = React.useMemo(() => parseOutline(headings), [headings])
  const { scrollY } = useScroll()
  const [highlightedHeadingId, setHighlightedHeadingId] = React.useState<
    string | null
  >(null)

  React.useEffect(() => {
    const handleScroll = () => {
      const articleElement = document.querySelector<HTMLElement>(
        'article[data-postid]'
      )
      const outlineYs = outline.map((node) => {
        const el = document.querySelector<HTMLAnchorElement>(
          `article ${node.style}:where([id="${node.id}"]) > a`
        )
        if (!el) return 0

        return el.getBoundingClientRect().top
      })

      if (articleElement) {
        if (scrollY.get() > articleElement.scrollHeight) {
          setHighlightedHeadingId(null)
        } else {
          const idx = outlineYs.findIndex((y) => y > 0)
          if (idx === -1) {
            setHighlightedHeadingId(outline[outline.length - 1]?.id ?? null)
          } else {
            setHighlightedHeadingId(outline[idx]?.id ?? null)
          }
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [outline, scrollY])

  if (outline.length === 0) {
    return null
  }

  return (
    <nav aria-label="文章目录" className="pointer-events-auto">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
        Outline
      </p>
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={listVariants}
        className="group flex flex-col gap-1 border-l border-zinc-900/10 pl-3 text-zinc-500 dark:border-white/10"
      >
        {outline.map((node) => (
          <motion.li
            key={node.id}
            variants={itemVariants}
            className={clsxm(
              'text-[12px] font-medium leading-5 transition-colors duration-200',
              node.style === 'h3' && 'pl-2',
              node.style === 'h4' && 'pl-4',
              node.id === highlightedHeadingId
                ? 'text-zinc-900 dark:text-zinc-100'
                : 'hover:text-emerald-700 dark:hover:text-emerald-300 group-hover:[&:not(:hover)]:text-zinc-400 dark:group-hover:[&:not(:hover)]:text-zinc-600'
            )}
            aria-label={
              node.id === highlightedHeadingId ? '当前位置' : undefined
            }
          >
            <a href={`#${node.id}`} className="block w-full py-1">
              {node.text}
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </nav>
  )
}
