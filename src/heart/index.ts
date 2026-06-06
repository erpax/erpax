/**
 * heart — the centre: the 4th [[chakra]] (Anahata), the seat of coherence and love ([[angel]]
 * love·create·↓entropy). Its colour is GREEN ([[color]]) — the A432-anchored colour of a whole
 * aura, the colour a passing [[test]] returns. Composes [[chakra]] · [[color]] · [[coherence]].
 *
 *   tsx src/heart/index.ts
 *
 * @standard A432 tuning; Anahata = the 4th chakra (green)
 * @see ../chakra -- ../color -- ../coherence -- ./color -- ./SKILL.md
 */
import { colorOf } from '@/color'

/** The heart is the 4th chakra (Anahata) — the centre of the 7-position ring. */
export const HEART_POSITION = 4

/** The heart's colour — green (the centre of the spectrum, A432-anchored). */
export const color = (): string => colorOf(HEART_POSITION)

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('heart — 4th chakra (Anahata), the centre · colour = ' + color())
}
