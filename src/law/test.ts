import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import { CONFIRM_GATE_CHECKS } from '@/cost/bits'
import { WORD, atomPath, ONE_LAW, oneLaw, sloganHolds } from './index'

describe('law — the one law, strictly formulated', () => {
  it('names its own address', () => {
    expect(WORD).toBe(atomAddress(import.meta.url).path)
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
  })

  it('the slogan is FALSE: at coverage = 1 the forger attacks the anchor, so the cost is the anchor', () => {
    const v = oneLaw({ coverage: 1, anchorBits: 256 })
    expect(v.forgeLog2).toBe(256)
    expect(v.forgeLog2).not.toBe(Number.POSITIVE_INFINITY)
    expect(v.cappedByAnchor).toBe(true)
    expect(sloganHolds({ coverage: 1, anchorBits: 256 })).toBe(false)
  })

  it('and it is false the other way too — reciprocity-entropy 0 does not price anything', () => {
    // the live tree: entropy 0, coverage below 1, so the cost is finite and small
    const live = oneLaw({ coverage: 0.5, anchorBits: 256 })
    expect(live.forgeLog2).toBe(CONFIRM_GATE_CHECKS) // −11·log₂(0.5) = 11
    expect(live.cappedByAnchor).toBe(false)
    expect(sloganHolds({ coverage: 0.5, anchorBits: 256 })).toBe(false)
  })

  it('forge cost is monotone non-decreasing in coverage', () => {
    let last = -1
    for (const coverage of [0, 0.25, 0.5, 0.75, 0.9, 0.99, 1]) {
      const { forgeLog2 } = oneLaw({ coverage, anchorBits: 512 })
      expect(forgeLog2).toBeGreaterThanOrEqual(last)
      last = forgeLog2
    }
  })

  it('coverage 0 buys nothing — a forger with no check to evade does no work', () => {
    expect(oneLaw({ coverage: 0, anchorBits: 256 }).forgeLog2).toBe(0)
    expect(oneLaw({ coverage: 0, anchorBits: 256 }).evasionProbability).toBe(1)
  })

  it('replicas MULTIPLY the checks under strong consistency; invariants ADD', () => {
    const plain = oneLaw({ coverage: 0.5, anchorBits: 4096, checks: 10 })
    const replicated = oneLaw({ coverage: 0.5, anchorBits: 4096, checks: 10, replicas: 3, strongConsistency: true })
    const invariants = oneLaw({ coverage: 0.5, anchorBits: 4096, checks: 10, invariants: 5 })
    expect(plain.effectiveChecks).toBe(10)
    expect(replicated.effectiveChecks).toBe(30)
    expect(invariants.effectiveChecks).toBe(15)
    // eventual consistency leaves a stale-read window, so it does NOT amplify
    expect(oneLaw({ coverage: 0.5, anchorBits: 4096, checks: 10, replicas: 3 }).effectiveChecks).toBe(10)
  })

  it('the claim is the ASYMMETRY — verify stays logarithmic in the check count', () => {
    const v = oneLaw({ coverage: 0.99, anchorBits: 4096, checks: 16 })
    expect(v.verifyLog2).toBe(4) // log₂ 16
    expect(v.asymmetryLog2).toBe(v.forgeLog2 - 4)
    expect(v.asymmetryLog2).toBeGreaterThan(100)
  })

  it('evasion probability falls to 0 as coverage rises', () => {
    expect(oneLaw({ coverage: 0.9, anchorBits: 256, checks: 2 }).evasionProbability).toBeCloseTo(0.01, 10)
    expect(oneLaw({ coverage: 1, anchorBits: 256 }).evasionProbability).toBe(0)
  })

  it('ONE_LAW states the terms rather than restating a conclusion', () => {
    expect(ONE_LAW).toContain('min(')
    expect(ONE_LAW).toContain('anchorBits')
    expect(ONE_LAW).not.toContain('infinite')
  })
})
