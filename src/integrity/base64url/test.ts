import { describe, expect, it } from 'vitest'
import { assertRfc4648Vectors, b64urlDecode, b64urlEncode } from '@/integrity/base64url'

const bytes = (...n: number[]): Uint8Array => new Uint8Array(n)

describe('integrity/base64url — RFC 4648 §5', () => {
  it('round-trips arbitrary bytes at every padding length', () => {
    for (let len = 0; len <= 8; len++) {
      const b = bytes(...Array.from({ length: len }, (_, i) => (i * 37 + 11) & 0xff))
      expect([...b64urlDecode(b64urlEncode(b))]).toEqual([...b])
    }
  })

  // The whole point of the alphabet: neither character survives a URL or a JWS segment intact.
  it('emits no +, / or = — the three characters base64 has and base64url does not', () => {
    const s = b64urlEncode(bytes(0xfb, 0xff, 0xbf, 0xfe))
    expect(s).not.toMatch(/[+/=]/)
    expect([...b64urlDecode(s)]).toEqual([0xfb, 0xff, 0xbf, 0xfe])
  })

  // The standard's own answers, not a round-trip: a swapped alphabet round-trips perfectly and is wrong.
  it('matches RFC 4648 §10 vectors (unpadded) and the URL-safe pair, in both directions', () => {
    expect(() => assertRfc4648Vectors()).not.toThrow()
    expect(b64urlEncode(new TextEncoder().encode('foobar'))).toBe('Zm9vYmFy')
    expect(b64urlEncode(bytes(0xfb, 0xff))).toBe('-_8')
  })

  it('decodes a padded input too, so a caller need not strip first', () => {
    expect([...b64urlDecode('AQID')]).toEqual([1, 2, 3])
    expect([...b64urlDecode('AQI=')]).toEqual([1, 2])
  })
})
