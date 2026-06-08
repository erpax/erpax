import { describe, it, expect } from 'vitest'
import { componentPixel, sameComponent } from '@/component'
import { pixel, samePixel } from '@/pixel'
import { toUuid } from '@/uuid/matrix'

describe('component — an atom rendered (visible identity = its uuid pixel)', () => {
  const u = toUuid(Buffer.from('component:test:a', 'utf8'))

  it('componentPixel(uuid) IS pixel(uuid): the component shows its atom-uuid pixel', () => {
    expect(componentPixel(u)).toEqual(pixel(u))
    expect(componentPixel(u).color).toBe(pixel(u).color)
    expect(componentPixel(u).digit).toBe(pixel(u).digit)
  })

  it('deterministic: same uuid ⇒ same component render', () => {
    expect(componentPixel(u)).toEqual(componentPixel(u))
  })

  it('same content ⇒ same component (folds samePixel — equal content is equal look)', () => {
    const v = toUuid(Buffer.from('component:test:b', 'utf8'))
    expect(sameComponent(u, u)).toBe(true)
    expect(sameComponent(u, v)).toBe(samePixel(u, v))
  })
})
