import { enforceDocumentTenantForUser } from '@/enforce/document/tenant/for/user'
import { importRemoteMediaPostsHook } from '@/remote/media/import'

/**
 * Posts beforeChange chain — tenant scoping + remote-media import.
 *
 * @security ISO-27001 A.5.23 cloud-service-isolation tenant-scope
 * @rfc 3986 uri remote-media-source
 * @see docs/STANDARDS.md §3
 */
export const postsBeforeChange = [enforceDocumentTenantForUser, importRemoteMediaPostsHook]
