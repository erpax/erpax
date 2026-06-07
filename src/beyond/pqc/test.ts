import { describe, it, expect } from 'vitest'
import { signPqc, verifyPqc, isApprovedPqc } from '@/beyond/pqc'
import type { PqcAlgorithm, PqcSignature } from '@/beyond/types'

const payload = new TextEncoder().encode('audit-leaf-bytes')

describe('beyond/pqc — the quantum-proof seal', () => {
  it('signPqc defaults to ML-DSA-65 and echoes the fingerprint + a timestamp', () => {
    const sig = signPqc({ payload, publicKeyFingerprint: 'fp-abc' })
    expect(sig.algorithm).toBe('ML-DSA-65')
    expect(sig.publicKeyFingerprint).toBe('fp-abc')
    // a real ISO-8601 instant, not NaN
    expect(Number.isNaN(Date.parse(sig.signedAt))).toBe(false)
  })

  it('signPqc honours the requested algorithm', () => {
    const sig = signPqc({ payload, algorithm: 'SLH-DSA-128', publicKeyFingerprint: 'fp' })
    expect(sig.algorithm).toBe('SLH-DSA-128')
  })

  it('isApprovedPqc accepts exactly NIST FIPS-approved lattice/hash algorithms', () => {
    const approved: ReadonlyArray<PqcAlgorithm> = ['ML-DSA-44', 'ML-DSA-65', 'ML-DSA-87', 'SLH-DSA-128']
    for (const alg of approved) expect(isApprovedPqc(alg)).toBe(true)
  })

  it('isApprovedPqc rejects algorithms not on the approved list (XMSS, LMS)', () => {
    expect(isApprovedPqc('XMSS')).toBe(false)
    expect(isApprovedPqc('LMS')).toBe(false)
  })

  it('verifyPqc is a STUB that fails closed with a reason (never silently ok)', () => {
    const signature: PqcSignature = signPqc({ payload, publicKeyFingerprint: 'fp' })
    const result = verifyPqc({ payload, signature, publicKey: new Uint8Array([1, 2, 3]) })
    expect(result.ok).toBe(false)
    expect(result.reason).toMatch(/pending/i)
  })
})
