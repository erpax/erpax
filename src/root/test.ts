import { describe, it, expect } from 'vitest'
import { INDEX, center, color, uuid } from '@/root'
import { chakras } from '@/chakra'

describe('root — the root center (Muladhara), index 0 of the seven', () => {
  it('is index 0 (root → crown)', () => {
    expect(INDEX).toBe(0)
  })
  it('projects chakra center #0 exactly (never recomputes the math)', () => {
    const k = chakras()[0]!
    expect(center()).toEqual(k)
    expect(color()).toBe(k.hex)
    expect(uuid()).toBe(k.uuid)
  })
  it('uuid is a well-formed content-uuid', () => {
    expect(uuid()).toMatch(/^[0-9a-f-]{36}$/)
  })
})
