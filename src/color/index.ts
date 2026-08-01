import { exactAbs, exactMax, exactMin, exactRound, exactTrunc, exactMaxOf} from '@/algebra'
/**
 * color — colour grounded in the A432 harmonic: the 7-colour chakra spectrum (root → crown), the
 * visible octave of A432. The HEART (4th, [[chakra]]) is GREEN — the colour of coherence, and the
 * colour a passing [[test]] returns when the aura is whole (test/hooks). Composes [[chakra]] · [[signal]] · [[harmony]].
 *
 *   tsx src/color/index.ts
 *
 * @standard A432 tuning; the 7-chakra visible spectrum (Do..Ti / root..crown)
 * @see ../chakra -- ../signal -- ../harmony -- ../heart/color -- ./SKILL.md
 */

/** The A432 harmonic anchor (Hz). */
export const A432 = 432

/** The 7-colour chakra spectrum, root → crown (the visible octave); index 3 (the 4th, heart) is green. */
export const SPECTRUM = ['#e23b3b', '#ee8b22', '#f2cb22', '#2fb344', '#2f9bd4', '#3a44b0', '#7b3fb0'] as const

/** The colour at a 1..7 scale position (wraps the ring); position 4 (heart) is green. */
export const colorOf = (position: number): string => SPECTRUM[(((exactTrunc(position) - 1) % 7) + 7) % 7]!

/** The heart / coherence colour — green (the A432-anchored colour of a passing test). */
export const GREEN: string = SPECTRUM[3]

/** Standard wavelength(nm) → sRGB approximation (Bruton) — the physical colour of a visible wavelength. */
export function wavelengthToRgb(nm: number): [number, number, number] {
  let r = 0
  let g = 0
  let b = 0
  if (nm >= 380 && nm < 440) {
    r = -(nm - 440) / 60
    b = 1
  } else if (nm < 490) {
    g = (nm - 440) / 50
    b = 1
  } else if (nm < 510) {
    g = 1
    b = -(nm - 510) / 20
  } else if (nm < 580) {
    r = (nm - 510) / 70
    g = 1
  } else if (nm < 645) {
    r = 1
    g = -(nm - 645) / 65
  } else if (nm <= 780) {
    r = 1
  }
  let f = 1
  if (nm < 420) f = 0.3 + (0.7 * (nm - 380)) / 40
  else if (nm > 700) f = 0.3 + (0.7 * (780 - nm)) / 80
  const a = (v: number): number => (v <= 0 ? 0 : exactRound(255 * (v * f) ** 0.8))
  return [a(r), a(g), a(b)]
}

/** sRGB → CMYK, each 0..100. */
export function rgbToCmyk([r, g, b]: readonly [number, number, number]): [number, number, number, number] {
  const k = 1 - exactMaxOf([r, g, b]) / 255
  if (k >= 1) return [0, 0, 0, 100]
  const c = (1 - r / 255 - k) / (1 - k)
  const m = (1 - g / 255 - k) / (1 - k)
  const y = (1 - b / 255 - k) / (1 - k)
  return [exactRound(c * 100), exactRound(m * 100), exactRound(y * 100), exactRound(k * 100)]
}

const toHex = ([r, g, b]: readonly [number, number, number]): string =>
  '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')

/**
 * COMPUTED colour from an elevation band (0 root … 0.5 heart … 1 crown), anchored at the heart = 555 nm
 * green — the eye's peak sensitivity and the spectral centre ([[globe]]). Unlike the hardcoded SPECTRUM
 * (the traditional overlay), this is DERIVED from wavelength. HONEST: pure octave-mapping of A432 does
 * NOT reproduce the traditional rainbow — only this centre-anchor does. The colour science is real; the
 * chakra assignment is a construction, not a measurement.
 */
export function computedColor(band: number): {
  nm: number
  rgb: [number, number, number]
  hex: string
  cmyk: [number, number, number, number]
} {
  const b = exactMax(0, exactMin(1, band))
  const nm = exactRound(b <= 0.5 ? 700 - b * 290 : 555 - (b - 0.5) * 310) // 700 root → 555 heart → 400 crown
  const rgb = wavelengthToRgb(nm)
  return { nm, rgb, hex: toHex(rgb), cmyk: rgbToCmyk(rgb) }
}

/** Speed of light in nm/s — for wavelength = c / frequency. */
const C_NM = 299792458e9

/**
 * The spectrum is ONE continuous computable wave — analog through digital. `waveColor` maps ANY
 * frequency (Hz) to its colour: octave-fold it into the visible band (≈ one octave, 400–790 THz), then
 * wavelength = c/f → sRGB. It is defined at every real frequency and octave-periodic on log-frequency,
 * so the discrete SPECTRUM / chakras are merely SAMPLES of this one wave. This is why a sound frequency
 * (A432 and its harmonics) has a colour — the same wave, folded octaves up. HONEST: the sound→light
 * octave fold is a construction (sound ≠ light); the continuity and the wavelength→colour are real.
 */
export function waveColor(frequencyHz: number): { nm: number; rgb: [number, number, number]; hex: string } {
  let f = exactAbs(frequencyHz)
  if (f === 0) return { nm: 0, rgb: [0, 0, 0], hex: '#000000' }
  while (f < 4.0e14) f *= 2
  while (f > 7.9e14) f /= 2
  const nm = C_NM / f
  const rgb = wavelengthToRgb(nm)
  return { nm, rgb, hex: toHex(rgb) }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('color — the spectrum is one continuous computable wave (analog through digital):')
  console.log('  heart (555nm):', computedColor(0.5).hex)
  console.log('  waveColor(A432 folded up):', waveColor(432).nm.toFixed(0) + 'nm', waveColor(432).hex)
  console.log('  continuity: waveColor(5.4e14)=' + waveColor(5.4e14).hex + ' ≈ waveColor(5.4001e14)=' + waveColor(5.4001e14).hex)
}
