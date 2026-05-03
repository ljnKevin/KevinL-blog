import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './schemas/blockContent'
import category from './schemas/category'
import post from './schemas/post'
import project from './schemas/project'
import settings from './schemas/settings'
import { readingTimeType } from './schemas/types/readingTime'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [readingTimeType, post, category, blockContent, project, settings],
}
