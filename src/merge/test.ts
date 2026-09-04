import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import { merge, foldToRoot, atomPath, BOTTOM, merkleProof, verifyMerkleProof, chainLeaf, canonical, collisionClasses } from './index'

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
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
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
    it('is the fold over CANONICAL bytes, not a private hash', () => {
      // was asserted against JSON.stringify — which passes only because a one-key object serialises the
      // same either way. It described the old implementation, not the law.
      expect(chainLeaf({ b: 2, a: 1 }, 'prior')).toBe(merge(canonical({ a: 1, b: 2 }), 'prior'))
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

    // This test used to assert the OPPOSITE — "is NOT canonical, key order changes the address" — pinning
    // as permanent a gap I had declared unwritten. DRY-cleaning by content-address refuted me: the
    // canonicaliser existed, twice, privately, in readme/compute and readme/paper, while ten hand-rolled
    // leaves all carried a comment claiming JCS. Duplication is camouflage.
    it('key order does NOT change the address — the same record, however it was built', () => {
      expect(chainLeaf({ a: 1, b: 2 })).toBe(chainLeaf({ b: 2, a: 1 }))
      expect(chainLeaf({ a: { x: 1, y: 2 } })).toBe(chainLeaf({ a: { y: 2, x: 1 } })) // nested too
    })

    it('canonical is key-order only — NOT full RFC 8785, and this one will not overclaim', () => {
      expect(canonical({ b: 2, a: 1 })).toBe('{"a":1,"b":2}')
      expect(canonical([3, { b: 1, a: 2 }])).toBe('[3,{"a":2,"b":1}]') // arrays keep ORDER, objects sort
      // deferred to JSON.stringify, where JCS would not: these are the honest edges
      expect(canonical(NaN)).toBe('null')
      expect(canonical(-0)).toBe('0')
    })

    it('content still decides — a different value is a different address', () => {
      expect(chainLeaf({ a: 1 })).not.toBe(chainLeaf({ a: 2 }))
      expect(chainLeaf({ a: 1 })).not.toBe(chainLeaf({ b: 1 }))
    })
  })

  // Prose blocks collision; terse computed facet-joins collide — the fold's floor, encoded.
  describe('collisionClasses — prose never dedups (floor), computed collapses (dedup)', () => {
    it('unique prose folds to N distinct addresses — dedup 0, the incompressible floor', () => {
      const prose = ['The invoice was posted on Tuesday.', 'A vendor bank account changed.', 'The audit found nothing.']
      const c = collisionClasses(prose)
      expect(c.distinct).toBe(3) // every unique paragraph is its own address
      expect(c.dedup).toBe(0) // prose blocks the collision — nothing folds
    })

    it('terse computed facet-joins collide where meaning is shared — dedup > 0', () => {
      // same computed body ⇒ same content-address ⇒ one class (the collision that IS the fold)
      const computed = ['path=a uuid=1', 'path=a uuid=1', 'path=b uuid=2']
      const c = collisionClasses(computed)
      expect(c.distinct).toBe(2) // two classes for three bodies
      expect(c.dedup).toBeCloseTo(1 / 3) // a third collapses
    })

    it('all-identical computed output collapses to one — dedup → 1; empty is 0', () => {
      expect(collisionClasses(['x', 'x', 'x', 'x']).dedup).toBe(0.75) // 1 of 4 classes
      expect(collisionClasses([]).dedup).toBe(0)
    })
  })
})

import { bind4 as bind4Fn, merge as mergeFn } from '@/merge'

describe('bind4 — the canonical 4-key navigation-cross fold (one formula, reused by chat + matrix bind)', () => {
  const s = bind4Fn('referrer', 'id', 'prev', 'next')
  it('is the matrix-bind shape: merge(id, merge(merge(referrer, prev), next))', () => {
    expect(s).toBe(mergeFn('id', mergeFn(mergeFn('referrer', 'prev'), 'next')))
  })
  it('folds to a content-uuid', () => {
    expect(s).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })
  it('ALL 4 keys are load-bearing — flipping any one breaks the seal (tamper-evident, not linear)', () => {
    expect(bind4Fn('X', 'id', 'prev', 'next')).not.toBe(s)
    expect(bind4Fn('referrer', 'X', 'prev', 'next')).not.toBe(s)
    expect(bind4Fn('referrer', 'id', 'X', 'next')).not.toBe(s)
    expect(bind4Fn('referrer', 'id', 'prev', 'X')).not.toBe(s)
  })
})

import {
  leafObject,
  combineObjects,
  objectAddress,
  sameObject,
  objectDepth,
  objectLeaves,
} from '@/merge'

describe('object fold — an object may be a combination of objects (content-addressed recursion, like biology)', () => {
  const molecule = (c: string) => leafObject(c)
  const cell = combineObjects(molecule('h2o'), molecule('atp'), molecule('dna'))
  const organ = combineObjects(cell, cell)
  const organism = combineObjects(organ, organ)

  it('a leaf addresses its content; same content ⇒ same address', () => {
    expect(objectAddress(leafObject('dna'))).toBe(objectAddress(leafObject('dna')))
    expect(objectAddress(leafObject('dna'))).not.toBe(objectAddress(leafObject('rna')))
  })
  it('same composition ⇒ same address at every level (content-addressed recursion)', () => {
    const cell2 = combineObjects(molecule('h2o'), molecule('atp'), molecule('dna'))
    expect(sameObject(cell, cell2)).toBe(true)
    expect(sameObject(organism, combineObjects(combineObjects(cell2, cell2), combineObjects(cell2, cell2)))).toBe(true)
  })
  it('is CLOSED — a combination of objects is an object, foldable again (mixing levels is fine)', () => {
    const tissue = combineObjects(cell, organ, organism)
    expect(typeof objectAddress(tissue)).toBe('string')
    expect(objectDepth(tissue)).toBe(1 + objectDepth(organism))
  })
  it('changing one leaf changes the whole address (compositional tamper-cost)', () => {
    const mutated = combineObjects(combineObjects(molecule('h2o'), molecule('atp'), molecule('MUTANT')), cell)
    expect(objectAddress(mutated)).not.toBe(objectAddress(organ))
  })
  it('depth + leaves count the recursion', () => {
    expect(objectDepth(molecule('dna'))).toBe(0)
    expect(objectDepth(organism)).toBe(3)
    expect(objectLeaves(cell)).toEqual(['h2o', 'atp', 'dna'])
    expect(objectLeaves(organism)).toHaveLength(12)
  })
  it('a combination of one object folds to that object (a bag of one thing is that thing)', () => {
    expect(objectAddress(combineObjects(cell))).toBe(objectAddress(cell))
  })
})

import { significance, resourceMap } from '@/merge'

describe('resource map — with each discovery the map changes as significance (relative, not absolute)', () => {
  const cellA = combineObjects(leafObject('h2o'), leafObject('atp'))
  const cellB = combineObjects(leafObject('dna'), leafObject('rna'), leafObject('protein'))
  it('significance is the matter (leaf count): a leaf is 1, a combination the sum of parts', () => {
    expect(significance(leafObject('x'))).toBe(1)
    expect(significance(cellA)).toBe(2)
    expect(significance(cellB)).toBe(3)
  })
  it('shares sum to 1 over a non-empty map', () => {
    const map = resourceMap([cellA, cellB])
    expect(map.reduce((s, r) => s + r.share, 0)).toBeCloseTo(1)
    expect(map[0]!.share).toBeCloseTo(2 / 5)
    expect(map[1]!.share).toBeCloseTo(3 / 5)
  })
  it('a NEW discovery changes every prior share — the map is remade (significance is relative)', () => {
    const before = resourceMap([cellA, cellB])
    const newcomer = combineObjects(leafObject('a'), leafObject('b'), leafObject('c'), leafObject('d'), leafObject('e'))
    const after = resourceMap([cellA, cellB, newcomer])
    expect(after[0]!.share).toBeLessThan(before[0]!.share) // cellA diluted by the discovery
    expect(after[1]!.share).toBeLessThan(before[1]!.share) // cellB diluted too
    expect(after[2]!.share).toBeCloseTo(5 / 10) // the newcomer's own weight
  })
  it('an empty world has an empty map (no significance to allocate)', () => {
    expect(resourceMap([])).toEqual([])
  })
})

import { billOfResources, billAtScale } from '@/merge'

describe('bill of resources — a discovery requires specific resources to be manifested at public scale', () => {
  const device = combineObjects(leafObject('silicon'), leafObject('copper'), leafObject('silicon')) // silicon ×2
  it('tallies every leaf resource with multiplicity (the exact demand to build one)', () => {
    const bill = billOfResources(device)
    expect(bill.get('silicon')).toBe(2)
    expect(bill.get('copper')).toBe(1)
  })
  it('a combination bill is the sum of its parts (recursive demand)', () => {
    const product = combineObjects(device, combineObjects(leafObject('copper'), leafObject('gold')))
    const bill = billOfResources(product)
    expect(bill.get('silicon')).toBe(2)
    expect(bill.get('copper')).toBe(2) // 1 from device + 1 from the sub-part
    expect(bill.get('gold')).toBe(1)
  })
  it('manifesting at LARGE SCALE is linear in every resource (n copies ⇒ n× each)', () => {
    const scaled = billAtScale(device, 1000)
    expect(scaled.get('silicon')).toBe(2000)
    expect(scaled.get('copper')).toBe(1000)
  })
})

import { dissect, birth } from '@/merge'

describe('dissect / birth — dead code can be dissected and new code may be born (object fold inverse)', () => {
  const parts = [leafObject('h2o'), leafObject('atp'), leafObject('dna')]
  const cell = combineObjects(...parts)
  it('dissect opens a combination into its parts; a leaf is atomic (dissects to nothing)', () => {
    expect(dissect(cell)).toEqual(parts)
    expect(dissect(leafObject('x'))).toEqual([])
  })
  it('birth(dissect(x)) reconstitutes x exactly — dissection is reversible (same address)', () => {
    expect(objectAddress(birth(dissect(cell)))).toBe(objectAddress(cell))
  })
  it('recombining the parts in a NEW arrangement is genuinely new (a different address)', () => {
    const reborn = birth([...dissect(cell)].reverse())
    expect(objectAddress(reborn)).not.toBe(objectAddress(cell)) // order is part of the element
  })
  it('a recombination that reproduces an existing object collides to it — nothing is born twice (dedup)', () => {
    expect(objectAddress(birth(parts))).toBe(objectAddress(cell)) // same composition ⇒ same object
  })
})
