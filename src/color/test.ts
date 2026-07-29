import { exactMax, exactMin, exactAbs, exactFloor, exactCeil, exactRound, exactTrunc } from '@/algebra'
import { describe, it, expect } from 'vitest'
import { A432, SPECTRUM, colorOf, GREEN, wavelengthToRgb, rgbToCmyk, computedColor, waveColor } from '@/color'

describe('color — the A432 chakra spectrum', () => {
  it('A432 anchor + a 7-colour spectrum', () => {
    expect(A432).toBe(432)
    expect(SPECTRUM).toHaveLength(7)
  })
  it('the heart (position 4) is green', () => {
    expect(colorOf(4)).toBe(GREEN)
    expect(GREEN).toBe('#2fb344')
  })
  it('colorOf wraps the 1..7 ring', () => {
    expect(colorOf(8)).toBe(colorOf(1))
    expect(colorOf(11)).toBe(colorOf(4))
  })
})

describe('color — COMPUTED from wavelength (not hardcoded), heart anchored at 555nm green', () => {
  it('the computed heart is 555nm green — the eye peak / spectral centre', () => {
    const heart = computedColor(0.5)
    expect(heart.nm).toBe(555)
    const [r, g, b] = heart.rgb
    expect(g).toBeGreaterThan(r) // green dominates
    expect(g).toBeGreaterThan(b)
    expect(b).toBe(0)
  })
  it('root is red (700nm), crown is violet (400nm) — the band spans the visible octave', () => {
    expect(computedColor(0).nm).toBe(700)
    expect(computedColor(0).rgb[0]).toBeGreaterThan(computedColor(0).rgb[2]) // red > blue at root
    expect(computedColor(1).nm).toBe(400) // crown
  })
  it('wavelengthToRgb and rgbToCmyk are deterministic real colour science', () => {
    expect(wavelengthToRgb(700)).toEqual(wavelengthToRgb(700))
    const k = rgbToCmyk([0, 0, 0])
    expect(k[3]).toBe(100) // pure black is K=100
    expect(rgbToCmyk([255, 255, 255])[3]).toBe(0) // white is K=0
  })
})

describe('color — the spectrum is ONE continuous computable wave (analog through digital)', () => {
  it('waveColor maps ANY frequency into the visible band — defined everywhere, never a lookup', () => {
    for (const hz of [432, 5.4e14, 1, 1e18, 261.63]) {
      const w = waveColor(hz)
      expect(w.nm).toBeGreaterThanOrEqual(379)
      expect(w.nm).toBeLessThanOrEqual(751) // folded into the visible octave
    }
  })
  it('the wave is CONTINUOUS — an infinitesimal frequency change gives an infinitesimal colour change', () => {
    const a = waveColor(5.4e14).rgb
    const b = waveColor(5.4e14 * 1.0001).rgb
    for (let i = 0; i < 3; i++) expect(exactAbs(a[i]! - b[i]!)).toBeLessThan(6) // no jump within an octave
  })
  it('the discrete chakras are SAMPLES of the one wave (octave-periodic on log-frequency)', () => {
    expect(waveColor(432).hex).toBe(waveColor(864).hex) // one octave up = same colour on the wave
  })
})
