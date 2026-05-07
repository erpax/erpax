import { Field } from 'payload'

import { t } from '@/i18n'

export const searchFields: Field[] = [
  {
    name: 'slug',
    type: 'text',
    label: t('search.slug'),
    index: true,
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'meta',
    label: t('search.meta'),
    type: 'group',
    index: true,
    admin: {
      readOnly: true,
    },
    fields: [
      {
        type: 'text',
        name: 'title',
        label: t('search.title'),
      },
      {
        type: 'text',
        name: 'description',
        label: t('search.description'),
      },
      {
        name: 'image',
        label: t('search.image'),
        type: 'upload',
        relationTo: 'media',
      },
    ],
  },
  {
    label: t('search.categories'),
    name: 'categories',
    type: 'array',
    admin: {
      readOnly: true,
    },
    fields: [
      {
        name: 'relationTo',
        type: 'text',
        label: t('search.relationTo'),
      },
      {
        name: 'categoryID',
        type: 'text',
        label: t('search.categoryID'),
      },
      {
        name: 'title',
        type: 'text',
        label: t('search.categoryTitle'),
      },
    ],
  },
]
