import type { TypedLocale } from 'payload'

import type { PreviewSearchParams } from '@/app/(frontend)/next/preview/route'
import { getPreviewSecret } from '@/utilities/getPreviewSecret'

type CollectionKey = 'posts' | 'pages'

type Props = {
  collection: CollectionKey
  slug: string | null | undefined
  locale?: TypedLocale | string | null
}

export const generatePreviewPath = ({ collection, slug, locale }: Props) => {
  if (slug === undefined || slug === null) {
    return null
  }

  const loc =
    typeof locale === 'object' && locale !== null && 'code' in locale
      ? locale.code
      : (locale ?? 'en')

  const encodedSlug = encodeURIComponent(slug)

  let path: string
  if (collection === 'posts') {
    path = `/${loc}/posts/${encodedSlug}`
  } else {
    path = slug === 'home' ? `/${loc}` : `/${loc}/${encodedSlug}`
  }

  const encodedParams = new URLSearchParams({
    path,
    previewSecret: getPreviewSecret(),
  } satisfies PreviewSearchParams)

  return `/next/preview?${encodedParams.toString()}`
}
