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
export const colorOf = (position: number): string => SPECTRUM[(((Math.trunc(position) - 1) % 7) + 7) % 7]!

/** The heart / coherence colour — green (the A432-anchored colour of a passing test). */
export const GREEN: string = SPECTRUM[3]

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('color — A432 spectrum; heart = GREEN = ' + GREEN + ' · colorOf(4) = ' + colorOf(4))
}
