import { describe, it, expect } from 'vitest'
import {
  OPERATIONS,
  WORK_CENTER_TYPES,
  EFFICIENCY_CALIBRATION,
  PAY_BAND,
  totalObservedPhases,
  type Operation,
} from './operations'

describe('manufacturing/seeds/operations — the etrima vocabulary, harmonised with the standards', () => {
  it('every operation is fully classified — code + ISCO-08 + ISA-95 + UoM (no bare untyped string)', () => {
    for (const op of OPERATIONS) {
      expect(op.code).toMatch(/^[A-Z/ ]+$/) // a code reference, not free text
      expect(op.labelKey).toMatch(/^mfg\.op\./) // localized i18n key, never a stored label
      expect(op.isco).toMatch(/^\d{4}$/) // ISCO-08 unit-group (the competency)
      expect(['fabrication', 'assembly', 'finishing', 'inspection']).toContain(op.isa95) // ISA-95 segment
      expect(['piece', 'pair', 'metre', 'kilogram']).toContain(op.uom) // UoM (closes the integer gap)
    }
  })

  it('codes are unique (the reference key) and the vocabulary is ordered by real volume', () => {
    const codes = OPERATIONS.map((o) => o.code)
    expect(new Set(codes).size).toBe(codes.length)
    expect(OPERATIONS[0].code).toBe('CONFEZIONE') // sewing dominates (25,979 phases)
    const volumes = OPERATIONS.map((o) => o.observedPhases)
    expect(volumes).toEqual([...volumes].sort((a, b) => b - a)) // descending by observed weight
    expect(totalObservedPhases()).toBe(25979 + 2341 + 1687 + 157 + 142 + 105 + 70 + 51 + 14 + 12 + 4)
  })

  it('UoM closes the integer-only gap — a process operation counts in mass, not pieces', () => {
    const dyeing = OPERATIONS.find((o) => o.code === 'TINTORIA') as Operation
    expect(dyeing.uom).toBe('kilogram') // dyeing is process (kg), not a forced piece-count
    expect(OPERATIONS.filter((o) => o.uom === 'piece').length).toBeGreaterThan(5) // discrete still the norm
  })

  it('work-center categories replace magic code-prefix scoping with a typed enum', () => {
    expect(new Set(WORK_CENTER_TYPES).size).toBe(WORK_CENTER_TYPES.length)
    expect(WORK_CENTER_TYPES).toContain('overlock')
    expect(WORK_CENTER_TYPES).toContain('knitting')
  })

  it('the pay curve is calibrated from the real distribution — harmonic, anchored, with a leverage ceiling', () => {
    // efficiency is a distribution: median below the standard, standard the anchor, p99 the M-value
    expect(EFFICIENCY_CALIBRATION.restingHarmonic).toBeLessThan(EFFICIENCY_CALIBRATION.standard)
    expect(EFFICIENCY_CALIBRATION.standard).toBeLessThan(EFFICIENCY_CALIBRATION.mValue)
    expect(EFFICIENCY_CALIBRATION.restingHarmonic).toBeCloseTo(0.75, 2)
    // pay band spans ~10× floor→ceiling (base to ~10th harmonic), median ~2.5× floor
    expect(PAY_BAND.ceiling / PAY_BAND.floor).toBeCloseTo(10.67, 1)
    expect(PAY_BAND.median / PAY_BAND.floor).toBeGreaterThan(2)
    expect(PAY_BAND.currency).toBe('BGN')
  })
})
