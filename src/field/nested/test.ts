import { describe, expect, it } from 'vitest'
import { readNested, writeNested } from '@/field/nested'

describe('field/nested — the dotted path three hooks each implemented', () => {
  it('reads through groups and returns undefined rather than throwing', () => {
    const d = { bank: { bankIban: 'BG80BNBG96611020345678' } } as Record<string, unknown>
    expect(readNested(d, 'bank.bankIban')).toBe('BG80BNBG96611020345678')
    expect(readNested(d, 'bank.missing')).toBeUndefined()
    expect(readNested(d, 'bank.bankIban.deeper')).toBeUndefined() // a string is not an object
    expect(readNested({}, 'a.b.c')).toBeUndefined()
  })

  // validate/address passes '' to mean "the document itself". Splitting it would look up a field
  // literally named '' and answer undefined — the caller would then read a present address as absent.
  it('an EMPTY path is the document, not a field named empty-string', () => {
    const d = { country: 'BG' }
    expect(readNested(d, '')).toBe(d)
  })

  it('writes through missing parents by creating them', () => {
    const d: Record<string, unknown> = {}
    writeNested(d, 'bank.bankCountryCode', 'BG')
    expect(d).toEqual({ bank: { bankCountryCode: 'BG' } })
  })

  it('replaces a non-object parent rather than writing onto a primitive', () => {
    const d: Record<string, unknown> = { bank: 'not-an-object' }
    writeNested(d, 'bank.code', 'BG')
    expect(d).toEqual({ bank: { code: 'BG' } })
  })
})
