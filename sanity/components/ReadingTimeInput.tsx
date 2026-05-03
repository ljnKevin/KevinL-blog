import { Box, Button, Flex } from '@sanity/ui'
import React from 'react'
import { type NumberInputProps, set, useFormValue } from 'sanity'

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

function getBodyText(body: unknown): string {
  if (typeof body === 'string') {
    return body
  }

  if (Array.isArray(body)) {
    return flattenBlocks(body as SanityBlock[]).join('\n')
  }

  return ''
}

function estimateReadingMinutes(text: string): number {
  const trimmed = text.trim()

  if (!trimmed) {
    return 0
  }

  const cjkCharacters = trimmed.match(/[\u4e00-\u9fff]/g)?.length ?? 0
  const latinWords =
    trimmed.replace(/[\u4e00-\u9fff]/g, ' ').match(/[A-Za-z0-9]+/g)?.length ??
    0
  const minutes = cjkCharacters / 500 + latinWords / 200

  return Math.max(1, Math.ceil(minutes))
}

export default function ReadingTimeInput(props: NumberInputProps) {
  const body = useFormValue(['body'])

  const generate = React.useCallback(() => {
    props.onChange(set(estimateReadingMinutes(getBodyText(body))))
  }, [body, props])

  return (
    <Flex gap={3} align="center">
      <Box flex={1}>{props.renderDefault(props)}</Box>
      <Button mode="ghost" onClick={generate}>
        Generate
      </Button>
    </Flex>
  )
}
