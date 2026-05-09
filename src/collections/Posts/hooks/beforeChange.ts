import { enforceDocumentTenantForUser } from '@/hooks/enforceDocumentTenantForUser'
import { importRemoteMediaPostsHook } from '@/utilities/remoteMediaImport'

/**
 * Posts beforeChange chain — tenant scoping + remote-media import.
 *
 * @security ISO-27001 A.5.23 cloud-service-isolation tenant-scope
 * @rfc 3986 uri remote-media-source
 * @see docs/STANDARDS.md §3
 */
export const postsBeforeChange = [enforceDocumentTenantForUser, importRemoteMediaPostsHook]
