import { exactMax, exactMin, exactAbs, exactFloor, exactCeil, exactRound, exactTrunc } from '@/algebra'
import { describe, it, expect } from 'vitest'
import { atomPath, forecastTip, forecastTipRing, forecastEarth } from '@/forecasts'

describe('forecasts — phase-locked Earth tip forecasts', () => {
  it('names its path', () => {
    expect(atomPath).toBe('forecasts')
  })

  it('forecastTip advances +90° on the ring; tip keeps ±ω label', () => {
    const f = forecastTip('N')
    expect(f.from.tip).toBe('N')
    expect(f.next.tip).toBe('E')
    expect(f.deltaPhaseDeg).toBe(90)
    expect(f.omega).toBe(1)
    const e = forecastTip('E')
    expect(e.next.tip).toBe('S')
    expect(e.deltaPhaseDeg).toBe(90)
    expect(e.omega).toBe(-1)
  })

  it('forecastTipRing closes four homology steps', () => {
    const ring = forecastTipRing()
    expect(ring).toHaveLength(4)
    expect(ring.every((s) => exactAbs(s.deltaPhaseDeg) === 90)).toBe(true)
  })

  it('forecastEarth holds: complete earth ⊕ tip ring ⊕ optional nav', () => {
    const f = forecastEarth({
      fromTip: 'N',
      referrer: 'earth',
      current: 'navigation',
      candidates: ['earth', 'navigation', 'forecasts', 'pyramid', 'globe', 'navigation/groups'],
    })
    expect(f.holds).toBe(true)
    expect(f.earth.complete).toBe(true)
    expect(f.earth.physicalDatum).toBe('WGS 84')
    expect(f.navigation).toBeDefined()
    expect(['descend', 'sequence', 'ascend']).toContain(f.navigation!.trajectory)
  })
})
