import type { CollectionConfig } from 'payload'

import { createMembershipAdminMutateAccess } from '@/access/collections/shared/createMembershipAdminMutateAccess'
import { tenantScopedCollectionReadAccess } from '@/access/collections/shared/tenantScopedCollectionReadAccess'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { localeRecord } from '@/i18n'


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
    // R2 via `r2Storage` in payload.config. No image variants: the Worker cannot run Sharp, so the original file is served.
    focalPoint: false,
    skipSafeFetch: true,
  },
}

// ── Facets of the one `media` object ───────────────────────────────────────
// `Media` (above) is the Payload collection — the matter/node identity.
// The React render facet lives in ./Component (also exports a `Media` FC, so it
// is surfaced here under an alias to avoid clobbering the collection symbol).
// Canonical component import path stays `@/components/media/Component`.
export { Media as MediaComponent } from '@/components/media/Component'

export * from '@/components/media/types'
