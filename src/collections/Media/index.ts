import type { CollectionConfig } from 'payload'

import { createMembershipAdminMutateAccess } from '../../access/membershipAdminMutateAccess'
import { tenantScopedCollectionReadAccess } from '../../access/tenantScopedRead'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { localeRecord } from '../../i18n'

import { mediaBeforeChange } from './hooks/beforeChange'

/**
 * Media — uploaded files (images, video, documents) under R2 storage.
 *
 * @rfc 6838 mime-type media-type
 * @standard ISO/IEC-23008 high-efficiency-coding
 * @standard ISO/IEC-10918 jpeg
 * @standard W3C PNG image
 * @standard W3C SVG
 * @compliance GDPR Art.5(1)(c) data-minimization no-pii-in-filenames
 * @compliance GDPR Art.32 security-of-processing
 * @see docs/STANDARDS.md §3
 */
export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: localeRecord('media.singular'),
    plural: localeRecord('media.plural'),
  },
  access: {
    create: createMembershipAdminMutateAccess('media'),
    delete: createMembershipAdminMutateAccess('media'),
    read: tenantScopedCollectionReadAccess,
    update: createMembershipAdminMutateAccess('media'),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: localeRecord('media.alt'),
    },
    {
      name: 'caption',
      type: 'richText',
      label: localeRecord('media.caption'),
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
  hooks: {
    beforeChange: mediaBeforeChange,
  },
}
