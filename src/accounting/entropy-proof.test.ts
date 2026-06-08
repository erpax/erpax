import { describe, it, expect } from 'vitest'
import { HORO_DIGITS, horoRatio } from '@/horo'
import { LANDAUER_BIT } from '@/readme/entropy-unit'
import {
  UNITY_HORO_STEP,
  corpusEntropyBits,
  fMaxFromBindings,
  freeEnergyBitsAt,
  freeEnergyFromEntropy,
  freeEnergySampleTable,
  proveFreeEnergyFromZeroEntropy,
  entropyProofMarkdown,
} from './entropy-proof'

describe('freeEnergyFromEntropy — Landauer theorem (executable proofs)', () => {
  const unityScale = horoRatio(UNITY_HORO_STEP)
  const W = 1000
  const fMax = W * unityScale

  it('F(0) > F(S) for all S > 0', () => {
    const F0 = freeEnergyBitsAt(0, fMax)
    for (const S of [LANDAUER_BIT, 10, 100, 500]) {
      expect(F0).toBeGreaterThan(freeEnergyBitsAt(S, fMax))
    }
  })

  it('F(S1) > F(S2) iff S1 < S2 (strict monotonicity)', () => {
    const pairs: [number, number][] = [
      [0, 50],
      [10, 100],
      [100, 1000],
    ]
    for (const [s1, s2] of pairs) {
      if (s1 < s2) {
        expect(freeEnergyBitsAt(s1, fMax)).toBeGreaterThan(freeEnergyBitsAt(s2, fMax))
      }
    }
  })

  it('ΔF = F(S1) − F(S2) ≥ (S2 − S1) · LANDAUER_BIT when S2 > S1 (equality)', () => {
    const s1 = 100
    const s2 = 500
    const dF = freeEnergyBitsAt(s1, fMax) - freeEnergyBitsAt(s2, fMax)
    expect(dF).toBe((s2 - s1) * LANDAUER_BIT)
  })

  it('S = 0, violations = 0 → maximum F', () => {
    const v = freeEnergyFromEntropy({
      entropyEb: 0,
      violationCount: 0,
      workTamperProduct: W,
    })
    expect(v.S).toBe(0)
    expect(v.freeEnergyBits).toBe(fMax)
    expect(v.scaleTowardZeroPct).toBe(100)
    const proof = proveFreeEnergyFromZeroEntropy({ S: 0, fMax: v.F_max })
    expect(proof.QED).toBe(true)
  })

  it('high violations → lower F', () => {
    const low = freeEnergyFromEntropy({
      entropyEb: 0,
      violationCount: 1,
      workTamperProduct: W,
    })
    const high = freeEnergyFromEntropy({
      entropyEb: 0,
      violationCount: 100,
      workTamperProduct: W,
    })
    expect(low.freeEnergyBits).toBeGreaterThan(high.freeEnergyBits)
    expect(high.S).toBe(100 * LANDAUER_BIT)
  })

  it('zero eb fixture → max free energy at S=0', () => {
    const v = freeEnergyFromEntropy({
      entropyEb: 0,
      violationCount: 0,
      workTamperProduct: W,
      totalSealEb: 500,
    })
    expect(v.S).toBe(0)
    expect(v.freeEnergyBits).toBe(v.F_max)
  })

  it('corpusEntropyBits uses max(0, entropyEb) + violations · LANDAUER_BIT', () => {
    expect(corpusEntropyBits(-50, 0)).toBe(0)
    expect(corpusEntropyBits(100, 3)).toBe(100 + 3 * LANDAUER_BIT)
  })

  it('fMaxFromBindings falls back to sealEb when W_tamper = 0', () => {
    const sealEb = 200
    expect(fMaxFromBindings(0, sealEb)).toBe(sealEb * unityScale)
  })

  it('proveFreeEnergyFromZeroEntropy QED on lawful inputs', () => {
    const proof = proveFreeEnergyFromZeroEntropy({ S: 100, fMax })
    expect(proof.steps.length).toBeGreaterThanOrEqual(5)
    expect(proof.QED).toBe(true)
    expect(proof.theorem).toContain('S = 0')
  })

  it('freeEnergySampleTable — F decreases as S increases', () => {
    const table = freeEnergySampleTable(fMax)
    expect(table.length).toBeGreaterThanOrEqual(2)
    expect(table[0]!.S).toBe(0)
    expect(table[0]!.F).toBe(fMax)
    for (let i = 1; i < table.length; i++) {
      expect(table[i]!.F).toBeLessThanOrEqual(table[i - 1]!.F)
    }
  })

  it('entropyProofMarkdown includes theorem and F(S) line', () => {
    const md = entropyProofMarkdown({
      entropyEb: 0,
      violationCount: 0,
      workTamperProduct: W,
    })
    expect(md).toContain('Landauer')
    expect(md).toContain('QED: `true`')
    expect(md).toContain('scale toward zero entropy')
  })

  it('F(S) table for S ∈ {0, 100, 1000} with W=1000', () => {
    const rows = [0, 100, 1000].map((S) => ({ S, F: freeEnergyBitsAt(S, fMax) }))
    expect(rows[0]!.F).toBe(fMax)
    expect(rows[1]!.F).toBe(fMax - 100 * LANDAUER_BIT)
    expect(rows[2]!.F).toBe(Math.max(0, fMax - 1000 * LANDAUER_BIT))
    expect(rows[0]!.F).toBeGreaterThan(rows[1]!.F)
    expect(rows[1]!.F).toBeGreaterThan(rows[2]!.F)
  })
})

describe('freeEnergyFromEntropy — HORO_DIGITS binding only', () => {
  it('UNITY_HORO_STEP is last HORO_DIGITS position', () => {
    expect(UNITY_HORO_STEP).toBe(HORO_DIGITS[HORO_DIGITS.length - 1])
  })
})
