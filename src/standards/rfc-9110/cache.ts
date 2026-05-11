/**
 * Generic Payload CMS caching utilities — wraps `next/cache` `unstable_cache`
 * with tag-keyed invalidation for collection / global fetches.
 *
 * @rfc 9110 §13 caching
 * @rfc 9111 http-caching
 * @rfc 7234 http-1.1-caching obsolete-but-cited
 * @standard W3C HTTP-Cache stale-while-revalidate
 * @standard BCP-47 language-tag locale-keyed-cache
 * @see docs/STANDARDS.md §4.3
 */

import type { Config } from '@/payload-types'
import type { SupportedLocale } from '@/i18n/localization'
import { defaultLocale } from '@/i18n/localization'
import type { TypedLocale } from 'payload'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Collection = keyof Config['collections']
type Global = keyof Config['globals']

/**
 * Generic factory for creating cached Payload fetchers.
 * Handles Next.js `unstable_cache` pattern with appropriate cache keys + tags.
 *
 * Under Vitest (`process.env.VITEST`) the cache layer is bypassed and the
 * raw fetcher is returned. `unstable_cache` requires Next.js's incremental
 * cache provider, which only exists inside a Next.js request context — calling
 * it from a unit/integration test throws `Invariant: incrementalCache missing`.
 * The same `process.env.VITEST` short-circuit is used in
 * `src/collections/Posts/hooks/revalidatePost.ts` and Pages' equivalent.
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
  if (process.env.VITEST) {
    return fetcher
  }
  return unstable_cache(fetcher, cacheKeys, { tags: cacheTags })
}

/**
 * Cache a document by slug. Tag: `{collection}_{slug}`.
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
 * Cache a global document per locale (nav labels, localized globals).
 * Tags include `global_{slug}` so a single `revalidateTag` clears all locales.
 *
 * @example
 * const getCachedHeader = getCachedPayloadGlobal('header', 1, 'de')
 * const header = await getCachedHeader()
 */
export function getCachedPayloadGlobal<T extends Global>(
  slug: T,
  depth = 0,
  locale: SupportedLocale | string = defaultLocale,
) {
  const localeKey = locale
  return createCachedPayloadFetcher(
    [slug, String(depth), localeKey],
    [`global_${slug}`, `global_${slug}_${localeKey}`],
    async () => {
      const payload = await getPayload({ config: configPromise })
      return payload.findGlobal({
        slug,
        depth,
        locale: localeKey as TypedLocale,
      })
    },
  )
}

/**
 * Cache a collection query with custom where conditions.
 * Use for fetching multiple documents or custom queries.
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
 * Cache all documents from a collection (with pagination disabled).
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
 * Cache a single document by ID. Tag: `{collection}_{id}`.
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
 * Cache a localized document by slug.
 * Tag: `{collection}_{slug}_{locale}`.
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
  const localeCode =
    typeof locale === 'object' && locale !== null
      ? String((locale as { code?: string | null }).code ?? '')
      : String(locale)
  return createCachedPayloadFetcher(
    [collection, slug, localeCode],
    [`${collection}_${slug}_${localeCode}`],
    async () => {
      const payload = await getPayload({ config: configPromise })
      const result = await payload.find({
        collection,
        depth,
        locale: localeCode as SupportedLocale,
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
