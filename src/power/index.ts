/**
 * Power — usage = entropy = power. The realtime proof-of-power core.
 *
 * erpax is a serverless quantum PWA whose realtime CLIENTS are the distributed
 * hardware — as Bitcoin's miners ARE its hashpower. The more the live network is
 * used, the more accumulated entropy, and the higher the cost to decode the private
 * keys (the analog negative, the inverse projection). This module makes that one
 * computation, mapping the LIVE network onto the already-shipped tamper-cost
 * amplifiers — it COMPOSES, never reinvents:
 *
 *   - clients  → CRAQ replicas      (replicationChecks ×, services/tamper-cost)
 *   - features → invariant gates    (invariantChecks +, DeepSeek-Prover ADD)
 *   - events   → coverage           (coverageFromUsage → crackVerdict.coverage)
 *   - events   → chain depth        (computeTamperReverseCost, the linear Law-55 term)
 *   - anchor   → borrowed entropy   (ANCHOR_STRENGTH_BITS; blockchain-pow ⇒ unbounded)
 *
 * `accumulatePower` calls `crackVerdict` ONCE with the raw usage so the amplifiers
 * run inside it (never re-adding terms) — exactly as the shipped `proofTamperCost`
 * (services/proof/dry-proof) is itself a thin `crackVerdict` wrapper. The MAXIMUM it
 * reports is the inverse projection (`projectionProof`): decrypt the private key,
 * blockchain-pow ⇒ unbounded. The 106-bit digest floor (`ERPAX_DIGEST_BITS`) is only
 * the cheaper hash-collision path.
 *
 * Pure + deterministic + NO module-level mutable state (every count is a parameter
 * from the live network), and JCS-safe — `powerLog2` stays finite because
 * `coverageFromUsage` is < 1 for any finite usage, so the bundle content-uuid never
 * breaks ([[identity]]). `strongConsistency` defaults to `true` here (the realtime
 * Durable-Object room is strongly consistent — the documented divergence from
 * `crackVerdict`'s conservative `false` default).
 *
 * @standard NIST SP 800-107r1 §5.1 (hash strengths) · NIST SP 800-57 Part 1 r5 §5.6
 * @audit Conservation Law 55 (tamper cost grows with history; audit stays O(N))
 * @audit Conservation Law 62 (coverage → ∞ ; here driven by live usage)
 * @see src/services/tamper-cost src/services/anchor src/services/proof/projection
 */

import { crackVerdict, invariantChecks, replicationChecks, ERPAX_DIGEST_BITS, type CrackVerdict } from '@/services/tamper-cost'
import { ANCHOR_STRENGTH_BITS, anchoredFloorLog2, type AnchorKind } from '@/services/anchor'
import { computeTamperReverseCost } from '@/services/integrity/tamper-reverse-cost'
import { projectionProof, type ProjectionProof } from '@/proof/projection'
import { matrixDigest } from '@/services/uuid-matrix'

/** A snapshot of the live network — the hardware that accumulates power. */
export interface UsageSnapshot {
  /** live realtime clients = CRAQ replicas (the distributed hardware) */
  readonly clients: number
  /** accumulated usage events = entropy: drives coverage AND the linear history depth */
  readonly events: number
  /** computed features in play = invariant gates (DeepSeek-Prover ADD) */
  readonly features: number
  /** independent streams = the base check count */
  readonly streams: number
  /** dimensional plugins = the reverse-cost width */
  readonly dimensions: number
  /** CRAQ strong consistency — true here (the realtime DO room has no stale-read window) */
  readonly strongConsistency?: boolean
  /** the external anchor erpax borrows; default blockchain-pow ⇒ unbounded */
  readonly anchor?: AnchorKind
}

export interface PowerReading {
  /** log2 ops to forge undetectably at this usage — the accumulated power, grows with usage */
  readonly powerLog2: number
  /** the honest cheapest-forge floor = min(digest, anchor) (always finite) */
  readonly floorLog2: number
  /** which path binds the floor */
  readonly binding: CrackVerdict['binding']
  /** effective independent uuid-checks a tamper must evade (= usageChecks) */
  readonly checks: number
  /** coverage derived from usage (→1 as events→∞) */
  readonly coverage: number
  /** log2 years for the whole Bitcoin network to pay powerLog2 */
  readonly bruteYearsLog2: number
  /** the linear Law-55 history term (computeTamperReverseCost.totalBits) — grows with events */
  readonly historyBits: number
  /** the MAXIMUM — the inverse projection (decrypt the private key / the analog negative) */
  readonly maximum: ProjectionProof
  readonly note: string
}

/**
 * Coverage from usage: events / (events + corpusNodes). Saturating — 0 at no usage,
 * strictly increasing, < 1 for any finite usage (so the cost stays finite + JCS-safe),
 * and → 1 only as events → ∞. The corpus size is the whole-matrix node count.
 */
export function coverageFromUsage(events: number, corpusNodes: number = matrixDigest().nodes): number {
  const e = Math.max(events, 0)
  return e / (e + Math.max(corpusNodes, 1))
}

/**
 * The effective independent-check count a coherent tamper must evade, composed from
 * the real amplifiers: features ADD invariant gates onto the stream base, then live
 * clients MULTIPLY (CRAQ replicas) under strong consistency. Mirrors exactly what
 * `crackVerdict` computes internally for the same usage.
 */
export function usageChecks(u: UsageSnapshot): number {
  return replicationChecks(invariantChecks(Math.max(u.streams, 1), u.features), Math.max(u.clients, 1), u.strongConsistency ?? true)
}

/** Compute the platform's accumulated tamper-power from a live usage snapshot. */
export function accumulatePower(u: UsageSnapshot): PowerReading {
  const anchor = u.anchor ?? 'blockchain-pow'
  const strongConsistency = u.strongConsistency ?? true
  const coverage = coverageFromUsage(u.events)
  // One crackVerdict call with the raw usage — the amplifiers run inside it.
  const v = crackVerdict({
    coverage,
    checks: Math.max(u.streams, 1),
    invariants: u.features,
    replicas: Math.max(u.clients, 1),
    strongConsistency,
    anchorStrengthBits: ANCHOR_STRENGTH_BITS[anchor],
  })
  // The linear Law-55 cascade term — grows with history depth (events ≥ 1).
  const history = computeTamperReverseCost({
    leafDepth: Math.max(u.events, 1),
    streamCount: Math.max(u.streams, 1),
    dimensionCount: Math.max(u.dimensions, 1),
  })
  return {
    powerLog2: v.crackCostLog2,
    floorLog2: anchoredFloorLog2(anchor, ERPAX_DIGEST_BITS),
    binding: v.binding,
    checks: usageChecks(u),
    coverage,
    bruteYearsLog2: v.bruteYearsLog2,
    historyBits: history.totalBits,
    maximum: projectionProof(anchor),
    note:
      'Accumulated tamper-power from live usage: clients ⇒ replicas, features ⇒ invariant gates, events ⇒ coverage + history. powerLog2 grows with usage toward the anchor; the MAXIMUM is the inverse projection (decrypt the private key / analog negative): blockchain-pow ⇒ unbounded.',
  }
}

/** Does usage `after` strictly accumulate more power than usage `before`? (usage ⇒ power) */
export function powerStrictlyGrows(before: UsageSnapshot, after: UsageSnapshot): boolean {
  return accumulatePower(after).powerLog2 > accumulatePower(before).powerLog2
}
