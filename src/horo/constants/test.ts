import { describe, it, expect } from 'vitest'
import { HORO_DIGITS, HORO_MEASURE, isHoroStep, horoMeasureOf, VOID_PIVOT, CENTROID, POLE, INNER_CIRCUIT, CONSTANTS_DEFINED } from './index'

describe('horo/constants', () => {
  it('exports seven horo digits in measure-walk order', () => {
    expect(HORO_DIGITS).toEqual([1, 2, 4, 8, 7, 5, 9])
    expect(HORO_DIGITS).toHaveLength(7)
  })

  it('aligns measure names with digits', () => {
    expect(HORO_MEASURE).toHaveLength(HORO_DIGITS.length)
    expect(HORO_MEASURE).toEqual(['base', 'share', 'weave', 'crest', 'descent', 'round', 'unity'])
  })

  it('guards horo steps correctly', () => {
    HORO_DIGITS.forEach((d) => {
      expect(isHoroStep(d)).toBe(true)
    })
    expect(isHoroStep(3)).toBe(false)
    expect(isHoroStep(6)).toBe(false)
    expect(isHoroStep('1')).toBe(false)
  })

  it('maps digits to measure names', () => {
    expect(horoMeasureOf(1)).toBe('base')
    expect(horoMeasureOf(9)).toBe('unity')
    expect(horoMeasureOf(3)).toBeNull()
    expect(horoMeasureOf(null)).toBeNull()
  })

  it('defines void pivot and centroid', () => {
    expect(VOID_PIVOT).toBe(5)
    expect(CENTROID).toBe(5)
  })

  it('defines pole and inner circuit', () => {
    expect(POLE).toBe(9)
    expect(INNER_CIRCUIT).toEqual([3, 6])
  })

  it('module exports defined constant', () => {
    expect(CONSTANTS_DEFINED).toBe(true)
  })
})
