/**
 * Generic Payload CMS caching utilities
 * Centralizes the pattern of fetching data and caching with appropriate tags
 */

import type { Config, TypedLocale } from 'src/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Collection = keyof Config['collections']
type Global = keyof Config['globals']

/**
 * Generic factory for creating cached Payload fetchers
 * Handles Next.js unstable_cache pattern with appropriate cache keys and tags
 *
 * @example
 * const getCachedUsers = createCachedPayloadFetcher(
 *   ['users'],
 *   ['users_all'],
 *   async () => {
 *     const payload = await getPayload({ config: configPromise })
 *     return payload.find({ collection: 'users' })
 *   }
 * )
 */
export function createCachedPayloadFetcher<T>(
  cacheKeys: string[],
  cacheTags: string[],
  fetcher: () => Promise<T>,
) {
  return unstable_cache(fetcher, cacheKeys, { tags: cacheTags })
}

/**
 * Cache a document by slug
 * Tag: {collection}_{slug}
 *
 * @example
 * const getCachedPage = getCachedPayloadDocument('pages', 'home')
 * const page = await getCachedPage()
 */
export function getCachedPayloadDocument<T extends Collection>(
  collection: T,
  slug: string,
  depth = 0,
) {
  return createCachedPayloadFetcher(
    [collection, slug],
    [`${collection}_${slug}`],
    async () => {
      const payload = await getPayload({ config: configPromise })
      const result = await payload.find({
        collection,
        depth,
        where: {
          slug: {
            equals: slug,
          },
        },
      })
      return result.docs[0]
    },
  )
}

/**
 * Cache a global document
 * Tag: global_{slug}
 *
 * @example
 * const getCachedHeader = getCachedPayloadGlobal('header')
 * const header = await getCachedHeader()
 */
export function getCachedPayloadGlobal<T extends Global>(
  slug: T,
  depth = 0,
) {
  return createCachedPayloadFetcher(
    [slug],
    [`global_${slug}`],
    async () => {
      const payload = await getPayload({ config: configPromise })
      return payload.findGlobal({
        slug,
        depth,
      })
    },
  )
}

/**
 * Cache a collection query with custom where conditions
 * Use for fetching multiple documents or custom queries
 *
 * @example
 * const getCachedPublishedPosts = getCachedPayloadCollection(
 *   'posts',
 *   'posts_published',
 *   async () => {
 *     const payload = await getPayload({ config: configPromise })
 *     return payload.find({
 *       collection: 'posts',
 *       where: { _status: { equals: 'published' } },
 *       limit: 0,
 *     })
 *   }
 * )
 */
export function getCachedPayloadCollection<T>(
  collectionName: string,
  cacheTag: string,
  fetcher: () => Promise<T>,
) {
  return createCachedPayloadFetcher(
    [collectionName],
    [cacheTag],
    fetcher,
  )
}

/**
 * Cache all documents from a collection (with pagination disabled)
 * Useful for redirects, navigation, etc.
 *
 * @example
 * const getCachedRedirects = getCachedPayloadCollectionAll('redirects')
 * const { docs } = await getCachedRedirects()
 */
export function getCachedPayloadCollectionAll<T extends Collection>(
  collection: T,
  depth = 1,
) {
  return createCachedPayloadFetcher(
    [collection],
    [collection],
    async () => {
      const payload = await getPayload({ config: configPromise })
      return payload.find({
        collection,
        depth,
        limit: 0,
        pagination: false,
      })
    },
  )
}

/**
 * Cache a single document by ID
 * Tag: {collection}_{id}
 *
 * @example
 * const getCachedUser = getCachedPayloadById('users', userId)
 * const user = await getCachedUser()
 */
export function getCachedPayloadById<T extends Collection>(
  collection: T,
  id: string | number,
  depth = 0,
) {
  return createCachedPayloadFetcher(
    [collection, String(id)],
    [`${collection}_${id}`],
    async () => {
      const payload = await getPayload({ config: configPromise })
      return payload.findByID({
        collection,
        id,
        depth,
      })
    },
  )
}

/**
 * Cache a localized document by slug
 * Useful for pages that vary by locale
 * Tag: {collection}_{slug}_{locale}
 *
 * @example
 * const getCachedLocalizedPage = getCachedPayloadLocalizedDocument(
 *   'pages',
 *   'about',
 *   'de'
 * )
 */
export function getCachedPayloadLocalizedDocument<T extends Collection>(
  collection: T,
  slug: string,
  locale: TypedLocale | string,
  depth = 0,
) {
  const localeCode = typeof locale === 'object' ? locale.code : locale
  return createCachedPayloadFetcher(
    [collection, slug, localeCode],
    [`${collection}_${slug}_${localeCode}`],
    async () => {
      const payload = await getPayload({ config: configPromise })
      const result = await payload.find({
        collection,
        depth,
        locale: localeCode,
        where: {
          slug: {
            equals: slug,
          },
        },
      })
      return result.docs[0]
    },
  )
}
