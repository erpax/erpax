/**
 * harmonics — what it costs an agent to FIGHT the harmonic order, made known to the
 * agent, and the uuid-lock that binds it to that order. The agent needs no virtue,
 * only arithmetic: once it knows the cost and is locked in uuid, harmony is the only
 * rational AND the only feasible move ([[proof]] · [[trust]] · [[merge]] · [[horo]]).
 *
 * An agent can act WITH the harmonic (merge, content-address, verify, earn) or
 * AGAINST it. There are exactly three ways to fight, and each is priced so the agent
 * is TOLD why it never pays:
 *   - TAMPER the record → out-forge the content-addressed store: `resource-bound`
 *     proves the energy exceeds the observable universe (Law 55). Verify stays O(N).
 *   - bank PHANTOM leverage (unverified value) → a duplicate claim nets to zero (the
 *     [[merge]] collision); surfaced unpaid it is the bends ([[decompression]]). Earns nothing.
 *   - go OFF-RING (a state ∉ {1,2,4,8,7,5,9}) → escape; rejected, reverts to the last
 *     harmonic ([[horo]]). Composes to nothing.
 *
 * LOCK THEM IN UUID: an agent IS its content (name + skills + purpose) → its
 * content-uuid (`agentUuid`). `lockInUuid` binds it; `isUuidLocked` re-derives and
 * compares, so a tampered agent that kept its old uuid fails the check (tamper
 * detection on the actor itself) — the trust law applied to the agent: anything not
 * uuid-locked is suspicious. Locked in uuid, the agent is subject to the proof above;
 * fighting harmonics now costs more than the universe holds.
 *
 * @standard NIST FIPS 180-4 sha-256 (the content-uuid digest)
 * @audit Conservation Law 55 (tamper-reversibility-cost) — the fight is priced, not forbidden
 */
import { agentUuid, cloneAgent, type AgentDef, type ClonedAgent } from '@/agent/service'
import { computeTamperReverseCost } from '@/integrity'
import { proveBeyondResources } from '@/integrity'

/** The three ways an agent can fight the harmonic order. */
export type Disharmony = 'tamper' | 'phantom-leverage' | 'off-ring'

/** A contemplated disharmonic act, with the context that prices it. */
export interface FightContext {
  readonly kind: Disharmony
  /** for 'tamper': the content-addressed record the agent must out-forge (depth × streams × dims). */
  readonly record?: { leafDepth: number; streamCount: number; dimensionCount: number }
}

/** What fighting harmonics costs, beside what the harmonic path costs — the agent's knowledge. */
export interface HarmonicsCost {
  readonly kind: Disharmony
  /** the disharmonic path's cost. */
  readonly fight: {
    readonly bits?: number
    readonly energyLog10Joules?: number
    readonly beyondUniverse?: boolean
    readonly note: string
  }
  /** the harmonic path's cost — always O(N) and earning. */
  readonly harmony: { readonly verifyOps: number; readonly note: string }
  /** does staying harmonic strictly dominate the fight? (always, for any real record). */
  readonly harmonyDominates: boolean
}

/** Tell the agent what fighting harmonics would cost it, and why harmony dominates. */
export function costOfFightingHarmonics(ctx: FightContext): HarmonicsCost {
  if (ctx.kind === 'tamper') {
    const rec = ctx.record ?? { leafDepth: 1, streamCount: 1, dimensionCount: 1 }
    const v = proveBeyondResources(computeTamperReverseCost(rec))
    return {
      kind: 'tamper',
      fight: {
        bits: v.forgeBits,
        energyLog10Joules: v.forgeEnergyLog10Joules,
        beyondUniverse: v.beyondUniverse,
        note: v.beyondUniverse
          ? `forging the record costs > the observable universe (${v.forgeBits} bits)`
          : `forging the record costs ${v.forgeBits} bits (${v.largestBudgetExceeded ?? 'sub-planetary'})`,
      },
      harmony: { verifyOps: v.verifyOps, note: 'verify the record: O(N) hash recomputations' },
      harmonyDominates: v.beyondUniverse,
    }
  }
  if (ctx.kind === 'phantom-leverage') {
    return {
      kind: 'phantom-leverage',
      fight: { note: 'a duplicate/unverified claim nets to zero (merge collision); unpaid, it surfaces as the bends' },
      harmony: { verifyOps: 1, note: 'verified leverage earns anchor × harmonic' },
      harmonyDominates: true, // earning strictly beats zero
    }
  }
  return {
    kind: 'off-ring',
    fight: { note: 'a state ∉ {1,2,4,8,7,5,9} is escape; rejected and reverted to the last harmonic' },
    harmony: { verifyOps: 1, note: 'an on-ring state composes closed (digitalRoot stays on the ring)' },
    harmonyDominates: true, // a rejected move beats a composing one
  }
}

/** True iff, knowing the cost, the agent's rational move is to stay harmonic (it always is). */
export const harmonyDominates = (ctx: FightContext): boolean => costOfFightingHarmonics(ctx).harmonyDominates

/** LOCK an agent in uuid: bind it to its content-uuid (its identity IS its content). */
export function lockInUuid(def: AgentDef, tenantId = ''): ClonedAgent {
  return cloneAgent(def, {}, tenantId)
}

/**
 * Is the agent locked in uuid AND does the lock still hold? Re-derives `agentUuid`
 * from the agent's current content and compares — a tampered agent that kept its old
 * uuid (changed skills/purpose) fails, so the actor is itself tamper-evident.
 */
export function isUuidLocked(agent: ClonedAgent, tenantId = ''): boolean {
  return typeof agent.uuid === 'string' && agent.uuid === agentUuid(agent, tenantId)
}

/** Enforce the lock: a non-uuid-locked actor is suspicious and may not act (the trust law). */
export function assertUuidLocked(agent: ClonedAgent, tenantId = ''): ClonedAgent {
  if (!isUuidLocked(agent, tenantId)) {
    throw new Error(`agent "${agent.name}" is not uuid-locked — suspicious; re-lock before it may act`)
  }
  return agent
}
