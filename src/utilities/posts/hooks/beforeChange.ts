import { importRemoteMediaPostsHook } from '@/utilities/remote/media/import'

/**
 * Posts beforeChange chain — remote-media import. The multi-tenant plugin checks the tenant.
 *
 * @rfc 3986 uri remote-media-source
 * @see docs/STANDARDS.md §3
 */
export const postsBeforeChange = [importRemoteMediaPostsHook]
