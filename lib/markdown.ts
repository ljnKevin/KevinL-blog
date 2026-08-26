export type MarkdownHeading = {
  style: 'h1' | 'h2' | 'h3' | 'h4'
  text: string
  id: string
}

function stripMarkdown(text: string): string {
  return text
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/[`*_~#]/g, '')
    .trim()
}

export function createHeadingId(
  text: string,
  usedIds: Map<string, number>
): string {
  const base =
    stripMarkdown(text)
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .trim()
      .replace(/[\s_-]+/g, '-') || 'heading'
  const count = usedIds.get(base) ?? 0

  usedIds.set(base, count + 1)

  return count === 0 ? base : `${base}-${count + 1}`
}

export function getMarkdownHeadings(markdown: string): MarkdownHeading[] {
  const headings: MarkdownHeading[] = []
  const usedIds = new Map<string, number>()
  let isInCodeFence = false

  for (const line of markdown.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) {
      isInCodeFence = !isInCodeFence
      continue
    }

    if (isInCodeFence) {
      continue
    }

    const match = /^(#{1,4})\s+(.+?)\s*#*\s*$/.exec(line)
    if (!match) {
      continue
    }

    const text = stripMarkdown(match[2] ?? '')
    if (!text) {
      continue
    }

    headings.push({
      style: `h${match[1]?.length ?? 1}` as MarkdownHeading['style'],
      text,
      id: createHeadingId(text, usedIds),
    })
  }

  return headings
}
