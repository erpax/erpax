import { describe, it, expect } from 'vitest'
import { timeoutOf, TIMEOUT_CEILING_MS, TIMEOUT_LADDER_MINUTES } from '@/timeout'

describe('timeout', () => {
  it('the ladder is 1·2·3·5 minutes, max 5', () => {
    expect([...TIMEOUT_LADDER_MINUTES]).toEqual([1, 2, 3, 5])
    expect(TIMEOUT_CEILING_MS).toBe(300_000)
  })

  it('a measured run earns the smallest rung fitting 2× its worst sample', () => {
    expect(timeoutOf([10_000])).toEqual({ ms: 60_000, minutes: 1, exceeds: false })
    expect(timeoutOf([10_000, 45_000])).toEqual({ ms: 120_000, minutes: 2, exceeds: false })
    expect(timeoutOf([80_000])).toEqual({ ms: 180_000, minutes: 3, exceeds: false })
    expect(timeoutOf([100_000])).toEqual({ ms: 300_000, minutes: 5, exceeds: false })
  })

  it('no samples ⇒ the standing 3-minute cap', () => {
    expect(timeoutOf()).toEqual({ ms: 180_000, minutes: 3, exceeds: false })
    expect(timeoutOf([])).toEqual({ ms: 180_000, minutes: 3, exceeds: false })
  })

  it('past the 5-minute ceiling the COMMAND is the defect — exceeds flags it', () => {
    const v = timeoutOf([200_000])
    expect(v).toEqual({ ms: 300_000, minutes: 5, exceeds: true })
  })

  it('rung boundaries are inclusive (2×30s fits rung 1 exactly)', () => {
    expect(timeoutOf([30_000]).minutes).toBe(1)
    expect(timeoutOf([30_001]).minutes).toBe(2)
  })
})
