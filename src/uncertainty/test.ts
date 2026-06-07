import { describe, it, expect } from 'vitest'
import { bound, conjugate, allowed, linewidth, linewidthHz } from '@/uncertainty'
import { HBAR, PLANCK_H } from '@/photon'

// The Heisenberg floor computed from ħ. Tests assert the bound RELATIONS —
// saturation, the inequality, monotonicity, and ΔE = hΔν — never a magic number.
const rel = (a: number, b: number): number => Math.abs(a - b) / Math.abs(b)

describe('uncertainty: the Heisenberg floor Δa·Δb ≥ ħ/2', () => {
  it('the bound is ħ/2 and is a hard positive floor (never zero)', () => {
    expect(bound()).toBe(HBAR / 2)
    expect(bound()).toBeGreaterThan(0)
  })

  it('the conjugate spread saturates the bound — Δa·Δb = ħ/2 exactly at the floor', () => {
    for (const dx of [1e-10, 1e-3, 5]) expect(rel(conjugate(dx) * dx, bound())).toBeLessThan(1e-12)
  })

  it('a pair at the bound is allowed; any pair below it is forbidden', () => {
    const dx = 1e-10
    expect(allowed(dx, conjugate(dx))).toBe(true)
    expect(allowed(dx, conjugate(dx) * 0.999)).toBe(false)
  })

  it('conjugates trade off — pinning one tighter forces the other wider', () => {
    expect(conjugate(2e-10)).toBeLessThan(conjugate(1e-10))
  })

  it('linewidth is the energy–time floor: shorter life ⇒ broader line', () => {
    expect(linewidth(1e-12)).toBeGreaterThan(linewidth(1e-9))
    expect(linewidthHz(1e-12)).toBeGreaterThan(linewidthHz(1e-9))
  })

  it('the energy and frequency linewidths obey ΔE = h·Δν (the same Planck h)', () => {
    for (const t of [1e-9, 1e-6, 1]) expect(rel(linewidth(t), PLANCK_H * linewidthHz(t))).toBeLessThan(1e-12)
  })
})
