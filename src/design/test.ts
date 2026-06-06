import { describe, it, expect } from 'vitest'
import { token, tokenColor, palette, tokens, tokenSet } from '@/design'
import { pixel } from '@/pixel'

const A = '00000000-0000-8000-8000-000000000000'
const B = '12345678-1234-8123-8123-123456789abc'

describe('design — the palette/tokens computed from atoms’ pixels', () => {
  it('token(uuid) is the atom’s pixel colour, carried with its uuid + digit (no hardcoded hex)', () => {
    const t = token(A)
    const p = pixel(A)
    expect(t.uuid).toBe(A)
    expect(t.color).toBe(p.color) // colour is READ OFF the atom, never assigned
    expect(t.digit).toBe(p.digit)
    expect(tokenColor(A)).toBe(p.color)
  })

  it('same uuid ⇒ same token (deterministic render — the atom IS the token)', () => {
    expect(token(A)).toEqual(token(A))
    expect(tokenColor(B)).toBe(tokenColor(B))
  })

  it('palette is the deduped, order-stable colour SET the atoms already show', () => {
    const pal = palette([A, B, A]) // A repeated ⇒ its colour appears once
    expect(pal).toEqual([pixel(A).color, pixel(B).color].filter((c, i, a) => a.indexOf(c) === i))
    expect(new Set(pal).size).toBe(pal.length) // no duplicates
    expect(palette([])).toEqual([]) // empty in, empty out
  })

  it('tokens(map) computes EVERY semantic role from an atom’s pixel — roles are not literals', () => {
    const t = tokens({ background: A, accent: B })
    expect(t.background).toBe(pixel(A).color)
    expect(t.accent).toBe(pixel(B).color)
    expect(Object.keys(t)).toEqual(['background', 'accent'])
  })

  it('tokenSet(map) carries the full Token (uuid+digit+colour) per role', () => {
    const s = tokenSet({ accent: B })
    expect(s.accent).toEqual(token(B))
  })
})
