import { exactMax, exactMin, exactAbs, exactFloor, exactCeil, exactRound, exactTrunc } from '@/algebra'
import { describe, it, expect } from 'vitest'
import { computedBaseline, loadRatchet } from './index'
import { RATCHET_GENERATED } from '../ratchet.generated'
import {
  mathCeiling,
  ratchetDown,
  RATCHET_AXES,
  BYPASS_MATH_COORDINATE,
  AXIS_HORO,
} from '../ratchet/math'
import {
  bypassMathViolations,
  ratchetContentUuid,
  recomputeRatchetSnapshot,
  missingTrackedSources,
} from '../ratchet/compute'
import { liveViolationCounts, PARALLEL_SCAN_AXES } from '../live-counts'
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
    expect(mathCeiling(axis, live)).toBe(exactCeil(live / scale))
    expect(mathCeiling(axis, 0)).toBe(0)
  })

  it('ratchetDown never raises committed ceiling', () => {
    expect(ratchetDown('stray-ts', 419, 400)).toBe(400)
    expect(ratchetDown('stray-ts', 419, 500)).toBe(419)
    expect(ratchetDown('stray-ts', undefined, 10)).toBe(mathCeiling('stray-ts', 10))
  })

  it('THE CEILING DESCENDS TO LIVE — a realised gain is realised, not merely reported', () => {
    // It used to be min(prior, mathCeiling(live)), and the math ceiling carries headroom: 315
    // live yields 788, so min(400, 788) stayed 400. Ten axes sat frozen at historic values
    // while the tree improved beneath them, and `rules check` kept printing 'lower this axis'
    // baseline to 315' about a descent the emitter would not perform.
    expect(mathCeiling('alphanumeric-name', 315)).toBeGreaterThan(400)
    expect(ratchetDown('alphanumeric-name', 400, 315)).toBe(315)
  })

  it('zero headroom is the point — the NEXT violation is red', () => {
    const sealed = ratchetDown('stray-ts', 1052, 877)
    expect(sealed).toBe(877)
    expect(877).toBeLessThanOrEqual(sealed)
    expect(878).toBeGreaterThan(sealed)
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

describe('ratchet — DOWN-only is the property that licenses auto-tightening', () => {
  it('a ceiling can NEVER rise, whatever the live count does', () => {
    // this is the whole safety argument for running the emitter unattended: a gate that could
    // loosen itself is not a gate. min(prior, math) means a worse tree cannot buy headroom.
    for (const axis of RATCHET_AXES) {
      const prior = 100
      expect(ratchetDown(axis, prior, 1_000_000)).toBeLessThanOrEqual(prior)
      expect(ratchetDown(axis, prior, 0)).toBeLessThanOrEqual(prior)
      expect(ratchetDown(axis, prior, 50)).toBeLessThanOrEqual(prior)
    }
  })

  it('a REALISED gain lowers the ceiling — that is what tightening by realisation means', () => {
    const axis = RATCHET_AXES[0]!
    const tight = ratchetDown(axis, 100, 0)
    expect(tight).toBe(0) // zero violations ⇒ zero ceiling, no human required
    expect(tight).toBeLessThan(100)
  })

  it('an unmeasurable axis yields NaN, never a silent ceiling', () => {
    // a scan that failed must not be read as "no violations" — that is default-ALLOW by omission
    expect(ratchetDown(RATCHET_AXES[0]!, 100, Number.NaN)).toBeNaN()
    expect(ratchetDown(RATCHET_AXES[0]!, 100, -1)).toBeNaN()
  })
})

/*
 * The descent's one hazard, and its refusal.
 *
 * A ceiling that falls to the live count is sealed by whatever the scan could SEE. Scan a tree
 * with tracked files missing — a half-applied move, an interrupted checkout, a stash in flight
 * — and the count is low for a reason that has nothing to do with the corpus improving. DOWN-only
 * then makes that too-tight ceiling permanent.
 */
describe('ratchet — the emitter refuses to seal from a tree it cannot measure', () => {
  it('this tree is complete, so the descent is licensed here', () => {
    expect(missingTrackedSources()).toEqual([])
  })

  it('git decides, and untracked EXTRAS are not missing files', () => {
    // Extras can only ever RAISE a count, and the ratchet refuses to rise — so the check is
    // one-sided on purpose: it is the missing side that can seal a lie.
    const missing = missingTrackedSources()
    expect(Array.isArray(missing)).toBe(true)
    for (const m of missing) expect(m.startsWith('src/')).toBe(true)
  })
})
