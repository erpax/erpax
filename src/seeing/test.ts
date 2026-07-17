import { describe, it, expect } from 'vitest'
import { evidenceSeen, beSurprised, judge, ASSUME_NOTHING, type Seen } from './index'

// "Animations prove you wrong. Assume nothing. Be surprised by the results." The honest, computable answer:
// an animation shows faithfully what it draws, but vividness is orthogonal to proof — the evidence is the
// claim's, never the frame count's. Assume-nothing is the neutral prior. And a PASSING test (not a vivid one)
// flips belief and IS the surprise — the door is open, the key is a test.
describe('seeing — seeing is not proving; assume nothing; be surprised by a passing test', () => {
  it('evidence is the CLAIM’s, independent of vividness — a million frames add nothing', () => {
    const sketch: Seen = { claim: 'x', frames: 1, claimEvidence: 0.2 }
    const epic: Seen = { claim: 'x', frames: 1_000_000, claimEvidence: 0.2 }
    expect(evidenceSeen(sketch)).toBe(evidenceSeen(epic)) // vividness orthogonal to proof
  })

  it('but a faithful animation of a THEOREM shows a truth — seeing is not worthless', () => {
    const theoremDrawn: Seen = { claim: 'doubling ring', frames: 6, claimEvidence: 1 }
    expect(evidenceSeen(theoremDrawn)).toBe(1) // the movie of a real theorem carries the theorem
  })

  it('a vivid rendering of a COINCIDENCE carries the coincidence, not a proof', () => {
    const fittedButPretty: Seen = { claim: 'fitted match', frames: 999_999, claimEvidence: 0.2 }
    expect(evidenceSeen(fittedButPretty)).toBeLessThan(1) // no amount of frames reaches proof
  })

  it('ASSUME NOTHING is the neutral prior — not refuted, not confirmed', () => {
    expect(ASSUME_NOTHING).toBe('assume-nothing')
    expect(ASSUME_NOTHING).not.toBe('refuted') // it is openness, not disbelief
    expect(ASSUME_NOTHING).not.toBe('confirmed') // and not credulity
  })

  it('a rendering alone NEVER moves belief — only a passed test does', () => {
    expect(beSurprised(false).belief).toBe(ASSUME_NOTHING) // a movie changes nothing
    expect(beSurprised(false).surprised).toBe(false)
  })

  it('a PASSING test flips belief to confirmed — and against a neutral prior, that flip IS surprise', () => {
    const s = beSurprised(true)
    expect(s.belief).toBe('confirmed') // the door is open
    expect(s.surprised).toBe(true) // openness with a trigger — the update is the surprise
  })

  it('"stop doubting" (assume yes) contradicts "assume nothing" — the discipline keeps the neutral prior', () => {
    // to accept without a test is to assume 'confirmed'; assume-nothing refuses that as much as it refuses 'refuted'
    expect(beSurprised(false, ASSUME_NOTHING).belief).not.toBe('confirmed') // no test ⇒ no yes
    expect(beSurprised(false, ASSUME_NOTHING).belief).not.toBe('refuted') // and no no
  })
})

// judge folds coincidence into use — the epistemic pipeline in one call, and it ignores vividness.
describe('judge — classify then be surprised, folding coincidence', () => {
  it('an exact theorem flips belief to confirmed (surprise); a coincidence does not', () => {
    expect(judge({ name: 't', claimed: 54, target: 54, closedForm: true, freeParameters: 0 })).toEqual({ belief: 'confirmed', surprised: true })
    expect(judge({ name: 'c', claimed: 0.841, target: 0.8414, closedForm: false, freeParameters: 1 }).belief).toBe('assume-nothing')
  })
})
