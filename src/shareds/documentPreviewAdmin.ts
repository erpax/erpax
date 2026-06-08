import type { CollectionConfig } from 'payload'

import { generatePreviewPath } from '@/rfc/3986'

type DocumentPreviewCollection = 'pages' | 'posts'

type AdminPreview = Pick<NonNullable<CollectionConfig['admin']>, 'livePreview' | 'preview'>

/**
 * Shared **admin** `livePreview` + `preview` for slug-based document collections.
 *
 * Constructs preview URLs from the slug + locale via `generatePreviewPath`.
 *
 * @rfc 3986 uri preview-url-construction
 * @standard BCP-47 language-tag locale
 * @see docs/STANDARDS.md §4.3
 */
export function documentPreviewAdmin(slug: DocumentPreviewCollection): AdminPreview {
  return {
    livePreview: {
      url: ({ data, locale }) =>
        generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: slug,
          locale,
        }),
    },
    preview: (data, { locale }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: slug,
        locale,
      }),
  }
}
