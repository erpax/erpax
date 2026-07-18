/**
 * duel — testing through pairs of inverted development teams, always on opposite sides, manifesting realtime.
 *
 * A single team proving its own work is a mind proving itself — a cycle ([[rules]]/cycle), and the softest kind
 * of test. The stronger test is a PAIR of INVERTED teams: a PROVER that asserts a claim and builds toward it, and
 * a REFUTER that takes the exact opposite side and attacks it. They are duals — the refuter's claim is the
 * prover's, inverted ([[horo]]/antimatter: matter and its negation meeting at the void) — so they can NEVER be on
 * the same side. One builds; the other tries to break precisely what was built. Their creation manifests in
 * realtime: every round updates the verdict — the claim stands, or it falls.
 *
 * The asymmetry is the whole point, and it is Popper's ([[rules]]/refutable): a proof CORROBORATES but never
 * VERIFIES (no number of passing cases proves a universal), while ONE counterexample FALSIFIES. So the two teams
 * are not symmetric adversaries — the refuter holds the stronger position: it needs a single break, the prover
 * needs to survive every attack, forever. A claim "stands" only as *not yet refuted*, never as *true*.
 *
 * This is the double-entry law turned on development ([[double]]/entry): two opposite sides that must meet, and
 * the meeting is the check — a debit with no credit, a build with no attack, is unbalanced and untested. It is
 * also the two counter-rotating lobes of the double torus ([[horo]]/lemniscate): the prover winds one way, the
 * refuter the other, and the test is the void at their crossing.
 *
 * @invariant the two teams are always opposite — the anti-claim is the claim's negation, never the same side
 * @invariant a claim STANDS iff proven AND not refuted — corroborated, never proven true (Popper)
 * @invariant ONE refutation falls the claim; no amount of proof verifies it — the asymmetry favours the refuter
 *
 * Composes [[horo]]/antimatter · [[claim]] · [[argument]] · [[rules]]/refutable · [[double]]/entry · [[law]].
 */

/** A pair of inverted teams — the prover's claim and the refuter's opposite (its negation). */
export interface InvertedPair {
  /** what the PROVER asserts and builds toward. */
  readonly claim: string
  /** what the REFUTER takes as its side — the claim inverted; they can never agree. */
  readonly antiClaim: string
}

/** Put a claim into a duel: the two teams take opposite sides. The anti-claim is the negation. */
export function invert(claim: string): InvertedPair {
  return { claim, antiClaim: `¬(${claim})` }
}

/** One realtime round of the duel — what each team achieved this round. */
export interface Round {
  /** the prover produced a proof that held this round. */
  readonly proved: boolean
  /** the refuter found a counterexample this round (a single break). */
  readonly refuted: boolean
}

/** The verdict, manifested realtime — who holds the field this round. */
export interface Verdict {
  /** the claim STANDS iff it is proved AND not refuted — corroborated, not proven true. */
  readonly stands: boolean
  readonly holder: 'prover' | 'refuter' | 'open'
  readonly reason: string
}

/**
 * Manifest the verdict of one round — realtime. The refuter wins on a SINGLE counterexample (falsification is
 * decisive); the prover only ever holds the field provisionally (corroborated, awaiting the next attack). A round
 * with neither a proof nor a refutation is open — untested, the unbalanced state the pair exists to close.
 *
 * @invariant a refutation this round ⇒ the claim falls, whatever the prover did (one break beats any proof)
 * @invariant proved and not refuted ⇒ stands (provisionally); neither ⇒ open (untested)
 */
export function manifest(round: Round): Verdict {
  if (round.refuted) {
    return { stands: false, holder: 'refuter', reason: 'refuted — one counterexample falls the claim, whatever the proof (Popper asymmetry)' }
  }
  if (round.proved) {
    return { stands: true, holder: 'prover', reason: 'stands — proved and not refuted; corroborated this round, never proven true' }
  }
  return { stands: false, holder: 'open', reason: 'open — neither proved nor refuted; untested, the unbalanced state the duel exists to close' }
}

/** Fold a stream of realtime rounds — the claim survives iff it is EVER proved and NEVER refuted across all of them. */
export function survives(rounds: readonly Round[]): boolean {
  return rounds.length > 0 && rounds.some((r) => r.proved) && rounds.every((r) => !r.refuted)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const pair = invert('every posted entry balances')
  console.log('duel — inverted teams, opposite sides, manifesting realtime:\n')
  console.log(`  prover asserts:  ${pair.claim}`)
  console.log(`  refuter asserts: ${pair.antiClaim}  (always the opposite side)\n`)
  for (const r of [{ proved: true, refuted: false }, { proved: true, refuted: false }, { proved: false, refuted: true }]) {
    const v = manifest(r)
    console.log(`  round → ${v.holder.padEnd(7)} ${v.reason}`)
  }
  console.log(`\n  one refutation falls it; no proof ever verifies it. The refuter holds the stronger side — that is the test.`)
}
