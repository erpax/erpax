import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

import { getServerSideURL } from '@/utilities/getURL'

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
