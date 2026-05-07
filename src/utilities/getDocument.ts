import type { Config } from 'src/payload-types'
import { getCachedPayloadDocument } from './payloadCache'

type Collection = keyof Config['collections']

/**
 * Get a cached document by collection and slug
 * Uses centralized caching from payloadCache utility
 *
 * @example
 * const page = await getCachedDocument('pages', 'home')()
 */
export const getCachedDocument = (collection: Collection, slug: string) =>
  getCachedPayloadDocument(collection, slug)
