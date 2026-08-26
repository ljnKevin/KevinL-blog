'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import remarkGfm from 'remark-gfm'

import { PeekabooLink } from '~/components/links/PeekabooLink'
import { PostPortableText } from '~/components/PostPortableText'
import { createHeadingId } from '~/lib/markdown'

function getNodeText(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join('')
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return getNodeText(node.props.children)
  }

  return ''
}

type MarkdownCodeProps = React.ComponentPropsWithoutRef<'code'> & {
  inline?: boolean
}

export function PostBody({ value }: { value: unknown }) {
  if (Array.isArray(value)) {
    return <PostPortableText value={value} />
  }

  if (typeof value !== 'string') {
    return null
  }

  const headingIds = new Map<string, number>()
  const createHeading = (Tag: 'h1' | 'h2' | 'h3' | 'h4') => {
    function Heading({ children }: { children: React.ReactNode }) {
      const id = createHeadingId(getNodeText(children), headingIds)

      return <Tag id={id}>{children}</Tag>
    }

    return Heading
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ children, href }) => {
          const rel = !href?.startsWith('/') ? 'noreferrer noopener' : undefined

          return (
            <PeekabooLink href={href ?? ''} rel={rel}>
              {children}
            </PeekabooLink>
          )
        },
        code: ({
          inline,
          className,
          children,
          ...props
        }: MarkdownCodeProps) => {
          const match = /language-(\w+)/.exec(className ?? '')

          if (!inline && match) {
            return (
              <SyntaxHighlighter
                language={match[1] ?? ''}
                showLineNumbers
                useInlineStyles={false}
                codeTagProps={{
                  style: {},
                  className,
                }}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            )
          }

          return (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
        h1: createHeading('h1'),
        h2: createHeading('h2'),
        h3: createHeading('h3'),
        h4: createHeading('h4'),
        img: ({ alt, src }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img alt={alt ?? ''} src={src ?? ''} loading="lazy" />
        ),
      }}
    >
      {value}
    </ReactMarkdown>
  )
}
