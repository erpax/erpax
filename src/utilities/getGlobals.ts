import type { Config } from 'src/payload-types'
import { getCachedPayloadGlobal } from './payloadCache'

type Global = keyof Config['globals']

/**
 * Get a cached global document by slug
 * Uses centralized caching from payloadCache utility
 *
 * @example
 * const header = await getCachedGlobal('header')()
 */
export const getCachedGlobal = <T extends Global>(slug: T, depth = 0) =>
  getCachedPayloadGlobal(slug, depth)
