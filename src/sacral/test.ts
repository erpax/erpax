import { describe, it, expect } from 'vitest'
import { INDEX, center, color, uuid } from '@/sacral'
import { chakras } from '@/chakra'

describe('sacral — the sacral center (Svadhisthana, index 1)', () => {
  it('is index 1 of the seven (root → crown)', () => {
    expect(INDEX).toBe(1)
  })

  it('projects chakra index 1 exactly (never recomputes the math)', () => {
    const k = chakras()[1]!
    expect(center()).toEqual(k)
    expect(color()).toBe(k.hex)
    expect(uuid()).toBe(k.uuid)
  })

  it('the uuid is a content-uuid (computed from the position math)', () => {
    expect(uuid()).toMatch(/^[0-9a-f-]{36}$/)
  })
})
