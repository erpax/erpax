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
 *   - The skill corpus yields a DISCOVERY PAIR — `erpax.skill.list` and
 *     `erpax.skill.read` — so an MCP-only agent finds and reads every
 *     skill without walking the filesystem, and without 2,807 tools.
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
import { loadAtomCatalogue, atomCatalogueLength } from './atom-catalogue-lazy'
import { loadSkillByAtomPath } from '@/skill/router/lazy-load'

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
      const { verifyContentUuid } = await import('@/integrity')
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
 * THE DISCOVERY PAIR — 2,807 skill tools become two.
 *
 * Every skill atom used to yield its own `erpax.auto.skill.<atom>` tool. That is a CATALOGUE
 * wearing a tool surface, and it made the server unusable by the clients it exists for:
 *
 *     tools           3,078   of which 2,807 were one-skill-each
 *     tools/list        968 KB   of which 835 KB was those 2,807
 *
 * An MCP client puts the whole tool list in front of a model. No model has 968 KB of tool
 * budget, and selection accuracy collapses long before that — a surface nothing can load is
 * not a surface. The capability is unchanged: `list` finds an atom, `read` returns exactly
 * what the per-skill tool returned. Two tools instead of 2,807, and 3,078 → 273.
 *
 * The primitive is still fully exposed (Conservation Law 37): the pair reaches EVERY atom in
 * the catalogue, which is what "exposed" has to mean once one-tool-per-thing stops scaling.
 */
function toolsForSkills(): ErpaxMcpTool[] {
  return [
    {
      name: 'erpax.skill.list',
      description:
        'List skill atoms in the corpus — the discovery half of the skill pair. `q` filters on atom path, name and description; `limit`/`offset` page. Returns atom · name · description, and the total, so a client can page rather than load every skill as its own tool.',
      parameters: {
        q: z.string().optional().describe('substring filter over atom path, name and description'),
        limit: z.number().int().min(1).max(200).optional().describe('page size (default 50)'),
        offset: z.number().int().min(0).optional().describe('page offset (default 0)'),
      } as z.ZodRawShape,
      async handler(args: { q?: string; limit?: number; offset?: number }) {
        const all = loadAtomCatalogue()
        const needle = (args.q ?? '').toLowerCase()
        /*
         * RANKED, because the first page is the only page a model reads. Searching
         * descriptions too is what makes the pair as findable as 2,807 named tools were — but
         * unranked it answered q='cycle' with `active · animal · base`, atoms whose PROSE
         * mentions a cycle, while `rules/cycle` sat further down. An exact atom is the answer;
         * a path match is nearly always the answer; a description match is a lead.
         */
        const rank = (s: { atom: string; name: string; description: string }): number => {
          const atom = s.atom.toLowerCase()
          if (atom === needle) return 0
          if (atom.split('/').includes(needle)) return 1
          if (atom.includes(needle)) return 2
          if (s.name.toLowerCase().includes(needle)) return 3
          return 4
        }
        const matched = needle
          ? all
              .filter(
                (s) =>
                  s.atom.toLowerCase().includes(needle) ||
                  s.name.toLowerCase().includes(needle) ||
                  s.description.toLowerCase().includes(needle),
              )
              .sort((a, b) => rank(a) - rank(b) || a.atom.localeCompare(b.atom))
          : all
        const offset = args.offset ?? 0
        const limit = args.limit ?? 50
        return json({
          total: matched.length,
          corpusTotal: all.length,
          offset,
          limit,
          // PATH is returned, not only the leaf: leaves COLLIDE (`cycle` is rules/cycle AND
          // water/cycle), and a client that only ever saw the leaf could not tell them apart.
          skills: matched
            .slice(offset, offset + limit)
            .map((s) => ({ atom: s.atom, path: s.path, name: s.name, description: s.description })),
        })
      },
    },
    {
      name: 'erpax.skill.read',
      description:
        'Read one skill atom by its path — the read half of the skill pair. Returns the same payload the per-atom tool returned: name, description, path, sealed excerpt and content-uuid. Find the atom with erpax.skill.list.',
      parameters: {
        atom: z.string().describe("atom path, e.g. 'rules/cycle' — as returned by erpax.skill.list"),
      } as z.ZodRawShape,
      async handler(args: { atom: string }) {
        /*
         * RESOLVED BY PATH FIRST, and AMBIGUITY IS REFUSED.
         *
         * The catalogue keys atoms by LEAF, and leaves collide: `cycle` is `rules/cycle` AND
         * `water/cycle`. `lookupAtomSkill('rules/cycle')` returns the water one — a wrong answer
         * that reads exactly like a right one, which [[rules]]/reference calls worse than no
         * answer at all. (The 2,807 named tools had the same collision, invisibly: only one
         * atom per leaf ever got a tool.)
         *
         * So: an exact path wins; a unique leaf wins; an ambiguous leaf returns the candidates
         * and refuses to pick.
         */
        const all = loadAtomCatalogue()
        const byPath = all.find((s) => s.path === args.atom)
        const byLeaf = all.filter((s) => s.atom === args.atom)
        if (!byPath && byLeaf.length > 1) {
          return json({
            error: `'${args.atom}' is a LEAF shared by ${byLeaf.length} atoms — name the path`,
            candidates: byLeaf.map((s) => s.path),
          })
        }
        const meta = byPath ?? byLeaf[0] ?? null
        if (!meta) {
          return json({
            error: `unknown skill atom '${args.atom}'`,
            hint: 'call erpax.skill.list with q= to find it',
          })
        }
        const sealed = loadSkillByAtomPath(meta.path)
        return json({
          atom: meta.atom,
          name: meta.name,
          description: meta.description,
          path: meta.path,
          sealedExcerpt: sealed?.excerpt ?? null,
          excerptChars: sealed?.excerptChars ?? 0,
          fullChars: sealed?.fullChars ?? 0,
          contentUuid: sealed?.contentUuid ?? null,
        })
      },
    },
  ]
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
  /*
   * Skills are covered by the PAIR, not one tool each. `erpax.skill.list` reaches every atom in
   * the catalogue and `erpax.skill.read` returns any of them, so the primitive is exposed in the
   * sense the law means — a client can discover and read all of it. One-tool-per-thing was a
   * stricter reading that produced 2,807 tools and a surface no client could load.
   */
  const skillsCount = atomCatalogueLength()
  const skillPairPresent = toolNames.has('erpax.skill.list') && toolNames.has('erpax.skill.read')
  const skillTools = skillPairPresent ? skillsCount : 0

  if (agentTools < agentsCount) violations.push(`agents: ${agentTools}/${agentsCount} have auto-generated tools`)
  if (chainTools < chainsCount) violations.push(`chains: ${chainTools}/${chainsCount} have auto-generated tools`)
  if (collectionTools < collectionsCount) violations.push(`collections: ${collectionTools}/${collectionsCount} have auto-generated verify tools`)
  if (roleTools < rolesCount) violations.push(`roles: ${roleTools}/${rolesCount} have auto-generated tools`)
  if (familyTools < familiesCount) violations.push(`standards families: ${familyTools}/${familiesCount} have auto-generated tools`)
  if (!skillPairPresent) violations.push(`skills: the discovery pair (erpax.skill.list + erpax.skill.read) is missing — ${skillsCount} atoms unreachable`)

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
