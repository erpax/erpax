/**
 * patent/prior — the expired public record, as working §102 art.
 *
 * [[patent]] has the invalidity machinery — `anticipatedBy` · `isObvious` · `isAbstractMath` — and
 * **no art to run it on**. A gate with no corpus is a gate that never fires ([[rules]]/unraised), so
 * this atom supplies the one body of prior art that needs no permission to publish: **patents whose
 * term has expired**.
 *
 * The register is Tesla's foundational grants. They are the right seed for three reasons, and each
 * is checkable rather than reverent:
 *
 * 1. **Every one is expired**, so the entire body is public domain. That is not asserted here — it is
 *    computed by `expired()` from the grant year against any term rule that has ever applied
 *    (17 years from grant, 20 from filing). A 19th-century grant is expired under all of them.
 * 2. **The number IS the citation.** Each row's `number` resolves at the USPTO, so a reader checks a
 *    row rather than trusting it — the [[rules]]/reference law applied to a patent instead of a path.
 * 3. **One of them is this corpus's own [[rodin]]/phase.** US 381,968 claims the rotating magnetic
 *    field produced by polyphase currents — the 120° offset that atom computes. The link between the
 *    corpus and the patent record is a specific document, not an atmosphere.
 *
 * ## What this is FOR — defensive, and it is the security use
 *
 * An expired disclosure anticipates any later claim to the same content (§102). So a register of
 * expired grants is a standing **anticipation set**: a modern claim reading on polyphase rotating
 * fields, resonant tuned-circuit coupling, or radio remote control is anticipated by a public
 * document from the 1890s. That is the defensive half of [[patent]] — it removes a monopoly risk
 * rather than creating one — and it is the only sense in which any of this "increases security".
 *
 * ## What is DEMONSTRATED and what is not
 *
 * A granted patent proves that a claim was **filed, examined and published on a date**. It proves
 * nothing about whether the thing works. The register keeps the two apart:
 *
 * - `deployed` — the polyphase AC system became the world's electrical grid. Historical fact.
 * - `undemonstrated` — global power transmission through the earth (Wardenclyffe) was never
 *   demonstrated at scale; the patent is real, the working system never existed.
 *
 * Conflating the two is the exact move [[convention]]/discern refuses: a grant is a verdict about a
 * document, never a verdict about nature.
 *
 * @law an expired grant is public-domain prior art, and its number is its citation. A patent proves a
 *      claim was filed and published on a date — never that the claim works.
 * @invariant every row in the register is expired under every patent term rule that has applied
 * @invariant a row is `deployed` or `undemonstrated`, never both — the grant does not decide it
 * @standard 35 U.S.C. §102 — novelty; a prior public disclosure anticipates
 * @standard 35 U.S.C. §154 — patent term (20 years from filing; 17 from grant pre-1995)
 * @see ./SKILL.md -- ../index.ts -- ../../rodin/phase
 */

/** How a claim fared in the world, which the grant itself does not say. */
export type Realisation = 'deployed' | 'undemonstrated'

/** One expired grant. `number` is the citation — it resolves at the USPTO, so a reader checks it. */
export interface Grant {
  readonly number: string
  readonly title: string
  /** year of grant — the date the disclosure became public, which is what §102 turns on */
  readonly granted: number
  readonly realisation: Realisation
  /** what a later claim would have to avoid reading on */
  readonly discloses: string
}

/**
 * The register.
 *
 * Held to grants whose number and subject are firmly established. It is DECLARED, not scraped: a
 * fabricated row would be worse than a missing one, and the register's value is that every line
 * survives being looked up.
 */
export const EXPIRED_ART: readonly Grant[] = [
  {
    number: 'US 381,968',
    title: 'Electro-Magnetic Motor',
    granted: 1888,
    realisation: 'deployed',
    discloses: 'the rotating magnetic field produced by polyphase alternating currents — the induction motor; the 120° phase offset computed in rodin/phase',
  },
  {
    number: 'US 382,280',
    title: 'Electrical Transmission of Power',
    granted: 1888,
    realisation: 'deployed',
    discloses: 'polyphase transmission of power from generator to motor over separate circuits',
  },
  {
    number: 'US 511,916',
    title: 'Electric Generator',
    granted: 1894,
    realisation: 'deployed',
    discloses: 'generation of alternating currents of a defined frequency by a mechanical oscillator',
  },
  {
    number: 'US 613,809',
    title: 'Method of and Apparatus for Controlling Mechanism of Moving Vessels or Vehicles',
    granted: 1898,
    realisation: 'deployed',
    discloses: 'control of a remote vehicle by transmitted electrical waves — radio remote control, and a tuned receiver responding only to its own signal',
  },
  {
    number: 'US 645,576',
    title: 'System of Transmission of Electrical Energy',
    granted: 1900,
    realisation: 'undemonstrated',
    discloses: 'transmission of energy through the earth between elevated terminals with tuned resonant circuits',
  },
  {
    number: 'US 649,621',
    title: 'Apparatus for Transmission of Electrical Energy',
    granted: 1900,
    realisation: 'undemonstrated',
    discloses: 'the resonant transformer (the Tesla coil) as the transmitting apparatus for the above',
  },
  {
    number: 'US 787,412',
    title: 'Art of Transmitting Electrical Energy Through the Natural Mediums',
    granted: 1905,
    realisation: 'undemonstrated',
    discloses: 'earth-resonance transmission at a frequency tuned to the planet as a conductor',
  },
  {
    number: 'US 1,061,206',
    title: 'Turbine',
    granted: 1913,
    realisation: 'deployed',
    discloses: 'the bladeless boundary-layer turbine — smooth parallel discs driven by fluid adhesion and viscosity',
  },
  {
    number: 'US 1,119,732',
    title: 'Apparatus for Transmitting Electrical Energy',
    granted: 1914,
    realisation: 'undemonstrated',
    discloses: 'the elevated-terminal transmitter (the Wardenclyffe design), filed 1902',
  },
]

/**
 * The longest patent term that has ever applied in the US is 20 years from filing (35 U.S.C. §154);
 * before 1995 it was 17 years from grant. Grant year is the later of the two anchors available here,
 * so `granted + 20` is a strict upper bound on expiry — no row can be live under any rule.
 */
export const MAX_TERM_YEARS = 20

export function expired(g: Grant, asOfYear: number): boolean {
  return g.granted + MAX_TERM_YEARS < asOfYear
}

/** Every row, or the register is not fit for the purpose it claims. */
export function allExpired(asOfYear: number): boolean {
  return EXPIRED_ART.every((g) => expired(g, asOfYear))
}

/**
 * §102 anticipation over the register, by subject matter.
 *
 * A later claim reading on a disclosed subject is anticipated by the earliest grant that discloses
 * it. Matching is on DECLARED keywords supplied by the caller — never inferred from the prose,
 * because a pattern over English is a guess, and this returns a legal-shaped answer.
 */
export function anticipatedBySubject(keywords: readonly string[], filedYear: number): Grant | undefined {
  if (keywords.length === 0) return undefined
  const hits = EXPIRED_ART.filter(
    (g) => g.granted < filedYear && keywords.every((k) => g.discloses.toLowerCase().includes(k.toLowerCase())),
  )
  return hits.sort((a, b) => a.granted - b.granted)[0]
}

/** The rows whose claim became a working system, and the rows whose claim did not. Never both. */
export function deployed(): readonly Grant[] {
  return EXPIRED_ART.filter((g) => g.realisation === 'deployed')
}

export function undemonstrated(): readonly Grant[] {
  return EXPIRED_ART.filter((g) => g.realisation === 'undemonstrated')
}

export class GrantOverClaim extends Error {
  constructor(claim: string) {
    super(
      `patent/prior: over-claim — "${claim}". A granted patent proves a claim was filed, examined and ` +
        'published on a date. It is not evidence that the claim works, and it never was: the register ' +
        'marks realisation separately for exactly this reason.',
    )
    this.name = 'GrantOverClaim'
  }
}

/** Refuse the inference from "patented" to "works" — the one mistake this register exists to prevent. */
export function assertGrantClaim(claim: string): void {
  const lowered = claim.toLowerCase()
  const patented = /patent(ed)?|grant(ed)?|us ?\d/.test(lowered)
  const works = /prov(es|en)|works|demonstrat|therefore real|free energy|unlimited/.test(lowered)
  if (patented && works) throw new GrantOverClaim(claim)
}
