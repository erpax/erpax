import { Field } from 'payload'

import { PL } from '@/i18n/payloadLabels'

export const searchFields: Field[] = [
  {
    name: 'slug',
    type: 'text',
    index: true,
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'meta',
    label: PL.search.meta,
    type: 'group',
    index: true,
    admin: {
      readOnly: true,
    },
    fields: [
      {
        type: 'text',
        name: 'title',
        label: PL.search.title,
      },
      {
        type: 'text',
        name: 'description',
        label: PL.search.description,
      },
      {
        name: 'image',
        label: PL.search.image,
        type: 'upload',
        relationTo: 'media',
      },
    ],
  },
  {
    label: PL.search.categories,
    name: 'categories',
    type: 'array',
    admin: {
      readOnly: true,
    },
    fields: [
      {
        name: 'relationTo',
        type: 'text',
      },
      {
        name: 'categoryID',
        type: 'text',
      },
      {
        name: 'title',
        type: 'text',
      },
    ],
  },
]
