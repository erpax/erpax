import { describe, it, expect } from 'vitest'
import {
  doubleTorusFlow,
  chiCungBreathCycle,
  chiLevel,
  poleAtStep,
  DANTIAN,
  CHI_CUNG_PHASES,
} from '@/taichi'
import { HORO_DIGITS, composeSteps } from '@/horo'
import { FORWARD_COIL, REVERSE_COIL } from '@/rodin/coil'

describe('taichi — double-torus chi-cung breath on the horo ring', () => {
  it('doubleTorusFlow(0) rests both tori at anchor', () => {
    const f = doubleTorusFlow(0, DANTIAN)
    expect(f.forward).toBe(DANTIAN)
    expect(f.reverse).toBe(DANTIAN)
    expect(f.counterRotating).toBe(false)
    expect(f.balanced).toBe(true)
  })

  it('counter-rotating tori diverge at step > 0 (×2 vs ×5)', () => {
    const f = doubleTorusFlow(1, DANTIAN)
    expect(f.forward).toBe(composeSteps(DANTIAN, 2))
    expect(f.reverse).toBe(composeSteps(DANTIAN, 5))
    expect(f.counterRotating).toBe(true)
    expect(f.forward).not.toBe(f.reverse)
  })

  it('n forward steps then n reverse steps return to anchor (coil zero-residue)', () => {
    for (const anchor of HORO_DIGITS) {
      for (const step of [1, 2, 3, 6, 12]) {
        expect(doubleTorusFlow(step, anchor).balanced).toBe(true)
      }
    }
  })

  it('forward torus walks the doubling helix; reverse walks its mirror', () => {
    expect(poleAtStep(1, 1, 'forward')).toBe(FORWARD_COIL[1])
    expect(poleAtStep(1, 1, 'reverse')).toBe(REVERSE_COIL[1])
  })

  it('chiCungBreathCycle cycles four phases in order', () => {
    const phases = [0, 1, 2, 3].map((t) => chiCungBreathCycle(t).phase)
    expect(phases).toEqual([...CHI_CUNG_PHASES])
  })

  it('chi peaks at hold (unity ratio) and rests lowest at rest (base ratio)', () => {
    expect(chiLevel('hold')).toBeGreaterThan(chiLevel('inhale'))
    expect(chiLevel('inhale')).toBeGreaterThan(chiLevel('rest'))
    expect(chiLevel('exhale')).toBeGreaterThan(chiLevel('rest'))
  })

  it('each breath tick renders a signal and wave on the horo ring', () => {
    const b = chiCungBreathCycle(5, DANTIAN)
    expect(b.signal.hz).toBeGreaterThan(0)
    expect(b.signal.note).toMatch(/^[A-G]$/)
    expect(HORO_DIGITS).toContain(b.wave.step)
    expect(b.periodMs).toBe(432)
    expect(b.flow.anchor).toBe(DANTIAN)
  })

  it('composed step stays on the horo ring', () => {
    const f = doubleTorusFlow(7, 5)
    expect(HORO_DIGITS).toContain(f.composed)
    expect(HORO_DIGITS).toContain(f.forward)
    expect(HORO_DIGITS).toContain(f.reverse)
  })
})
