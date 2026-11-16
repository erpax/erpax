import { populatePublishedAt } from '@/hooks/collections/cmspage/populatePublishedAt'
import { importRemoteMediaPagesHook } from '@/utilities/remote/media/import'

/**
 * Pages beforeChange chain — remote-media import, publishedAt. The multi-tenant plugin checks the tenant.
 *
 * @standard ISO-8601-1:2019 date-time published-at
 * @rfc 3986 uri remote-media-source
 * @see docs/STANDARDS.md §3
 */
export const pagesBeforeChange = [
  importRemoteMediaPagesHook,
  populatePublishedAt,
]
