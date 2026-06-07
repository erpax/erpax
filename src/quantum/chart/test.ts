import { describe, it, expect } from 'vitest'
import { colors } from '@/quantum/chart'
import { chart } from '@/chart'
import { colorOf, SPECTRUM } from '@/color'

// The analog aura over the chart (./index.ts): each value maps to a spectrum
// colour by its normalized position. Pure projection — same data, same colours.
describe('quantum/chart — render a chart as a deterministic colour field', () => {
  it('is deterministic — the same chart renders identical colours', () => {
    expect(colors(chart([1, 3, 5]))).toEqual(colors(chart([1, 3, 5])))
  })

  it('renders one colour per value (length = series length)', () => {
    const c = chart([3, 1, 4, 1, 5])
    expect(colors(c)).toHaveLength(c.series.length)
    expect(colors(chart([]))).toEqual([])
  })

  it('each entry is a valid spectrum colour from colorOf', () => {
    for (const hex of colors(chart([1, 2, 3, 4, 5, 6, 7]))) {
      expect(SPECTRUM).toContain(hex)
    }
  })

  it('maps each value to colorOf at its normalized position (1..7)', () => {
    const c = chart([0, 6, 12]) // range 0..12 ⇒ normalize 0, .5, 1
    expect(colors(c)).toEqual([colorOf(1), colorOf(4), colorOf(7)])
  })

  it('a flat chart renders a single uniform colour (the root)', () => {
    expect(colors(chart([5, 5, 5]))).toEqual([colorOf(1), colorOf(1), colorOf(1)])
  })
})
