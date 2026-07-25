import { describe, it, expect } from 'vitest'
import { PLANCK_H, HBAR, C, energy, frequency, wavelength, momentum, photonOf, render, uuid, refract, VISIBLE_MIN_NM, VISIBLE_MAX_NM } from '@/photon'
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

describe('refract — quantum optics: a content-uuid → its visible photon (deterministic, E=hν)', () => {
  const u = '9ed56c0c-52f2-8d11-a64b-9a751bdfdf98'
  it('same uuid ⇒ same photon (content-addressed light)', () => {
    expect(refract(u)).toEqual(refract(u))
  })
  it('the wavelength lands in the visible band, and the packet obeys ν = c/λ, E = hν', () => {
    const r = refract(u)
    expect(r.wavelengthNm).toBeGreaterThanOrEqual(VISIBLE_MIN_NM)
    expect(r.wavelengthNm).toBeLessThanOrEqual(VISIBLE_MAX_NM)
    expect(r.hz).toBeCloseTo(C / (r.wavelengthNm * 1e-9), -3) // ν = c/λ
    expect(r.energyJ).toBeCloseTo(PLANCK_H * r.hz, 40) // E = hν, the photon atom's own law
  })
  it('a different uuid refracts to a different colour (the light IS the identity)', () => {
    expect(refract(u).wavelengthNm).not.toBe(refract('076b3c2e-a765-8198-b315-516660683068').wavelengthNm)
  })
})
