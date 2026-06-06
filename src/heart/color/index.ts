/**
 * heart/color — the heart chakra's colour: GREEN. The A432-anchored colour of coherence and of a
 * passing [[test]] (a whole aura). Merges into [[color]] (the heart's facet of the spectrum).
 *
 *   tsx src/heart/color/index.ts
 *
 * @standard A432 tuning; Anahata (4th chakra) = green
 * @see ../../color -- ../index.ts -- ../../chakra -- ./SKILL.md
 */
import { GREEN } from '@/color'

/** The heart's colour — green (the A432 colour of coherence; the colour a passing test returns). */
export const heartColor = (): string => GREEN

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('heart/color — green = ' + heartColor())
}
