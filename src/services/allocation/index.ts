/**
 * allocation — the math of who gets what, for what.
 *
 * Mechanism design, not policy. Define the rule and "the competition is the rest":
 * agents compete to produce verified value; this organ only PRICES what the
 * competition confirms. No negotiation, no discretion — same work ⇒ same reward
 * (the content-uuid law applied to pay).
 *
 * THE RATE SCALE IS HARMONIC. The base (fundamental) rate is for work that saves
 * no one else's time — own labour only, leverage 1. Everything above base is paid
 * in harmonics of the time a contribution LEVERAGES for others: an hour of your
 * labour that saves a hundred others an hour each is the 101st harmonic of the
 * fundamental, and earns a correspondingly better hourly rate. To raise your pay
 * you raise your harmonic — save more of society's time (build the skill that
 * saves every agent time; see [[generate]]) — so the rule itself stimulates
 * society toward higher-leverage work. The harmonics HARMONISE because the time
 * saved is conserved and verified: you cannot be paid for time you did not save
 * (the competition's verdict gates it), and two contributors cannot both bank the
 * same saved hour (the duplicate-claim / [[merge]] law). Phantom leverage is a
 * collision, not income.
 *
 * Reward = anchor × ( ownTime + verified · timeSavedForOthers ). Own labour is
 * observed and always paid at base; the leverage bonus is paid only to the extent
 * the competition verifies it. Hourly rate = reward / ownTime = anchor × harmonic,
 * so the base worker earns `anchor`/hr and the leverage worker earns strictly more.
 *
 * Two guarantees, proven in `index.test.ts`:
 *   1. those who save no one's time get exactly the base rate; verified leverage
 *      earns a strictly higher hourly rate, monotone in time saved; unverified
 *      leverage earns nothing above base.
 *   2. distribute(pot, …) CONSERVES the pot exactly (Σ shares = pot) — the same
 *      "value is neither created nor destroyed" invariant as double-entry
 *      ([[balance]]), enforced by integer largest-remainder apportionment.
 *
 * The anchor is a UNIT, not a physical claim. `ANCHOR` defaults to the Schumann
 * reference (7.83) so the base is a fixed natural constant, not an arbitrary fiat
 * number — "natural inflation is respected" (inflation = drift of the anchor, not
 * discretionary printing). EVERY property here is invariant to the anchor's value:
 * harmonics, ratios and shares are anchor-free; only absolute amounts scale. That
 * invariance is precisely why the choice of constant (7.83, 432, 1) is a convention
 * — the honest claim is the math, not the frequency.
 *
 * @standard SFIA 8 responsibility-levels (1..7) — job-type categorisation
 * @standard ESCO / ISCO-08 competency framework (skill level)
 * @standard Hamilton (largest-remainder) apportionment — integer fair division
 * @audit ISO 19011 — reward is a deterministic, auditable function (no discretion)
 */

const clamp01 = (x: number): number => (x < 0 ? 0 : x > 1 ? 1 : x)

/** A fixed natural base unit for pay. A CONVENTION (see module note); properties are anchor-invariant. */
export const ANCHOR = 7.83

/** One unit of contributed work, measured in time. */
export interface Work {
  /** hours of the contributor's own labour (observed; always paid at base). Default 0. */
  ownTime?: number
  /** societal hours this work saves others — the leverage; gated by `verified`. Default 0. */
  timeSavedForOthers?: number
  /** the competition's verdict in [0,1]: 0 = unverified savings (base only), 1 = fully verified. Default 0. */
  verified?: number
}

/** The verified societal time a contribution accounts for: own labour + confirmed leverage. Anchor-free. */
function earnedTime(work: Work): number {
  return Math.max(0, work.ownTime ?? 0) + clamp01(work.verified ?? 0) * Math.max(0, work.timeSavedForOthers ?? 0)
}

/**
 * The harmonic of a contribution: the ratio of verified societal time accounted
 * to own labour time. Saving no one's time ⇒ 1 (the fundamental, base rate);
 * saving N own-hours-worth per own-hour ⇒ harmonic 1+N. Defined for ownTime > 0;
 * pure leverage with no own labour is `Infinity` (priced directly by {@link reward}).
 */
export function harmonic(work: Work): number {
  const own = Math.max(0, work.ownTime ?? 0)
  if (own <= 0) return work.timeSavedForOthers ? Infinity : 1 // natural default for no labour
  return earnedTime(work) / own
}

/** Hourly rate = anchor × harmonic. Base workers earn `anchor`/hr; leverage earns strictly more. */
export function hourlyRate(work: Work, anchor: number = ANCHOR): number {
  return anchor * harmonic(work)
}

/**
 * Reward = anchor × (ownTime + verified · timeSavedForOthers). Own labour is always
 * paid at base; the leverage bonus is paid only to the extent the competition
 * verifies it (unverified ⇒ base only). This is "for what" priced: time accounted.
 */
export function reward(work: Work, anchor: number = ANCHOR): number {
  return anchor * earnedTime(work)
}

/**
 * SFIA/ESCO responsibility level → multiplicative weight, for mapping a contributor
 * onto the job-type / society matrix (NOT the pay multiplier — pay tracks leverage,
 * not credentials). A blank or non-positive level routes to the multiplicative
 * identity (1) — the natural default that exists for everything.
 */
export function competencyWeight(level?: number): number {
  if (level == null || level <= 0) return 1 // natural default = identity element
  return level
}

/**
 * Largest-remainder (Hamilton) apportionment: split an integer `pot` (minor units)
 * across `weights` so the shares sum EXACTLY to `pot` — value is conserved. Equal
 * weights ⇒ shares differ by at most 1 (the symmetric 6-around-1 case is the
 * hexagonal/flower-of-life division). All-zero weights ⇒ equal split (the symmetric
 * no-information default — still conserving).
 */
export function apportion(pot: number, weights: number[]): number[] {
  const n = weights.length
  if (n === 0) return []
  const nonNeg = weights.map((w) => Math.max(0, w))
  const total = nonNeg.reduce((s, w) => s + w, 0)
  // natural default: no earned contribution ⇒ symmetric equal split
  const effective = total > 0 ? nonNeg : nonNeg.map(() => 1)
  const effTotal = total > 0 ? total : n
  const exact = effective.map((w) => (pot * w) / effTotal)
  const shares = exact.map(Math.floor)
  const remainder = pot - shares.reduce((s, f) => s + f, 0)
  // hand the leftover integer units to the largest fractional parts (ties: lower index)
  const order = exact
    .map((x, i) => ({ i, frac: x - Math.floor(x) }))
    .sort((a, b) => b.frac - a.frac || a.i - b.i)
  for (let k = 0; k < remainder; k++) shares[order[k].i] += 1
  return shares
}

/**
 * Distribute a fixed integer `pot` across contributions proportional to each one's
 * verified earned time (own labour + confirmed leverage). The pot is conserved
 * (Σ = pot); a contribution with no verified time earns share 0 (unless ALL are
 * empty, then the symmetric default splits equally). This IS "who gets what, for
 * what" as math: who = the contributor, what = their conserved integer share,
 * for-what = verified societal time — and nothing else decides it.
 */
export function distribute(pot: number, contributions: Work[]): number[] {
  return apportion(pot, contributions.map(earnedTime))
}
