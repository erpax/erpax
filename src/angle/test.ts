import { describe, it, expect } from 'vitest'
import { HEXAGON, FOLD_STEP_DEGREES, foldAngle, doubleRotate } from './index'

describe('angle — the fold is a 60° rotation', () => {
  it('the six units form a hexagon, one doubling = one vertex = 60°', () => {
    expect(HEXAGON.length).toBe(6)
    expect(FOLD_STEP_DEGREES).toBe(60)
    for (const u of HEXAGON) expect(doubleRotate(u, 1).degrees).toBe(60) // every step is 60°
  })

  it('×2 advances exactly one vertex through the doubling hexagon', () => {
    expect(doubleRotate(1, 1).unit).toBe(2)
    expect(doubleRotate(2, 1).unit).toBe(4)
    expect(doubleRotate(8, 1).unit).toBe(7) // 16 mod 9 = 7
    expect(doubleRotate(5, 1).unit).toBe(1) // 10 mod 9 = 1 — closes the ring
  })

  it('opposition (×8 ≡ −1) is 180° = three folds — "opposite" is three 60° turns', () => {
    const opp = doubleRotate(1, 3)
    expect(opp.unit).toBe(8) // 1 → 2 → 4 → 8; 8 ≡ −1 mod 9
    expect(opp.degrees).toBe(180)
  })

  it('a full turn is six folds — ×2^6 returns home at 0°', () => {
    const home = doubleRotate(1, 6)
    expect(home.unit).toBe(1)
    expect(home.degrees).toBe(0)
    expect(foldAngle(6)).toBe(0)
    expect(foldAngle(1)).toBe(60)
    expect(foldAngle(2)).toBe(120)
  })

  it('the axis {3,6,9} is not on the rotation orbit — it throws, never fabricates an angle', () => {
    for (const axis of [3, 6, 9, 0]) expect(() => doubleRotate(axis, 1)).toThrow(/not a unit/)
  })
})
