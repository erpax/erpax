/**
 * decompression — the matter-twin of the `decompression` skill: the TIME
 * dynamics of pay. [[allocation]] prices a contribution the instant the
 * competition verifies it; decompression prices the *ascent to that price* —
 * how a leverage claim off-gasses into verified income one half-time at a time,
 * bounded by the M-value, before the period may [[close]].
 *
 * The whole of pay is three composed laws, one per scale:
 *   - [[allocation]]  — the RATE:  hourlyRate = ANCHOR × harmonic   (static, per verified hour)
 *   - positions       — the LADDER: harmonic = the role's M-value    (which rung)
 *   - decompression   — the ASCENT: harmonic(n) climbs base → M-value as the claim off-gasses
 *
 * ## On-gas a claim, off-gas it into pay (the dive ledger)
 * Declaring leverage is DESCENDING into pressure: you on-gas a debt of
 * UNVERIFIED value (the gap between base pay and the role's M-value ceiling).
 * The competition then verifies it cycle by cycle — each verification half-time
 * off-gasses HALF the remaining gap, so the earned harmonic runs
 * `1 + (1−2⁻ⁿ)·(M−1)` — asymptotic to the M-value, NEVER instant (after 6
 * half-times it is 98.44% cleared, the practical surface). The unpaid remainder
 * is the **decompression debt**: conserved, and it MUST off-gas (be verified)
 * before a period may [[close]]. Try to surface with the debt unpaid — bank
 * leverage the competition never confirmed — and it shows as the bends: a
 * phantom-leverage collision, not income (the same gate [[allocation]] sets with
 * `verified ∈ [0,1]`, here given its time-shape).
 *
 * ## The anchor is Schumann; the ceiling walks the rodin helix
 * `ANCHOR` is the Schumann reference (7.83) borrowed from [[allocation]] — the
 * base unit, a CONVENTION (every fraction here is anchor-free; only absolute
 * amounts scale). The M-value ceiling per SFIA responsibility level is the
 * [[horo]] ring digit at that depth — `levelCeiling` walks the rodin ×2 doubling
 * helix `1·2·4·8·7·5·9` (base·share·weave·CREST·descent·round·UNITY): leverage
 * roughly doubles per level to the crest (level 4 ⇒ M-value 8), then the descent
 * folds back toward the governing unity (level 7 ⇒ 9, the 3·6·9 close that
 * governs, not flows). So a function's seven levels ARE a full horo band.
 *
 * ## Gradient factors band the ascent; the team {1,2,3} shares the debt
 * **Gradient factors** (`gfLo` first-stop, `gfHi` surface) throttle how much of
 * the off-gassed fraction you may bank early — conservatism opened lo→hi as you
 * ascend, never crossing the M-value. The basic dive teams are sizes 1·2·3
 * (cave·recreational·technical = [[self]]·[[duality]]·[[trinity]], see
 * `services/agent/team`): a solo carries its whole decompression debt; a buddy
 * pair or trinity SHARES it (`sharedDebt`) — redundancy is team size.
 *
 * @standard Haldane half-time model (idealised compartments double 5·10·20·40)
 * @standard Bühlmann ZH-L16 — 16 compartments, gradient-factor / M-value theory
 * @standard SFIA 8 responsibility-levels (1..7) — the M-value depth axis
 * @audit ISO 19011 — pay-over-time is a deterministic, auditable curve (no discretion)
 */

import { ANCHOR } from '@/services/allocation'
import { HORO_DIGITS, type HoroStep } from '@/services/horo'
import { basicTeams } from '@/services/agent/team'

const clamp01 = (x: number): number => (x < 0 ? 0 : x > 1 ? 1 : x)

/** Conservatism band on the ascent: bank `gfLo` of the off-gassed fraction at the first stop, opening to `gfHi` at the surface. */
export interface GradientFactors {
  /** first-stop fraction banked [0,1]; default 1 (no throttle). */
  gfLo?: number
  /** surface fraction banked [0,1]; default 1 (no throttle). */
  gfHi?: number
}

/**
 * The off-gassing curve: half the remaining gap clears per half-time —
 * `1 − 2⁻ⁿ`, asymptotic to unity, NEVER reaching it. n is verification
 * half-times (n=0 ⇒ 0, base only; n=6 ⇒ 0.984375; n→∞ ⇒ 1, the M-value).
 */
export function saturate(halfTimes: number): number {
  const n = Math.max(0, halfTimes)
  return 1 - 2 ** -n
}

/** After 6 half-times a tissue is ~98.44% saturated — the practical "cleared to surface" threshold. */
export const SATURATION_HALFTIMES = 6
const CLEARED_FRACTION = 1 - 2 ** -SATURATION_HALFTIMES // 0.984375

/**
 * The M-value of an SFIA responsibility level (1..7): the leverage CEILING the
 * level tolerates, read off the [[horo]] ring (the rodin ×2 doubling helix).
 * level 1 ⇒ 1 (base), 4 ⇒ 8 (crest), 7 ⇒ 9 (unity); a function's seven levels
 * span the whole ring. Out-of-range clamps into the band.
 */
export function levelCeiling(level: number): HoroStep {
  const i = level < 1 ? 0 : level > 7 ? 6 : Math.round(level) - 1
  return HORO_DIGITS[i]
}

/** Gradient-factor multiplier in [0,1]: opens linearly from `gfLo` (no off-gas) to `gfHi` (full off-gas). */
export function gradientFactor(saturation: number, gf: GradientFactors = {}): number {
  const s = clamp01(saturation)
  const lo = clamp01(gf.gfLo ?? 1)
  const hi = clamp01(gf.gfHi ?? 1)
  return clamp01(lo + (hi - lo) * s)
}

/** Fraction of the leverage claim banked after n half-times, throttled by the GF band. Default GF ⇒ exactly `saturate(n)`. */
export function verifiedFraction(halfTimes: number, gf: GradientFactors = {}): number {
  const s = saturate(halfTimes)
  return clamp01(s * gradientFactor(s, gf))
}

/**
 * The harmonic at a verified FRACTION of the claim: climbs from the fundamental
 * (1, fraction 0) toward the M-value ceiling (fraction 1). `1 + f·(M−1)`. The
 * shared core — the fraction is whatever the competition has confirmed, whether
 * it comes from time off-gassing ({@link verifiedFraction}) or from a [[train]]ed
 * actor's efficiency (the competency match-score). M is never exceeded (the bends bound).
 */
export function harmonicAtFraction(mValue: number, fraction: number): number {
  const m = Math.max(1, mValue)
  return 1 + clamp01(fraction) * (m - 1)
}

/** Hourly pay at a verified fraction = ANCHOR × {@link harmonicAtFraction}. The single pricing curve, fraction-driven. */
export function rateAtFraction(mValue: number, fraction: number, anchor: number = ANCHOR): number {
  return anchor * harmonicAtFraction(mValue, fraction)
}

/**
 * The harmonic actually EARNED at half-time n: the fraction is the off-gassing
 * curve {@link verifiedFraction}. n=0 ⇒ 1 (base); n→∞ ⇒ M (never exceeded).
 */
export function dynamicHarmonic(mValue: number, halfTimes: number, gf: GradientFactors = {}): number {
  return harmonicAtFraction(mValue, verifiedFraction(halfTimes, gf))
}

/** Hourly pay at half-time n = ANCHOR × the saturating harmonic. Base (`anchor`) at n=0; → `anchor × M` as n→∞. */
export function dynamicHourlyRate(
  mValue: number,
  halfTimes: number,
  anchor: number = ANCHOR,
  gf: GradientFactors = {},
): number {
  return anchor * dynamicHarmonic(mValue, halfTimes, gf)
}

/**
 * The decompression debt at half-time n: the unpaid (still-unverified) leverage,
 * in anchor-hours per hour. `anchor × (M − earnedHarmonic) = anchor·(1−vf)(M−1)`.
 * Full at n=0, off-gasses to 0. CONSERVED: debt(n) + bonusEarned(n) = the whole
 * leverage bonus, always — value is neither created nor destroyed ([[balance]]).
 */
export function decompressionDebt(
  mValue: number,
  halfTimes: number,
  anchor: number = ANCHOR,
  gf: GradientFactors = {},
): number {
  const m = Math.max(1, mValue)
  return anchor * (m - dynamicHarmonic(m, halfTimes, gf))
}

/**
 * May the period [[close]]? Only once the claim has off-gassed past the
 * saturation threshold (≥ 6 half-times, ~98.44% verified). Surfacing earlier
 * leaves a decompression debt unpaid — the bends. With a throttling GF the
 * surface fraction may never reach the threshold; then it can never honestly close.
 */
export function isCleared(halfTimes: number, gf: GradientFactors = {}): boolean {
  return verifiedFraction(halfTimes, gf) >= CLEARED_FRACTION
}

/**
 * Team redundancy on the {1,2,3} basis: how many members can carry the
 * decompression debt. A solo (cave, 1) carries it whole; a buddy pair (2) or
 * trinity (3) shares it. Any larger team is a group of basic teams — redundancy
 * is the member count (≥ 1).
 */
export function teamRedundancy(size: number): number {
  return basicTeams(size).length === 0 ? 1 : Math.max(1, Math.floor(size))
}

/** The decompression debt borne by EACH member after the team shares it — `totalDebt / teamRedundancy(size)`. */
export function sharedDebt(totalDebt: number, size: number): number {
  return totalDebt / teamRedundancy(size)
}
