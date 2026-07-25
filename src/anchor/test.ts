/**
 * Anchor — the borrowed-entropy strengths, asserted. Green by construction.
 * @see ./index.ts, ../tamper-cost (crackVerdict consumes these as anchorStrengthBits)
 */
import { describe, it, expect } from 'vitest'
import { ANCHOR_STRENGTH_BITS, anchorBinds, anchoredFloorLog2, anchorBinding, fusionResilience } from '@/anchor'
import { ERPAX_DIGEST_BITS, secondPreimageLog2, bhtCollisionLog2 } from '@/cost'

describe('anchor: real strengths per kind (NIST SP 800-57)', () => {
  it('RFC-3161 RSA-2048 ≈ 112-bit, P-256 ≈ 128-bit, PoW ≈ ∞, none = 0', () => {
    expect(ANCHOR_STRENGTH_BITS['rfc3161-rsa2048']).toBe(112)
    expect(ANCHOR_STRENGTH_BITS['rfc3161-ecdsa-p256']).toBe(128)
    expect(ANCHOR_STRENGTH_BITS['blockchain-pow']).toBe(Number.POSITIVE_INFINITY)
    expect(ANCHOR_STRENGTH_BITS.none).toBe(0)
  })
})

describe('anchor: it must be ≥ the digest, or it is the weak link', () => {
  it('the digest outgrew RSA: P-256 (128) binds the erpax digest, RSA-2048 (112) is now the weak link', () => {
    // ERPAX_DIGEST_BITS is 122 (128 − version − variant), so 112 < 122 — RSA-2048 no longer binds.
    expect(anchorBinds('rfc3161-ecdsa-p256', ERPAX_DIGEST_BITS)).toBe(true)
    expect(anchorBinds('rfc3161-rsa2048', ERPAX_DIGEST_BITS)).toBe(false)
    expect(anchorBinding('rfc3161-rsa2048', ERPAX_DIGEST_BITS)).toBe('anchor')
    expect(anchorBinds('none', ERPAX_DIGEST_BITS)).toBe(false)
  })
  it('against a wider 128-bit digest, RSA-2048 (112) is the weak link', () => {
    expect(anchorBinds('rfc3161-rsa2048', 128)).toBe(false)
    expect(anchorBinding('rfc3161-rsa2048', 128)).toBe('anchor')
  })
  it('anchored floor is the digest when the anchor is strong enough', () => {
    expect(anchoredFloorLog2('rfc3161-ecdsa-p256', ERPAX_DIGEST_BITS)).toBe(ERPAX_DIGEST_BITS)
    expect(anchorBinding('rfc3161-ecdsa-p256', ERPAX_DIGEST_BITS)).toBe('digest')
  })
})

describe('anchor: un-anchored ⇒ free rewrite', () => {
  it('no anchor ⇒ floor 0 (a deterministic store is rewritten for free)', () => {
    expect(anchoredFloorLog2('none', ERPAX_DIGEST_BITS)).toBe(0)
    expect(anchorBinding('none', ERPAX_DIGEST_BITS)).toBe('none')
  })
})

describe('anchor: 4-key fusion resilience — one inverted key does not break the cross', () => {
  const r = fusionResilience()
  it('a lone key inverted is a total break; the fusion recovers the full floor', () => {
    expect(r.singleKeyBrokenLog2).toBe(0)
    expect(r.fusionFloorClassicalLog2).toBe(secondPreimageLog2(ERPAX_DIGEST_BITS))
    expect(r.fusionFloorQuantumLog2).toBeCloseTo(bhtCollisionLog2(ERPAX_DIGEST_BITS), 6)
  })
  it('up to keys − 1 may be cracked with integrity held (flat under cracking — hash, not XOR)', () => {
    expect(r.crackableWithIntegrity).toBe(r.keys - 1)
    expect(r.flatUnderCracking).toBe(true)
  })
  it('orientation is one bit per directed referral — topological, never counted toward the floor', () => {
    expect(r.orientationBits).toBe(r.keys)
    expect(r.orientationBits).toBeLessThan(r.fusionFloorQuantumLog2) // 4 ≪ 40.67 — a rounding error on strength
  })
})
