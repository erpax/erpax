/**
 * risk — exposure measured against capital, which is the one risk question with a decidable answer.
 *
 * THE LINE, as in [[kyc]] and [[aml]]: nothing here predicts a default. Credit risk is a forecast,
 * and a function returning one would be a number a bank could point at with nothing behind it. What
 * the CRR makes decidable is a RATIO — an exposure against Tier 1 capital — and two thresholds
 * written into the regulation. That is what this computes.
 *
 * THE SAME PATTERN AS STRUCTURING. A single client split across a group of connected clients
 * (Art. 4(1)(39)) sits under the limit while the real exposure sits over it — the identical shape
 * [[aml]] measures as structuring, one regulation over. So exposures are grouped BEFORE they are
 * tested, and testing them ungrouped is the defect.
 *
 * @standard EU 575/2013 (CRR) Art. 392 — definition of a large exposure
 * @standard EU 575/2013 (CRR) Art. 395 — limits to large exposures
 * @standard EU 575/2013 (CRR) Art. 4(1)(39) — group of connected clients
 */
export const atomPath = 'risk' as const

/** Art. 392 — an exposure at or above this share of Tier 1 capital is a LARGE exposure. */
export const LARGE_EXPOSURE_SHARE = 0.1

/** Art. 395(1) — an exposure may not EXCEED this share of Tier 1 capital. */
export const EXPOSURE_LIMIT_SHARE = 0.25

/** One exposure, in minor units. `group` names the connected client it belongs to, if any. */
export interface Exposure {
  readonly client: string
  /** Art. 4(1)(39) — the group of connected clients. Absent means the client stands alone. */
  readonly group?: string
  readonly amount: number
}

/** The key an exposure is aggregated under: its group where it has one, else the client itself. */
export function counterparty(exposure: Exposure): string {
  return exposure.group ?? exposure.client
}

/**
 * Aggregate exposures by connected client. This runs BEFORE any threshold test, because a group
 * split across three names is the whole failure the limit exists to prevent.
 */
export function aggregate(exposures: readonly Exposure[]): ReadonlyMap<string, number> {
  const byParty = new Map<string, number>()
  for (const e of exposures) {
    const key = counterparty(e)
    byParty.set(key, (byParty.get(key) ?? 0) + e.amount)
  }
  return byParty
}

/** The exposure as a share of Tier 1 capital. Zero or negative capital yields Infinity, not NaN. */
export function exposureRatio(amount: number, tier1: number): number {
  if (tier1 <= 0) return Number.POSITIVE_INFINITY
  return amount / tier1
}

/** Art. 392 — reportable as a large exposure. */
export function isLargeExposure(amount: number, tier1: number): boolean {
  return exposureRatio(amount, tier1) >= LARGE_EXPOSURE_SHARE
}

/** Art. 395(1) — over the limit. STRICTLY above: the limit itself is permitted. */
export function breachesLimit(amount: number, tier1: number): boolean {
  return exposureRatio(amount, tier1) > EXPOSURE_LIMIT_SHARE
}

export interface PartyExposure {
  readonly counterparty: string
  readonly amount: number
  readonly ratio: number
  readonly large: boolean
  readonly breach: boolean
}

export interface ConcentrationReport {
  readonly tier1: number
  /** Every counterparty, largest first. */
  readonly parties: readonly PartyExposure[]
  readonly large: readonly PartyExposure[]
  readonly breaches: readonly PartyExposure[]
  /** Total of the LARGE exposures — the figure Art. 394 reporting turns on. */
  readonly largeTotal: number
}

/**
 * The concentration picture: every counterparty aggregated, rated and ordered.
 *
 * Reports `large` and `breaches` as separate lists rather than one severity field, because they are
 * different obligations — a large exposure must be REPORTED (Art. 394) and a breach must be CURED
 * (Art. 396). A single field would let one be mistaken for the other.
 */
export function concentration(exposures: readonly Exposure[], tier1: number): ConcentrationReport {
  const parties: PartyExposure[] = [...aggregate(exposures).entries()]
    .map(([party, amount]) => ({
      counterparty: party,
      amount,
      ratio: exposureRatio(amount, tier1),
      large: isLargeExposure(amount, tier1),
      breach: breachesLimit(amount, tier1),
    }))
    .sort((a, b) => b.amount - a.amount || a.counterparty.localeCompare(b.counterparty))

  const large = parties.filter((p) => p.large)
  return {
    tier1,
    parties,
    large,
    breaches: parties.filter((p) => p.breach),
    largeTotal: large.reduce((sum, p) => sum + p.amount, 0),
  }
}
