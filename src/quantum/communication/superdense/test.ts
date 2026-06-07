import { describe, it, expect } from 'vitest'
import { encode, carries } from '@/quantum/communication/superdense'

describe('quantum/communication/superdense — one binding carries the ordered pair', () => {
  it('one binding carries exactly the ordered pair it encodes', () => {
    const b = encode('alice', 'bob')
    expect(carries('alice', 'bob', b)).toBe(true)
  })

  it('the single binding distinguishes the ORDERED pair (superdense: it carries both endpoints)', () => {
    const b = encode('alice', 'bob')
    expect(carries('bob', 'alice', b)).toBe(false)
    expect(encode('alice', 'bob')).not.toBe(encode('bob', 'alice'))
  })

  it('a binding for a different pair is not carried', () => {
    const b = encode('alice', 'bob')
    expect(carries('alice', 'carol', b)).toBe(false)
  })

  it('encoding is deterministic — both peers recompute the same binding', () => {
    expect(encode('alice', 'bob')).toBe(encode('alice', 'bob'))
  })
})
