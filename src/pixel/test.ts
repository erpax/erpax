import { describe, it, expect } from 'vitest'
import { pixel, samePixel } from '@/pixel'
import { digitalRootOfUuid } from '@/digit'
import { colorOf } from '@/color'
import { toUuid } from '@/uuid/matrix'

const DEMO_A = toUuid(Buffer.from('pixel:test:a', 'utf8'))
const DEMO_B = toUuid(Buffer.from('pixel:test:b', 'utf8'))

describe('pixel — the atom rendered (uuid → colour)', () => {
  it('a pixel is the uuid rendered: its digit and the colour that digit shows', () => {
    const u = DEMO_A
    const p = pixel(u)
    expect(p.digit).toBe(digitalRootOfUuid(u))
    expect(p.color).toBe(colorOf(digitalRootOfUuid(u)))
    expect(typeof p.color).toBe('string')
    expect(p.color.length).toBeGreaterThan(0)
  })
  it('same uuid ⇒ same pixel (deterministic; the atom IS the pixel)', () => {
    const u = DEMO_B
    expect(pixel(u)).toEqual(pixel(u))
    expect(samePixel(u, u)).toBe(true)
  })
})
