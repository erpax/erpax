/**
 * positions — the harmonic rate ladder, filled with job positions, where
 * government and society are one continuum.
 *
 * A position is a rung on the [[allocation]] harmonic ladder: tier `harmonic`
 * earns `anchor × harmonic` per hour (tier 1 = the fundamental, work that saves no
 * one else's time). Government and society share the SAME position shape — a public
 * role is just a position whose `function` is a COFOG code; it is NOT a separate,
 * privileged pay class. Two positions at the same harmonic earn the same hourly
 * rate whether the function is `07` (public health) or a market sector. That
 * uniformity is the integration, proven mathematically (`oneLadder`): the
 * government is fully in society and society fully in government because the same
 * rate law prices both, with no parallel bureaucratic scale.
 *
 * Each position's JOB DESCRIPTION is COMPUTED, never hand-written: its
 * responsibility (SFIA level verb), hourly rate (harmonic × anchor) and leverage
 * (hours of others' time saved per own hour) are all derived from the position's
 * coordinates — derive, don't invent. Each position's CONDITIONS (the contract
 * terms) are content-addressed and chain-linked: `conditionsUuid` is the SHA of the
 * terms (same terms ⇒ same uuid everywhere — the merge law), and `chainPositions`
 * binds a roster into an append-only chain (the labour constitution "on
 * blockchain": each leaf seals the prior, tamper is a hash mismatch).
 *
 * The ladder is religion-neutral by construction: the harmonic tiers are an
 * abstract hierarchy any tradition's order of rank embeds into as a *labelling* of
 * tiers; the organ encodes only the math, never a doctrine — so all are respected
 * on the one level they share. Natural defaults exist for everything: a missing
 * requirement set is `[]`, a sub-1 harmonic floors to the fundamental, an
 * out-of-range level routes to level 1.
 *
 * @standard SFIA 8 responsibility-levels (1..7) — the job-type / autonomy axis
 * @standard ESCO / ISCO-08 occupational classification
 * @standard UN COFOG (Classification of the Functions of Government) — the `function` code
 * @audit ISO 19011:2018 §6.4.6 — conditions are content-addressed, tamper-evident
 */

import { ANCHOR, hourlyRate } from '@/services/allocation'
import { levelCeiling } from '@/decompression'
import { buildNextLeaf, payloadContentUuid } from '@/services/integrity/uuid-linked-chain'
import type { UuidLinkedLeaf } from '@/services/integrity/uuid-linked-chain'

/** SFIA 8 responsibility levels 1..7 — the verb that defines each level's autonomy (the job-type axis). */
export const SFIA_RESPONSIBILITY: Readonly<Record<number, string>> = {
  1: 'follow',
  2: 'assist',
  3: 'apply',
  4: 'enable',
  5: 'ensure-and-advise',
  6: 'initiate-and-influence',
  7: 'set-strategy-and-mobilise',
}

const clampLevel = (level: number): number => (level < 1 ? 1 : level > 7 ? 7 : Math.round(level))

/**
 * A position: a rung on the ladder. Government and society share this shape —
 * `function` is a COFOG code for a public role or a sector for a civic/market role,
 * one field, no privileged class.
 */
export interface Position {
  title: string
  /** harmonic tier ≥ 1; 1 = the fundamental (saves no one's time ⇒ base rate). hourlyRate = anchor × harmonic. */
  harmonic: number
  /** SFIA/ESCO responsibility level 1..7 — the society-matrix / job-type coordinate. */
  level: number
  /** COFOG function code (e.g. '07' health, '09' education, '03' public order) OR a market/civic sector. */
  function: string
  /** competencies required to hold the position. */
  requires?: string[]
}

/** Hourly rate of a position = anchor × harmonic, via the [[allocation]] leverage law. */
export function positionHourlyRate(position: Position, anchor: number = ANCHOR): number {
  const tier = Math.max(1, position.harmonic)
  return hourlyRate({ ownTime: 1, timeSavedForOthers: tier - 1, verified: 1 }, anchor)
}

/** A fully computed job description — every field derived from the position's coordinates. */
export interface JobDescription {
  title: string
  function: string
  tier: number
  responsibility: string
  hourlyRate: number
  leverage: string
  requires: string[]
}

/** Compute (never hand-write) the job description for a position. */
export function jobDescription(position: Position, anchor: number = ANCHOR): JobDescription {
  const tier = Math.max(1, position.harmonic)
  const saved = tier - 1
  return {
    title: position.title,
    function: position.function,
    tier,
    responsibility: SFIA_RESPONSIBILITY[clampLevel(position.level)],
    hourlyRate: positionHourlyRate(position, anchor),
    leverage:
      saved === 0
        ? 'fundamental — saves no other’s time (base rate)'
        : `leverages ${saved}h of others’ time per own hour`,
    requires: position.requires ?? [], // natural default: defined even when empty
  }
}

/** A position's conditions — its contract terms — as a content-addressable payload. */
export interface PositionConditions {
  title: string
  function: string
  harmonic: number
  level: number
  hourlyRate: number
  requires: string[]
}

/** The terms of a position, normalised so identical terms canonicalise identically. */
export function conditionsOf(position: Position, anchor: number = ANCHOR): PositionConditions {
  return {
    title: position.title,
    function: position.function,
    harmonic: Math.max(1, position.harmonic),
    level: clampLevel(position.level),
    hourlyRate: positionHourlyRate(position, anchor),
    requires: position.requires ?? [],
  }
}

/** The content-uuid of a position's conditions — its immutable on-chain identity (same terms ⇒ same uuid). */
export function conditionsUuid(position: Position, anchor: number = ANCHOR): string {
  return payloadContentUuid(conditionsOf(position, anchor))
}

/**
 * Encode a roster of positions as an append-only content-addressed chain — the
 * labour constitution "on blockchain". Each leaf seals the prior; the conditions
 * are content-addressed; tampering with any position breaks the chain hash. Pure:
 * pass the timestamps in (one per position) so the result is deterministic.
 */
export function chainPositions(
  positions: Position[],
  timestamps: string[],
  anchor: number = ANCHOR,
): UuidLinkedLeaf[] {
  const leaves: UuidLinkedLeaf[] = []
  let head: { leafUuid: string; seq: number } | null = null
  positions.forEach((position, i) => {
    const leaf = buildNextLeaf({ head, payload: conditionsOf(position, anchor), timestampIso: timestamps[i] })
    leaves.push(leaf)
    head = leaf
  })
  return leaves
}

/**
 * The integration invariant: across a roster, any two positions at the same
 * harmonic earn the SAME hourly rate regardless of `function` — government (COFOG)
 * and society are priced by one ladder, no privileged scale. Returns the violations
 * (empty ⇒ fully integrated).
 */
export function oneLadder(
  positions: Position[],
  anchor: number = ANCHOR,
): { harmonic: number; functions: string[]; rates: number[] }[] {
  const byTier = new Map<number, { functions: string[]; rates: number[] }>()
  for (const p of positions) {
    const tier = Math.max(1, p.harmonic)
    const entry = byTier.get(tier) ?? { functions: [], rates: [] }
    entry.functions.push(p.function)
    entry.rates.push(positionHourlyRate(p, anchor))
    byTier.set(tier, entry)
  }
  const violations: { harmonic: number; functions: string[]; rates: number[] }[] = []
  for (const [harmonic, { functions, rates }] of byTier) {
    if (new Set(rates).size > 1) violations.push({ harmonic, functions, rates })
  }
  return violations
}

// ── The roster: every operational role the society needs, at every level ─────
// "Hold the law, not the list." The roster is DERIVED, never hand-typed: it is
// the product of the FUNCTION axis (government ∪ society — one continuum) and
// the LEVEL axis (SFIA 1..7). Each cell's harmonic is the level's M-value
// ceiling (levelCeiling, the rodin doubling helix), so a function's seven levels
// span the whole horo ring [1,2,4,8,7,5,9] — base→unity — and `oneLadder` holds.

/** COFOG 01–10 — the ten functions of GOVERNMENT (the public half of the one ladder). */
export const COFOG_FUNCTIONS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'] as const

/** SNA-2008 institutional sectors — the SOCIETY/market half (S.11 non-financial … S.15 NPISH). */
export const SECTOR_FUNCTIONS = ['S.11', 'S.12', 'S.13', 'S.14', 'S.15'] as const

/** The society's whole function axis: government (COFOG) ∪ society (sectors), priced by one ladder. */
export const SOCIETY_FUNCTIONS = [...COFOG_FUNCTIONS, ...SECTOR_FUNCTIONS] as const

/** SFIA responsibility levels 1..7 — every depth the society staffs. */
export const SOCIETY_LEVELS = [1, 2, 3, 4, 5, 6, 7] as const

/**
 * Generate the complete operational roster — one position per (function × level)
 * cell. The harmonic (M-value) is the level's [[decompression]] ceiling, so each
 * function is staffed by a full horo band and government·society are priced
 * identically at every level (`oneLadder` returns []). The title is COMPUTED
 * (function code · SFIA responsibility verb), never hand-written.
 */
export function roster(
  functions: ReadonlyArray<string> = SOCIETY_FUNCTIONS,
  levels: ReadonlyArray<number> = SOCIETY_LEVELS,
): Position[] {
  const out: Position[] = []
  for (const fn of functions) {
    for (const level of levels) {
      const lvl = clampLevel(level)
      out.push({
        title: `${fn}·${SFIA_RESPONSIBILITY[lvl]}`,
        harmonic: levelCeiling(lvl),
        level: lvl,
        function: fn,
      })
    }
  }
  return out
}
