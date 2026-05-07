import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { t } from '@/i18n'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: t('media.singular'),
    plural: t('media.plural'),
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: t('media.alt'),
    },
    {
      name: 'caption',
      type: 'richText',
      label: t('media.caption'),
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    // R2 via `r2Storage` in payload.config — no local staticDir (Cloudflare Workers has no sharp)
    adminThumbnail: 'thumbnail',
    focalPoint: false,
    skipSafeFetch: true,
    imageSizes: [
      { name: 'thumbnail', width: 300 },
      { name: 'square', width: 500, height: 500 },
      { name: 'small', width: 600 },
      { name: 'medium', width: 900 },
      { name: 'large', width: 1400 },
      { name: 'xlarge', width: 1920 },
      { name: 'og', width: 1200, height: 630 },
    ],
  },
}
