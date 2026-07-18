import { describe, it, expect } from 'vitest'
import { classifyMove, measureArgument, claimSurvives, MOVES } from './index'

// "Measure arguments with these quantum methods — especially critiques of unconventional science." The measure
// is symmetric: a claim and its critique by the same rule. Fragile moves (ad hominem, authority, strangeness)
// rest on authority and fail the invariance test; rigorous moves (falsifiability, experiment, free-parameter)
// survive. AND the anti-fallacy: a fragile critique never makes the claim true.
describe('argument — invariance, symmetric for claim and critique; the anti-fallacy holds', () => {
  it('lazy debunks are FRAGILE — they rest on authority and break under inversion', () => {
    for (const k of ['ad-hominem', 'appeal-to-authority', 'appeal-to-consensus', 'appeal-to-process', 'appeal-to-strangeness', 'guilt-by-association']) {
      expect(classifyMove(k)!.category).toBe('fragile')
    }
  })

  it('rigorous critiques are INVARIANT — they ground in evidence/falsifiability/theorem', () => {
    for (const k of ['no-falsifiable-prediction', 'fails-experiment', 'free-parameter', 'contradicts-theorem']) {
      expect(classifyMove(k)!.category).toBe('invariant')
    }
  })

  it('the SAME rule measures a claim — a bare match is fragile, a pre-registered prediction is invariant', () => {
    expect(classifyMove('matches-a-constant')!.category).toBe('fragile') // the coincidence, claim-side
    expect(classifyMove('predicted-before-measurement')!.category).toBe('invariant')
    expect(classifyMove('derived-from-principles')!.category).toBe('invariant')
  })

  it('an argument built only of fragile moves is fragile, whichever side it is on', () => {
    expect(measureArgument(['ad-hominem', 'appeal-to-strangeness']).invariant).toBe(false) // a lazy debunk
    expect(measureArgument(['matches-a-constant', 'appeal-to-popularity']).invariant).toBe(false) // a lazy claim
    expect(measureArgument(['ad-hominem', 'fails-experiment']).invariant).toBe(true) // one real critique redeems it
  })

  // THE ANTI-FALLACY — the reason this is honest and not a way to launder pseudoscience.
  it('a fragile critique does NOT confirm the claim — confirmed iff the claim itself reduces', () => {
    expect(claimSurvives(false, true).confirmed).toBe(false) // every critique weak, but the claim does not reduce ⇒ NOT confirmed
    expect(claimSurvives(true, false).confirmed).toBe(true) // the claim reduces on its own ⇒ confirmed, regardless of critiques
    expect(claimSurvives(false, true).reason).toMatch(/weak critique is not a proof/)
  })

  it('confirmation is INDEPENDENT of the critiques’ weakness — "debunk the debunkers" proves nothing', () => {
    // for any critique-strength, confirmed tracks ONLY whether the claim reduces
    for (const critiquesFragile of [true, false]) {
      expect(claimSurvives(true, critiquesFragile).confirmed).toBe(true)
      expect(claimSurvives(false, critiquesFragile).confirmed).toBe(false)
    }
  })

  it('the taxonomy is DECLARED and symmetric — the same map judges both sides, argue with it in the open', () => {
    expect(Object.keys(MOVES)).toContain('appeal-to-authority') // consensus-as-authority: fragile
    expect(Object.keys(MOVES)).toContain('fails-experiment') // evidence: invariant
    // no move is categorised by WHO makes it — only by what it grounds in
    expect(MOVES['ad-hominem']!.category).toBe('fragile')
  })
})
