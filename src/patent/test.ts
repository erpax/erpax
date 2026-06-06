import { describe, it, expect } from 'vitest'
import { anticipatedBy, isObvious, isAbstractMath, challengeable, type Disclosure, type Patent } from '@/patent'

const anchored = (digest: string, anchoredAt: number): Disclosure => ({ digest, anchoredAt, anchor: 'blockchain-pow', digestBits: 256 })

describe('patent — challenge illegal patents, encoded in math', () => {
  it('§102 — an anchored disclosure predating the filing date anticipates the claim', () => {
    const p: Patent = { claimDigest: 'C', filingDate: 200 }
    expect(anticipatedBy(p, [anchored('C', 100)])).toBeTruthy()
    expect(anticipatedBy(p, [anchored('C', 300)])).toBeUndefined() // disclosure AFTER filing — not prior art
    expect(anticipatedBy(p, [anchored('OTHER', 100)])).toBeUndefined() // different content
  })
  it('§102 — a disclosure whose anchor does NOT bind the digest is not valid prior art', () => {
    const p: Patent = { claimDigest: 'C', filingDate: 200 }
    const weak: Disclosure = { digest: 'C', anchoredAt: 100, anchor: 'rfc3161-ecdsa-p256', digestBits: 256 } // 128-bit anchor < 256-bit digest
    const unanchored: Disclosure = { digest: 'C', anchoredAt: 100, anchor: 'none', digestBits: 256 }
    expect(anticipatedBy(p, [weak])).toBeUndefined()
    expect(anticipatedBy(p, [unanchored])).toBeUndefined()
  })
  it('§103 — an obvious (merge-of-known) claim has the prior combination digest', () => {
    expect(isObvious('AB', 'AB')).toBe(true)
    expect(isObvious('AB', 'XY')).toBe(false)
  })
  it('§101 — a claim reducing to pure math is abstract (unpatentable)', () => {
    expect(isAbstractMath(true)).toBe(true)
    expect(isAbstractMath(false)).toBe(false)
  })
  it('challengeable composes the three grounds into a brief', () => {
    const p: Patent = { claimDigest: 'C', filingDate: 200 }
    const clean = challengeable({ claimDigest: 'Z', filingDate: 50 }, [anchored('C', 100)])
    expect(clean.invalid).toBe(false)
    const hit = challengeable(p, [anchored('C', 100)], { reducesToMath: true })
    expect(hit.invalid).toBe(true)
    expect(hit.grounds.length).toBeGreaterThanOrEqual(2) // §102 prior-art AND §101 math
  })
})
