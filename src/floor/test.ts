import { describe, expect, it } from 'vitest'
import {
  holographicBits,
  holographicRadius,
  landauerJoules,
  reach,
  roomKelvin,
  searchFloor,
  searchJoules,
} from '@/floor'

describe('floor — Landauer, against the measured constant', () => {
  it('charges kT ln2 for one bit at room temperature', () => {
    // 1.380649e-23 x 300 x ln2
    expect(landauerJoules(1)).toBeCloseTo(2.871e-21, 24)
  })

  it('is linear in bits and in temperature', () => {
    expect(landauerJoules(2)).toBeCloseTo(2 * landauerJoules(1), 30)
    expect(landauerJoules(1, 600)).toBeCloseTo(2 * landauerJoules(1, 300), 30)
  })

  it('refuses nonsense rather than returning a negative floor', () => {
    expect(landauerJoules(0)).toBe(0)
    expect(landauerJoules(-5)).toBe(0)
    expect(landauerJoules(1, 0)).toBe(0)
    expect(landauerJoules(1, -300)).toBe(0)
  })
})

describe('floor — the ladder, and the one rung that condemns the corpus', () => {
  it('prices the uuid collision at MILLIJOULES — nothing is protecting it', () => {
    const f = searchFloor(61)
    expect(f.joules).toBeGreaterThan(1e-3)
    expect(f.joules).toBeLessThan(1e-1)
    expect(f.reach).toBe('trivial')
  })

  it('prices a 128-bit search at INDUSTRIAL reach — the floor is lower than people assume', () => {
    // 9.77e17 J is about 0.16% of one world-year. A 128-bit key is safe NOT because thermodynamics
    // forbids the search, but because real hardware sits some 10^9 above the floor. Writing this
    // test I expected 'civilisational'; the measurement said otherwise and the measurement wins.
    const f = searchFloor(128)
    expect(f.reach).toBe('industrial')
    expect(f.worldYears).toBeLessThan(1e-2)
    expect(f.worldYears).toBeGreaterThan(1e-4)
  })

  it('prices a 256-bit search beyond physics', () => {
    const f = searchFloor(256)
    expect(f.reach).toBe('beyond-physics')
    // more than the Sun will ever emit, by a wide margin
    expect(f.joules / 1.2e44).toBeGreaterThan(1e10)
  })

  it('separates the three rungs by the only thing that matters — who could pay', () => {
    expect(searchFloor(61).reach).not.toBe(searchFloor(128).reach)
    expect(searchFloor(128).reach).not.toBe(searchFloor(256).reach)
  })

  it('is monotone in the exponent, so a wider address never costs less', () => {
    let prev = 0
    for (const n of [32, 64, 96, 128, 192, 256]) {
      const j = searchJoules(n)
      expect(j).toBeGreaterThan(prev)
      prev = j
    }
  })

  it('reads the room temperature it quotes at', () => {
    expect(roomKelvin()).toBe(300)
    expect(searchFloor(61).kelvin).toBe(300)
  })
})

describe('floor — the holographic bound, which limits STORAGE and not search', () => {
  it('gives about 1.7e70 bits for a one-metre sphere', () => {
    const b = holographicBits(1)
    expect(b).toBeGreaterThan(1e70)
    expect(b).toBeLessThan(2e70)
  })

  it('scales with AREA, not volume — doubling the radius quadruples the bits', () => {
    expect(holographicBits(2) / holographicBits(1)).toBeCloseTo(4, 6)
  })

  it('round-trips: the radius that holds n bits holds n bits', () => {
    for (const bits of [1e20, 1e40, 1e70]) {
      expect(holographicBits(holographicRadius(bits)) / bits).toBeCloseTo(1, 6)
    }
  })

  it('needs KILOMETRES for the 256-bit space and a sub-proton radius for the 128-bit one', () => {
    // Written first as "2^256 fits inside an atom" and REFUTED by the measurement: the whole
    // 256-bit space at one bit per key needs a sphere about 2.6 km across, while the 128-bit
    // space needs 1.4e-16 m, smaller than a proton. Storage is not what separates them.
    expect(holographicRadius(Math.pow(2, 256))).toBeGreaterThan(1e3)
    expect(holographicRadius(Math.pow(2, 128))).toBeLessThan(1e-15)
    // Energy is: four rungs apart on the ladder, on the same two exponents.
    expect(searchFloor(128).reach).toBe('industrial')
    expect(searchFloor(256).reach).toBe('beyond-physics')
  })

  it('refuses a non-positive region', () => {
    expect(holographicBits(0)).toBe(0)
    expect(holographicRadius(-1)).toBe(0)
  })
})

describe('floor — reach names who could pay, and trivial is the loud one', () => {
  it('bands the scales in order', () => {
    expect(reach(1)).toBe('trivial')
    expect(reach(1e15)).toBe('industrial')
    expect(reach(1e20)).toBe('civilisational')
    expect(reach(1e30)).toBe('stellar')
    expect(reach(1e60)).toBe('beyond-physics')
  })
})
