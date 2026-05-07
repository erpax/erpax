import { getCachedPayloadCollectionAll } from './payloadCache'

/**
 * Get all redirects (cached)
 * Uses centralized caching from payloadCache utility
 *
 * @example
 * const { docs } = await getCachedRedirects()()
 */
export const getCachedRedirects = () =>
  getCachedPayloadCollectionAll('redirects')
