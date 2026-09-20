/**
 * kyc — the level of customer due diligence the law REQUIRES, given declared facts.
 *
 * THE LINE THIS ATOM WILL NOT CROSS: it does not decide whether a customer is laundering money.
 * That is not decidable, and a function claiming it would be the most dangerous thing in this
 * corpus — a green verdict a bank could point at. What IS decidable is which diligence level the
 * directive obliges, given facts someone has already established. This computes that and nothing
 * more ([[rules]]/refutable: a claim must be able to fail; this one fails whenever the facts say so).
 *
 * @standard EU 2015/849 (AMLD4) as amended by EU 2018/843 (AMLD5) — customer due diligence
 * @standard FATF Recommendations 10 · 12 · 22 — CDD, politically exposed persons, DNFBPs
 */
export const atomPath = 'kyc' as const

/** Art. 13 standard · Art. 15–17 simplified · Art. 18–24 enhanced. */
export type DiligenceLevel = 'simplified' | 'standard' | 'enhanced'

/**
 * DECLARED thresholds, in euro. These are facts about the directive, not values derived from
 * anything — they are written here in the open so a member state's stricter floor can be argued
 * with rather than discovered in a hook ([[rules]]/forge: a figure the world assigns is received).
 */
export const THRESHOLD = {
  /** Art. 11(b)(i) — an occasional transaction at or above this triggers CDD. */
  occasionalTransaction: 15000,
  /** Art. 11(b)(ii) — a transfer of funds above this triggers CDD. */
  wireTransfer: 1000,
  /** Art. 11(c) — a cash payment at or above this triggers CDD for traders in goods. */
  cashPayment: 10000,
} as const

/** What has been ESTABLISHED about a customer or a transaction. Every field is someone's finding. */
export interface CustomerFacts {
  /** Art. 20–23 — a politically exposed person, a family member, or a known close associate. */
  readonly politicallyExposed?: boolean
  /** Art. 18a — established in a third country named as high-risk by the Commission. */
  readonly highRiskThirdCountry?: boolean
  /** Art. 13(1)(a) — a business relationship is being established (CDD applies regardless of amount). */
  readonly ongoingRelationship?: boolean
  /** The amount in euro of the occasional transaction, transfer or payment under consideration. */
  readonly amount?: number
  /** The amount is a transfer of funds (Art. 11(b)(ii) band applies). */
  readonly wireTransfer?: boolean
  /** The amount is settled in cash (Art. 11(c) band applies). */
  readonly cash?: boolean
  /** Art. 15–17 — the product, service or channel is documented as lower risk. */
  readonly lowRiskProduct?: boolean
}

const amount = (f: CustomerFacts): number => (typeof f.amount === 'number' && f.amount > 0 ? f.amount : 0)

/** The band the amount falls in, by the kind of movement it is. */
const overBand = (f: CustomerFacts): boolean => {
  const a = amount(f)
  if (a === 0) return false
  if (f.wireTransfer === true) return a > THRESHOLD.wireTransfer
  if (f.cash === true) return a >= THRESHOLD.cashPayment
  return a >= THRESHOLD.occasionalTransaction
}

/**
 * Is CDD owed at all? Art. 11: on establishing a relationship, or on an occasional movement in
 * band. A movement below every band with no relationship and no risk factor owes nothing — and
 * saying so is the point: a gate that answers "yes" to everything tells a bank nothing.
 */
export function dueDiligenceRequired(f: CustomerFacts): boolean {
  return (
    f.ongoingRelationship === true ||
    f.politicallyExposed === true ||
    f.highRiskThirdCountry === true ||
    overBand(f)
  )
}

/**
 * The level the directive obliges.
 *
 * ENHANCED DOMINATES. A PEP or a high-risk third country mandates EDD under Art. 18a and 20–23,
 * and no "lower risk" finding may reduce it — simplified diligence is permitted only where no
 * enhanced trigger is present (Art. 15(1)). Encoding that as an ordered check rather than a score
 * is deliberate: a weighted score lets a strong low-risk signal cancel a mandatory trigger, which
 * is exactly the failure a bank is fined for.
 */
export function diligenceLevel(f: CustomerFacts): DiligenceLevel {
  if (f.politicallyExposed === true || f.highRiskThirdCountry === true) return 'enhanced'
  if (f.lowRiskProduct === true) return 'simplified'
  return 'standard'
}

/** Art. 13(1) — the evidence each level calls for. DECLARED; a bank may require more, never less. */
export const EVIDENCE: Readonly<Record<DiligenceLevel, readonly string[]>> = {
  simplified: ['identity'],
  standard: ['identity', 'address', 'beneficial-owner', 'purpose'],
  enhanced: ['identity', 'address', 'beneficial-owner', 'purpose', 'source-of-funds', 'source-of-wealth', 'senior-approval'],
}

/** What the level calls for and the file does not hold. Order follows EVIDENCE, so it reads as a list. */
export function evidenceMissing(level: DiligenceLevel, produced: readonly string[]): readonly string[] {
  const have = new Set(produced)
  return EVIDENCE[level].filter((e) => !have.has(e))
}

/**
 * Is the file complete for the level? Completeness is a property of the SET OF ITEMS, never of
 * their contents — this cannot tell a forged passport from a real one, and must not be read as
 * though it could.
 */
export function identificationComplete(level: DiligenceLevel, produced: readonly string[]): boolean {
  return evidenceMissing(level, produced).length === 0
}
