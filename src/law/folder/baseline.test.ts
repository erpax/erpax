import { describe, it, expect } from 'vitest'
import { computedBaseline, loadRatchet } from './baseline'
import { RATCHET_GENERATED } from './ratchet.generated'
import {
  mathCeiling,
  ratchetDown,
  BYPASS_MATH_COORDINATE,
  AXIS_HORO,
} from './ratchet-math'
import {
  bypassMathViolations,
  ratchetContentUuid,
  recomputeRatchetSnapshot,
} from './ratchet-compute'
import { liveViolationCounts, PARALLEL_SCAN_AXES } from './live-counts'
import { LANDAUER_BIT } from '@/readme/entropy'
import { horoRatio } from '@/horo'

describe('law/folder baseline — computed from math + ratchet.generated', () => {
  it('coordinates with b2f75a6f bypass-math anchor', () => {
    expect(BYPASS_MATH_COORDINATE).toBe('b2f75a6f')
  })

  it('loadRatchet reads emitted artifact with contentUuid', () => {
    const snap = loadRatchet()
    expect(snap.contentUuid).toMatch(/^[0-9a-f-]{36}$/)
    expect(snap.contentUuid).toBe(RATCHET_GENERATED.contentUuid)
    expect(snap.sealedAt).toBeTruthy()
    expect(Number.isFinite(snap.axes['folder-name'])).toBe(true)
    expect(snap.axes['accounting-structure']).toBe(0)
    expect(snap.axes['forbidden-intermediate']).toBe(0)
  })

  it('computedBaseline matches ratchet.generated axes', () => {
    const snap = loadRatchet()
    expect(computedBaseline('accounting-structure')).toBe(0)
    expect(computedBaseline('forbidden-intermediate')).toBe(0)
    expect(computedBaseline('stray-ts')).toBe(snap.axes['stray-ts'])
    expect(computedBaseline('folder-trinity')).toBe(snap.axes['folder-trinity'])
  })

  it('mathCeiling uses Landauer bit × horo decade ratio', () => {
    const axis = 'stray-ts'
    const digit = AXIS_HORO[axis]
    const live = 400
    const scale = LANDAUER_BIT * horoRatio(digit, 10)
    expect(mathCeiling(axis, live)).toBe(Math.ceil(live / scale))
    expect(mathCeiling(axis, 0)).toBe(0)
  })

  it('ratchetDown never raises committed ceiling', () => {
    expect(ratchetDown('stray-ts', 419, 400)).toBe(Math.min(419, mathCeiling('stray-ts', 400)))
    expect(ratchetDown('stray-ts', undefined, 10)).toBe(mathCeiling('stray-ts', 10))
  })

  it('ratchetContentUuid seals axes payload', () => {
    const uuid = ratchetContentUuid(RATCHET_GENERATED.axes)
    expect(uuid).toBe(RATCHET_GENERATED.contentUuid)
  })

  it(
    'bypassMathViolations rejects hand ratchet.json and uuid drift',
    () => {
      const bypass = bypassMathViolations()
      expect(bypass.some((v) => v.reason.includes('ratchet.json'))).toBe(false)
      expect(bypass.some((v) => v.reason.includes('contentUuid drift'))).toBe(false)
      for (const v of bypass) {
        expect(v.law).toBe('bypass-math')
        expect(v.coordinate).toBe(BYPASS_MATH_COORDINATE)
      }
    },
    300_000,
  )

  it(
    'live counts hold at committed baselines (parallel scan axes)',
    () => {
      const live = liveViolationCounts()
      for (const axis of PARALLEL_SCAN_AXES) {
        expect(live[axis]).toBeLessThanOrEqual(computedBaseline(axis))
      }
    },
    300_000,
  )

  it(
    'recompute snapshot preserves DOWN-only ratchet vs prior emit',
    () => {
      const live = liveViolationCounts()
      const snap = recomputeRatchetSnapshot(process.cwd(), RATCHET_GENERATED.axes, { live })
      for (const axis of Object.keys(RATCHET_GENERATED.axes) as (keyof typeof RATCHET_GENERATED.axes)[]) {
        expect(snap.axes[axis]).toBe(ratchetDown(axis, RATCHET_GENERATED.axes[axis], live[axis]))
      }
    },
    300_000,
  )
})
