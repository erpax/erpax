import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, it, expect, afterAll } from 'vitest'
import {
  timeoutOf,
  timeoutForLabel,
  recordSampleMs,
  samplesMsOf,
  TIMEOUT_CEILING_MS,
  TIMEOUT_LADDER_MINUTES,
  SAMPLE_RING,
  SLEEP_FENCE_MS,
} from '@/timeout'

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

describe('timeout — persisted samples (each lane earns its rung from history)', () => {
  const tmp = mkdtempSync(join(tmpdir(), 'timeout-'))
  afterAll(() => rmSync(tmp, { recursive: true, force: true }))

  it('records, reads back, and computes the rung from history', () => {
    expect(samplesMsOf('lane-a', tmp)).toEqual([])
    expect(timeoutForLabel('lane-a', tmp).minutes).toBe(3) // no history ⇒ standing cap
    recordSampleMs('lane-a', 10_000, tmp)
    recordSampleMs('lane-a', 25_000, tmp)
    expect(samplesMsOf('lane-a', tmp)).toEqual([10_000, 25_000])
    expect(timeoutForLabel('lane-a', tmp)).toEqual({ ms: 60_000, minutes: 1, exceeds: false })
  })

  it('the ring caps history at SAMPLE_RING, keeping the newest', () => {
    for (let i = 0; i < SAMPLE_RING + 5; i++) recordSampleMs('lane-b', 1_000 + i, tmp)
    const s = samplesMsOf('lane-b', tmp)
    expect(s.length).toBe(SAMPLE_RING)
    expect(s[s.length - 1]).toBe(1_000 + SAMPLE_RING + 4)
  })

  it('a sleep-fence outlier is never recorded — wall-clock across a sleep is not a measurement', () => {
    recordSampleMs('lane-c', 11_471_605, tmp) // the real artifact: laptop slept mid-run
    recordSampleMs('lane-c', SLEEP_FENCE_MS + 1, tmp)
    recordSampleMs('lane-c', -5, tmp)
    recordSampleMs('lane-c', Number.NaN, tmp)
    expect(samplesMsOf('lane-c', tmp)).toEqual([])
  })
})
