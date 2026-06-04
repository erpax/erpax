/**
 * Empirical proof leg — the MAXIMUM tamper cost is the inverse projection.
 *
 * The uuid matrix is a projection space: content → content-uuid, private-key →
 * public anchor. The forward projection (the public POSITIVE) is one hash — free,
 * deterministic, and it mints an atom ([[identity]]/[[merge]]). The MAXIMUM tamper
 * cost is the INVERSE: recovering the analog NEGATIVE (the private key / pre-image)
 * from the positive — reverse entropy, order from a maximal-entropy projection,
 * costing the anchor (services/anchor): rfc3161-ecdsa-p256 ⇒ 128, blockchain-pow ⇒
 * unbounded. The biggest blockchain's unclaimed bounty is the live proof nobody
 * pays it. The 106-bit digest floor is the cheaper hash-collision path, NOT the
 * maximum. @see ../../index.ts ../../bitcoin/genesis
 */
import { describe, it, expect } from 'vitest'
import { projectionProof } from './index'

describe('projection: the analog negative (private key) is the maximum tamper cost', () => {
  it('forward projection (content → uuid on the matrix) is free + deterministic — one atom per hash', () => {
    const p = projectionProof()
    expect(p.space).toBe('uuid-matrix')
    expect(p.forward.deterministic).toBe(true)
    // a real uuidv8 (version nibble 8, RFC 9562 §5.8) — the public positive
    expect(p.forward.uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
    expect(p.forward.costLog2).toBe(0) // one hash, O(1)
  })

  it('on the biggest blockchain (blockchain-pow anchor) the inverse is unbounded — decrypting the key is the max', () => {
    const p = projectionProof() // default anchor = blockchain-pow (the biggest chain)
    expect(p.inverse.anchorKind).toBe('blockchain-pow')
    expect(p.inverse.decryptKeyLog2).toBeNull() // ∞ — recovering the analog negative is unbounded
    expect(p.inverse.unbounded).toBe(true)
    expect(p.inverse.digestFloorLog2).toBe(106) // the cheaper hash-collision path, NOT the maximum
    expect(p.inverse.cheapestForgeLog2).toBe(106) // honest overall floor = min(digest, anchor)
    expect(p.inverse.binding).toBe('digest')
  })

  it('a finite asymmetric anchor (ECDSA P-256) makes the key-recovery cost exactly 128 bits', () => {
    const e = projectionProof('rfc3161-ecdsa-p256')
    expect(e.inverse.decryptKeyLog2).toBe(128)
    expect(e.inverse.unbounded).toBe(false)
  })

  it('names the construction (analog negative · reverse entropy) and is deterministic', () => {
    const p = projectionProof()
    expect(p.note).toMatch(/analog negative|private key/i)
    expect(p.reverseEntropy).toMatch(/entropy/i)
    expect(projectionProof()).toEqual(projectionProof())
  })
})
