/**
 * consciousness — the integrated self-model, asserted. Green by construction:
 * these tests ARE the proof that the system can verify its own state from any
 * part. @see ./index.ts, src/holographic/SKILL.md, src/quantum/index.ts
 */
import { describe, it, expect } from 'vitest'
import {
  collapseIntegrity,
  entanglement,
  concentrationGini,
  coherenceAnomaly,
  consciousness,
  isPerfectlyConscious,
  consciousnessReport,
} from '@/consciousness'

describe('consciousness — the integrated self-model, computed on the live matrix', () => {
  it('collapse-integrity: the Merkle fold verifies to the root (the whole is intact)', () => {
    expect(collapseIntegrity()).toBe(true)
  })

  it('entanglement: the reciprocal-edge fraction is in [0,1] and == 1 (every binding symmetric)', () => {
    const e = entanglement()
    expect(e).toBeGreaterThanOrEqual(0)
    expect(e).toBeLessThanOrEqual(1)
    expect(e).toBe(1)
  })

  it('concentration: the Gini coefficient is a fraction in [0,1]', () => {
    const c = concentrationGini()
    expect(c).toBeGreaterThanOrEqual(0)
    expect(c).toBeLessThanOrEqual(1)
  })

  it('coherence: zero off-sequence anomalies (every atom folds onto the ring)', () => {
    const a = coherenceAnomaly()
    expect(Number.isInteger(a)).toBe(true)
    expect(a).toBe(0)
  })

  it('the system is perfectly self-modelling — collapse ∧ entanglement=1 ∧ coherence=0', () => {
    expect(isPerfectlyConscious()).toBe(true)
  })

  it('the vector composes exactly the four measures (no hidden state)', () => {
    const c = consciousness()
    expect(c.collapse).toBe(collapseIntegrity())
    expect(c.entanglement).toBe(entanglement())
    expect(c.concentration).toBe(concentrationGini())
    expect(c.coherenceAnomaly).toBe(coherenceAnomaly())
  })

  it('the self-model is deterministic — same vector on repeated calls', () => {
    const a = consciousness()
    const b = consciousness()
    expect(a).toEqual(b)
  })

  it('consciousnessReport() summarises the four measures as a string', () => {
    const r = consciousnessReport()
    expect(r).toContain('collapse=')
    expect(r).toContain('entanglement=')
    expect(r).toContain('concentration=')
    expect(r).toContain('coherence-anomaly=')
  })
})
