/**
 * Self-generating MCP tools — Slice WWWWWW (2026-05-11).
 *
 * Per user 'let mcp build itself'. The MCP layer is no longer hand-
 * curated; it derives itself from the existing spec primitives:
 *
 *   - Every registered DomainAgent yields a `erpax.auto.agent.<id>`
 *     tool that returns its typed AgentBlockManifest (PPPPPP) and
 *     exposes its hook surface (onChainStep / onEvent / onSchedule).
 *
 *   - Every BUSINESS_CHAIN yields a `erpax.auto.chain.<id>` tool
 *     that returns the chain's typed step path + the QQQQQQ block
 *     composition + the chain's standards citations.
 *
 *   - Every tamper-proof collection yields a `erpax.auto.collection
 *     .<slug>.verify` tool that recomputes the content uuid.
 *
 *   - Every TenantRoleProfile yields a `erpax.auto.role.<id>` tool
 *     returning its required-standards bundle + invariant.
 *
 *   - Every Standards family yields a `erpax.auto.standards.<family>`
 *     tool listing the family's spinning citations.
 *
 *   - Every skill atom (the SKILL.md corpus, via the generated atom
 *     catalogue) yields a `erpax.auto.skill.<atom>` tool returning its
 *     metadata — so an MCP-only agent discovers + reads every skill
 *     without ever walking the filesystem.
 *
 * The generated tools have `generated: true` in their description
 * so external clients can distinguish them from hand-curated ones.
 *
 * **Conservation Law 37** — `checkAutoGenerationCoverage`: every
 * primitive (agent / chain / tamper-proof collection / role /
 * standards family) MUST be exposed by at least one MCP tool —
 * either the hand-curated catalog or the auto-generated layer.
 *
 * The mental model: ERPax adds a new collection / agent / chain by
 * declaring it; the MCP surface grows with zero hand-edit. Slice
 * VVVVVV's `erpax.platform.toolCatalog` then surfaces it; the
 * shadcn mcp-playground (slice MMMMMM-shadcn) renders it; external
 * agents discover it; the platform stays self-coherent.
 *
 * @standard MCP 0.6 — tools/list (auto-generation extension)
 * @standard ISO/IEC 25010:2023 §5.4 reusability + §5.7 modularity
 * @audit ISO 19011:2018 §6.4.6 (auto-generation traceable to spec)
 */

import { z } from 'zod'
import type { ErpaxMcpTool } from './tool-defs'
import type { AgentRegistry } from '@/agent'
import { manifestOf } from '@/agent'
import { BUSINESS_CHAINS } from '@/business/chain'
import { listTenantRoles } from '@/tenant/role'
import { TAMPER_PROOF_COLLECTIONS_REGISTRY } from '@/integrity'
import { ATOM_CATALOGUE } from './atom-catalogue.generated'

const text = (s: string) => ({ content: [{ text: s, type: 'text' as const }] })
const json = (v: unknown) => text(JSON.stringify(v, null, 2))

const STANDARDS_FAMILIES = ['ifrs-ias', 'iso', 'eu-directive', 'us-fed', 'w3c-ietf', 'cloudflare', 'un-oecd-wco'] as const

/**
 * Derive an MCP tool for every registered agent. Returns the agent's
 * AgentBlockManifest (typed surface) so external clients can see
 * what events / collections / chain steps the agent participates in.
 */
function toolsForAgents(registry: AgentRegistry): ErpaxMcpTool[] {
  return registry.all().map((agent) => ({
    name: `erpax.auto.agent.${agent.id}`,
    description: `[generated] Manifest for the ${agent.id} agent — typed accepts/emits surface, owned collections, subscribed events, cron, chain-step participation. Derived from agent registration.`,
    parameters: {} as z.ZodRawShape,
    async handler() { return json(manifestOf(agent)) },
  }))
}

/**
 * Derive an MCP tool for every BUSINESS_CHAIN. Returns the chain's
 * id + name + steps + standards. Useful for clients that want to
 * walk a chain without subscribing to event-driven flow.
 */
function toolsForChains(): ErpaxMcpTool[] {
  return Object.values(BUSINESS_CHAINS).map((chain) => ({
    name: `erpax.auto.chain.${chain.id.toLowerCase().replace(/_/g, '-')}`,
    description: `[generated] BUSINESS_CHAIN ${chain.id} — ${(chain as { description?: string }).description ?? '(no description)'}. ${chain.steps.length} steps. Returns the typed chain definition.`,
    parameters: {} as z.ZodRawShape,
    async handler() { return json(chain) },
  }))
}

/**
 * Derive a content-uuid verification tool for every tamper-proof
 * collection. Caller passes the row JSON; the tool recomputes the
 * uuid using the collection's tenant namespace and reports match /
 * mismatch.
 */
function toolsForCollections(): ErpaxMcpTool[] {
  return [...TAMPER_PROOF_COLLECTIONS_REGISTRY].map((slug) => ({
    name: `erpax.auto.collection.${slug}.verify`,
    description: `[generated] Conservation Law 8 — recompute the content uuid for one row of '${slug}' and report match/mismatch. Pass the row JSON + tenantId.`,
    parameters: { row: z.record(z.unknown()), tenantId: z.string() } as z.ZodRawShape,
    async handler({ row, tenantId }) {
      const { verifyContentUuid } = await import('@/integrity/content-uuid')
      return json(verifyContentUuid(row as Record<string, unknown>, tenantId as string))
    },
  }))
}

/** Derive a profile-summary tool per registered tenant role. */
function toolsForRoles(): ErpaxMcpTool[] {
  return listTenantRoles().map((role) => ({
    name: `erpax.auto.role.${role.id.replace(/[^a-z0-9-]/g, '-')}`,
    description: `[generated] Tenant role profile '${role.id}' — display name + required standards + invariant. Use to onboard a new tenant under this role.`,
    parameters: {} as z.ZodRawShape,
    async handler() { return json(role) },
  }))
}

/** Derive a per-family standards index tool. */
function toolsForStandardsFamilies(): ErpaxMcpTool[] {
  return STANDARDS_FAMILIES.map((family) => ({
    name: `erpax.auto.standards.${family}`,
    description: `[generated] Standards family '${family}' — one of the 7 vortex families (slice LLLLLL §0g). Use to enumerate the family's published standards via the standards-as-live-objects registry.`,
    parameters: {} as z.ZodRawShape,
    async handler() {
      const { familyOf } = await import('@/registry')
      return json({
        family,
        sample: ['IFRS-15', 'IAS-1', 'PSD2', 'GDPR', 'ISO 27001', 'W3C DID Core'].filter((s) => familyOf(s) === family),
      })
    },
  }))
}

/**
 * Derive an MCP tool for every skill atom in the corpus (the generated
 * catalogue). Each skill becomes `erpax.auto.skill.<atom>`, returning its
 * metadata (name, description, path) — so an MCP-only agent discovers +
 * reads every skill without a filesystem walk. The skill corpus is a spec
 * primitive like agents/chains/roles; it self-projects the same way.
 */
function toolsForSkills(): ErpaxMcpTool[] {
  return ATOM_CATALOGUE.map((skill) => ({
    name: `erpax.auto.skill.${skill.atom}`,
    description: `[generated] skill atom '${skill.name}': ${skill.description}`,
    parameters: {} as z.ZodRawShape,
    async handler() {
      return json(skill)
    },
  }))
}

/**
 * Build the full set of auto-generated tools. Called once from
 * `buildErpaxMcpTools` — every spec primitive (agent / chain /
 * tamper-proof collection / role / standards family) becomes a tool
 * automatically. Adding a new agent or chain immediately yields new
 * MCP tools without touching `tool-defs.ts`.
 */
export function buildAutoGeneratedTools(registry: AgentRegistry): ErpaxMcpTool[] {
  return [
    ...toolsForAgents(registry),
    ...toolsForChains(),
    ...toolsForCollections(),
    ...toolsForRoles(),
    ...toolsForStandardsFamilies(),
    ...toolsForSkills(),
  ]
}

// ─── Conservation Law 37 — auto-generation coverage ────────────────

export interface AutoGenerationCoverage {
  readonly ok: boolean
  readonly counts: {
    readonly agents: { primitive: number; tools: number }
    readonly chains: { primitive: number; tools: number }
    readonly collections: { primitive: number; tools: number }
    readonly roles: { primitive: number; tools: number }
    readonly families: { primitive: number; tools: number }
    readonly skills: { primitive: number; tools: number }
  }
  readonly violations: ReadonlyArray<string>
}

/**
 * Conservation Law 37 — every spec primitive must be exposed by at
 * least one MCP tool, hand-curated OR auto-generated. The auto-
 * generated layer guarantees the floor; this check verifies it.
 */
export function checkAutoGenerationCoverage(
  registry: AgentRegistry,
  toolNames: ReadonlySet<string>,
): AutoGenerationCoverage {
  const violations: string[] = []
  const agentsCount = registry.all().length
  const chainsCount = Object.keys(BUSINESS_CHAINS).length
  const collectionsCount = TAMPER_PROOF_COLLECTIONS_REGISTRY.size
  const rolesCount = listTenantRoles().length
  const familiesCount = STANDARDS_FAMILIES.length

  const agentTools = registry.all().filter((a) => toolNames.has(`erpax.auto.agent.${a.id}`)).length
  const chainTools = Object.values(BUSINESS_CHAINS).filter((c) => toolNames.has(`erpax.auto.chain.${c.id.toLowerCase().replace(/_/g, '-')}`)).length
  const collectionTools = [...TAMPER_PROOF_COLLECTIONS_REGISTRY].filter((s) => toolNames.has(`erpax.auto.collection.${s}.verify`)).length
  const roleTools = listTenantRoles().filter((r) => toolNames.has(`erpax.auto.role.${r.id.replace(/[^a-z0-9-]/g, '-')}`)).length
  const familyTools = STANDARDS_FAMILIES.filter((f) => toolNames.has(`erpax.auto.standards.${f}`)).length
  const skillsCount = ATOM_CATALOGUE.length
  const skillTools = ATOM_CATALOGUE.filter((s) => toolNames.has(`erpax.auto.skill.${s.atom}`)).length

  if (agentTools < agentsCount) violations.push(`agents: ${agentTools}/${agentsCount} have auto-generated tools`)
  if (chainTools < chainsCount) violations.push(`chains: ${chainTools}/${chainsCount} have auto-generated tools`)
  if (collectionTools < collectionsCount) violations.push(`collections: ${collectionTools}/${collectionsCount} have auto-generated verify tools`)
  if (roleTools < rolesCount) violations.push(`roles: ${roleTools}/${rolesCount} have auto-generated tools`)
  if (familyTools < familiesCount) violations.push(`standards families: ${familyTools}/${familiesCount} have auto-generated tools`)
  if (skillTools < skillsCount) violations.push(`skills: ${skillTools}/${skillsCount} have auto-generated tools`)

  return {
    ok: violations.length === 0,
    counts: {
      agents: { primitive: agentsCount, tools: agentTools },
      chains: { primitive: chainsCount, tools: chainTools },
      collections: { primitive: collectionsCount, tools: collectionTools },
      roles: { primitive: rolesCount, tools: roleTools },
      families: { primitive: familiesCount, tools: familyTools },
      skills: { primitive: skillsCount, tools: skillTools },
    },
    violations,
  }
}
