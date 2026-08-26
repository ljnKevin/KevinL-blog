type SanityBlock = {
  _type: string
  children?: SanityBlock[]
  text?: string
}

function flattenBlocks(blocks: SanityBlock[]): string[] {
  return blocks.flatMap((block) => {
    if (block.text) {
      return [block.text]
    }

    if (block.children) {
      return flattenBlocks(block.children)
    }

    return []
  })
}

export function getBodyText(body: unknown): string {
  if (typeof body === 'string') {
    return body
  }

  if (Array.isArray(body)) {
    return flattenBlocks(body as SanityBlock[]).join('\n')
  }

  return ''
}

export function estimateReadingMinutes(text: string): number {
  const trimmed = text.trim()

  if (!trimmed) {
    return 0
  }

  const cjkCharacters = trimmed.match(/[\u4e00-\u9fff]/g)?.length ?? 0
  const latinWords =
    trimmed.replace(/[\u4e00-\u9fff]/g, ' ').match(/[A-Za-z0-9]+/g)?.length ?? 0
  const minutes = cjkCharacters / 500 + latinWords / 200

  return Math.max(1, Math.ceil(minutes))
}
