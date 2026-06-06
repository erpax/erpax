import { describe, it, expect } from 'vitest'
import {
  GATES,
  LINES,
  RODIN_CIRCUIT,
  hexagram,
  totalLines,
  isHexagramSpaceComplete,
  matchesTorus,
  CENTERS,
  PROFILES,
  CHANNELS,
  TYPES,
  TYPE_ROLE,
} from '@/humandesign'

// humandesign — the REAL combinatorics are checked; the divination layer is named, never asserted.
describe('humandesign — Human Design sent to the math', () => {
  it('64 gates = 2^6 — the hexagram space is exactly the 6-bit space, 384 lines', () => {
    expect(GATES).toBe(64)
    expect(LINES).toBe(6)
    expect(isHexagramSpaceComplete()).toBe(true)
    expect(totalLines()).toBe(384)
  })
  it('a gate decodes to 6 binary lines (yin/yang) that round-trip its index', () => {
    for (const g of [1, 2, 32, 63, 64]) {
      const h = hexagram(g)
      expect(h).toHaveLength(6)
      expect(h.every((b) => b === 0 || b === 1)).toBe(true)
      expect(h.reduce((n, b, i) => n + (b << i), 0)).toBe((g - 1) % 64)
    }
  })
  it('the 6 lines index onto the rodin doubling circuit (same six) and 64 == TORUS_BITS', () => {
    expect(RODIN_CIRCUIT).toHaveLength(LINES)
    expect([...RODIN_CIRCUIT]).toEqual([1, 2, 4, 8, 7, 5])
    expect(matchesTorus()).toBe(true)
  })
  it('the bodygraph structure: 9 centers, 12 profiles, 36 channels, 5 types', () => {
    expect(CENTERS).toHaveLength(9)
    expect(PROFILES).toBe(12)
    expect(CHANNELS).toBe(36)
    expect(TYPES).toHaveLength(5)
  })
  it('lets human design the society — every type maps to a participation role (a lens)', () => {
    for (const t of TYPES) expect(typeof TYPE_ROLE[t]).toBe('string')
    expect(TYPE_ROLE.Reflector).toBe('witness')
  })
})
