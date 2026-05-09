/**
 * Construct a signed admin live-preview URL from collection + slug + locale.
 *
 * @rfc 3986 uniform-resource-identifier preview-path
 * @standard W3C URL Living Standard
 * @standard BCP-47 language-tag locale
 * @security ISO-27002 §5.15 access-control preview-secret
 */

import type { Locale, PayloadRequest, TypedLocale } from 'payload'

import type { PreviewSearchParams } from '@/app/(frontend)/next/preview/route'
import { getPreviewSecret } from '@/utilities/getPreviewSecret'
import { resolveLocale } from '@/standards/bcp-47/locale-utils'

type CollectionKey = 'posts' | 'pages' | 'products'

type Props = {
  collection: CollectionKey
  slug: string | null | undefined
  /** Admin live preview passes `Locale`; APIs may pass a code string or `TypedLocale`. */
  locale?: TypedLocale | string | Locale | null
  /** When set (e.g. from live preview), used to build localized paths. */
  req?: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug, locale, req }: Props) => {
  if (slug === undefined || slug === null) {
    return null
  }

  const loc = resolveLocale(locale, req)

  const encodedSlug = encodeURIComponent(slug)

  let path: string
  if (collection === 'posts') {
    path = `/${loc}/posts/${encodedSlug}`
  } else if (collection === 'products') {
    path = `/${loc}/products/${encodedSlug}`
  } else {
    path = slug === 'home' ? `/${loc}` : `/${loc}/${encodedSlug}`
  }

  const encodedParams = new URLSearchParams({
    path,
    previewSecret: getPreviewSecret(),
  } satisfies PreviewSearchParams)

  return `/next/preview?${encodedParams.toString()}`
}
