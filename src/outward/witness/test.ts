import { describe, it, expect } from 'vitest'
import {
  crosscheck,
  dayLengthHours,
  gather,
  greatCircleKm,
  orbitalSpeedKmS,
  routeCrosscheck,
  triangularClosure,
  type Probe,
} from './index'
import type { Geodetic } from '@/globe'

// `elevation` is the globe atom's radial coordinate; 0 is mean sea level for this purpose.
const SOFIA: Geodetic = { latitude: 42.6977, longitude: 23.3219, elevation: 0 }
const LONDON: Geodetic = { latitude: 51.5074, longitude: -0.1278, elevation: 0 }

describe('outward/witness — the theorem that needs no network', () => {
  it('agrees with the known Sofia→London great-circle distance', () => {
    // ≈2018 km by WGS 84; a mean-radius sphere is ~0.2% short, which is the approximation, not an error.
    const km = greatCircleKm(SOFIA, LONDON)
    expect(km).toBeGreaterThan(1990)
    expect(km).toBeLessThan(2030)
  })

  it('is symmetric and zero on itself', () => {
    expect(greatCircleKm(SOFIA, LONDON)).toBeCloseTo(greatCircleKm(LONDON, SOFIA), 9)
    expect(greatCircleKm(SOFIA, SOFIA)).toBeCloseTo(0, 9)
  })
})

describe('outward/witness — what agreement is, and what it is not', () => {
  it('two sources within tolerance are CORROBORATED', () => {
    const c = crosscheck('t', [{ source: 'a', value: 12, unit: 'C' }, { source: 'b', value: 13, unit: 'C' }], 2)
    expect(c.agreement).toBe('corroborated')
    expect(c.spread).toBe(1)
  })

  it('outside tolerance they are DIVERGENT — and neither is then usable', () => {
    expect(crosscheck('t', [{ source: 'a', value: 2, unit: 'C' }, { source: 'b', value: 19, unit: 'C' }], 2).agreement)
      .toBe('divergent')
  })

  it('ONE source is a claim, never evidence — the whole point of a witness', () => {
    const c = crosscheck('t', [{ source: 'a', value: 12, unit: 'C' }], 2)
    expect(c.agreement).toBe('single')
    expect(c.detail).toMatch(/a claim, not evidence/)
  })

  it('no source is SILENT — an unanswered question, not a reading of zero', () => {
    const c = crosscheck('t', [], 2)
    expect(c.agreement).toBe('silent')
    expect(c.spread).toBe(0)
  })

  it('mismatched units are never compared, however close the numbers', () => {
    const c = crosscheck('d', [{ source: 'a', value: 5, unit: 'km' }, { source: 'b', value: 5, unit: 'mi' }], 1)
    expect(c.agreement).toBe('divergent')
    expect(c.detail).toMatch(/different units/)
  })
})

describe('outward/witness — a route cannot be shorter than the sphere allows', () => {
  it('anchors observations on the theorem and passes a plausible road distance', () => {
    const r = routeCrosscheck(SOFIA, LONDON, [{ source: 'osrm', value: 2400, unit: 'km' }], 600)
    expect(r.impossible).toEqual([])
    expect(r.agreement).toBe('corroborated')
  })

  it('reports IMPOSSIBLE when an API returns less than the great-circle floor', () => {
    const r = routeCrosscheck(SOFIA, LONDON, [{ source: 'broken', value: 100, unit: 'km' }], 600)
    expect(r.impossible).toEqual(['broken'])
    expect(r.detail).toMatch(/impossible on a sphere/)
  })
})

describe('outward/witness — a probe that throws contributes silence, not a number', () => {
  it('gathers what answered and drops what failed', async () => {
    const ok: Probe = async () => ({ source: 'ok', value: 7, unit: 'C' })
    const bad: Probe = async () => {
      throw new Error('network down')
    }
    const got = await gather([ok, bad, ok])
    expect(got).toHaveLength(2)
    expect(crosscheck('t', got, 0).agreement).toBe('corroborated')
  })
})

/**
 * The theorem legs, checked against values that are known independently of this corpus.
 */
describe('outward/witness — the independent legs are right', () => {
  it('orbital speed matches the ISS at its real altitude', () => {
    // ISS orbits ~400-440 km at ~7.66 km/s; the relation is v = √(μ/r) and nothing else.
    expect(orbitalSpeedKmS(420)).toBeCloseTo(7.66, 2)
    expect(orbitalSpeedKmS(420)).toBeGreaterThan(orbitalSpeedKmS(600)) // higher is slower
  })

  it('day length is ~12 h at an equinox and runs to the poles correctly', () => {
    expect(dayLengthHours(42.6977, 265)).toBeCloseTo(12, 0) // ~22 September
    expect(dayLengthHours(0, 172)).toBeCloseTo(12, 1) // equator, always ~12
    expect(dayLengthHours(80, 172)).toBe(24) // polar day
    expect(dayLengthHours(80, 355)).toBe(0) // polar night
  })

  it('triangular closure is 1 exactly on a consistent table, and departs on an arbitrageable one', () => {
    expect(triangularClosure(1.1, 0.8, 1 / (1.1 * 0.8))).toBeCloseTo(1, 12)
    expect(triangularClosure(1.1, 0.8, 1.2)).not.toBeCloseTo(1, 3)
  })

  it('an arbitrageable table is DIVERGENT against the closure theorem', () => {
    // The theorem is stated HERE rather than imported: arbitrage-free closure IS 1, and a test that
    // read the value back from the module would be asserting the module's own literal.
    const bad = { source: 'table', value: triangularClosure(1.1, 0.8, 1.2), unit: 'ratio' }
    const theorem = { source: 'arbitrage-free', value: 1, unit: 'ratio' }
    expect(crosscheck('closure', [bad, theorem], 0.002).agreement).toBe('divergent')
  })
})
