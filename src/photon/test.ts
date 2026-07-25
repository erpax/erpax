import { describe, it, expect } from 'vitest'
import { PLANCK_H, HBAR, C, energy, frequency, wavelength, momentum, photonOf, render, uuid, refract, disperse, VISIBLE_MIN_NM, VISIBLE_MAX_NM } from '@/photon'
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

describe('disperse — the diamond splits a uuid into its spectrum (reuses refract transform)', () => {
  const u = '9ed56c0c-52f2-8d11-a64b-9a751bdfdf98'
  it('yields one visible line per band, short→long wavelength (a readable spectrum)', () => {
    const s = disperse(u, 7)
    expect(s).toHaveLength(7)
    for (const p of s) {
      expect(p.wavelengthNm).toBeGreaterThanOrEqual(VISIBLE_MIN_NM)
      expect(p.wavelengthNm).toBeLessThanOrEqual(VISIBLE_MAX_NM)
    }
    const sorted = [...s].sort((a, b) => a.wavelengthNm - b.wavelengthNm)
    expect(s.map((p) => p.wavelengthNm)).toEqual(sorted.map((p) => p.wavelengthNm)) // already ordered
  })
  it('same uuid ⇒ same spectrum (content-addressed)', () => {
    expect(disperse(u)).toEqual(disperse(u))
  })
  it("the first band's line is refract's single colour (refract ⊂ disperse — one transform)", () => {
    // refract reads hue from bytes 0-4; disperse band 0 is the same window, so its line is present in the spectrum
    const first = disperse(u, 7).map((p) => p.wavelengthNm)
    expect(first).toContain(refract(u).wavelengthNm)
  })
})

import { energyJoules, windowEnergy, raceToIdle, fixedFunctionEnergy, drainsBattery } from '@/photon'

describe('energy budget — E = P × t, race to idle (macroscopic, distinct from E = hν)', () => {
  it('energy is power × time (joules)', () => {
    expect(energyJoules(10, 5)).toBe(50)
  })
  it('RACE TO IDLE: a higher-power engine that finishes sooner uses LESS total energy over the window', () => {
    const gpu = { watts: 12, seconds: 2 } // fast, hot
    const cpu = { watts: 4, seconds: 10 } // slow, cool
    const r = raceToIdle(gpu, cpu, 10, 0.5) // 10s window, 0.5W idle
    // gpu: 12*2 + 0.5*8 = 28 ; cpu: 4*10 + 0.5*0 = 40 → gpu wins despite 3× the peak watts
    expect(r.energyA).toBe(28)
    expect(r.energyB).toBe(40)
    expect(r.winner).toBe('a')
  })
  it('fixed-function block does the same work at 1/factor the energy', () => {
    expect(fixedFunctionEnergy(1200, 100)).toBe(12) // 100× more efficient decode
  })
  it('the honest caveat: an engine that never idles cannot race to idle — it only drains', () => {
    expect(drainsBattery({ watts: 12, seconds: 10 }, 10)).toBe(true)
    expect(drainsBattery({ watts: 12, seconds: 2 }, 10)).toBe(false)
    expect(windowEnergy({ watts: 12, seconds: 2 }, 10, 0.5)).toBe(28)
  })
})
