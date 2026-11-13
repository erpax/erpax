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
import type { CollectionSlug, GlobalSlug, PayloadRequest } from 'payload'
import type { z } from 'zod'

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

/** The env face this atom reads — narrow and readonly, so a test may pass just the keys it sets. */
export type McpEnv = Readonly<Record<string, string | undefined>>

/** Resolve seed vs full from env — production defaults to seed (Worker-safe). */
export function mcpSeedMode(
  env: McpEnv = process.env,
): McpSeedMode {
  const raw = env.ERPAX_MCP_SEED?.trim().toLowerCase()
  if (raw === '0' || raw === 'full' || raw === 'false') return 'full'
  if (raw === '1' || raw === 'seed' || raw === 'true') return 'seed'
  // Cloudflare / production Workers: seed unless explicitly opted out above.
  if (env.NODE_ENV === 'production') return 'seed'
  return 'full'
}

/** Extra slugs from `ERPAX_MCP_EXTRA=a,b,c` — still seed-driven, not code churn. */
export function mcpExtraSlugs(env: McpEnv = process.env): readonly string[] {
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
  env: McpEnv = process.env,
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
  env: McpEnv = process.env,
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
  _env: McpEnv = process.env,
): Partial<Record<GlobalSlug, { enabled: true }>> {
  // Full and seed share the CMS global identity — never re-list header/footer.
  return Object.fromEntries(
    mcpSeedGlobalSlugs().map((slug) => [slug, { enabled: true } as const]),
  ) as Partial<Record<GlobalSlug, { enabled: true }>>
}

// ─── the custom tools: the erpax families handed through the plugin's own `mcp.tools` door ───────
// The live /api/mcp served 844 CRUD tools and no erpax.* family until this; the liveness test had
// asked the factory. Wire-named (Anthropic's tool grammar has no dot), mode-gated, collisions refused.

/** The plugin's own custom-tool shape (`mcp.tools[]` in @payloadcms/plugin-mcp). */
export interface GatewayTool {
  readonly name: string
  readonly description: string
  readonly parameters: z.ZodRawShape
  handler(args: Record<string, unknown>, req: PayloadRequest, _extra: unknown): Promise<{ content: Array<{ text: string; type: 'text' }> }>
}

/** What the corpus builds: the same contract, named by its dotted address. */
export interface CorpusTool {
  readonly name: string
  readonly description: string
  readonly parameters: z.ZodRawShape
  handler(args: Record<string, unknown>, req: PayloadRequest): Promise<{ content: Array<{ text: string; type: 'text' }> }>
}

/** The grammar a tool name must satisfy on the wire. */
export const WIRE_NAME = /^[A-Za-z0-9_-]{1,128}$/

/** `erpax.gate.coil` → `erpax_gate_coil`; refuses a name the wire grammar would still reject. */
export function wireName(name: string): string {
  const wire = name.replace(/\./g, '_')
  if (!WIRE_NAME.test(wire)) throw new Error(`tool name not expressible on the wire: ${name}`)
  return wire
}

/** Whether the families ride the gateway here — full mode yes; the lean seed only by `ERPAX_MCP_TOOLS=1`. */
export function customToolsEnabled(env: McpEnv = process.env): boolean {
  if (env.ERPAX_MCP_TOOLS === '0' || env.ERPAX_MCP_TOOLS === 'false') return false
  if (env.ERPAX_MCP_TOOLS === '1' || env.ERPAX_MCP_TOOLS === 'true') return true
  return mcpSeedMode(env) === 'full'
}

/** The corpus tools as the plugin wants them; two addresses collapsing to one wire name are refused, never shadowed. */
export function gatewayTools(tools: readonly CorpusTool[], env: McpEnv = process.env): GatewayTool[] {
  if (!customToolsEnabled(env)) return []
  const seen = new Map<string, string>()
  return tools.map((t) => {
    const name = wireName(t.name)
    const prior = seen.get(name)
    if (prior !== undefined && prior !== t.name) throw new Error(`wire-name collision: ${prior} and ${t.name} both cross as ${name}`)
    seen.set(name, t.name)
    return { name, description: `[${t.name}] ${t.description}`, parameters: t.parameters, handler: (args, req) => t.handler(args, req) }
  })
}
