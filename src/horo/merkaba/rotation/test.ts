import { describe, expect, it } from 'vitest'
import { balanced, figure, interpenetration, isRegular, netTorque, ring, triad } from '@/horo/merkaba/rotation'

describe('rotation — the hexagram is two equilateral triangles, and the hex is the hexagram', () => {
  it('puts six arms at 30, 90, 150, 210, 270, 330 — none on the nose', () => {
    expect(ring(6).map((r) => r.deg)).toEqual([30, 90, 150, 210, 270, 330])
  })

  it('splits them into two triads that each form an equilateral triangle', () => {
    const f = figure(6)
    expect(f.ccw.map((r) => r.deg)).toEqual([30, 150, 270])
    expect(f.cw.map((r) => r.deg)).toEqual([90, 210, 330])
    expect(isRegular(f.ccw)).toBe(true)
    expect(isRegular(f.cw)).toBe(true)
  })

  it('offsets the two triangles by 60 degrees, so they interpenetrate rather than coincide', () => {
    expect(interpenetration(6)).toBe(60)
    const f = figure(6)
    expect(f.cw[0]!.deg - f.ccw[0]!.deg).toBe(60)
  })

  it('refuses a set whose angles are not evenly spaced', () => {
    expect(isRegular([
      { index: 0, deg: 0, spin: 'CCW' as const },
      { index: 1, deg: 10, spin: 'CCW' as const },
      { index: 2, deg: 200, spin: 'CCW' as const },
    ])).toBe(false)
  })
})

describe('rotation — the torques cancel if and only if the rotor count is EVEN', () => {
  it('balances every even ring', () => {
    for (const n of [2, 4, 6, 8, 12]) {
      expect(netTorque(ring(n))).toBe(0)
      expect(balanced(ring(n))).toBe(true)
    }
  })

  it('cannot balance an odd ring, whatever the spacing', () => {
    // This is why a tricopter needs a tilting tail servo and a pentacopter needs canted motors.
    for (const n of [3, 5, 7, 9]) {
      expect(netTorque(ring(n))).toBe(1)
      expect(balanced(ring(n))).toBe(false)
    }
  })

  it('reports no interpenetration angle for an odd ring — there are not two figures', () => {
    expect(interpenetration(5)).toBe(0)
    expect(interpenetration(7)).toBe(0)
  })
})

describe('rotation — each figure is a regular polygon with half the vertices', () => {
  it('gives an octocopter two squares, offset by 45 degrees', () => {
    const f = figure(8)
    expect(f.ccw.length).toBe(4)
    expect(f.cw.length).toBe(4)
    expect(f.regular).toBe(true)
    expect(f.offset).toBe(45)
  })

  it('gives a quadcopter two opposed pairs — a degenerate figure, still balanced', () => {
    const f = figure(4)
    expect(f.ccw.map((r) => r.deg)).toEqual([45, 225])
    expect(f.balanced).toBe(true)
    expect(f.offset).toBe(90)
  })

  it('refuses nonsense rotor counts rather than inventing a ring', () => {
    expect(ring(1)).toEqual([])
    expect(ring(0)).toEqual([])
    expect(ring(2.5)).toEqual([])
    expect(balanced(ring(1))).toBe(false)
  })

  it('selects a triad by spin and nothing else', () => {
    expect(triad(ring(6), 'CCW').every((r) => r.spin === 'CCW')).toBe(true)
    expect(triad(ring(6), 'CW').length).toBe(3)
  })
})
