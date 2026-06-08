/**
 * Public tamper-cost surfacing — the proof bundle self-describes its forge≫verify
 * asymmetry from its OWN invariant count, deepseek-amplified. Pure (no DB), so a
 * peer recomputes the exact claim. @see ./dry-proof.ts, src/services/tamper-cost
 */
import { describe, it, expect } from 'vitest'
import { proofTamperCost, empiricalProofs } from './dry-proof'
import { jcsCanonicalize } from '@/integrity'

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

describe('dry-proof: empirical blockchain legs faced at /proof/ (verify, do not trust)', () => {
  it('always carries the bitcoin-genesis leg — the biggest blockchain, recomputable, forge ≫ verify', () => {
    const e = empiricalProofs()
    expect(e.bitcoinGenesis.blockHash).toBe('000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f')
    expect(e.bitcoinGenesis.powValid).toBe(true)
    expect(e.bitcoinGenesis.forgeCostLog2).toBeGreaterThan(Math.log2(e.bitcoinGenesis.verifyHashes))
    // No git facts ⇒ no merkle leg: buildDryProofBundle runs at the edge where git is absent.
    expect(e.merkleDag).toBeUndefined()
  })
  it('adds the merkle-dag leg when build-time git facts are supplied', () => {
    const e = empiricalProofs({ head: 'abc123', commits: 771, objects: 13655, onDiskBytes: 1, fsckClean: true })
    expect(e.merkleDag?.chain).toBe('git-merkle-dag')
    expect(e.merkleDag?.commits).toBe(771)
  })
  it('carries the projection leg — the analog-negative inverse is the headline max (unbounded on the biggest chain)', () => {
    const e = empiricalProofs()
    expect(e.projection.space).toBe('uuid-matrix')
    expect(e.projection.forward.deterministic).toBe(true)
    expect(e.projection.inverse.decryptKeyLog2).toBeNull() // decrypting the biggest chain's key is unbounded
    expect(e.projection.inverse.unbounded).toBe(true)
  })
  it('jcsCanonicalize rejects non-finite numbers — the hazard the legs must avoid', () => {
    expect(() => jcsCanonicalize({ x: Number.POSITIVE_INFINITY })).toThrow()
  })
  it('every empirical leg is JCS-serializable, so no non-finite number can break the bundle content-uuid', () => {
    expect(() =>
      jcsCanonicalize(empiricalProofs({ head: 'a', commits: 1, objects: 1, onDiskBytes: 1, fsckClean: true })),
    ).not.toThrow()
  })
})
