import { describe, it, expect } from 'vitest'
import { POSITIONS, iscoOf, positionHarmonic, type SeedPosition } from '@/manufacturing/seed/positions'
import { PAY_BAND } from '@/manufacturing/seed/operations'

describe('manufacturing/seeds/positions — the real ladder, ISCO-08 anchored from НКПД', () => {
  it('the ISCO-08 unit group is the first 4 digits of the 8-digit НКПД code', () => {
    expect(iscoOf('11207023')).toBe('1120') // Управител промишленост → managing directors
    expect(iscoOf('25146001')).toBe('2514') // Програмист → applications programmers
    expect(iscoOf('81522002')).toBe('8152') // Секционен майстор → knitting machine operators
    for (const p of POSITIONS) expect(p.isco).toBe(iscoOf(p.nkpd))
  })

  it('every position is standards-keyed + minimal-text (codes + i18n key, no prose)', () => {
    for (const p of POSITIONS) {
      expect(p.nkpd).toMatch(/^\d{8}$/) // 8-digit НКПД
      expect(p.isco).toMatch(/^\d{4}$/) // ISCO-08 unit group
      expect(p.titleKey).toMatch(/^pos\./) // localized i18n key, never a stored title
      expect(p.sfiaLevel).toBeGreaterThanOrEqual(1)
      expect(p.sfiaLevel).toBeLessThanOrEqual(7)
      expect(p.payMonthly).toBeGreaterThan(0)
    }
  })

  it('pay maps to a harmonic rung relative to the band floor (the rate ladder)', () => {
    const top = POSITIONS[0] as SeedPosition
    expect(top.titleKey).toBe('pos.industry-manager') // 1435 BGN, the top rung
    expect(positionHarmonic(top)).toBeCloseTo(1435 / PAY_BAND.floor, 6) // ~16× the floor
    // the supervisory band sits well above the worker floor (90)
    expect(Math.min(...POSITIONS.map(positionHarmonic))).toBeGreaterThan(5)
  })
})
