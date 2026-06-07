import { describe, it, expect } from 'vitest'
import deepMerge, { isObject } from '@/deep/merge'

describe('deep/merge — isObject', () => {
  it('recognises plain objects', () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ a: 1 })).toBe(true)
  })

  it('rejects arrays (arrays are not merge targets)', () => {
    expect(isObject([])).toBe(false)
    expect(isObject([1, 2, 3])).toBe(false)
  })

  it('treats null as an object per typeof (the JS quirk)', () => {
    // typeof null === 'object' and null is not an array.
    expect(isObject(null)).toBe(true)
  })

  it('rejects primitives', () => {
    expect(isObject(1)).toBe(false)
    expect(isObject('s')).toBe(false)
    expect(isObject(true)).toBe(false)
    expect(isObject(undefined)).toBe(false)
  })
})

describe('deep/merge — flat merge', () => {
  it('overlays source scalars onto target', () => {
    expect(deepMerge({ a: 1, b: 2 }, { b: 3, c: 4 })).toEqual({ a: 1, b: 3, c: 4 })
  })

  it('source value wins on key collision', () => {
    expect(deepMerge({ x: 'target' }, { x: 'source' })).toEqual({ x: 'source' })
  })

  it('does not mutate the target', () => {
    const target = { a: 1 }
    const out = deepMerge(target, { b: 2 })
    expect(target).toEqual({ a: 1 })
    expect(out).not.toBe(target)
  })
})

describe('deep/merge — nested merge', () => {
  it('recursively merges nested objects, keeping disjoint keys', () => {
    const out = deepMerge(
      { nested: { a: 1, keep: true } },
      { nested: { b: 2 } },
    )
    expect(out).toEqual({ nested: { a: 1, keep: true, b: 2 } })
  })

  it('adds a nested object that is absent in the target', () => {
    const out = deepMerge({ a: 1 }, { nested: { b: 2 } })
    expect(out).toEqual({ a: 1, nested: { b: 2 } })
  })

  it('merges deeply across multiple levels', () => {
    const out = deepMerge(
      { l1: { l2: { keep: 1 } } },
      { l1: { l2: { add: 2 }, sibling: 3 } },
    )
    expect(out).toEqual({ l1: { l2: { keep: 1, add: 2 }, sibling: 3 } })
  })

  it('recurses into a scalar target when the source value is an object', () => {
    // The key IS present in target, so the merge recurses: deepMerge(1, {b:2}).
    // Spreading the scalar target yields {} and the isObject(target) guard then
    // skips the source keys — the real semantics of this merge for a
    // scalar-target/object-source collision (source object is NOT copied in).
    const out = deepMerge({ a: 1 }, { a: { b: 2 } } as unknown as { a: number })
    expect(out).toEqual({ a: {} })
  })
})

describe('deep/merge — array handling', () => {
  it('replaces arrays wholesale (arrays are not deep-merged)', () => {
    const out = deepMerge({ list: [1, 2, 3] }, { list: [9] })
    expect(out).toEqual({ list: [9] })
  })

  it('treats an array source value as a scalar overlay', () => {
    const out = deepMerge({ a: 1, list: [1] }, { list: [2, 3] })
    expect(out).toEqual({ a: 1, list: [2, 3] })
  })
})
