/**
 * Declared collections in `payload.config` — order matches the `collections` array.
 *
 * Used for scope-registry typing and tests so config and documentation stay
 * aligned. The list IS the source of truth for which collections the app
 * registers with Payload.
 *
 * @audit ISO-19011:2018 audit-trail config-completeness
 * @compliance SOX §404 internal-controls config-as-code
 * @see https://payloadcms.com/docs/configuration/collections
 * @see docs/STANDARDS.md §3
 */
export const APP_COLLECTION_SLUGS = [
  'tenants',
  'pages',
  'posts',
  'media',
  'categories',
  'roles',
  'user_roles',
  'users',
] as const

export type AppCollectionSlug = (typeof APP_COLLECTION_SLUGS)[number]
