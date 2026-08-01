import { describe, expect, it } from 'vitest'

import { orbitOf, digitalRoot } from '@/horo'

import { closesCircle, coils, isAxis, ORIGIN, PHASE_DEGREES, POLE, TRIAD, unreachableByFlow } from './index'

describe('rodin/axis — the prose made decidable', () => {
  it('it GOVERNS and does not flow: the axis IS the doubling coil’s unreachable gap', () => {
    // computed from the orbit, not listed — the claim is derived, not restated
    expect([...unreachableByFlow()]).toEqual([...TRIAD])
    const flow = orbitOf(1)
    for (const a of TRIAD) expect(flow).not.toContain(a)
    for (const u of flow) expect(isAxis(u)).toBe(false)
    // and it is a closure fact, not a tendency: units are closed under unit multiplication
    for (const u of flow) for (const v of flow) expect(isAxis((u * v) % 9 || 9)).toBe(false)
  })

  it('three coils 120° apart cover every (cell, phase) pair exactly once', () => {
    const c = coils()
    expect(c).toHaveLength(3)
    expect([...c[0]!]).toEqual([3, 6, 9])
    expect([...c[1]!]).toEqual([6, 9, 3])
    expect([...c[2]!]).toEqual([9, 3, 6])
    const seen = new Set<string>()
    c.forEach((coil, phase) => coil.forEach((cell, i) => seen.add(`${cell}@${phase}${i}`)))
    expect(seen.size).toBe(9) // 3 cells × 3 phases, none repeated
    for (const coil of c) expect([...coil].sort()).toEqual([...TRIAD].sort())
  })

  it('9 closes and 0 originates — the pole is doubling’s fixed point', () => {
    expect(POLE).toBe(9)
    expect(digitalRoot(2 * POLE)).toBe(POLE) // doubling fixes the pole
    expect(POLE % 9).toBe(ORIGIN) // 9 ≡ 0: the close lands on the origin
    expect(isAxis(POLE)).toBe(true)
    expect(isAxis(18)).toBe(true) // by digital root, at any octave
    expect(isAxis(1)).toBe(false)
  })

  it('the triangle closes the circle at its phase spacing', () => {
    expect(PHASE_DEGREES).toBe(120)
    expect(TRIAD.length * PHASE_DEGREES).toBe(360)
    expect(closesCircle()).toBe(true)
  })
})
