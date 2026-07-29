/**
 * seed/slugs — self-computable collection/global seeds for CMS fixtures.
 *
 * Exported so gateway / MCP / genesis derive the same set instead of
 * re-listing. The seed runner (`./index.ts`) is the sole writer of fixture
 * data; this module is the read-only identity of what it touches.
 */
import type { CollectionSlug, GlobalSlug } from 'payload'

/** Collections the CMS seed clears and repopulates. */
export const SEED_COLLECTION_SLUGS = [
  'categories',
  'media',
  'pages',
  'posts',
  'forms',
  'form-submissions',
  'search',
] as const satisfies readonly CollectionSlug[]

/** Globals the CMS seed clears (nav). */
export const SEED_GLOBAL_SLUGS = ['header', 'footer'] as const satisfies readonly GlobalSlug[]

export type SeedCollectionSlug = (typeof SEED_COLLECTION_SLUGS)[number]
export type SeedGlobalSlug = (typeof SEED_GLOBAL_SLUGS)[number]
