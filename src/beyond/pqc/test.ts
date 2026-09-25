import { describe, it, expect } from 'vitest'
import {
  ML_KEM,
  isApprovedPqc,
  kemCoefficients,
  kemForCategory,
  kemWireBytes,
  signPqc,
  verifyPqc,
} from '@/beyond/pqc'
import type { PqcAlgorithm, PqcSignature } from '@/beyond/types'

const payload = new TextEncoder().encode('audit-leaf-bytes')

/**
 * It returned a PqcSignature whose signatureB64 read `PLACEHOLDER-pending-libpqc-integration`,
 * with a real algorithm name and a real timestamp, and it did not throw.
 */
describe('beyond/pqc — it refuses instead of returning a placeholder', () => {
  it('signPqc refuses and names what is missing', () => {
    const r = signPqc({ payload, publicKeyFingerprint: 'fp-abc' })
    expect(r.signed).toBe(false)
    expect(r.algorithm).toBe('ML-DSA-65')
    expect(r.refusal).toMatch(/no ML-DSA-65 signing key/)
    // there is no field a caller could mistake for a signature
    expect(Object.keys(r)).toEqual(['signed', 'algorithm', 'refusal'])
  })

  it('and honours the requested algorithm in the refusal', () => {
    expect(signPqc({ payload, algorithm: 'SLH-DSA-128', publicKeyFingerprint: 'fp' }).algorithm).toBe('SLH-DSA-128')
  })

  it('verifyPqc reaches no verdict, and says so', () => {
    const signature = { algorithm: 'ML-DSA-65', publicKeyFingerprint: 'fp', signatureB64: 'x', signedAt: new Date().toISOString() } as PqcSignature
    const result = verifyPqc({ payload, signature, publicKey: new Uint8Array([1, 2, 3]) })
    expect(result.ok).toBe(false)
    expect(result.reason).toMatch(/no ML-DSA verifier/)
  })

  it('isApprovedPqc accepts exactly the FIPS-approved lattice/hash algorithms', () => {
    const approved: ReadonlyArray<PqcAlgorithm> = ['ML-DSA-44', 'ML-DSA-65', 'ML-DSA-87', 'SLH-DSA-128']
    for (const alg of approved) expect(isApprovedPqc(alg)).toBe(true)
    expect(isApprovedPqc('XMSS')).toBe(false)
    expect(isApprovedPqc('LMS')).toBe(false)
  })
})

/**
 * FIPS 203 Tables 2 and 3 — received verbatim from the standard, never derived here.
 */
describe('beyond/pqc — the ML-KEM parameters the standard fixes', () => {
  it('carries the three approved sets with the two constants §7 names', () => {
    expect(ML_KEM).toHaveLength(3)
    for (const s of ML_KEM) {
      expect(s.n).toBe(256)
      expect(s.q).toBe(3329)
      expect(s.sharedSecretBytes).toBe(32)
    }
    expect(ML_KEM.map((s) => s.k)).toEqual([2, 3, 4])
    expect(ML_KEM.map((s) => s.category)).toEqual([1, 3, 5])
    expect(ML_KEM.map((s) => s.rbgStrengthBits)).toEqual([128, 192, 256])
  })

  it('the name is the coefficient count — k · n', () => {
    expect(ML_KEM.map(kemCoefficients)).toEqual([512, 768, 1024])
    for (const s of ML_KEM) expect(String(kemCoefficients(s))).toBe(s.name.split('-')[2])
  })

  it('q is prime, and 256 divides q − 1 — which is what makes the NTT exist', () => {
    const q = 3329
    let prime = q > 1
    for (let d = 2; d * d <= q; d++) if (q % d === 0) prime = false
    expect(prime).toBe(true)
    expect((q - 1) % 256).toBe(0) // 3328 = 13 · 256
    expect((q - 1) / 256).toBe(13)
  })

  it('a required category picks the smallest set that meets it, never a weaker one', () => {
    expect(kemForCategory(1)?.name).toBe('ML-KEM-512')
    expect(kemForCategory(2)?.name).toBe('ML-KEM-768') // no category-2 set exists; 3 is the next
    expect(kemForCategory(3)?.name).toBe('ML-KEM-768')
    expect(kemForCategory(5)?.name).toBe('ML-KEM-1024')
    expect(kemForCategory(6)).toBeUndefined() // refuses rather than returning the strongest
  })

  it('the wire cost is the encapsulation key plus the ciphertext, and it grows with k', () => {
    const costs = ML_KEM.map(kemWireBytes)
    expect(costs).toEqual([1568, 2272, 3136])
    for (let i = 1; i < costs.length; i++) expect(costs[i]!).toBeGreaterThan(costs[i - 1]!)
  })
})
