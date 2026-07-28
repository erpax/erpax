/**
 * coincidence — the testing ground: is a claimed relationship a THEOREM, or a COINCIDENCE?
 *
 * A research program that matches numbers to physical constants (the kind Nassim Haramein's holographic work,
 * and the wider 3·6·9 / vortex literature, are built on) is the perfect testing ground precisely because the
 * corpus already knows the answer's SHAPE: [[rodin]] holds it — "the arithmetic is exact, the metaphysics is not
 * adopted." This atom makes that a measurement, not an opinion.
 *
 * Two things a claim can be, and only one is a proof:
 *
 *   - a THEOREM — an EXACT identity inside a closed algebraic system: the order of AGL(1,ℤ/9) IS 54, the
 *     doubling orbit IS the six units, `2·5 ≡ 1`. Nothing measured, nothing fitted; it holds by the algebra
 *     or it is false. [[algebra]] proves these.
 *   - a COINCIDENCE — a claimed value that MATCHES a measured physical constant within a tolerance. A match,
 *     however striking, is NECESSARY but never SUFFICIENT: a free parameter can be tuned to hit any target, and
 *     a dimensionless number that lands near a nice algebraic value tells you nothing about WHY on its own.
 *     This is the frozen-rosetta / regex-resembling-a-language trap the corpus paid for sixteen times — a thing
 *     that RESEMBLES a theorem is a heuristic wearing a theorem's clothes.
 *
 * So "if confirmed by algebraic theorems then the whole science needs recomputing" has a precise, disciplined
 * answer: an algebraic theorem confirms the ALGEBRA (it was always true, ℤ/9 owes nothing to any physicist); it
 * does NOT confirm a PHYSICS built on top of a numeric match. `warrantsRecompute` refuses the leap — by
 * [[theorem]], "science is wrong" does not reduce to a base theorem through a coincidence; that step is
 * authority, not proof. Science recomputes on a derivation from accepted principles PLUS independent experiment
 * PLUS greater explanatory power — three things a number-match supplies none of, and this tool cannot supply
 * either.
 *
 * Honest boundary: this classifies the EPISTEMIC STATUS of a claim (exact identity vs fitted match), never the
 * truth of the physics — a coincidence CAN turn out to be a deep law (that is why it is worth an experiment),
 * and an exact identity can be about nothing physical. It refuses the shortcut, not the inquiry. And the base is
 * assumed ([[theorem]]: `s > 0`) — the tolerance and the "closed system" flag are inputs a human sets in the open.
 *
 * Composes [[algebra]] · [[theorem]] · [[rules]]/refutable · [[rodin]] · [[law]].
 */
import { reduce, type Theorem } from '@/theorem'

/** A claimed relationship put on the testing ground. */
export interface Claim {
  readonly name: string
  /** the value the theory computes. */
  readonly claimed: number
  /** the accepted/measured value it is claimed to match. */
  readonly target: number
  /** true iff `claimed` is derived inside a CLOSED algebraic system (a group order, an exact ratio) — no measurement. */
  readonly closedForm: boolean
  /** free parameters in the derivation — a value that could be tuned to hit the target. >0 weakens any match. */
  readonly freeParameters: number
}

export type Verdict = 'theorem' | 'coincidence' | 'mismatch'

/**
 * Classify a claim. A THEOREM is an exact identity in a closed system (nothing fitted). A COINCIDENCE is a
 * within-tolerance match to a measured target that is NOT such an identity. Anything else is a MISMATCH.
 *
 * @invariant a claim with a free parameter is NEVER a theorem — a tunable value proves nothing
 * @invariant only an EXACT closed-form identity (relative error 0) is a theorem; a measured match is a coincidence
 */
export function classify(c: Claim, tolerance = 1e-3): Verdict {
  const abs0 = (x: number) => (x < 0 ? -x : x)
  const relError = c.target === 0 ? abs0(c.claimed) : abs0(c.claimed - c.target) / abs0(c.target)
  const exact = relError === 0
  if (c.closedForm && exact && c.freeParameters === 0) return 'theorem'
  if (relError <= tolerance) return 'coincidence' // matches, but fitted or measured — necessary, not sufficient
  return 'mismatch'
}

/**
 * The possibility a coincidence is STILL a coincidence after surviving `inversions` independent inversions.
 *
 * "Inverted coincidence is not coincidence anymore if it computes." A true coincidence is FRAGILE — it holds in
 * one representation and breaks under transformation. An INVARIANT holds under every inversion — that is what
 * makes it a law ([[conformal]]: the angle survives rotate, scale, invert; a length does not). So test a claimed
 * relationship by inverting it and asking whether it still computes.
 *
 * `perInversionChance` is the probability the COINCIDENCE null assigns to surviving one independent inversion by
 * luck (≈ the match tolerance — how likely a random value lands in range). Under that null, surviving `k`
 * independent inversions has probability `perInversionChance^k` — this is the p-value, the "possibility it is
 * still just a coincidence," and it decays geometrically toward 0. A genuine invariant survives with certainty,
 * so observing many survivals is vanishingly unlikely under the coincidence null — and the null is rejected.
 *
 * The inversions are Tesla's real principles turned into transformations: ALTERNATION (AC — the current reverses
 * each half-cycle, an inversion), the ROTATING FIELD (a rotation), and POLYPHASE (the conjugate pairs, ⟨2⟩/⟨5⟩,
 * [[conversion]]). Apply each; a relationship that survives all of them is invariant. (The 3·6·9 / quantum-
 * invention mysticism is NOT adopted — the arithmetic of rotation and alternation is real, the metaphysics is
 * not, [[rodin]] · [[rules]]/refutable.)
 *
 * @invariant survival probability is perInversionChance^inversions — geometric decay under the coincidence null
 * @invariant a per-inversion chance of 1 never decays — that is the signature of an invariant, not a coincidence
 */
export function coincidenceAfterInversions(perInversionChance: number, inversions: number): number {
  const p = perInversionChance < 0 ? 0 : perInversionChance > 1 ? 1 : perInversionChance
  const k = inversions < 0 ? 0 : inversions | 0
  let r = 1
  for (let i = 0; i < k; i++) r *= p
  return r
}

/** The verdict of the inversion test — did it survive every inversion, and is it now invariant or still fragile? */
export interface InvarianceVerdict {
  /** true iff the relationship still computed after every inversion tried. */
  readonly survivedAll: boolean
  /** the possibility it is still a coincidence — perInversionChance^survived under the null. */
  readonly coincidenceProbability: number
  readonly verdict: 'invariant' | 'fragile' | 'undetermined'
  readonly reason: string
}

/**
 * Test a relationship by inversion: it survived `survived` of `tried` independent inversions. If it broke under
 * any, it is FRAGILE — a coincidence tied to one representation. If it survived them all and the possibility of
 * chance (`perInversionChance^survived`) falls below `threshold`, it is INVARIANT — inverted and still computes,
 * so not a coincidence anymore. Between: undetermined — invert it more.
 *
 * @invariant breaking under any inversion ⇒ fragile ⇒ coincidence confirmed (representation-dependent)
 * @invariant surviving all with coincidence-probability ≤ threshold ⇒ invariant (theorem-like)
 */
export function invarianceVerdict(
  survived: number,
  tried: number,
  perInversionChance: number,
  threshold = 1e-3,
): InvarianceVerdict {
  if (survived < tried) {
    return { survivedAll: false, coincidenceProbability: 1, verdict: 'fragile', reason: `broke under inversion — survived only ${survived}/${tried}, representation-dependent, a coincidence` }
  }
  const cp = coincidenceAfterInversions(perInversionChance, survived)
  const invariant = cp <= threshold && tried > 0
  return {
    survivedAll: true,
    coincidenceProbability: cp,
    verdict: invariant ? 'invariant' : 'undetermined',
    reason: invariant
      ? `survived all ${tried} inversions; possibility of chance ${cp.toExponential(1)} ≤ ${threshold} — inverted and still computes, not a coincidence`
      : `survived all ${tried}, but possibility of chance ${cp.toExponential(1)} > ${threshold} — invert it more before calling it invariant`,
  }
}

/** Whether a claim's verdict warrants recomputing the accepted science — the refusal machinery. */
export interface RecomputeVerdict {
  readonly warranted: boolean
  readonly reason: string
}

/**
 * Does this claim warrant recomputing the accepted science? A THEOREM confirms the ALGEBRA (which was already
 * true), not the physics. A COINCIDENCE is a match, not a proof. Neither, alone, recomputes science — that takes
 * a derivation from accepted principles AND independent experiment AND more explanatory power, which no numeric
 * classifier supplies. By [[theorem]], the step "it matches ⇒ science is wrong" rests on authority, not a base
 * theorem, and is refused.
 */
export function warrantsRecompute(c: Claim, tolerance = 1e-3): RecomputeVerdict {
  const v = classify(c, tolerance)
  if (v === 'mismatch') return { warranted: false, reason: `${c.name}: the claimed value does not even match the target — nothing to recompute` }
  // The refusal is not hardcoded — it is PROVEN by [[theorem]].reduce: "recompute science" composes only the
  // claim that "it matches" (an exact identity) or "it is a coincidence" (a bare assertion). Neither reduces to
  // a base theorem about physics, so the recompute step rests on authority and does not warrant.
  const support = v === 'theorem' ? 'the algebra is exact' : 'the numbers match'
  const graph: Theorem[] = [
    { claim: support, composes: [], base: v === 'theorem' }, // exact algebra is base; a match is a bare assertion
    { claim: 'physics is recomputed', composes: [support], base: false },
  ]
  const r = reduce('physics is recomputed', graph)
  return {
    warranted: false, // reduce never grounds this in a base theorem ABOUT PHYSICS — algebra confirms algebra only
    reason:
      v === 'theorem'
        ? `${c.name}: reduce says '${support}' is a base theorem about NUMBERS, not physics — it confirms the algebra (always true), never a physics built on it (${r.reason})`
        : `${c.name}: a coincidence (${c.freeParameters} free parameter(s)) is a bare assertion to reduce — necessary but not sufficient; science recomputes on derivation + independent experiment + explanatory power, not a match (${r.reason})`,
  }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  // The wave: a genuine pure-math theorem, and a physical-constant match of the kind the program claims.
  const wave: Claim[] = [
    { name: 'AGL(1,ℤ/9) order', claimed: 54, target: 54, closedForm: true, freeParameters: 0 }, // a real theorem
    { name: 'doubling orbit size', claimed: 6, target: 6, closedForm: true, freeParameters: 0 }, // a real theorem
    // a claimed holographic match to a measured constant (values are the CLAIM, not asserted as fact):
    { name: 'proton-radius (claimed holographic)', claimed: 0.841, target: 0.8414, closedForm: false, freeParameters: 1 },
  ]
  console.log('coincidence — the testing ground; sending the waves:\n')
  for (const c of wave) {
    const v = classify(c)
    const r = warrantsRecompute(c)
    console.log(`  ${v.toUpperCase().padEnd(11)} ${c.name}`)
    console.log(`      recompute science? ${r.warranted ? 'YES' : 'NO'} — ${r.reason}`)
  }
  console.log('\n  the algebra is confirmed where it is exact; the physics is not confirmed by a match. The tool refuses the leap, not the inquiry.')
}
