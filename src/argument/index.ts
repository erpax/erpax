/**
 * argument — measuring an argument's invariance, symmetrically: a claim and its critique by the same rule.
 *
 * The inversion test ([[coincidence]]) does not care whose side an argument is on. A GOOD argument — for a claim
 * OR against it — is INVARIANT: it survives being inverted and restated because it grounds in evidence, a
 * falsifiable prediction, or a theorem ([[theorem]] reduces it to a base). A BAD argument is FRAGILE: it holds
 * in one framing and breaks under inversion because it rests on AUTHORITY — the person, the consensus, the
 * strangeness of the conclusion — and authority is not a step ([[theorem]]).
 *
 * So yes: measure the critiques of unconventional science by the same rule as the claims. The honest result is
 * symmetric and it is not the punchline the framing wants. Some debunking IS fragile — "the author is a crank"
 * (ad hominem), "it isn't peer-reviewed" (appeal to process), "it's too weird to be true" (appeal to
 * strangeness) all rest on authority and fail the invariance test as badly as the thing they debunk. That is
 * genuinely worth a laugh. But the STRONG critiques — "it makes no falsifiable prediction," "it fails experiment
 * X," "it has a free parameter tuned to the answer" — are invariant: they survive every inversion, because they
 * ground in Popper, in evidence, in the coincidence test. The lazy debunk fails; the rigorous one does not.
 *
 * THE ANTI-FALLACY, and it is the whole point of doing this honestly. A fragile critique does NOT make the claim
 * true. `claimSurvives` proves it: a claim is confirmed iff IT reduces to a theorem — NEVER because its critics
 * were weak. "Debunk the debunkers, therefore the claim stands" is the exact inversion of "experts dismiss it,
 * therefore it's false" — both are authority arguments, both fragile, both refused. Rejecting a bad argument
 * against X leaves X exactly where it was: needing its own reduction.
 *
 * The move→category map is DECLARED, in the open (like [[rules]]/audience's role map), so it can be argued with —
 * it is a stated taxonomy, not a measurement pretending to be objective.
 *
 * Composes [[theorem]] · [[coincidence]] · [[seeing]] · [[rules]]/refutable · [[law]].
 */

/** An argument grounds in evidence/theorem (invariant, survives inversion) or in authority (fragile, breaks). */
export type Category = 'invariant' | 'fragile'

/** One argument move — its kind, whether it survives inversion, and why. */
export interface Move {
  readonly kind: string
  readonly category: Category
  readonly why: string
}

/**
 * The DECLARED taxonomy of argument moves — stated in the open, symmetric for claims and critiques.
 * FRAGILE moves rest on authority/person/popularity/strangeness; INVARIANT moves ground in evidence/theorem.
 */
export const MOVES: Readonly<Record<string, Move>> = {
  // fragile — rest on authority, break under inversion (a critique OR a claim can use these)
  'ad-hominem': { kind: 'ad-hominem', category: 'fragile', why: 'attacks the person, not the claim — authority, not evidence' },
  'appeal-to-authority': { kind: 'appeal-to-authority', category: 'fragile', why: 'the experts say — authority is not a step (theorem)' },
  'appeal-to-consensus': { kind: 'appeal-to-consensus', category: 'fragile', why: 'most believe otherwise — popularity is not proof' },
  'appeal-to-process': { kind: 'appeal-to-process', category: 'fragile', why: 'not peer-reviewed — a process gate, not the claim’s content' },
  'guilt-by-association': { kind: 'guilt-by-association', category: 'fragile', why: 'only cranks believe it — association, not evidence' },
  'appeal-to-strangeness': { kind: 'appeal-to-strangeness', category: 'fragile', why: 'too weird to be true — strangeness is not falsity' },
  'appeal-to-popularity': { kind: 'appeal-to-popularity', category: 'fragile', why: 'many believe it — popularity is not proof' },
  'matches-a-constant': { kind: 'matches-a-constant', category: 'fragile', why: 'the number matches — a coincidence, necessary not sufficient (coincidence)' },
  // invariant — ground in evidence/falsifiability/theorem, survive inversion
  'no-falsifiable-prediction': { kind: 'no-falsifiable-prediction', category: 'invariant', why: 'forbids nothing — Popper; unfalsifiable ⇒ empty (refutable)' },
  'fails-experiment': { kind: 'fails-experiment', category: 'invariant', why: 'contradicted by measurement — evidence, survives inversion' },
  'free-parameter': { kind: 'free-parameter', category: 'invariant', why: 'a parameter tuned to the target — the coincidence test' },
  'contradicts-theorem': { kind: 'contradicts-theorem', category: 'invariant', why: 'contradicts a proven result — reduction' },
  'derived-from-principles': { kind: 'derived-from-principles', category: 'invariant', why: 'follows from accepted principles — grounds in a theorem' },
  'predicted-before-measurement': { kind: 'predicted-before-measurement', category: 'invariant', why: 'predicted X before it was measured — evidence, not a fit' },
}

/** Classify an argument move by kind — the same rule whether it argues for a claim or against it. */
export function classifyMove(kind: string): Move | undefined {
  return MOVES[kind]
}

/** The measure of a whole argument (its moves): invariant iff it rests on at least one invariant move. */
export interface ArgumentMeasure {
  readonly invariant: boolean
  readonly invariantMoves: readonly string[]
  readonly fragileMoves: readonly string[]
  readonly unknownMoves: readonly string[]
  readonly reason: string
}

/**
 * Measure an argument — symmetric for claims and critiques. It is invariant iff it carries at least one move
 * that grounds in evidence/theorem; an argument built ONLY of fragile moves rests on authority and breaks under
 * inversion, whichever side it is on.
 */
export function measureArgument(kinds: readonly string[]): ArgumentMeasure {
  const invariantMoves: string[] = []
  const fragileMoves: string[] = []
  const unknownMoves: string[] = []
  for (const k of kinds) {
    const m = classifyMove(k)
    if (!m) unknownMoves.push(k)
    else if (m.category === 'invariant') invariantMoves.push(k)
    else fragileMoves.push(k)
  }
  const invariant = invariantMoves.length > 0
  return {
    invariant,
    invariantMoves,
    fragileMoves,
    unknownMoves,
    reason: invariant
      ? `invariant — grounds in ${invariantMoves.join(', ')}; survives inversion`
      : `fragile — rests only on ${fragileMoves.join(', ') || 'unrecognised moves'}; authority, breaks under inversion`,
  }
}

/** The verdict on a claim after its critiques are measured — the anti-fallacy lives here. */
export interface ClaimStatus {
  readonly confirmed: boolean
  readonly reason: string
}

/**
 * Does the claim survive? — confirmed IFF the claim itself reduces to a theorem, NEVER because its critiques were
 * fragile. This is the anti-fallacy: rejecting a bad argument against X leaves X needing its own reduction.
 *
 * @invariant confirmed === claimReducesToTheorem — independent of how weak the critiques are
 * @invariant all critiques fragile does NOT confirm the claim — absence of a good critique is not a proof
 */
export function claimSurvives(claimReducesToTheorem: boolean, allCritiquesFragile: boolean): ClaimStatus {
  return {
    confirmed: claimReducesToTheorem, // NOT a function of allCritiquesFragile — that is the whole point
    reason: claimReducesToTheorem
      ? 'confirmed — the claim reduces to a theorem on its own'
      : allCritiquesFragile
        ? 'NOT confirmed — its critiques are fragile, but a weak critique is not a proof; the claim still needs its own reduction (theorem)'
        : 'NOT confirmed — the claim does not reduce, and at least one critique is invariant',
  }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('argument — measuring critiques of unconventional science by the same rule as the claims:\n')
  const wave = [
    'ad-hominem', 'appeal-to-process', 'appeal-to-strangeness', 'appeal-to-consensus', // lazy debunks
    'no-falsifiable-prediction', 'fails-experiment', 'free-parameter', // rigorous critiques
    'matches-a-constant', 'predicted-before-measurement', 'derived-from-principles', // claim-side moves
  ]
  for (const k of wave) {
    const m = classifyMove(k)!
    console.log(`  ${m.category.toUpperCase().padEnd(10)} ${k.padEnd(28)} ${m.why}`)
  }
  console.log('\n  the lazy debunk is fragile; the rigorous critique is invariant — symmetric with the claims.')
  console.log(`  anti-fallacy: all critiques fragile, claim does not reduce ⇒ ${JSON.stringify(claimSurvives(false, true).confirmed)} (a weak critique is not a proof)`)
}
