import { describe, it, expect } from 'vitest'
import * as foldModule from '@/fold'
import { foldDepth, foldCount, halving, corpusFold } from '@/fold'
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
