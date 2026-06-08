/**
 * Builds Next.js `Metadata` (HTML `<meta>` + Open Graph properties) from a
 * Payload document. Image URLs are absolutized against the request origin per
 * RFC 3986 §5.3 reference resolution.
 *
 * @standard W3C-HTML5 §4.2.5 meta-element
 * @standard OGP open-graph-protocol-1.0
 * @rfc 3986 §5.3 reference-resolution
 * @see src/standards/rfc-3986/
 */

import type { Metadata } from 'next'

import type { Media, Page, Post, Product, Config } from '@/types'

import { mergeOpenGraph } from '@/merge/open/graph'
import { getServerSideURL } from '@/rfc/3986'

const getImageURL = (
  image: Media | Config['db']['defaultIDType'] | null | undefined,
  siteOrigin?: string,
) => {
  const serverUrl = siteOrigin ?? getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | Partial<Product> | null
  /** Request-derived or tenant canonical origin — defaults to env / localhost when omitted */
  siteOrigin?: string
}): Promise<Metadata> => {
  const { doc, siteOrigin } = args

  const ogImage = getImageURL(doc?.meta?.image, siteOrigin)

  const title = doc?.meta?.title
    ? doc?.meta?.title + ' | site'
    : doc && 'title' in doc && doc.title
      ? `${doc.title} | site`
      : 'site'

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph(
      {
        description: doc?.meta?.description || '',
        images: ogImage
          ? [
              {
                url: ogImage,
              },
            ]
          : undefined,
        title,
        url:
          doc && typeof doc.slug === 'string'
            ? doc.slug
            : Array.isArray(doc?.slug)
              ? doc.slug.join('/')
              : '/',
      },
      siteOrigin,
    ),
    title,
  }
}
