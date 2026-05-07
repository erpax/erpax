import type { Locale, PayloadRequest, TypedLocale } from 'payload'

import type { PreviewSearchParams } from '@/app/(frontend)/next/preview/route'
import { getPreviewSecret } from '@/utilities/getPreviewSecret'
import { resolveLocale } from '@/utilities/localeUtils'

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
