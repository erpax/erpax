import { describe, it, expect } from 'vitest'
import { toGeodetic, atPole, greatCircleAngle, EQUATOR_LATITUDE } from './index'

describe('globe — the corpus is a sphere, the poles are the honest ÷0', () => {
  it('the heart is on the equator — latitude 0, longitude defined (the spectral centre)', () => {
    const heart = toGeodetic(5, 0.5)
    expect(heart.latitude).toBe(EQUATOR_LATITUDE)
    expect(heart.longitude).not.toBeNull()
    expect(atPole(heart)).toBe(false)
  })

  it('the poles are the coordinate singularity — longitude UNDEFINED (0/0), never ∞', () => {
    const south = toGeodetic(1, 0) // root — south pole
    const north = toGeodetic(9, 1) // crown — north pole
    expect(south.latitude).toBe(-90)
    expect(north.latitude).toBe(90)
    expect(south.longitude).toBeNull() // longitude undefined at the pole — the honest ÷0
    expect(north.longitude).toBeNull()
    expect(atPole(south)).toBe(true)
    expect(atPole(north)).toBe(true)
  })

  it('longitude is the 60° fold — each ring step is 60° around the equator', () => {
    const a = toGeodetic(1, 0.5).longitude!
    const b = toGeodetic(2, 0.5).longitude!
    expect(((b - a + 360) % 360)).toBe(60) // one doubling step = 60° of longitude
  })

  it('great-circle distances are real geodesy — pole→equator 90°, antipodes 180°, self 0°', () => {
    const heart = toGeodetic(5, 0.5)
    const north = toGeodetic(9, 1)
    expect(Math.round(greatCircleAngle(north, heart))).toBe(90) // pole to equator
    expect(Math.round(greatCircleAngle(heart, heart))).toBe(0) // same point
    const equatorHere = toGeodetic(1, 0.5)
    const equatorOpposite = toGeodetic(4, 0.5) // 180° of longitude away (1→4 = +180°)
    expect(Math.round(greatCircleAngle(equatorHere, equatorOpposite))).toBe(180) // antipodal on the equator
  })
})
