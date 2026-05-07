import { defineField, defineType } from 'sanity'

import { FilterHorizontalIcon } from '../../assets'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: FilterHorizontalIcon,
  fields: [
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      of: [{ type: 'reference', to: { type: 'project' } }],
    }),
    defineField({
      name: 'heroPhotos',
      title: 'Hero Photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'resume',
      title: 'Resume',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'company',
              title: 'Company',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'start',
              title: 'Start',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'end',
              title: 'End',
              type: 'string',
            }),
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
})
