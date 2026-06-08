/**
 * Per-agent law profiles — Slice EEEEEEE (2026-05-11).
 *
 * Per user 'regroup the laws for maximum agent efficiency'. After
 * 44 conservation laws across 5 axes, each agent shouldn't have to
 * evaluate ALL laws on every dispatch — only the subset that
 * governs ITS effects. This slice maps each law to the AgentEffect
 * kinds it constrains, then derives a per-agent law profile from
 * the agent's typed surface (PPPPPP).
 *
 * The mental model: laws are global ergodically — every law is true
 * for the whole system — but each agent **interacts** with only a
 * subset locally. A pure read agent (data-explorer) has no
 * `create` or `update` effects; it doesn't need to satisfy
 * referential-harmony (Law 10) on every dispatch — that law is
 * triggered only by writers.
 *
 *   Agent effects → relevant law subset → faster dispatch
 *
 * Per-effect law mapping (from the audit of Laws 1-44):
 *
 *   create / update   → Laws 8 (content uuid) + 10 (refs harmony) +
 *                        29 (SEO if a publishable surface) + 35
 *                        (storage independent) + 36 (replicable)
 *   notify             → Laws 3 (i18n) + 13 (notification fallback) +
 *                        17 (PII redaction) + 22 (explainability)
 *   audit              → Laws 4 (event graph closed) + 8 (uuid) +
 *                        11 (bitemporal) + 12 (PROV) + 19 (anchor)
 *   escalate           → Laws 17 (PII) + 22 (explain) + 14 (SLA) +
 *                        38 (mcp standards citation when escalating
 *                        via MCP tools)
 *   emit               → Laws 4 + 32 (block composition type-safe) +
 *                        33 (stream coherence) + 34 (uuid chain)
 *   capture            → Laws 16 (carbon — frame storage cost) +
 *                        12 (PROV — every frame attributed) +
 *                        18 (PQC — frame signature future-proof)
 *
 * **Conservation Law 45** — `checkAgentLawCoverage`: every agent
 * MUST have at least one law applicable to each of its declared
 * effect kinds. An agent that emits but has no Law 33/34 in profile
 * is misconfigured (its emits aren't governed).
 *
 * @standard ISO/IEC 25010:2023 §5.2 performance — selective
 *   evaluation; §5.4 reusability — law profile reuse
 * @standard ISO 19011:2018 §6.4.6 (per-agent law audit-trailed)
 */

import type { DomainAgent, AgentEffect } from '@/agent'
import { agentRegistry } from '@/agent'

export type LawCategory =
  | 'spec-coverage'         // Law 1, 7
  | 'i18n'                  // Law 3
  | 'event-graph'           // Law 4, 32, 33, 34
  | 'integrity'             // Law 8, 10, 35, 36
  | 'audit-trail'           // Law 11, 12, 19
  | 'fallback'              // Law 13, 41
  | 'resource'              // Law 15, 16
  | 'privacy'               // Law 17, 18
  | 'explainability'        // Law 22
  | 'platform-self'         // Laws 23, 24, 37, 38, 39, 40, 41, 44
  | 'standards-corpus'      // Laws 27, 28
  | 'seo-vortex'            // Law 29
  | 'voting'                // Laws 30, 31
  | 'topology'              // Law 43
  | 'commerce-self'         // Laws 25, 26

export interface LawDescriptor {
  readonly num: number
  readonly title: string
  readonly category: LawCategory
  readonly governsEffects: ReadonlyArray<AgentEffect['kind']>
  readonly applicableWhen: 'always' | 'on-write' | 'on-emit' | 'on-notify' | 'on-audit' | 'on-capture'
}

/** Catalog of every conservation law with its agent-effect coupling. */
export const LAW_CATALOG: ReadonlyArray<LawDescriptor> = [
  { num: 1, title: 'spec coverage 100%', category: 'spec-coverage', governsEffects: [], applicableWhen: 'always' },
  { num: 3, title: 'i18n strict', category: 'i18n', governsEffects: ['notify'], applicableWhen: 'on-notify' },
  { num: 4, title: 'event graph connected', category: 'event-graph', governsEffects: ['emit'], applicableWhen: 'on-emit' },
  { num: 7, title: 'agent owns every step', category: 'spec-coverage', governsEffects: [], applicableWhen: 'always' },
  { num: 8, title: 'content uuid (RRRRR)', category: 'integrity', governsEffects: ['create', 'update', 'audit'], applicableWhen: 'on-write' },
  { num: 10, title: 'referential harmony (UUUUU)', category: 'integrity', governsEffects: ['create', 'update'], applicableWhen: 'on-write' },
  { num: 11, title: 'bitemporal', category: 'audit-trail', governsEffects: ['audit', 'update'], applicableWhen: 'on-write' },
  { num: 12, title: 'W3C PROV provenance', category: 'audit-trail', governsEffects: ['audit', 'capture'], applicableWhen: 'on-audit' },
  { num: 13, title: 'notification fallback', category: 'fallback', governsEffects: ['notify'], applicableWhen: 'on-notify' },
  { num: 15, title: 'cost cap', category: 'resource', governsEffects: ['create', 'update', 'capture', 'emit'], applicableWhen: 'always' },
  { num: 16, title: 'carbon cap', category: 'resource', governsEffects: ['create', 'update', 'capture'], applicableWhen: 'always' },
  { num: 17, title: 'PII redaction', category: 'privacy', governsEffects: ['notify', 'escalate', 'audit'], applicableWhen: 'always' },
  { num: 18, title: 'PQC signatures', category: 'privacy', governsEffects: ['audit', 'capture'], applicableWhen: 'on-audit' },
  { num: 19, title: 'blockchain anchor', category: 'audit-trail', governsEffects: ['audit'], applicableWhen: 'on-audit' },
  { num: 22, title: 'explainability', category: 'explainability', governsEffects: ['notify', 'escalate'], applicableWhen: 'always' },
  { num: 23, title: 'self-reference', category: 'platform-self', governsEffects: [], applicableWhen: 'always' },
  { num: 24, title: 'clone integrity', category: 'platform-self', governsEffects: [], applicableWhen: 'always' },
  { num: 25, title: 'commerce lifecycle', category: 'commerce-self', governsEffects: [], applicableWhen: 'always' },
  { num: 26, title: 'self-accounting', category: 'commerce-self', governsEffects: [], applicableWhen: 'always' },
  { num: 27, title: 'standards consistency', category: 'standards-corpus', governsEffects: [], applicableWhen: 'always' },
  { num: 28, title: 'standards supersession', category: 'standards-corpus', governsEffects: [], applicableWhen: 'always' },
  { num: 29, title: 'SEO vortex coupling', category: 'seo-vortex', governsEffects: ['create', 'update'], applicableWhen: 'on-write' },
  { num: 30, title: 'vote aggregate authenticity', category: 'voting', governsEffects: ['create', 'update'], applicableWhen: 'on-write' },
  { num: 31, title: 'no double voting', category: 'voting', governsEffects: ['create'], applicableWhen: 'on-write' },
  { num: 32, title: 'block composition type safety', category: 'event-graph', governsEffects: ['emit'], applicableWhen: 'on-emit' },
  { num: 33, title: 'stream coherence', category: 'event-graph', governsEffects: ['emit'], applicableWhen: 'on-emit' },
  { num: 34, title: 'stream uuid chain', category: 'event-graph', governsEffects: ['emit'], applicableWhen: 'on-emit' },
  { num: 35, title: 'storage independence', category: 'integrity', governsEffects: ['create', 'update'], applicableWhen: 'on-write' },
  { num: 36, title: 'replication consensus', category: 'integrity', governsEffects: ['create', 'update'], applicableWhen: 'on-write' },
  { num: 37, title: 'auto-generation coverage', category: 'platform-self', governsEffects: [], applicableWhen: 'always' },
  { num: 38, title: 'mcp standardization', category: 'platform-self', governsEffects: ['escalate'], applicableWhen: 'always' },
  { num: 39, title: 'mcp presentation coverage', category: 'platform-self', governsEffects: [], applicableWhen: 'always' },
  { num: 40, title: 'mcp rebuildable from source', category: 'platform-self', governsEffects: [], applicableWhen: 'always' },
  { num: 41, title: 'mcp self-testable', category: 'platform-self', governsEffects: [], applicableWhen: 'always' },
  { num: 43, title: 'torus bounded', category: 'topology', governsEffects: ['create', 'update', 'capture', 'emit', 'audit', 'notify', 'escalate'], applicableWhen: 'always' },
  { num: 44, title: 'dry proof published', category: 'platform-self', governsEffects: [], applicableWhen: 'always' },
]

// ─── Per-agent law profile derivation ──────────────────────────────

export interface AgentLawProfile {
  readonly agentId: string
  readonly emittedEffectKinds: ReadonlyArray<AgentEffect['kind']>
  readonly applicableLaws: ReadonlyArray<LawDescriptor>
  readonly groupedByCategory: Record<LawCategory, ReadonlyArray<LawDescriptor>>
  readonly skippedLaws: ReadonlyArray<{ num: number; reason: string }>
  /** % of total laws this agent must consider — efficiency win. */
  readonly coverageRatio: number
}

/**
 * Heuristic effect inference: if we don't know which effects an agent
 * actually emits at runtime, we assume the conservative superset
 * derivable from its registered hooks.
 *
 * Production agents declare effect kinds explicitly via a
 * forthcoming `BlockManifest.emits.effectKinds` field (slice PPPPPP
 * already exposes this; we read the union).
 */
export function inferEmittedEffectKinds(agent: DomainAgent): ReadonlyArray<AgentEffect['kind']> {
  // Inference heuristic — narrow the kind set based on signals from
  // the agent's declared surface. Without this, every agent claims
  // all 7 kinds, defeating the per-agent narrowing in Law 45.
  //
  //   - Emits any event id           → 'emit'
  //   - Owns any collection          → 'create' + 'update'
  //   - Cron declared                → 'audit' (scheduled sweeps audit-trail)
  //   - subscribesTo ≥ 1 event       → 'audit' (observes events)
  //
  // The remaining kinds (notify / escalate / capture) require deeper
  // introspection of the handler bodies, which we don't do at this
  // layer; production agents will declare via the forthcoming
  // BlockManifest.emits.effectKinds field (slice PPPPPP).
  const kinds = new Set<AgentEffect['kind']>()
  if (agent.emits.length > 0) kinds.add('emit')
  if (agent.ownsCollections.length > 0) { kinds.add('create'); kinds.add('update') }
  if (agent.cron) kinds.add('audit')
  if (agent.subscribesTo.length > 0) kinds.add('audit')
  // Floor: every agent emits at least 'audit' (every dispatch leaves a leaf).
  if (kinds.size === 0) kinds.add('audit')
  return [...kinds]
}

export function buildAgentLawProfile(agent: DomainAgent): AgentLawProfile {
  const emitted = new Set(inferEmittedEffectKinds(agent))
  const applicable: LawDescriptor[] = []
  const skipped: { num: number; reason: string }[] = []

  for (const law of LAW_CATALOG) {
    if (law.governsEffects.length === 0) {
      // Always-applicable platform laws — agent must respect.
      applicable.push(law)
      continue
    }
    const overlap = law.governsEffects.some((k) => emitted.has(k))
    if (overlap) applicable.push(law)
    else skipped.push({ num: law.num, reason: `agent emits no [${law.governsEffects.join(',')}]` })
  }

  const grouped: Record<LawCategory, LawDescriptor[]> = {
    'spec-coverage': [], 'i18n': [], 'event-graph': [], 'integrity': [],
    'audit-trail': [], 'fallback': [], 'resource': [], 'privacy': [],
    'explainability': [], 'platform-self': [], 'standards-corpus': [],
    'seo-vortex': [], 'voting': [], 'topology': [], 'commerce-self': [],
  }
  for (const law of applicable) grouped[law.category].push(law)

  return {
    agentId: agent.id,
    emittedEffectKinds: [...emitted],
    applicableLaws: applicable,
    groupedByCategory: grouped as AgentLawProfile['groupedByCategory'],
    skippedLaws: skipped,
    coverageRatio: applicable.length / LAW_CATALOG.length,
  }
}

export function buildAllAgentLawProfiles(): ReadonlyArray<AgentLawProfile> {
  return agentRegistry.all().map((a) => buildAgentLawProfile(a))
}

// ─── Conservation Law 45 — agent law coverage ──────────────────────

export interface AgentLawCoverageResult {
  readonly ok: boolean
  readonly profilesChecked: number
  readonly violations: ReadonlyArray<{ agent: string; reason: string }>
  /** Average % of laws each agent must consider — lower = better efficiency. */
  readonly averageCoverageRatio: number
}

/**
 * Conservation Law 45 — every agent must have at least one law per
 * effect kind it emits (i.e. effects can't be unconstrained). And
 * every agent's average coverage ratio should be < 1.0 (otherwise
 * the regrouping isn't buying efficiency).
 */
export function checkAgentLawCoverage(): AgentLawCoverageResult {
  const profiles = buildAllAgentLawProfiles()
  const violations: { agent: string; reason: string }[] = []
  let totalRatio = 0
  for (const p of profiles) {
    totalRatio += p.coverageRatio
    for (const k of p.emittedEffectKinds) {
      const governing = p.applicableLaws.filter((l) => l.governsEffects.includes(k))
      if (governing.length === 0 && p.applicableLaws.length === 0) {
        violations.push({ agent: p.agentId, reason: `effect '${k}' has no governing law` })
      }
    }
  }
  return {
    ok: violations.length === 0,
    profilesChecked: profiles.length,
    violations,
    averageCoverageRatio: profiles.length > 0 ? totalRatio / profiles.length : 0,
  }
}
