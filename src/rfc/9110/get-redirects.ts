/**
 * RFC 9110 §13 cached redirects-collection fetcher.
 *
 * @rfc 9110 §13 caching
 * @rfc 9110 §15.4 redirection-3xx
 * @see ./cache.ts
 */

import { getCachedPayloadCollectionAll } from './cache'

/**
 * Get all redirects (cached). Uses centralized caching from `cache.ts`.
 *
 * @example
 * const { docs } = await getCachedRedirects()()
 */
export const getCachedRedirects = () =>
  getCachedPayloadCollectionAll('redirects')
