/**
 * RFC 9110 §13 cached document fetcher (single doc by collection + slug).
 *
 * @rfc 9110 §13 caching
 * @rfc 9111 http-caching
 * @see ./cache.ts
 */

import type { Config } from 'src/payload-types'
import { getCachedPayloadDocument } from './cache'

type Collection = keyof Config['collections']

/**
 * Get a cached document by collection and slug.
 * Uses centralized caching from `cache.ts`.
 *
 * @example
 * const page = await getCachedDocument('pages', 'home')()
 */
export const getCachedDocument = (collection: Collection, slug: string) =>
  getCachedPayloadDocument(collection, slug)
