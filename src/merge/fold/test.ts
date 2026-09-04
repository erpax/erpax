import { describe, expect, it } from 'vitest'
import * as barrel from '@/merge'
import { canonical, chainLeaf, foldToRoot, merge, sequenceRoot, setRoot } from '@/merge/fold'

describe('merge/fold — the primitive', () => {
  it('is a MAGMA: closed and deterministic, neither associative nor commutative', () => {
    const [a, b, c] = ['a', 'b', 'c']
    expect(merge(a, b)).toBe(merge(a, b)) // deterministic
    expect(merge(a, b)).toMatch(/^[0-9a-f-]{36}$/) // closed: the result is itself an element
    expect(merge(merge(a, b), c)).not.toBe(merge(a, merge(b, c))) // NOT associative
    expect(merge(a, b)).not.toBe(merge(b, a)) // NOT commutative — this is what catches a reorder
  })

  it('the delimiter keeps the split unambiguous', () => {
    expect(merge('a', 'bc')).not.toBe(merge('ab', 'c'))
  })

  it('the parent re-exports every name this child holds — the face is preserved', () => {
    for (const name of ['merge', 'canonical', 'chainLeaf', 'foldToRoot', 'setRoot', 'sequenceRoot']) {
      expect(typeof (barrel as Record<string, unknown>)[name]).toBe('function')
    }
    expect(barrel.merge('a', 'b')).toBe(merge('a', 'b'))
    expect(barrel.foldToRoot(['a', 'b'])).toBe(foldToRoot(['a', 'b']))
  })

  it('canonical sorts keys recursively, so equal content addresses equally', () => {
    expect(canonical({ b: 1, a: { d: 2, c: 3 } })).toBe(canonical({ a: { c: 3, d: 2 }, b: 1 }))
  })

  it('chainLeaf folds in the prior receipt, so a row moved changes everything after it', () => {
    const first = chainLeaf({ x: 1 }, '')
    expect(chainLeaf({ x: 2 }, first)).not.toBe(chainLeaf({ x: 2 }, ''))
  })

  it('the two roots keep their opposite order semantics after the move', () => {
    const u = ['a', 'b', 'c', 'd']
    expect(setRoot(u)).toBe(setRoot([...u].reverse()))
    expect(sequenceRoot(u)).not.toBe(sequenceRoot([...u].reverse()))
  })
})
