import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'
import { t } from '@/i18n'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: t('categories.singular'),
    plural: t('categories.plural'),
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
      label: t('categories.title'),
      required: true,
    },
    slugField({
      position: undefined,
    }),
  ],
}
