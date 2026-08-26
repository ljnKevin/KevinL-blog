import { Box, Button, Flex } from '@sanity/ui'
import React from 'react'
import { type NumberInputProps, set, useFormValue } from 'sanity'

import { estimateReadingMinutes, getBodyText } from '../../lib/readingTime'

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
