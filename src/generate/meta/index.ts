/**
 * Builds Next.js `Metadata` (HTML `<meta>` + Open Graph properties) from a
 * Payload document. Image URLs are absolutized against the request origin per
 * RFC 3986 §5.3 reference resolution.
 *
 * @standard W3C-HTML5 §4.2.5 meta-element
 * @standard OGP open-graph-protocol-1.0
 * @rfc 3986 §5.3 reference-resolution
 * @see src/rfc/3986/index.ts
 */

import type { Metadata } from 'next'

import type { Media, Page, Post, Product, Config } from '@/types'

import { merge } from '@/merge'
import { mergeOpenGraph } from '@/merge/open/graph'
import { getServerSideURL } from '@/rfc/3986'

/**
 * The share image of a document that uploaded none: `/next/share` draws the SEO-plugin title and
 * description over the content-uuid's identity animation — computed, cached immutably, no Media row
 * and no R2 object ([[image]]/share). The uuid is the fold of the slug, so the same page always gets
 * the same picture and two pages never share one.
 */
export const shareImageURL = (
  doc: { readonly slug?: unknown; readonly meta?: { readonly title?: string | null; readonly description?: string | null } | null; readonly title?: unknown },
  siteOrigin: string,
): string => {
  const slug = typeof doc.slug === 'string' ? doc.slug : Array.isArray(doc.slug) ? doc.slug.join('/') : '/'
  const title = doc.meta?.title || (typeof doc.title === 'string' ? doc.title : '') || slug
  const q = new URLSearchParams({ t: title, u: merge('share', slug) })
  if (doc.meta?.description) q.set('d', doc.meta.description)
  return `${siteOrigin}/next/share?${q.toString()}`
}

const getImageURL = (
  image: Media | Config['db']['defaultIDType'] | null | undefined,
  fallback: string,
  siteOrigin?: string,
) => {
  const serverUrl = siteOrigin ?? getServerSideURL()
  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url
    return ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }
  // The editor uploaded nothing: the image is computed from what the page already stores.
  return fallback
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | Partial<Product> | null
  /** Request-derived or tenant canonical origin — defaults to env / localhost when omitted */
  siteOrigin?: string
}): Promise<Metadata> => {
  const { doc, siteOrigin } = args

  const origin = siteOrigin ?? getServerSideURL()
  const ogImage = getImageURL(doc?.meta?.image, shareImageURL(doc ?? {}, origin), siteOrigin)

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

/** @index-cross.foldback child=generate/meta parent=generate — this cross folds back into its parent. */
