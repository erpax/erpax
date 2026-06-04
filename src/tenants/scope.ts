import type { CollectionSlug } from 'payload'

/**
 * Multi-tenant scoping, COMPUTED — not a 200-line hand-list.
 * (the computed-not-hardcoded law — see the `config` + `tenants` + `collapse` skills.)
 *
 * The old payload.config.ts listed ~201 slugs by hand in the multi-tenant
 * plugin's `collections` map. "Every collection except a few", typed out, is the
 * textbook drift bug: each NEW collection silently defaults to UN-scoped
 * (cross-tenant) until someone remembers to append it. That is exactly what had
 * happened — see {@link TENANT_UNSCOPED_DRIFT}.
 *
 * Here the default is inverted: every collection is tenant-scoped UNLESS it is in
 * the small, explicit {@link GLOBAL_SPINE}. A new collection auto-scopes the
 * moment it joins the `@/collections` barrel; nothing drifts. This is the same
 * `Object.values(allCollections)` derivation the search / import-export / mcp
 * plugins already use — finally applied to the one map that was still hand-written.
 *
 * Proven behaviour-identical to the old hand-list in {@link file://./scope.test.ts}.
 */

/**
 * Cross-tenant BY DESIGN — these never carry a tenant field:
 * - `tenants`                     the root (a tenant cannot be scoped to itself)
 * - `users` · `roles` · `user-roles`  the identity / RBAC spine — users span
 *                                  tenants (via the tenants array field); roles are global
 * - `subscription-plans`          the platform's plan catalogue (what is offered)
 * - `sectors`                     industry-sector reference taxonomy
 * - `connections`                 the universal relationship graph (links actors
 *                                  that may live in different tenants)
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
 * DRIFT — collections that silently fell out of the old hand-list and so are
 * currently NOT tenant-scoped, despite holding per-tenant operational data
 * (production lots, dispatch packs, messages, justice cases). Kept here ONLY to
 * make this refactor byte-for-byte behaviour-identical; every entry is a
 * candidate to MOVE INTO scoping (delete it from this array) as a deliberate,
 * migrated step. Asserted, not hidden, in scope.test.ts.
 */
export const TENANT_UNSCOPED_DRIFT: readonly string[] = [
  'batches',
  'lots',
  'lot-variants',
  'lot-work-phases',
  'work-phases',
  'packs',
  'pack-items',
  'packages',
  'messages',
  'cases',
]

/** The collections that are NOT tenant-scoped = principled globals ∪ drift. */
export const GLOBAL_SPINE: ReadonlySet<string> = new Set([
  ...TENANT_GLOBAL,
  ...TENANT_UNSCOPED_DRIFT,
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
