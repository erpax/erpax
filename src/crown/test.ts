import { describe, it, expect } from 'vitest'
import { INDEX, center, color, uuid } from '@/crown'
import { chakras } from '@/chakra'

describe('crown — the crown center (Sahasrara, index 6 of seven)', () => {
  it('is index 6 (the 7th and last center, root → crown)', () => {
    expect(INDEX).toBe(6)
  })

  it('projects exactly index 6 of the seven chakras() — never recomputes', () => {
    const k = chakras()[6]!
    expect(center()).toEqual(k)
    expect(color()).toBe(k.hex)
    expect(uuid()).toBe(k.uuid)
  })

  it('its uuid is a content-uuid computed from the position math', () => {
    expect(uuid()).toMatch(/^[0-9a-f-]{36}$/)
  })
})
