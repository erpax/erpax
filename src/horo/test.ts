import { describe, it, expect } from 'vitest'
import {
  HORO_DIGITS,
  HORO_MEASURE,
  isHoroStep,
  digitalRoot,
  composeSteps,
  nextOctave,
  isMergePoint,
  horoStateField,
  validateHoroStates,
  horoStateBeforeChange,
} from '@/horo'
import type { HoroState } from '@/horo'

const FULL_RING: ReadonlyArray<HoroState> = HORO_DIGITS.map((step, i) => ({
  code: HORO_MEASURE[i],
  step,
}))

describe('horo', () => {
  it('HORO_DIGITS is the exact measure-walk sequence', () => {
    expect([...HORO_DIGITS]).toEqual([1, 2, 4, 8, 7, 5, 9])
  })

  it('HORO_MEASURE aligns index-for-index with HORO_DIGITS', () => {
    expect(HORO_MEASURE[0]).toBe('base')
    expect(HORO_MEASURE[6]).toBe('unity')
    expect(HORO_MEASURE.length).toBe(HORO_DIGITS.length)
  })

  it('isHoroStep accepts every ring digit and rejects off-ring values', () => {
    for (const d of HORO_DIGITS) expect(isHoroStep(d)).toBe(true)
    for (const n of [0, 3, 6, 10, -1, NaN, '1', null]) expect(isHoroStep(n)).toBe(false)
  })

  it('digitalRoot reduces to 1..9 (0 only for 0)', () => {
    expect(digitalRoot(0)).toBe(0)
    expect(digitalRoot(1)).toBe(1)
    expect(digitalRoot(9)).toBe(9)
    expect(digitalRoot(10)).toBe(1)
    expect(digitalRoot(18)).toBe(9)
    expect(digitalRoot(19)).toBe(1)
    expect(digitalRoot(99)).toBe(9)
    expect(digitalRoot(123)).toBe(6)
  })

  it('composeSteps always lands on the ring', () => {
    // 1×1=1, 2×4=8, 4×8=32→5, 8×7=56→2, 7×5=35→8, 5×9=45→9
    expect(composeSteps(1, 1)).toBe(1)
    expect(composeSteps(2, 4)).toBe(8)
    expect(composeSteps(4, 8)).toBe(5)
    expect(composeSteps(8, 7)).toBe(2)
    expect(composeSteps(7, 5)).toBe(8)
    expect(composeSteps(5, 9)).toBe(9)
    // 0-input absorbs to 9 (unity)
    expect(composeSteps(0, 4)).toBe(9)
    expect(composeSteps(4, 0)).toBe(9)
  })

  it('nextOctave: 9 → 1 (seal reopens); all other steps pass through', () => {
    expect(nextOctave(9)).toBe(1)
    for (const d of HORO_DIGITS.filter((x) => x !== 9)) expect(nextOctave(d)).toBe(d)
  })

  it('isMergePoint: true iff composed step is 1 or 9', () => {
    // 1×1=1 → merge; 2×4=8 → not merge; 1×9=9 → merge
    expect(isMergePoint(1, 1)).toBe(true)
    expect(isMergePoint(2, 4)).toBe(false)
    expect(isMergePoint(1, 9)).toBe(true)
  })

  it('validateHoroStates: full well-ordered ring passes', () => {
    const { ok, errors } = validateHoroStates(FULL_RING)
    expect(ok).toBe(true)
    expect(errors).toHaveLength(0)
  })

  it('validateHoroStates: wrong count fails', () => {
    const { ok, errors } = validateHoroStates(FULL_RING.slice(0, 5))
    expect(ok).toBe(false)
    expect(errors.some((e) => e.includes('expected 7'))).toBe(true)
  })

  it('validateHoroStates: out-of-order steps fail', () => {
    const reordered = [...FULL_RING].reverse() as HoroState[]
    const { ok } = validateHoroStates(reordered)
    expect(ok).toBe(false)
  })

  it('validateHoroStates: duplicate code fails', () => {
    const duped: HoroState[] = FULL_RING.map((s, i) => (i === 6 ? { ...s, code: 'base' } : s))
    const { ok, errors } = validateHoroStates(duped)
    expect(ok).toBe(false)
    expect(errors.some((e) => e.includes('duplicate'))).toBe(true)
  })

  it('horoStateField returns a select field sorted in measure order', () => {
    const field = horoStateField('status', FULL_RING, { defaultValue: 'base', required: false })
    expect(field.type).toBe('select')
    expect((field as { name: string }).name).toBe('status')
    // @ts-expect-error payload Field union — options exists on select
    const labels = (field.options as Array<{ value: string }>).map((o) => o.value)
    expect(labels).toEqual(HORO_MEASURE.slice())
  })

  describe('horoStateBeforeChange — harmony enforced at write', () => {
    const hook = horoStateBeforeChange('state', FULL_RING)
    const call = (data: unknown) =>
      // payload's hook arg surface is large; the validator only reads `data`.
      (hook as (a: { data: unknown }) => unknown)({ data })

    it('passes a value that rides the ring', () => {
      expect(() => call({ state: 'base' })).not.toThrow()
      expect(() => call({ state: 'unity' })).not.toThrow()
    })

    it('throws on an off-ring (escape) value', () => {
      expect(() => call({ state: 'paid' })).toThrow(/off the 1·2·4·8·7·5·9 ring/)
    })

    it('lets absent / empty state pass (presence is the field\'s concern)', () => {
      expect(() => call({})).not.toThrow()
      expect(() => call({ state: '' })).not.toThrow()
      expect(() => call({ state: null })).not.toThrow()
    })
  })
})
