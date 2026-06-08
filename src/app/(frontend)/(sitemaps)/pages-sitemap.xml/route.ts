/**
 * GET /pages-sitemap.xml — Sitemaps Protocol XML for the `pages` collection.
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

import { getServerSideURL } from '@/rfc/3986'

/** D1/SQLite cannot tolerate concurrent opens during OpenNext/workerd static generation (SQLITE_BUSY). */
export const dynamic = 'force-dynamic'

const buildPagesSitemap = unstable_cache(
  async (siteUrl: string) => {
    const payload = await getPayload({ config })

    const results = await payload.find({
      collection: 'pages',
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

    const defaultSitemap = [
      {
        loc: `${siteUrl}/search`,
        lastmod: dateFallback,
      },
      {
        loc: `${siteUrl}/posts`,
        lastmod: dateFallback,
      },
    ]

    const sitemap = results.docs
      ? results.docs
          .filter((page) => Boolean(page?.slug))
          .map((page) => {
            return {
              loc: page?.slug === 'home' ? `${siteUrl}/` : `${siteUrl}/${page?.slug}`,
              lastmod: page.updatedAt || dateFallback,
            }
          })
      : []

    return [...defaultSitemap, ...sitemap]
  },
  ['pages-sitemap-data'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET(request: Request) {
  const siteUrl = getServerSideURL({ headers: request.headers })
  const sitemap = await buildPagesSitemap(siteUrl)

  return getServerSideSitemap(sitemap)
}
