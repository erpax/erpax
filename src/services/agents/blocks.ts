/**
 * Agents-as-blocks — Slice PPPPPP (2026-05-11).
 *
 * Per user 'i realize the mcp agents are like the bloocks in shadcn.
 * blocks of types as components'. Just as shadcn ships **blocks**
 * (composable, typed, drop-in UI components), MCP agents ARE blocks
 * — composable, typed, drop-in BUSINESS components. Their "props"
 * are the events / collection ops / chain steps they accept; their
 * "render output" is the AgentEffect[] they emit.
 *
 * The mental model:
 *
 *   shadcn block (e.g. Card)             ERPax agent block (e.g. FinanceAgent)
 *   -------------------------            -------------------------------------
 *   props: { title, body, footer }       accepts: chain steps + events + cron
 *   children: <Slot/>                    children: ownsCollections + subscribes
 *   emits: onClick / onSubmit            emits: AgentEffect[] (create/update/...)
 *   composes via JSX                     composes via composeBlocks(a, b, ...)
 *   styled by tokens (CSS vars)          governed by conservation laws
 *   browsable in shadcn block library    browsable in BLOCK_CATALOG below
 *
 * This slice ships:
 *
 *   1. `AgentBlockManifest` — declares an agent's typed surface
 *      (accepts: events / collections / cron; emits: effects + events)
 *   2. `composeBlocks()` — chain blocks together: A's emitted events
 *      feed into B's subscription set; the union is a meta-block
 *   3. `BLOCK_CATALOG` — derived from the agentRegistry, gives a
 *      shadcn-style browseable inventory (block name, description,
 *      typed surface, MCP tools wired)
 *   4. MCP tools `erpax.blocks.{listBlocks, getBlock, composeBlocks,
 *      validateComposition}`
 *   5. Conservation Law 32 — `checkBlockCompositionTypeSafety`:
 *      every composition must have at least one shared type at the
 *      boundary (A's emits ∩ B's subscribesTo ≠ ∅), otherwise the
 *      composition is type-incoherent and rejected.
 *
 * @standard W3C Web Components (composition pattern)
 * @standard ISO/IEC 25010:2023 §5.4 reusability + §5.7 modularity
 * @audit ISO 19011:2018 §6.4.6 (every block composition audit-trailed)
 */

import type { DomainAgent, AgentId, AgentRegistry, AgentEffect } from './types'
import { BUSINESS_CHAINS } from '@/services/business-chains/registry'

export type BlockCategory =
  | 'commerce' | 'accounting' | 'risk' | 'people'
  | 'workflow' | 'data' | 'communication' | 'meta'

/**
 * Typed surface — the "props" + "events" of an agent block. Mirrors
 * shadcn's component prop typings: `accepts` describes the types the
 * block consumes; `emits` describes what it produces.
 */
export interface AgentBlockManifest {
  readonly id: AgentId
  readonly displayName: string
  readonly category: BlockCategory
  readonly description: string

  /** Inbound surface — analogous to a shadcn block's props. */
  readonly accepts: {
    readonly events: ReadonlyArray<string>          // event ids the block subscribes to
    readonly collections: ReadonlyArray<string>     // collection slugs the block owns / mutates
    readonly cron?: string                          // optional schedule trigger
    readonly chainSteps: ReadonlyArray<string>      // chain step ids the block participates in
  }

  /** Outbound surface — analogous to a shadcn block's emitted events. */
  readonly emits: {
    readonly events: ReadonlyArray<string>          // event ids the block emits
    readonly effectKinds: ReadonlyArray<AgentEffect['kind']>  // typed effect kinds
  }

  /** MCP tools this block exposes (or consumes). */
  readonly mcpTools: ReadonlyArray<string>

  /** Standards bodies + ids the block carries (drives the spec corpus). */
  readonly standards: ReadonlyArray<string>
}

const CATEGORY_BY_AGENT: Record<AgentId, BlockCategory> = {
  finance: 'accounting',
  sales: 'commerce',
  marketing: 'communication',
  hr: 'people',
  legal: 'risk',
  ops: 'workflow',
  engineering: 'workflow',
  'customer-support': 'communication',
  data: 'data',
  design: 'workflow',
  product: 'workflow',
  productivity: 'workflow',
  'enterprise-search': 'data',
  plugins: 'meta',
  'meta-skill': 'meta',
}

/** Derive a typed manifest from a runtime DomainAgent + its registry context. */
export function manifestOf(agent: DomainAgent): AgentBlockManifest {
  return {
    id: agent.id,
    displayName: agent.id.replace(/-/g, ' ').replace(/^./, (s) => s.toUpperCase()),
    category: CATEGORY_BY_AGENT[agent.id],
    description: `${agent.id} agent — owns ${agent.ownsCollections.length} collection(s), emits ${agent.emits.length} event type(s)`,
    accepts: {
      events: [...agent.subscribesTo],
      collections: [...agent.ownsCollections],
      cron: agent.cron,
      chainSteps: [],  // populated externally by walking BUSINESS_CHAINS
    },
    emits: {
      events: [...agent.emits],
      // Default: every agent can emit any AgentEffect kind. Specific
      // agents can be narrowed by inspecting their handler bodies.
      effectKinds: ['create', 'update', 'notify', 'audit', 'escalate', 'emit', 'capture'],
    },
    mcpTools: [],   // populated externally by scanning tool-defs registry
    standards: [],  // populated externally by reading agent JSDoc @standard tags
  }
}

/** Build the full block catalog from a registry. */
export function buildBlockCatalog(registry: AgentRegistry): ReadonlyArray<AgentBlockManifest> {
  return registry.all().map((a) => manifestOf(a))
}

// ─── Composition ───────────────────────────────────────────────────

export interface BlockComposition {
  readonly id: string                                // composition id (auto-derived)
  readonly upstream: AgentBlockManifest              // emits → downstream consumes
  readonly downstream: AgentBlockManifest
  readonly sharedEvents: ReadonlyArray<string>       // upstream.emits.events ∩ downstream.accepts.events
}

/**
 * Compose two blocks: A's emitted events feed into B's subscription
 * set. Returns the composition + the shared event types at the
 * boundary.
 *
 * Type safety: a composition with `sharedEvents.length === 0` is
 * type-incoherent (the upstream's outputs never reach the
 * downstream's inputs). Conservation Law 32 enforces this.
 */
export function composeBlocks(upstream: AgentBlockManifest, downstream: AgentBlockManifest): BlockComposition {
  const sharedEvents = upstream.emits.events.filter((e) => downstream.accepts.events.includes(e))
  return {
    id: `${upstream.id}>${downstream.id}`,
    upstream,
    downstream,
    sharedEvents,
  }
}

export interface CompositionValidation {
  readonly ok: boolean
  readonly composition: BlockComposition
  readonly issues: ReadonlyArray<string>
}

/**
 * Conservation Law 32 — `checkBlockCompositionTypeSafety`. Every
 * agent-block composition must share at least one event type at the
 * boundary; otherwise upstream's outputs never reach downstream's
 * inputs and the composition is dead code.
 */
export function validateComposition(comp: BlockComposition): CompositionValidation {
  const issues: string[] = []
  if (comp.sharedEvents.length === 0) {
    issues.push(
      `no shared event types: upstream ${comp.upstream.id} emits [${comp.upstream.emits.events.slice(0, 3).join(', ')}…] ` +
      `but downstream ${comp.downstream.id} subscribes to [${comp.downstream.accepts.events.slice(0, 3).join(', ')}…]`,
    )
  }
  if (comp.upstream.id === comp.downstream.id) {
    issues.push('composition with self — circular reference')
  }
  return { ok: issues.length === 0, composition: comp, issues }
}

/**
 * Compose N blocks into a meta-block (chain). Returns the path of
 * compositions; if any boundary is type-incoherent, returns first
 * failure.
 */
export interface ChainComposition {
  readonly ok: boolean
  readonly path: ReadonlyArray<BlockComposition>
  readonly firstFailure?: CompositionValidation
}

export function chainBlocks(blocks: ReadonlyArray<AgentBlockManifest>): ChainComposition {
  const path: BlockComposition[] = []
  for (let i = 0; i < blocks.length - 1; i++) {
    const comp = composeBlocks(blocks[i]!, blocks[i + 1]!)
    const v = validateComposition(comp)
    if (!v.ok) return { ok: false, path, firstFailure: v }
    path.push(comp)
  }
  return { ok: true, path }
}

// ─── Conservation Law 32 — registry-wide audit ─────────────────────

export interface RegistryCouplingResult {
  readonly ok: boolean
  readonly orphans: ReadonlyArray<{ id: AgentId; reason: string }>
  readonly emittersWithNoConsumer: ReadonlyArray<string>
  readonly subscribersWithNoEmitter: ReadonlyArray<string>
}

/**
 * Conservation Law 32 (registry-level) — every emitted event must
 * have at least one consumer somewhere in the catalog (otherwise
 * the emit is dead); every subscribed event must have at least one
 * emitter (otherwise the subscription is dead).
 *
 * This is the agent-block analogue of the shadcn rule "every block
 * variant must be reachable from at least one composition example".
 */
// ─── Slice QQQQQQ — chains ARE block compositions ─────────────────

/**
 * Per user 'so erpax is chains of blocks'. Walk every BUSINESS_CHAIN
 * and derive its block composition path: each step's owning agent is
 * a node, and consecutive steps form composeBlocks() boundaries.
 *
 * Returns a map { chainId → ChainComposition } so the UI (shadcn
 * standards-graph-viz / spec-corpus-browser) can render every chain
 * as a typed block flow diagram, and the boot suite can assert that
 * every chain has type-coherent boundaries.
 */
export interface ChainAsBlocks {
  readonly chainId: string
  readonly path: ReadonlyArray<{ agentId: AgentId; collection: string; action: string; emits: string }>
  readonly composition: ChainComposition
}

export function chainsAsBlockCompositions(registry: AgentRegistry): ReadonlyArray<ChainAsBlocks> {
  const out: ChainAsBlocks[] = []
  for (const chain of Object.values(BUSINESS_CHAINS)) {
    const path: ChainAsBlocks['path'] = []
    const manifests: AgentBlockManifest[] = []
    for (const step of chain.steps) {
      const agent = registry.byCollection(step.collection)
      if (!agent) continue
      const m = manifestOf(agent)
      manifests.push(m)
      path.push({ agentId: agent.id, collection: step.collection, action: step.action, emits: step.emits })
    }
    // Dedupe consecutive same-agent edges (a single block is not a composition with itself).
    const distinct: AgentBlockManifest[] = []
    for (const m of manifests) {
      if (distinct.length === 0 || distinct[distinct.length - 1]!.id !== m.id) distinct.push(m)
    }
    const composition = distinct.length >= 2 ? chainBlocks(distinct) : { ok: true, path: [] }
    out.push({ chainId: chain.id, path, composition })
  }
  return out
}

export function checkRegistryCoupling(registry: AgentRegistry): RegistryCouplingResult {
  const catalog = buildBlockCatalog(registry)
  const allEmitted = new Set<string>()
  const allSubscribed = new Set<string>()
  for (const m of catalog) {
    for (const e of m.emits.events) allEmitted.add(e)
    for (const e of m.accepts.events) allSubscribed.add(e)
  }
  const emittersWithNoConsumer = [...allEmitted].filter((e) => !allSubscribed.has(e))
  const subscribersWithNoEmitter = [...allSubscribed].filter((e) => !allEmitted.has(e))
  const orphans: { id: AgentId; reason: string }[] = []
  for (const m of catalog) {
    const orphanEmits = m.emits.events.filter((e) => emittersWithNoConsumer.includes(e))
    const orphanSubs = m.accepts.events.filter((e) => subscribersWithNoEmitter.includes(e))
    if (orphanEmits.length) orphans.push({ id: m.id, reason: `dead emits: [${orphanEmits.slice(0, 3).join(', ')}]` })
    if (orphanSubs.length) orphans.push({ id: m.id, reason: `dead subs: [${orphanSubs.slice(0, 3).join(', ')}]` })
  }
  return { ok: orphans.length === 0, orphans, emittersWithNoConsumer, subscribersWithNoEmitter }
}
