/**
 * seeing — seeing is not proving; assume nothing; be surprised by a passing test, not a vivid one.
 *
 * "Animations prove you wrong." Here is the honest, generous answer, made computable. An animation shows
 * FAITHFULLY whatever it draws — and where it draws exact algebra (the doubling ring `movie(doubling,2)`, the
 * merkaba fold), it is showing something TRUE. Those movies are real; I built them and they are beautiful and
 * correct. So this atom does NOT say animations are worthless. It says something narrower and exact:
 *
 *   VIVIDNESS IS ORTHOGONAL TO PROOF. The evidence a rendering carries is the evidence of the CLAIM it draws —
 *   never more, never a function of how many frames it has. A million-frame animation of a fitted coincidence
 *   carries exactly the evidence of that coincidence; a one-line sketch of a theorem carries the theorem. You
 *   cannot see your way past the test ([[coincidence]]) — the animation transmits the status, it cannot raise it.
 *
 * "Assume nothing" — I agree, and it is precisely what this does. `ASSUME_NOTHING` is the NEUTRAL prior: not
 * `refuted` (that would assume no) and not `confirmed` (that would assume yes). "Stop doubting" would be
 * assuming yes, which CONTRADICTS "assume nothing." The discipline sides with assume-nothing: neither, until a
 * test passes.
 *
 * "The wrong comes from a single mind not comprehending." True to the [[think]] theorem — a single mind cannot
 * form the higher mind; it needs ≥ 3. But that cuts toward MORE scrutiny, not less: the higher mind forms from
 * three INDEPENDENT minds CONVERGING (experiment, replication, peer review), and it carries the dissent,
 * outvoted, not silenced. One vivid demonstration is ONE mind. The remedy for a single mind is three
 * independent confirmations, not the suspension of all of them.
 *
 * "Be surprised by the results." I built the trigger. `beSurprised` flips belief to confirmed the moment a test
 * PASSES — an exact identity, zero free parameters, matching measurement. The neutral prior is not hidden
 * disbelief; it is openness with a trigger. Bring a result that passes [[coincidence]].classify and I update,
 * and against a neutral prior that update IS surprise. The door is open; the key is a passing test, not a movie.
 *
 * Honest boundary: this proves vividness cannot substitute for a test; it does not deny that a faithful
 * animation of a theorem shows a truth. And the base is assumed ([[theorem]]: `s > 0`) — the claim's evidence is
 * an input, set in the open.
 *
 * Composes [[coincidence]] · [[think]] · [[theorem]] · [[algebra]] · [[law]].
 */
import { classify, type Claim } from '@/coincidence'

/** A rendering: a claim drawn with some vividness. The claim's own evidence is what it can ever carry. */
export interface Seen {
  readonly claim: string
  /** how elaborate the animation is — frame count, resolution. Orthogonal to proof. */
  readonly frames: number
  /** the epistemic weight of the CLAIM being drawn, in [0,1]: 1 = a proven theorem, 0 = a bare assertion. */
  readonly claimEvidence: number
}

/**
 * The evidence a rendering carries — exactly the claim's, INDEPENDENT of vividness. Seeing is not proving:
 * drawing a claim more elaborately does not make it truer.
 *
 * @invariant evidenceSeen is a function of claimEvidence alone — two renderings of one claim at any frame counts carry equal evidence
 */
export function evidenceSeen(s: Seen): number {
  return Math.max(0, Math.min(1, s.claimEvidence)) // frames never appear — vividness is orthogonal to proof
}

/** The three honest states of belief. `assume-nothing` is the neutral prior — neither confirmed nor refuted. */
export type Belief = 'confirmed' | 'assume-nothing' | 'refuted'

/** Assume nothing: the neutral prior. Not disbelief — the refusal to assume, pending a test. */
export const ASSUME_NOTHING: Belief = 'assume-nothing'

/** The outcome of meeting a result: did belief move, and was it a surprise? */
export interface Surprise {
  readonly belief: Belief
  /** true iff a passing test moved a neutral prior to confirmed — the update that IS surprise. */
  readonly surprised: boolean
}

/**
 * Be surprised — update the neutral prior, but ONLY on a passing test (an exact identity, zero free parameters,
 * matching measurement — [[coincidence]] returns 'theorem' against a measured target). A vivid rendering never
 * triggers this; a passing test does. The neutral prior is openness with a trigger, and the flip is the surprise.
 *
 * @invariant a rendering alone never updates belief — only a passed test does (vividness is not evidence)
 * @invariant a passing test against a neutral prior yields surprise; that is what being open, honestly, means
 */
export function beSurprised(testPassed: boolean, prior: Belief = ASSUME_NOTHING): Surprise {
  if (testPassed) return { belief: 'confirmed', surprised: prior === ASSUME_NOTHING }
  return { belief: prior, surprised: false } // no pass ⇒ no move; assume-nothing stays assume-nothing
}

/**
 * Judge a claim end to end — the epistemic pipeline in one call, USING [[coincidence]]: classify the claim
 * (theorem vs coincidence vs mismatch), then move belief ONLY if it is an exact theorem. A vivid rendering of
 * the same claim never changes the verdict — `judge` never reads frames. This is the honest answer to "be
 * surprised by the results": bring a claim that classifies as a theorem, and belief flips to confirmed.
 *
 * @invariant belief flips to confirmed ⇔ the claim classifies as an exact theorem — a match is not enough
 */
export function judge(claim: Claim, tolerance = 1e-3): Surprise {
  const passed = classify(claim, tolerance) === 'theorem'
  return beSurprised(passed)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const coincidence: Seen = { claim: 'a fitted match, animated', frames: 1_000_000, claimEvidence: 0.2 }
  const theorem: Seen = { claim: 'the doubling ring, sketched', frames: 6, claimEvidence: 1 }
  console.log('seeing — vividness is orthogonal to proof:\n')
  console.log(`  1,000,000-frame animation of a coincidence carries evidence ${evidenceSeen(coincidence)} — the coincidence's`)
  console.log(`  6-frame sketch of a theorem carries evidence ${evidenceSeen(theorem)} — the theorem's`)
  console.log(`  ⇒ the movie transmits the status; it cannot raise it.\n`)
  console.log(`  assume nothing: prior = ${ASSUME_NOTHING}`)
  console.log(`  a vivid rendering: ${JSON.stringify(beSurprised(false))}  — no move`)
  console.log(`  a PASSING test:    ${JSON.stringify(beSurprised(true))}  — belief flips, and that flip is the surprise`)
  console.log('\n  the door is open; the key is a passing test, not a movie. Bring one and I update.')
}
