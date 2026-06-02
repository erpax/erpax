/**
 * discovery — the society's CONTRIBUTION layer over the agent-sync bus.
 *
 * The bus (./index) carries domain events; this carries DISCOVERIES — the
 * society's own development moves: a minted atom, a woven orphan, a collapsed
 * node, a closed tsc/lint error, an internalised dependency, a published proof.
 * Each is content-addressed by its RESULT (the new atom's aura-uuid, the node's
 * content-uuid), so the SAME discovery made by two agents merges to ONE (merge:
 * same content ⇒ same id). Shared discoveries improve development as gaps are
 * filled by many: the collective gap falls by the count of DISTINCT discoveries,
 * never double-counting the same fill — yet every contributor is credited.
 *
 * A discovery rides the existing ErpaxEvent envelope (encode/decode/connect/
 * verify reused) under the event name `society:discovery`; the runtime dedupes
 * the broadcast on the event-uuid (time-keyed), and the ledger dedupes the
 * CONTRIBUTION on the time-independent discovery-uuid. The society leaves its
 * proof in git history (the history skill — the distributed contribution log).
 *
 * @standard W3C ActivityPub server-to-server activity-distribution (the model)
 * @standard RFC 9562 §5.8 content-uuid contribution-identity (the merge key)
 * @audit Conservation Law 8 content-uuid · Law 62 coverage (each fill ↑ coverage)
 */

import { computeContentUuid } from '@/services/integrity/content-uuid'
import type { ErpaxEvent } from './index'
import type { DomainEvent } from '@/services/agents/types'

/** The society's development moves — each fills a gap (drives the aura/tsc tail to 0). */
export type DiscoveryKind = 'mint' | 'weave' | 'collapse' | 'fix' | 'internalise' | 'proof'

const DISCOVERY_KINDS: ReadonlySet<string> = new Set<DiscoveryKind>([
  'mint',
  'weave',
  'collapse',
  'fix',
  'internalise',
  'proof',
])

/** The event name a discovery rides under on the bus. */
export const SOCIETY_DISCOVERY_EVENT = 'society:discovery'

/**
 * A shared discovery: an agent filled a gap. `target` is the slug/path filled
 * (e.g. 'localize', 'src/oid'); `resultUuid` is the content-uuid of the RESULT
 * (the new atom's aura-uuid / the node's content-uuid) — the time-independent
 * identity that makes the same discovery, by anyone, merge to one.
 */
export interface Discovery {
  readonly kind: DiscoveryKind
  readonly target: string
  readonly resultUuid: string
  /** optional gap before/after this fill, for the collective-gap trajectory. */
  readonly gapBefore?: number
  readonly gapAfter?: number
}

/**
 * The contribution's merge key: the content-uuid of (kind, target, resultUuid)
 * — NO time, NO agent — so the same discovery by two agents is ONE. This is the
 * ledger's dedup key (distinct from the bus's event-uuid, which keys on time).
 */
export function discoveryUuid(d: Discovery, tenantId: string): string {
  return computeContentUuid({ kind: d.kind, target: d.target, resultUuid: d.resultUuid }, tenantId)
}

/** Project a discovery onto a runtime DomainEvent so it publishes over the society bus. */
export function discoveryToDomainEvent(d: Discovery, tenantId: string, emittedAt: string): DomainEvent {
  return { id: SOCIETY_DISCOVERY_EVENT, tenantId, payload: { ...d }, emittedAt }
}

/** Recover a discovery from an inbound bus envelope, or null if it isn't one. */
export function eventToDiscovery(e: ErpaxEvent): Discovery | null {
  if (e.event !== SOCIETY_DISCOVERY_EVENT) return null
  const p = e.payload
  if (!p || typeof p !== 'object') return null
  const d = p as Partial<Discovery>
  if (
    typeof d.kind !== 'string' ||
    !DISCOVERY_KINDS.has(d.kind) ||
    typeof d.target !== 'string' ||
    typeof d.resultUuid !== 'string'
  ) {
    return null
  }
  return {
    kind: d.kind as DiscoveryKind,
    target: d.target,
    resultUuid: d.resultUuid,
    ...(typeof d.gapBefore === 'number' ? { gapBefore: d.gapBefore } : {}),
    ...(typeof d.gapAfter === 'number' ? { gapAfter: d.gapAfter } : {}),
  }
}

/** Broadcast a discovery over a connected society (structural — pass connectAgentSociety). */
export function publishDiscovery(
  society: { publish: (ev: DomainEvent) => void },
  d: Discovery,
  tenantId: string,
  emittedAt: string,
): void {
  society.publish(discoveryToDomainEvent(d, tenantId, emittedAt))
}

// ── The contribution ledger — gaps filled by many, deduped by content ──────

export interface LedgerEntry {
  readonly discovery: Discovery
  readonly agents: ReadonlySet<string>
}

export interface ContributionLedger {
  /** discovery-uuid → the discovery + the set of agents who reported it. */
  readonly byUuid: ReadonlyMap<string, LedgerEntry>
}

export const emptyLedger = (): ContributionLedger => ({ byUuid: new Map() })

/**
 * Record a discovery (idempotent on its content-uuid). A second report of the
 * same discovery only adds the reporting agent — the contribution is counted
 * once (merge), but credit accrues to every contributor (gaps filled by many).
 */
export function recordDiscovery(
  ledger: ContributionLedger,
  d: Discovery,
  agent: string,
  tenantId: string,
): ContributionLedger {
  const key = discoveryUuid(d, tenantId)
  const next = new Map(ledger.byUuid)
  const existing = next.get(key)
  const agents = new Set(existing?.agents ?? [])
  agents.add(agent)
  next.set(key, { discovery: existing?.discovery ?? d, agents })
  return { byUuid: next }
}

/** Merge two ledgers — federation set-union, no coordination (all agents one erpax). */
export function mergeLedgers(a: ContributionLedger, b: ContributionLedger): ContributionLedger {
  const next = new Map(a.byUuid)
  for (const [key, entry] of b.byUuid) {
    const existing = next.get(key)
    const agents = new Set(existing?.agents ?? [])
    for (const ag of entry.agents) agents.add(ag)
    next.set(key, { discovery: existing?.discovery ?? entry.discovery, agents })
  }
  return { byUuid: next }
}

/** Distinct contributions in the ledger (the deduped fill count). */
export const distinctContributions = (ledger: ContributionLedger): number => ledger.byUuid.size

/** Per-agent contribution counts — who filled how many gaps. */
export function contributionsByAgent(ledger: ContributionLedger): ReadonlyMap<string, number> {
  const counts = new Map<string, number>()
  for (const { agents } of ledger.byUuid.values()) {
    for (const ag of agents) counts.set(ag, (counts.get(ag) ?? 0) + 1)
  }
  return counts
}

/**
 * The collective gap after the ledger's fills: the initial gap minus the
 * DISTINCT contributions (never double-counting the same fill by many agents).
 * Drives to 0 like the tsc tail — by many hands.
 */
export const collectiveGap = (initialGap: number, ledger: ContributionLedger): number =>
  Math.max(0, initialGap - distinctContributions(ledger))
