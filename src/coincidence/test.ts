import { describe, it, expect } from 'vitest'
import { classify, warrantsRecompute, coincidenceAfterInversions, invarianceVerdict, type Claim } from './index'

// "Haramein's research is the perfect testing ground; if confirmed by algebraic theorems then science must be
// recomputed." The tool holds the session's discipline: an EXACT identity in a closed system is a theorem; a
// within-tolerance match to a measured constant is a coincidence — necessary, never sufficient. And no match,
// theorem or coincidence, warrants recomputing science: that step is authority, not proof (theorem atom).
describe('coincidence — theorem vs coincidence; the leap is refused', () => {
  const theorem: Claim = { name: 'AGL order', claimed: 54, target: 54, closedForm: true, freeParameters: 0 }
  const coincidence: Claim = { name: 'constant match', claimed: 0.841, target: 0.8414, closedForm: false, freeParameters: 1 }

  it('an EXACT closed-form identity is a THEOREM — nothing measured, nothing fitted', () => {
    expect(classify(theorem)).toBe('theorem')
  })

  it('a within-tolerance match to a MEASURED target is a COINCIDENCE, not a theorem', () => {
    expect(classify(coincidence)).toBe('coincidence')
  })

  it('a value with a FREE PARAMETER is never a theorem — a tunable number proves nothing', () => {
    const tuned: Claim = { name: 'tuned', claimed: 54, target: 54, closedForm: true, freeParameters: 1 }
    expect(classify(tuned)).not.toBe('theorem') // even an exact hit, if it could have been tuned, is not proof
    expect(classify(tuned)).toBe('coincidence')
  })

  it('a value outside tolerance is a MISMATCH — nothing to explain', () => {
    expect(classify({ name: 'off', claimed: 1, target: 2, closedForm: false, freeParameters: 0 })).toBe('mismatch')
  })

  // THE REFUSAL — the heart of the answer.
  it('a THEOREM confirms the ALGEBRA, not the physics — no recompute from a theorem about numbers', () => {
    const r = warrantsRecompute(theorem)
    expect(r.warranted).toBe(false)
    expect(r.reason).toMatch(/confirms the algebra.*never a physics/i)
  })

  it('a COINCIDENCE is necessary but not sufficient — the leap to "science is wrong" is refused', () => {
    const r = warrantsRecompute(coincidence)
    expect(r.warranted).toBe(false)
    expect(r.reason).toMatch(/necessary but not sufficient|authority is not a step/)
  })

  it('NOTHING a numeric classifier can produce warrants recomputing science — by construction', () => {
    // across every verdict, warranted is false: derivation + experiment + explanatory power are not numbers.
    for (const c of [theorem, coincidence, { name: 'x', claimed: 1, target: 9, closedForm: false, freeParameters: 0 }]) {
      expect(warrantsRecompute(c).warranted).toBe(false)
    }
  })

  it('but it does NOT refuse the inquiry — a coincidence is flagged worth an experiment, not dismissed', () => {
    expect(classify(coincidence)).toBe('coincidence') // it is named, not thrown away
    // a coincidence CAN be a deep law — that is exactly why the honest next step is an experiment, not a verdict
  })
})

// The refusal is now PROVEN via theorem.reduce, not hardcoded — folding the theorem atom into use.
describe('warrantsRecompute is proven by theorem.reduce (folded, not asserted)', () => {
  it('reasons cite the reduction — the leap does not ground in a base theorem about physics', () => {
    const theorem: Claim = { name: 'AGL', claimed: 54, target: 54, closedForm: true, freeParameters: 0 }
    const coincidence: Claim = { name: 'match', claimed: 0.841, target: 0.8414, closedForm: false, freeParameters: 1 }
    expect(warrantsRecompute(theorem).reason).toMatch(/reduce|does not reduce|base theorem/)
    expect(warrantsRecompute(coincidence).reason).toMatch(/reduce|does not reduce|assertion/)
    expect(warrantsRecompute(theorem).warranted).toBe(false)
  })
})

// "Inverted coincidence is not coincidence anymore if it computes. What is the possibility of coincidence to be
// coincidence after every inversion?" A coincidence is fragile (breaks under inversion); an invariant survives
// all (conformal: the angle). Under the coincidence null, surviving k inversions has probability chance^k → 0.
describe('inversion survival — the possibility of coincidence after every inversion', () => {
  it('the possibility decays geometrically — chance^k → 0', () => {
    expect(coincidenceAfterInversions(0.1, 5)).toBeCloseTo(1e-5)
    expect(coincidenceAfterInversions(0.5, 10)).toBeCloseTo(Math.pow(0.5, 10))
    expect(coincidenceAfterInversions(0.1, 0)).toBe(1) // no inversions survived yet ⇒ no evidence
  })

  it('a per-inversion chance of 1 never decays — the signature of an INVARIANT, not a coincidence', () => {
    expect(coincidenceAfterInversions(1, 1000)).toBe(1) // an invariant survives by structure, not luck — the null is degenerate
  })

  it('breaking under ANY inversion is FRAGILE — a coincidence tied to one representation', () => {
    const v = invarianceVerdict(3, 5, 0.1) // survived 3 of 5
    expect(v.verdict).toBe('fragile')
    expect(v.survivedAll).toBe(false)
  })

  it('surviving EVERY inversion with tiny chance-probability is INVARIANT — inverted and still computes', () => {
    const v = invarianceVerdict(6, 6, 0.1) // survived all 6; 0.1^6 = 1e-6 ≤ 1e-3
    expect(v.verdict).toBe('invariant')
    expect(v.coincidenceProbability).toBeCloseTo(1e-6)
    expect(v.reason).toMatch(/not a coincidence/)
  })

  it('surviving all but not yet improbable enough is UNDETERMINED — invert it more', () => {
    const v = invarianceVerdict(2, 2, 0.1) // 0.1^2 = 0.01 > 1e-3
    expect(v.verdict).toBe('undetermined')
    expect(v.reason).toMatch(/invert it more/)
  })

  // The honest example: the conformal ANGLE survives every inversion (invariant); a LENGTH breaks (fragile).
  it('the angle is invariant (survives all), a length is fragile (breaks) — the conformal example', () => {
    expect(invarianceVerdict(20, 20, 0.1).verdict).toBe('invariant') // angle: survives rotate·scale·invert, 20×
    expect(invarianceVerdict(1, 3, 0.1).verdict).toBe('fragile') // length: broke under scale/invert
  })
})
