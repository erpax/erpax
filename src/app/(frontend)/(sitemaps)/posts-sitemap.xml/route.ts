/**
 * GET /posts-sitemap.xml — Sitemaps Protocol XML for the `posts` collection.
 *
 * @standard sitemaps.org 0.9 sitemap-protocol
 * @standard W3C XML 1.0
 * @rfc 9110 http-semantics
 * @rfc 9110 §13 caching
 * @rfc 3986 uniform-resource-identifier
 * @standard ISO-8601-1:2019 date-time lastmod
 * @see src/app/README.md
 */

import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

import { getServerSideURL } from '@/standards/rfc-3986/get-url'

/** D1/SQLite cannot tolerate concurrent opens during OpenNext/workerd static generation (SQLITE_BUSY). */
export const dynamic = 'force-dynamic'

const buildPostsSitemap = unstable_cache(
  async (siteUrl: string) => {
    const payload = await getPayload({ config })

    const results = await payload.find({
      collection: 'posts',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const sitemap = results.docs
      ? results.docs
          .filter((post) => Boolean(post?.slug))
          .map((post) => ({
            loc: `${siteUrl}/posts/${post?.slug}`,
            lastmod: post.updatedAt || dateFallback,
          }))
      : []

    return sitemap
  },
  ['posts-sitemap-data'],
  {
    tags: ['posts-sitemap'],
  },
)

export async function GET(request: Request) {
  const siteUrl = getServerSideURL({ headers: request.headers })
  const sitemap = await buildPostsSitemap(siteUrl)

  return getServerSideSitemap(sitemap)
}
