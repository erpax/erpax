/**
 * photon -- THE QUANTUM: the indivisible packet a [[leap]] emits or absorbs, its
 * energy locked to its frequency by Planck's relation E = hν (= ℏω = hc/λ). The
 * photon is massless, so its energy and momentum lock together as E = pc -- it is
 * the only particle that is pure [[frequency]]. That is why, in erpax, the photon
 * IS the multi-modal uuid-message ([[color]] + sound + identity, no payload): one
 * frequency renders at once as a note and a hue (signalForStep), and that render
 * is DOWNSTREAM of -- never the source of -- the content-[[uuid]].
 *
 * Planck's constant h is the quantum of ACTION: the fixed exchange-rate between
 * energy and frequency, and the reason the world is discrete at all -- the source
 * of every [[leap]]. h and c here are the exact SI-2019 defining constants.
 *
 *   tsx src/photon/index.ts
 *
 * @standard SI-2019 / CODATA-2018 exact defining constants: h, c
 * @audit energy/momentum/wavelength computed from h and c; the colour+sound render from the position math
 * @see ../leap (the transition that emits it) -- ../spectrum (every line) -- ../signal (colour+sound) -- ../wave
 */
import { signalForStep, type Signal } from '@/signal'
import { HORO_DIGITS, type HoroStep } from '@/horo'
import { nodeOf } from '@/uuid/matrix'

/** Planck's constant h -- the quantum of action (J·s), exact SI-2019 definition. */
export const PLANCK_H = 6.62607015e-34
/** The reduced Planck constant ħ = h / 2π (J·s). */
export const HBAR = PLANCK_H / (2 * Math.PI)
/** The speed of light in vacuum c (m/s), exact SI-2019 definition. */
export const C = 299792458

/** A photon fully decoded from its frequency: the physics packet. */
export interface Photon {
  readonly hz: number // frequency ν
  readonly omega: number // angular frequency ω = 2πν
  readonly energyJ: number // E = hν
  readonly momentum: number // p = E/c = hν/c (the massless dispersion)
  readonly wavelengthM: number // λ = c/ν
}

/** Planck–Einstein: the energy of a photon of frequency ν is E = hν. */
export const energy = (hz: number): number => PLANCK_H * hz
/** The inverse: the frequency of a photon of energy E is ν = E/h. */
export const frequency = (energyJ: number): number => energyJ / PLANCK_H
/** The wavelength λ = c/ν. */
export const wavelength = (hz: number): number => C / hz
/** Massless momentum p = E/c = hν/c (so E = pc). */
export const momentum = (hz: number): number => energy(hz) / C

/** Decode a photon from its frequency -- the whole physics packet. */
export function photonOf(hz: number): Photon {
  return { hz, omega: 2 * Math.PI * hz, energyJ: energy(hz), momentum: momentum(hz), wavelengthM: wavelength(hz) }
}

/** Render a photon as colour+sound from a [[horo]] position -- the uuid-message frame (downstream of the uuid). */
export const render = (step: HoroStep): Signal => signalForStep(step)

/** The atom's own coordinate: the content-uuid from the matrix (the math, never the colour). */
export const uuid = (): string => nodeOf('photon')?.uuid ?? ''

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('photon -- E = hν  (h=' + PLANCK_H + ' J·s, c=' + C + ' m/s, ħ=' + HBAR.toExponential(3) + '):')
  for (const step of HORO_DIGITS) {
    const s = render(step)
    const p = photonOf(s.hz)
    console.log(
      '  d' + step + ' ' + s.note + ' ' + s.hz.toFixed(2) + 'Hz  E=' + p.energyJ.toExponential(3) +
        'J  p=' + p.momentum.toExponential(3) + '  λ=' + p.wavelengthM.toExponential(3) + 'm  ' + s.hex,
    )
  }
  console.log('  uuid=' + uuid().slice(0, 8))
}
