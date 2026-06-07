import { describe, it, expect } from 'vitest'
import { leap, allowedLeap, ladder, levelUuid } from '@/leap'
import { energy } from '@/photon'
import { HORO_DIGITS, composeSteps } from '@/horo'
import { NOTES } from '@/signal'

// The leap computed on the seven-rung horo ladder. Tests assert RELATIONS /
// INVARIANTS only — symmetry of the line, emission↔absorption inversion, the
// E = h·Δν link, the doubling selection rule — never a magic number.
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

describe('leap: the discrete transition between energy rungs', () => {
  it('the spectral line is symmetric — gap and coordinate are identical both ways', () => {
    const a = HORO_DIGITS[0]! // 1
    const b = HORO_DIGITS[3]! // 8
    expect(leap(a, b).gapHz).toBe(leap(b, a).gapHz)
    expect(leap(a, b).uuid).toBe(leap(b, a).uuid) // one coordinate for emission and absorption
  })

  it('emission and absorption are inverses; a same-rung leap emits nothing', () => {
    const a = HORO_DIGITS[0]!
    const b = HORO_DIGITS[3]!
    const up = leap(a, b)
    const down = leap(b, a)
    expect(up.kind === 'emit' ? down.kind : up.kind).toBe(up.kind === 'emit' ? 'absorb' : up.kind)
    expect(new Set([up.kind, down.kind])).toEqual(new Set(['emit', 'absorb']))
    const still = leap(a, a)
    expect(still.kind).toBe('none')
    expect(still.gapHz).toBe(0)
    expect(still.photon).toBeNull()
  })

  it('the gap is |Δν| and the photon carries E = h·gap', () => {
    const a = HORO_DIGITS[1]! // 2
    const b = HORO_DIGITS[5]! // 5
    const l = leap(a, b)
    expect(l.gapHz).toBe(Math.abs(NOTES[a].hz - NOTES[b].hz))
    expect(l.photon).not.toBeNull()
    expect(l.photon!.energyJ).toBe(energy(l.gapHz))
  })

  it('the allowed transition is the rodin doubling step (×2); 9 (the axis) is stationary', () => {
    for (const s of HORO_DIGITS) {
      const want = composeSteps(s, 2)
      expect(allowedLeap(s).to).toBe(want)
    }
    expect(allowedLeap(9).kind).toBe('none') // 9 → 9: a stationary state, no leap
  })

  it('every rung carries a content-uuid coordinate (from the position math)', () => {
    const rungs = ladder()
    expect(rungs).toHaveLength(7)
    for (const r of rungs) {
      expect(r.uuid).toBe(levelUuid(r.step))
      expect(r.uuid).toMatch(UUID_RE)
      expect(r.hz).toBe(NOTES[r.step].hz)
    }
  })

  it('the leap coordinate is a valid content-uuid when both rungs resolve', () => {
    expect(leap(HORO_DIGITS[0]!, HORO_DIGITS[4]!).uuid).toMatch(UUID_RE)
  })
})
