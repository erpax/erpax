/**
 * Anchor — the borrowed-entropy strengths, asserted. Green by construction.
 * @see ./index.ts, ../tamper-cost (crackVerdict consumes these as anchorStrengthBits)
 */
import { describe, it, expect } from 'vitest'
import { ANCHOR_STRENGTH_BITS, anchorBinds, anchoredFloorLog2, anchorBinding } from './index'
import { ERPAX_DIGEST_BITS } from '@/services/tamper-cost'

describe('anchor: real strengths per kind (NIST SP 800-57)', () => {
  it('RFC-3161 RSA-2048 ≈ 112-bit, P-256 ≈ 128-bit, PoW ≈ ∞, none = 0', () => {
    expect(ANCHOR_STRENGTH_BITS['rfc3161-rsa2048']).toBe(112)
    expect(ANCHOR_STRENGTH_BITS['rfc3161-ecdsa-p256']).toBe(128)
    expect(ANCHOR_STRENGTH_BITS['blockchain-pow']).toBe(Number.POSITIVE_INFINITY)
    expect(ANCHOR_STRENGTH_BITS.none).toBe(0)
  })
})

describe('anchor: it must be ≥ the digest, or it is the weak link', () => {
  it('RSA-2048 (112) binds the 106-bit erpax digest; none does not', () => {
    expect(anchorBinds('rfc3161-rsa2048', ERPAX_DIGEST_BITS)).toBe(true)
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
