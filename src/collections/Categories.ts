import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'
import { localeRecord } from '@/i18n'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: localeRecord('categories.singular'),
    plural: localeRecord('categories.plural'),
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: localeRecord('categories.title'),
      required: true,
    },
    slugField({
      position: undefined,
    }),
  ],
}
