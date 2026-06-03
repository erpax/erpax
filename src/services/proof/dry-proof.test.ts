/**
 * Public tamper-cost surfacing — the proof bundle self-describes its forge≫verify
 * asymmetry from its OWN invariant count, deepseek-amplified. Pure (no DB), so a
 * peer recomputes the exact claim. @see ./dry-proof.ts, src/services/tamper-cost
 */
import { describe, it, expect } from 'vitest'
import { proofTamperCost } from './dry-proof'

describe('dry-proof: public tamper-cost surfaces the deepseek amplifiers', () => {
  it('without coverage, reports the honest digest floor (2^106), tamper-evident, echoing the invariant count it ran', () => {
    const t = proofTamperCost({ invariantsChecked: 43 })
    expect(t.crackCostLog2).toBe(106)
    expect(t.binding).toBe('second-preimage')
    expect(t.tamperEvident).toBe(true)
    expect(t.invariantsChecked).toBe(43)
    expect(t.replicas).toBe(1)
    expect(t.strongConsistency).toBe(false)
  })
  it('the invariant count (DeepSeek-Prover gates) raises the cost under coverage', () => {
    const none = proofTamperCost({ invariantsChecked: 0, coverage: 0.99 })
    const many = proofTamperCost({ invariantsChecked: 43, coverage: 0.99 })
    expect(many.crackCostLog2).toBeGreaterThan(none.crackCostLog2)
  })
  it('CRAQ replicas (3FS) multiply the cost; eventual consistency does not', () => {
    const craq = proofTamperCost({ invariantsChecked: 43, coverage: 0.99, replicas: 5, strongConsistency: true })
    const eventual = proofTamperCost({ invariantsChecked: 43, coverage: 0.99, replicas: 5, strongConsistency: false })
    expect(craq.crackCostLog2).toBeGreaterThan(eventual.crackCostLog2)
  })
  it('100% coverage by architecture ⇒ ∞ (uncrackable), surfaced publicly', () => {
    const t = proofTamperCost({ invariantsChecked: 43, coverage: 1 })
    expect(t.crackCostLog2).toBe(Number.POSITIVE_INFINITY)
    expect(t.note).toMatch(/100% coverage/)
  })
  it('echoes the amplifier inputs so a peer can recompute the claim (verify, do not trust)', () => {
    const t = proofTamperCost({ invariantsChecked: 43, coverage: 0.999, replicas: 3, strongConsistency: true })
    expect(t).toMatchObject({ invariantsChecked: 43, replicas: 3, strongConsistency: true, coverage: 0.999 })
  })
})
