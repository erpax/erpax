import { describe, it, expect } from 'vitest'
import { componentPixel, sameComponent } from '@/component'
import { pixel, samePixel } from '@/pixel'

describe('component — an atom rendered (visible identity = its uuid pixel)', () => {
  const u = '12345678-1234-8123-8123-123456789abc'

  it('componentPixel(uuid) IS pixel(uuid): the component shows its atom-uuid pixel', () => {
    expect(componentPixel(u)).toEqual(pixel(u))
    expect(componentPixel(u).color).toBe(pixel(u).color)
    expect(componentPixel(u).digit).toBe(pixel(u).digit)
  })

  it('deterministic: same uuid ⇒ same component render', () => {
    expect(componentPixel(u)).toEqual(componentPixel(u))
  })

  it('same content ⇒ same component (folds samePixel — equal content is equal look)', () => {
    const v = 'aaaaaaaa-0000-8000-8000-000000000000'
    expect(sameComponent(u, u)).toBe(true)
    expect(sameComponent(u, v)).toBe(samePixel(u, v))
  })
})
