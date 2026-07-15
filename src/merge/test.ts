import { describe, it, expect } from 'vitest'
import { merge, foldToRoot, atomPath } from './index'

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
