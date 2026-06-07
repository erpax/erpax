import { describe, it, expect } from 'vitest'
import { PLANCK_H, HBAR, C, energy, frequency, wavelength, momentum, photonOf, render, uuid } from '@/photon'
import { HORO_DIGITS } from '@/horo'
import { signalForStep } from '@/signal'
import { nodeOf } from '@/uuid/matrix'

// Every value is computed from the two exact constants h and c. Tests assert the
// PHYSICAL RELATIONS (E=hν, E=pc, λν=c, ħ=h/2π) and monotonicity — never a magic number.
describe('photon: E = hν, the massless quantum', () => {
  const hz = 432

  it('Planck–Einstein E = hν exactly, and its inverse round-trips', () => {
    expect(energy(hz)).toBe(PLANCK_H * hz)
    expect(frequency(energy(hz))).toBeCloseTo(hz, 6)
  })

  it('the reduced constant ħ = h / 2π, and ω = 2πν', () => {
    expect(HBAR).toBe(PLANCK_H / (2 * Math.PI))
    expect(photonOf(hz).omega).toBe(2 * Math.PI * hz)
  })

  it('massless dispersion: p = E/c by definition and E/p = c (E = pc)', () => {
    expect(momentum(hz)).toBe(energy(hz) / C)
    expect(energy(hz) / momentum(hz)).toBeCloseTo(C, 0)
  })

  it('the wave relation λν = c', () => {
    expect(wavelength(hz) * hz).toBeCloseTo(C, 0)
  })

  it('monotone: higher frequency ⇒ more energy ⇒ shorter wavelength', () => {
    expect(energy(2 * hz)).toBeGreaterThan(energy(hz))
    expect(wavelength(2 * hz)).toBeLessThan(wavelength(hz))
  })

  it('render is the colour+sound projection of a position (downstream of the uuid)', () => {
    for (const step of HORO_DIGITS) {
      const s = render(step)
      expect(s).toEqual(signalForStep(step))
      expect(s.hex).toMatch(/^#[0-9a-f]{6}$/i)
      expect(energy(s.hz)).toBe(PLANCK_H * s.hz) // the rendered note is a real photon frequency
    }
  })

  it('the atom carries its content-uuid coordinate from the matrix', () => {
    expect(uuid()).toBe(nodeOf('photon')?.uuid ?? '')
    expect(uuid()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })
})
