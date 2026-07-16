import { describe, it, expect } from 'vitest'
import { merge, foldToRoot, atomPath, BOTTOM, merkleProof, verifyMerkleProof, chainLeaf } from './index'

describe('merge — the binary operation of the folded algebra', () => {
  it('same content ⇒ same address (the self-address congruence — dedup by physics, not registry)', () => {
    expect(merge('a', 'b')).toBe(merge('a', 'b')) // deterministic — convergence with no coordination
    expect(typeof merge('a', 'b')).toBe('string')
    expect(merge('a', 'b')).toHaveLength(36) // closed: the result is itself a uuid (a valid element)
  })
  it('the ∥ delimiter keeps the fusion unambiguous — merge("a","bc") ≠ merge("ab","c")', () => {
    expect(merge('a', 'bc')).not.toBe(merge('ab', 'c'))
  })
  it('is a MAGMA — the fold is NOT associative and NOT commutative (tree + leaf-order are the element)', () => {
    expect(merge(merge('a', 'b'), 'c')).not.toBe(merge('a', merge('b', 'c'))) // non-associative
    expect(merge('a', 'b')).not.toBe(merge('b', 'a')) // non-commutative — the pair is ordered
  })
  it('foldToRoot collapses many elements to ONE root, deterministically (encode = fold, many → one)', () => {
    expect(foldToRoot(['a', 'b', 'c', 'd'])).toBe(foldToRoot(['a', 'b', 'c', 'd'])) // same leaves ⇒ same root
    expect(foldToRoot(['a', 'b', 'c', 'd'])).not.toBe(foldToRoot(['a', 'b', 'c', 'e'])) // any change ⇒ new root
    expect(foldToRoot(['x'])).toBe('x') // a single element is already its own root
    expect(foldToRoot([])).toBe(foldToRoot([])) // the empty fold is the void's address — the identity
  })
  it('exports the canonical atom path', () => {
    expect(atomPath).toBe('merge')
  })
})

describe('merge — the inclusion proof (total membership; the one-way wall resolved)', () => {
  it('EVERY leaf re-folds to the root via its authentication path — across even AND odd tree sizes', () => {
    for (const n of [1, 2, 3, 4, 5, 7, 8, 9]) {
      const leaves = Array.from({ length: n }, (_, i) => `leaf-${i}`)
      const root = foldToRoot(leaves)
      for (let i = 0; i < n; i++) {
        expect(verifyMerkleProof(leaves[i]!, merkleProof(leaves, i), root)).toBe(true)
      }
    }
  })
  it('is TOTAL — an absent leaf verifies false (⊥), never throws', () => {
    const leaves = ['a', 'b', 'c', 'd', 'e']
    const root = foldToRoot(leaves)
    expect(verifyMerkleProof('z', merkleProof(leaves, 2), root)).toBe(false) // absent content
    expect(merkleProof(leaves, 99)).toEqual([]) // out-of-range index ⇒ ⊥ (empty path), no throw
    expect(verifyMerkleProof('a', [], root)).toBe(false) // a leaf alone is not the multi-leaf root
  })
  it('a tampered path fails — the proof binds leaf, siblings, AND root (non-invertible ⇒ unforgeable)', () => {
    const leaves = ['a', 'b', 'c', 'd']
    const root = foldToRoot(leaves)
    const proof = merkleProof(leaves, 1)
    const tampered = proof.map((s, i) => (i === 0 ? { ...s, sibling: merge('x', 'y') } : s))
    expect(verifyMerkleProof('b', tampered, root)).toBe(false)
  })
  it('BOTTOM is the void address — the algebra-s ⊥, deterministic', () => {
    expect(BOTTOM).toBe(foldToRoot([])) // the empty fold IS the bottom
    expect(BOTTOM).toHaveLength(36)
  })

  // chainLeaf — the fold over a record + the leaf before it. Hand-rolled seven times as base64 truncated to
  // the first 24 bytes of input, under a banner claiming tamper detection. These are the properties every
  // one of those copies failed; they are asserted here once, where the law now lives.
  describe('chainLeaf — the audit leaf, stated once', () => {
    it('is the fold, not a private hash', () => {
      expect(chainLeaf({ a: 1 }, 'prior')).toBe(merge(JSON.stringify({ a: 1 }), 'prior'))
      expect(chainLeaf({ a: 1 })).toHaveLength(36)
    })

    it('covers the WHOLE record — the old leaf saw only the first 24 bytes', () => {
      const long = { padding: 'x'.repeat(64), fiscalYear: 2026 }
      const tampered = { padding: 'x'.repeat(64), fiscalYear: 9999 }
      const old = (d: unknown) => Buffer.from(JSON.stringify(d)).toString('base64').substring(0, 32)
      expect(old(long)).toBe(old(tampered)) // the defect: rewritten past the window, unnoticed
      expect(chainLeaf(long)).not.toBe(chainLeaf(tampered))
    })

    it('CHAINS — the prior leaf is an input, not decoration', () => {
      expect(chainLeaf({ a: 1 }, 'A')).not.toBe(chainLeaf({ a: 1 }, 'B'))
      expect(chainLeaf({ a: 1 }, 'A')).not.toBe(chainLeaf({ a: 1 }))
    })

    it('is one-way — the old leaf decoded back to plaintext', () => {
      const secret = { salary: 999 }
      expect(Buffer.from(Buffer.from(JSON.stringify(secret)).toString('base64'), 'base64').toString()).toContain('999')
      expect(chainLeaf(secret)).not.toContain('999')
    })

    it('same content, same address — the fold law, and the reason dedup works', () => {
      expect(chainLeaf({ a: 1, b: 2 })).toBe(chainLeaf({ a: 1, b: 2 }))
    })

    // The honest boundary, asserted rather than promised: JSON.stringify is NOT JCS (RFC 8785). The same
    // record built key-order-differently addresses differently. The old copies' comments claimed JCS.
    it('is NOT canonical — key order changes the address, as the old comments denied', () => {
      expect(chainLeaf({ a: 1, b: 2 })).not.toBe(chainLeaf({ b: 2, a: 1 }))
    })
  })
})
