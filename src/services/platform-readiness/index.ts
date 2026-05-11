/**
 * Platform readiness — Slice VVVVVV (2026-05-11).
 *
 * Per user 'mcp is ready to build and explore'. After 80+ slices, the
 * MCP surface is broad and the platform is shippable. This module is
 * the **single survey endpoint**: counts of every primitive
 * (agents, tools, chains, conservation laws, role profiles, locales,
 * standards families, backends, site surfaces, voting kinds, etc.)
 * + the full tool catalog with descriptions.
 *
 * The shadcn `mcp-playground` surface (slice MMMMMM-shadcn) renders
 * this as a Cmd+K-searchable inventory; external clients (Claude
 * Code, Cursor, IDEs, agents-of-agents) call it to discover what
 * ERPax can do today, without needing to read the source.
 *
 * @standard MCP 0.6 — tools/list extension
 * @standard W3C JSON-LD 1.1 (manifest is JSON-serializable + linkable)
 * @audit ISO 19011:2018 §6.4.6 (readiness audit-trailed)
 */

import type { ErpaxMcpTool } from '@/services/agents/mcp/tool-defs'
import type { AgentRegistry } from '@/services/agents/types'
import { BUSINESS_CHAINS } from '@/services/business-chains/registry'
import { listTenantRoles } from '@/services/tenant-roles'
import { supportedLocales } from '@/i18n'
import { TAMPER_PROOF_COLLECTIONS_REGISTRY, UUID_REF_REGISTRY } from '@/services/integrity'
import { SHADCN_SURFACE_MAP } from '@/services/website/shadcn-components'
import { listBackends } from '@/services/storage-independence'

export interface ToolCatalogEntry {
  readonly name: string
  readonly description: string
  readonly area: string                                 // derived from name (erpax.<area>.*)
  readonly parameterNames: ReadonlyArray<string>
  readonly parameterCount: number
}

export function buildToolCatalog(tools: ReadonlyArray<ErpaxMcpTool>): ReadonlyArray<ToolCatalogEntry> {
  return tools.map((t) => ({
    name: t.name,
    description: t.description,
    area: t.name.split('.')[1] ?? 'misc',
    parameterNames: Object.keys(t.parameters),
    parameterCount: Object.keys(t.parameters).length,
  }))
}

export interface ReadinessManifest {
  readonly generatedAt: string
  readonly version: string
  readonly counts: {
    readonly mcpTools: number
    readonly toolAreas: ReadonlyArray<{ area: string; count: number }>
    readonly agents: number
    readonly chains: number
    readonly chainSteps: number
    readonly conservationLaws: number
    readonly tenantRoleProfiles: number
    readonly locales: number
    readonly standardsFamilies: number
    readonly tamperProofCollections: number
    readonly uuidRefRegistry: number
    readonly siteSurfaces: number
    readonly storageBackends: number
  }
  readonly readyToBuild: ReadonlyArray<{ capability: string; available: boolean; via: string }>
  readonly toolCatalog: ReadonlyArray<ToolCatalogEntry>
}

/**
 * Build the full readiness manifest. Called from the MCP tool
 * `erpax.platform.readiness`; also used by the shadcn playground at
 * page-load time to render the discovery surface.
 */
export function buildReadinessManifest(args: {
  tools: ReadonlyArray<ErpaxMcpTool>
  registry: AgentRegistry
  conservationLawCount?: number
}): ReadinessManifest {
  const catalog = buildToolCatalog(args.tools)
  const areas = new Map<string, number>()
  for (const t of catalog) areas.set(t.area, (areas.get(t.area) ?? 0) + 1)
  const toolAreas = [...areas.entries()].map(([area, count]) => ({ area, count })).sort((a, b) => b.count - a.count)
  const chains = Object.values(BUSINESS_CHAINS)
  const chainSteps = chains.reduce((sum, c) => sum + c.steps.length, 0)
  return {
    generatedAt: new Date().toISOString(),
    version: 'slice-VVVVVV (2026-05-11)',
    counts: {
      mcpTools: args.tools.length,
      toolAreas,
      agents: args.registry.all().length,
      chains: chains.length,
      chainSteps,
      conservationLaws: args.conservationLawCount ?? 36,
      tenantRoleProfiles: listTenantRoles().length,
      locales: supportedLocales.length,
      standardsFamilies: 7,                                       // §0g
      tamperProofCollections: TAMPER_PROOF_COLLECTIONS_REGISTRY.length,
      uuidRefRegistry: UUID_REF_REGISTRY.length,
      siteSurfaces: SHADCN_SURFACE_MAP.length,
      storageBackends: listBackends().length,
    },
    readyToBuild: [
      { capability: 'discover-tools',     available: true, via: 'erpax.platform.toolCatalog' },
      { capability: 'browse-spec-corpus', available: true, via: 'erpax.spec.getCollection / getChainRegistry' },
      { capability: 'invoke-agent-hooks', available: true, via: 'erpax.blocks.* + erpax.* domain tools' },
      { capability: 'compose-blocks',     available: true, via: 'erpax.blocks.compose / chain' },
      { capability: 'walk-chains',        available: true, via: 'erpax.blocks.chainsAsCompositions' },
      { capability: 'stream-events',      available: true, via: 'erpax.streams.* (Laws 33-34)' },
      { capability: 'verify-integrity',   available: true, via: 'erpax.integrity.* (Laws 8/10)' },
      { capability: 'replicate-by-uuid',  available: true, via: 'erpax.storage.* (Laws 35-36)' },
      { capability: 'vote-and-rate',      available: true, via: 'erpax.voting.* (Laws 30-31)' },
      { capability: 'render-seo-vortex',  available: true, via: 'erpax.seo.* (Law 29)' },
      { capability: 'federate',           available: true, via: 'erpax.platform.{publishSelf, bootFromFederation}' },
      { capability: 'self-deploy',        available: true, via: 'erpax.commerce.{checkout, provisionInstance} (Laws 25-26)' },
      { capability: 'self-evolve',        available: true, via: 'erpax.proposals.list (Law 22 — meta-skill)' },
      { capability: 'multilingual',       available: true, via: `${supportedLocales.length} locales + erpax.i18n.*` },
    ],
    toolCatalog: catalog,
  }
}

/** Group tools by area — handy for UI layout. */
export function toolsByArea(tools: ReadonlyArray<ErpaxMcpTool>): ReadonlyMap<string, ReadonlyArray<ErpaxMcpTool>> {
  const out = new Map<string, ErpaxMcpTool[]>()
  for (const t of tools) {
    const area = t.name.split('.')[1] ?? 'misc'
    const list = out.get(area) ?? []
    list.push(t)
    out.set(area, list)
  }
  // Sort tools within each area alphabetically.
  for (const [k, v] of out) v.sort((a, b) => a.name.localeCompare(b.name))
  return out
}
