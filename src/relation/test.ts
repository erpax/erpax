import { describe, it, expect } from 'vitest'
import { idOf, atomPath } from './index'

describe('relation — the id a relationship points at, whatever depth resolved it to', () => {
  it('reads the raw id (depth 0)', () => {
    expect(idOf('abc')).toBe('abc')
    expect(idOf(42)).toBe('42') // a numeric id is still an id
  })

  it('reads the populated doc (depth > 0)', () => {
    expect(idOf({ id: 'abc', name: 'Acme' })).toBe('abc')
    expect(idOf({ id: 42 })).toBe('42')
  })

  // The reason the atom exists: depth is a QUERY concern, and it must not change identity.
  it('depth does not change identity — the populated doc and its raw id agree', () => {
    expect(idOf({ id: 'abc', name: 'Acme' })).toBe(idOf('abc'))
    expect(idOf({ id: 7 })).toBe(idOf(7))
  })

  it('absent is undefined — never a falsy id', () => {
    expect(idOf(undefined)).toBeUndefined()
    expect(idOf(null)).toBeUndefined()
    expect(idOf({})).toBeUndefined()
    expect(idOf({ id: undefined })).toBeUndefined()
  })

  // This is the line the near-variants cross. journal/entry/service and the sale/* copies return
  // String(v ?? '') — an EMPTY STRING here. A caller branching on `undefined` and one branching on falsy
  // behave differently, so those are not this function and were not swept into it.
  it('returns undefined, NOT an empty string — the near-variants differ here, and were left alone', () => {
    expect(idOf(null)).not.toBe('')
    expect(idOf(undefined)).toBeUndefined()
  })

  it('an id of 0 is an id — falsy is not absent', () => {
    expect(idOf(0)).toBe('0')
    expect(idOf({ id: 0 })).toBe('0')
  })

  it('names its path', () => {
    expect(atomPath).toBe('relation')
  })
})
