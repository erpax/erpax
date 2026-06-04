import type { CollectionSlug } from 'payload'

/**
 * Multi-tenant scoping, COMPUTED — not a 200-line hand-list.
 * (the computed-not-hardcoded law — see the `config` + `tenants` + `collapse` skills.)
 *
 * The old payload.config.ts listed ~201 slugs by hand in the multi-tenant
 * plugin's `collections` map. "Every collection except a few", typed out, is the
 * textbook drift bug: each NEW collection silently defaults to UN-scoped
 * (cross-tenant) until someone remembers to append it — and several had silently
 * fallen out (the etrima lot funnel + dispatch packs + internal messaging).
 *
 * Here the default is inverted: every collection is tenant-scoped UNLESS it is in
 * the small, explicit {@link GLOBAL_SPINE}. A new collection auto-scopes the
 * moment it joins the `@/collections` barrel; nothing drifts. This is the same
 * `Object.values(allCollections)` derivation the search / import-export / mcp
 * plugins already use — finally applied to the one map that was still hand-written.
 *
 * The earlier drift has been RESOLVED: the 9 per-tenant operational collections
 * that had fallen out are now scoped by the rule (they are simply absent from the
 * spine). Only `cases` stays out, for a principled reason — see
 * {@link TENANT_PARTY_SCOPED}. Proven against the prior hand-list in
 * {@link file://./scope.test.ts}.
 */

/**
 * Cross-tenant BY DESIGN — these never carry a tenant field:
 * - `tenants`                     the root (a tenant cannot be scoped to itself)
 * - `users` · `roles` · `user-roles`  the identity / RBAC spine — users span
 *                                  tenants (via the tenants array field); roles are global
 * - `subscription-plans`          the platform's plan catalogue (what is offered)
 * - `sectors`                     industry-sector reference taxonomy
 * - `connections`                 the universal relationship graph (links actors
 *                                  that may live in different tenants — B2B/C2C)
 */
export const TENANT_GLOBAL: readonly string[] = [
  'tenants',
  'users',
  'roles',
  'user-roles',
  'subscription-plans',
  'sectors',
  'connections',
]

/**
 * Isolated by ROW-LEVEL party access instead of a tenant field — the judicial
 * twin of tenant isolation. `cases` (the public-order docket, COFOG-03) carries
 * parties drawn from many collections that may span tenants, and a party sees
 * only the matters they are on (`partyRoleAccess`). It is also content-addressed
 * so identical matters merge across instances — a tenant column would both
 * duplicate the row-level guard AND break cross-tenant matters + the merge.
 * Not drift: a deliberate, documented choice (see src/cases, @security A.5.23).
 */
export const TENANT_PARTY_SCOPED: readonly string[] = ['cases']

/** The collections that are NOT tenant-scoped — the principled cross-tenant spine. */
export const GLOBAL_SPINE: ReadonlySet<string> = new Set([
  ...TENANT_GLOBAL,
  ...TENANT_PARTY_SCOPED,
])

/**
 * Tenant-scoped slugs injected by a PLUGIN, not the `@/collections` barrel — so a
 * barrel walk cannot see them. Today this is the ecommerce plugin's surface (the
 * cart→order→transaction chain + the variant model).
 */
export const PLUGIN_TENANT_SLUGS: readonly string[] = [
  'products',
  'carts',
  'orders',
  'addresses',
  'transactions',
  'variantTypes',
  'variants',
  'variantOptions',
]

/** The minimal shape read off a CollectionConfig — just its slug. */
type HasSlug = { slug: string }

/**
 * The tenant-scoped slug set, COMPUTED: `(barrel ∪ plugin surface) − spine`.
 * Deterministic and de-duplicated; order follows the barrel, then the plugins.
 */
export function tenantScopedSlugs(collections: ReadonlyArray<HasSlug>): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const slug of [...collections.map((c) => c.slug), ...PLUGIN_TENANT_SLUGS]) {
    if (GLOBAL_SPINE.has(slug) || seen.has(slug)) continue
    seen.add(slug)
    out.push(slug)
  }
  return out
}

/**
 * The `collections` map the multi-tenant plugin wants: `{ [slug]: {} }`. This is
 * the value that REPLACES the old 201-line literal in payload.config.ts.
 */
export function tenantCollectionsConfig(
  collections: ReadonlyArray<HasSlug>,
): Partial<Record<CollectionSlug, Record<string, never>>> {
  return Object.fromEntries(
    tenantScopedSlugs(collections).map((slug) => [slug, {}]),
  ) as Partial<Record<CollectionSlug, Record<string, never>>>
}
