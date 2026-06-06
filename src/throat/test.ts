import { describe, it, expect } from 'vitest'
import { INDEX, center, color, uuid } from '@/throat'
import { chakras } from '@/chakra'

describe('throat — the throat center (Vishuddha), index 4', () => {
  it('is index 4 on the 7-position ring (root → crown)', () => {
    expect(INDEX).toBe(4)
  })

  it('projects exactly the 5th computed chakra (never recomputed)', () => {
    const k = chakras()[4]!
    expect(center()).toEqual(k)
    expect(color()).toBe(k.hex)
    expect(uuid()).toBe(k.uuid)
  })

  it('the uuid is a content-uuid computed from the position math', () => {
    expect(uuid()).toMatch(/^[0-9a-f-]{36}$/)
  })
})
