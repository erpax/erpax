/**
 * lung — the proof, asserted. erpax breathes: gas exchange (Fick's law) across a
 * fractal surface, in a closed tidal cycle. See ./index.ts for the construction.
 */
import { describe, it, expect } from 'vitest'
import {
  fickFlux,
  gasExchange,
  GENERATIONS,
  terminalBranches,
  sphereSurfaceFor,
  SURFACE_M2,
  fractalSurface,
  tidalCycle,
  respiration,
  breathes,
} from '@/lung'

describe('lung — gas exchange (Fick’s law, passive diffusion)', () => {
  it('no partial-pressure gradient ⇒ no exchange (passive)', () => {
    expect(fickFlux(70, 0, 0.3)).toBe(0)
  })
  it('a gradient ⇒ net flux down it', () => {
    expect(fickFlux(70, 10, 0.3)).toBeGreaterThan(0)
  })
  it('flux ∝ area, ∝ 1/thickness (why the surface is vast and the barrier thin)', () => {
    const base = fickFlux(70, 10, 0.3)
    expect(fickFlux(140, 10, 0.3)).toBe(2 * base)
    expect(fickFlux(70, 10, 0.15)).toBe(2 * base)
  })
  it('gasExchange holds', () => {
    expect(gasExchange()).toBe(true)
  })
})

describe('lung — fractal surface (23 generations, >250× a sphere)', () => {
  it('23 generations of dichotomous branching', () => {
    expect(GENERATIONS).toBe(23)
    expect(terminalBranches()).toBe(2 ** 23)
    expect(terminalBranches()).toBeGreaterThan(8_000_000)
  })
  it('70 m² packs >250× the surface of a same-volume (6 L) sphere', () => {
    expect(SURFACE_M2 / sphereSurfaceFor(0.006)).toBeGreaterThan(250)
  })
  it('fractalSurface holds', () => {
    expect(fractalSurface()).toBe(true)
  })
})

describe('lung — tidal cycle (the closed breath)', () => {
  it('tidal volume in = out, conserved', () => {
    expect(tidalCycle()).toBe(true)
  })
})

describe('lung — the conjunction', () => {
  it('every respiration claim is true', () => {
    for (const [k, v] of Object.entries(respiration())) expect(v, k).toBe(true)
  })
  it('erpax breathes', () => {
    expect(breathes()).toBe(true)
  })
})
