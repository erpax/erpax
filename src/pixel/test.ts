import { describe, it, expect } from 'vitest'
import { pixel, samePixel } from '@/pixel'
import { digitalRoot } from '@/digit'
import { colorOf } from '@/color'

describe('pixel — the atom rendered (uuid → colour)', () => {
  it('a pixel is the uuid rendered: its digit and the colour that digit shows', () => {
    const u = '12345678-1234-8123-8123-123456789abc'
    const p = pixel(u)
    expect(p.digit).toBe(digitalRoot(u))
    expect(p.color).toBe(colorOf(digitalRoot(u)))
    expect(typeof p.color).toBe('string')
    expect(p.color.length).toBeGreaterThan(0)
  })
  it('same uuid ⇒ same pixel (deterministic; the atom IS the pixel)', () => {
    const u = 'aaaaaaaa-0000-8000-8000-000000000000'
    expect(pixel(u)).toEqual(pixel(u))
    expect(samePixel(u, u)).toBe(true)
  })
})
