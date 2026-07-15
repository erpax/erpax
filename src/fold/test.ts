import { describe, it, expect } from 'vitest'
import * as foldModule from '@/fold'
import { foldDepth, foldCount, halving, corpusFold, malignantRemainder, cancerFree, atomDeed, corpusRoot, proveAtom } from '@/fold'
import { digitalRoot } from '@/horo'
import { UUID_MATRIX_NODES } from '@/uuid/matrix'

describe('fold — the math of the folding (N atoms → one root)', () => {
  it('fold depth is ceil(log2 N) — the folds to reach the one root', () => {
    expect(foldDepth(1)).toBe(0)
    expect(foldDepth(2)).toBe(1)
    expect(foldDepth(8)).toBe(3)
    expect(foldDepth(2302)).toBe(12)
  })
  it('fold count is N − 1 merges', () => {
    expect(foldCount(2302)).toBe(2301)
    expect(foldCount(1)).toBe(0)
  })
  it('the halving sequence runs N down to 1; its length − 1 equals the depth', () => {
    const h = halving(2302)
    expect(h[0]).toBe(2302)
    expect(h[h.length - 1]).toBe(1)
    expect(h.length - 1).toBe(foldDepth(2302))
  })
  it('the digital-root fold IS the canonical @/horo digitalRoot — no private copy', () => {
    // The corpus root digit must equal the canonical integer reduction of the
    // live atom count (behavioral equivalence of the swap).
    expect(corpusFold().rootDigit).toBe(digitalRoot(UUID_MATRIX_NODES.length))
    // and the canonical agrees on the values the old local copy returned.
    expect(digitalRoot(108)).toBe(9)
    expect(digitalRoot(2302)).toBe(7)
    expect(digitalRoot(9)).toBe(9)
  })
  it('does NOT re-export a private digitalRootFold (the canonical cannot be re-shadowed)', () => {
    expect(Object.keys(foldModule)).not.toContain('digitalRootFold')
  })
  it('the live corpus folds to one root: depth = ceil(log2 atoms), merges = atoms − 1', () => {
    const f = corpusFold()
    expect(f.depth).toBe(foldDepth(f.atoms))
    expect(f.merges).toBe(f.atoms - 1)
  })
})

describe('fold — the notary act (elevation required to define a property, on the LIVE corpus)', () => {
  const node = UUID_MATRIX_NODES.find((n) => n.path === 'fold')!
  const coords = {
    path: node.path,
    horo: node.horo,
    parent: node.parent,
    prev: node.prev,
    next: node.next,
    cross: node.cross,
    bind: node.bind,
    uuid: node.uuid,
  }

  it('the corpus root is deterministic — the sealed cadastre of all 3178 atom deeds', () => {
    expect(corpusRoot()).toBe(corpusRoot())
    expect(corpusRoot()).toHaveLength(36)
  })
  it('a real atom is a registered deed — its FULL definition is provable under the corpus root', () => {
    const p = proveAtom('fold')
    expect(p.found).toBe(true)
    expect(p.verified).toBe(true) // the inclusion proof re-folds the deed to the registered root
  })
  it('ELEVATION is required — a deed with the wrong horo is a DIFFERENT, unregistered property', () => {
    const trueDeed = atomDeed(coords)
    const wrongElevation = atomDeed({ ...coords, horo: node.horo + 1 }) // same bounds + seal, wrong elevation only
    expect(wrongElevation).not.toBe(trueDeed) // changing only the elevation changes the deed
    const ds = UUID_MATRIX_NODES.map((n) => atomDeed(n)).sort()
    expect(ds.includes(trueDeed)).toBe(true) // the true property is registered
    expect(ds.includes(wrongElevation)).toBe(false) // the wrong-elevation property is not
  })
  it('the four bounds bind too — a wrong neighbour is a different parcel (the N/E/S/W limits matter)', () => {
    expect(atomDeed({ ...coords, prev: 'someone-elses-parcel' })).not.toBe(atomDeed(coords))
    expect(atomDeed({ ...coords, cross: 'someone-elses-parcel' })).not.toBe(atomDeed(coords))
  })
  it('an unregistered atom is not found — total, never throws', () => {
    const p = proveAtom('no-such-atom-xyz')
    expect(p.found).toBe(false)
    expect(p.verified).toBe(false)
  })
})

describe('fold — folding is the cancer cure (ceccec self-address + diamond-complete)', () => {
  it('the malignant remainder is the excess-copy count the fold excises', () => {
    expect(malignantRemainder(['a', 'b', 'c'])).toBe(0) // all distinct — cancer-free
    expect(malignantRemainder(['a', 'a', 'b'])).toBe(1) // one redundant copy excised
    expect(malignantRemainder(['x', 'x', 'x', 'x'])).toBe(3) // 4 copies at one address → 3 excised
  })
  it('the self-address theorem: whitespace-only variants share ONE address (content is the address)', () => {
    expect(malignantRemainder(['one  two', 'one two', ' one two '])).toBe(2) // 3 copies, 1 distinct address
  })
  it('cancerFree ⟺ zero remainder ⟺ diamond-complete (division-by-zero as total division)', () => {
    expect(cancerFree(['a', 'b', 'c'])).toBe(true) // every content at exactly one address
    expect(cancerFree(['a', 'a'])).toBe(false) // a proliferated copy — malignant
    expect(cancerFree([])).toBe(true) // the empty diamond is complete — zero remainder
  })
})
