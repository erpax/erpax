/**
 * plugins/mcp/seed — production MCP collection surface, derived not listed.
 *
 * `@payloadcms/plugin-mcp` registers find/create/update/delete per enabled
 * collection and builds `configToJSONSchema` definitions used by those tools.
 * Enabling the full ~206-collection barrel on Cloudflare Workers blows the
 * isolate (HTTP 1101) on every `/api/mcp` call after auth succeeds.
 *
 * The seed is self-computable:
 *   CMS seed slugs  ∪  gateway auth atoms  ∪  optional ERPAX_MCP_EXTRA
 *
 * Full barrel remains the default when `ERPAX_MCP_SEED=0` or non-production
 * without an explicit seed opt-in — local agents keep the complete door.
 *
 * @see @/seed/slugs — CMS fixture identity
 * @see ./test.ts
 */
import type { CollectionSlug, GlobalSlug } from 'payload'

import { SEED_COLLECTION_SLUGS, SEED_GLOBAL_SLUGS } from '@/seed/slugs'

/**
 * Auth / gateway atoms the CMS seed does not touch but MCP must expose so
 * the fused ADMIN_API_KEY can mint keys, inspect actors, and scope tenants.
 * Derived from genesis + plugin-mcp identity — not a freehand ERP catalog.
 */
export const MCP_GATEWAY_SEED_SLUGS = [
  'users',
  'tenants',
  'roles',
  'payload-mcp-api-keys',
] as const satisfies readonly CollectionSlug[]

export type McpSeedMode = 'seed' | 'full'

/** Resolve seed vs full from env — production defaults to seed (Worker-safe). */
export function mcpSeedMode(
  env: NodeJS.ProcessEnv = process.env,
): McpSeedMode {
  const raw = env.ERPAX_MCP_SEED?.trim().toLowerCase()
  if (raw === '0' || raw === 'full' || raw === 'false') return 'full'
  if (raw === '1' || raw === 'seed' || raw === 'true') return 'seed'
  // Cloudflare / production Workers: seed unless explicitly opted out above.
  if (env.NODE_ENV === 'production') return 'seed'
  return 'full'
}

/** Extra slugs from `ERPAX_MCP_EXTRA=a,b,c` — still seed-driven, not code churn. */
export function mcpExtraSlugs(env: NodeJS.ProcessEnv = process.env): readonly string[] {
  const raw = env.ERPAX_MCP_EXTRA?.trim()
  if (!raw) return []
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

/**
 * Ordered unique seed slugs for MCP enablement.
 * Production seed = gateway auth atoms only (CMS fixtures stay on `/next/seed`).
 * Opt into CMS MCP surface via `ERPAX_MCP_EXTRA` or `ERPAX_MCP_INCLUDE_CMS=1`.
 */
export function mcpSeedCollectionSlugs(
  env: NodeJS.ProcessEnv = process.env,
): readonly CollectionSlug[] {
  const includeCms =
    env.ERPAX_MCP_INCLUDE_CMS === '1' || env.ERPAX_MCP_INCLUDE_CMS === 'true'
  const seen = new Set<string>()
  const out: CollectionSlug[] = []
  for (const slug of [
    ...(includeCms ? SEED_COLLECTION_SLUGS : []),
    ...MCP_GATEWAY_SEED_SLUGS,
    ...mcpExtraSlugs(env),
  ]) {
    if (seen.has(slug)) continue
    seen.add(slug)
    out.push(slug as CollectionSlug)
  }
  return out
}

export function mcpSeedGlobalSlugs(): readonly GlobalSlug[] {
  return SEED_GLOBAL_SLUGS
}

/**
 * Build the plugin-mcp `collections` map from the live barrel ∩ seed (or full).
 * Unknown extras are dropped — never invent a slug the config does not register.
 */
export function mcpCollectionsConfig(
  registered: ReadonlyArray<{ readonly slug: string }>,
  env: NodeJS.ProcessEnv = process.env,
): Partial<Record<CollectionSlug, { enabled: true }>> {
  const registeredSet = new Set(registered.map((c) => c.slug))
  const mode = mcpSeedMode(env)
  const slugs =
    mode === 'full'
      ? registered.map((c) => c.slug)
      : mcpSeedCollectionSlugs(env).filter((s) => registeredSet.has(s))
  return Object.fromEntries(
    slugs.map((slug) => [slug, { enabled: true } as const]),
  ) as Partial<Record<CollectionSlug, { enabled: true }>>
}

export function mcpGlobalsConfig(
  _env: NodeJS.ProcessEnv = process.env,
): Partial<Record<GlobalSlug, { enabled: true }>> {
  // Full and seed share the CMS global identity — never re-list header/footer.
  return Object.fromEntries(
    mcpSeedGlobalSlugs().map((slug) => [slug, { enabled: true } as const]),
  ) as Partial<Record<GlobalSlug, { enabled: true }>>
}
