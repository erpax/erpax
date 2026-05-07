import { Field } from 'payload'

import { localeRecord } from '@/i18n'

export const searchFields: Field[] = [
  {
    name: 'slug',
    type: 'text',
    label: localeRecord('search.slug'),
    index: true,
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'meta',
    label: localeRecord('search.meta'),
    type: 'group',
    index: true,
    admin: {
      readOnly: true,
    },
    fields: [
      {
        type: 'text',
        name: 'title',
        label: localeRecord('search.title'),
      },
      {
        type: 'text',
        name: 'description',
        label: localeRecord('search.description'),
      },
      {
        name: 'image',
        label: localeRecord('search.image'),
        type: 'upload',
        relationTo: 'media',
      },
    ],
  },
  {
    label: localeRecord('search.categories'),
    name: 'categories',
    type: 'array',
    admin: {
      readOnly: true,
    },
    fields: [
      {
        name: 'relationTo',
        type: 'text',
        label: localeRecord('search.relationTo'),
      },
      {
        name: 'categoryID',
        type: 'text',
        label: localeRecord('search.categoryID'),
      },
      {
        name: 'title',
        type: 'text',
        label: localeRecord('search.categoryTitle'),
      },
    ],
  },
]
