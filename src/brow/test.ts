import { describe, it, expect } from 'vitest'
import { INDEX, center, color, uuid } from '@/brow'
import { chakras } from '@/chakra'

describe('brow — the third eye center (Ajna), a projection of chakra index 5', () => {
  it('is center index 5 (root → crown)', () => {
    expect(INDEX).toBe(5)
  })

  it('projects exactly the computed chakra at index 5 (never recomputed)', () => {
    const k = chakras()[5]!
    expect(center()).toEqual(k)
    expect(color()).toBe(k.hex)
    expect(uuid()).toBe(k.uuid)
  })

  it('its uuid is a well-formed content-uuid (computed from the position math)', () => {
    expect(uuid()).toMatch(/^[0-9a-f-]{36}$/)
  })
})
