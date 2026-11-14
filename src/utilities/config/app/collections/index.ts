/**
 * The CMS scaffold scope — the eight collections the app's own pages/auth surface is typed against.
 *
 * It read: *"The list IS the source of truth for which collections the app registers with Payload."*
 * **It is not, and it never was.** Payload boots **231** (210 hand-written + 21 from plugins and its own
 * internals). This is 8 — the original CMS scaffold. The sentence was false about a real thing, in plain
 * prose, in a file citing SOX §404 and ISO-19011 — and no gate could see it: it carries no `@invariant` and
 * no confessed stub, so [[rules]]/audience returns 0 for this file. That is the hardest class of lie, and the
 * only cure is to make the claim REFUTABLE (see test.ts).
 *
 * It was also wrong in the OTHER direction: it declared `user_roles`, and the collection's slug is
 * `user-roles`. A one-character typo naming a collection that does not exist, inside a list calling itself
 * the source of truth. The registry is `Object.values(allCollections)` in `payload.config.ts`; the LIVE
 * answer is `shapesOf()` in [[rules]]/collapse, read from the types Payload generated.
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
  'user-roles', // was `user_roles` — the collection's slug is hyphenated; the typo named nothing
  'users',
] as const

export type AppCollectionSlug = (typeof APP_COLLECTION_SLUGS)[number]
