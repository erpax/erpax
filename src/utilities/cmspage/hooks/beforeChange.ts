import { enforceDocumentTenantForUser } from '@/hooks/collections/shared/enforceDocumentTenantForUser'
import { populatePublishedAt } from '@/hooks/collections/cmspage/populatePublishedAt'
import { importRemoteMediaPagesHook } from '@/utilities/remote/media/import'

/**
 * Pages beforeChange chain — tenant scoping, remote-media import, publishedAt.
 *
 * @standard ISO-8601-1:2019 date-time published-at
 * @security ISO-27001 A.5.23 cloud-service-isolation tenant-scope
 * @rfc 3986 uri remote-media-source
 * @see docs/STANDARDS.md §3
 */
export const pagesBeforeChange = [
  enforceDocumentTenantForUser,
  importRemoteMediaPagesHook,
  populatePublishedAt,
]
