import { describe, it, expect } from 'vitest'
import { INDEX, center, color, uuid } from '@/navel'
import { chakras } from '@/chakra'

describe('navel — the solar plexus center (Manipura, index 2)', () => {
  it('is index 2 on the 7-position ring (root → crown)', () => {
    expect(INDEX).toBe(2)
  })
  it('projects chakra center index 2 exactly (never recomputed)', () => {
    const k = chakras()[2]!
    expect(center()).toEqual(k)
    expect(color()).toBe(k.hex)
    expect(uuid()).toBe(k.uuid)
  })
  it('the uuid is a content-uuid computed from the position math', () => {
    expect(uuid()).toMatch(/^[0-9a-f-]{36}$/)
  })
})
