/**
 * throat -- the throat center (Vishuddha): the 5th of the seven [[chakra]] centers
 * (index 4, root → crown). The traditional role -- expression, voice, communication,
 * truth, the manifestation of inner state into the spoken word -- is a CULTURAL
 * overlay, noted not claimed. Only position → note → uuid is computed (from the SAME
 * content-uuid as every center, via the position MATH). The CMYK colour is rendered
 * FROM the uuid and is NOT claimed identical to the traditional rainbow (blue).
 *
 * This atom never recomputes the chakra math: [[chakra]]'s chakras() computes all
 * seven; throat is a standalone PROJECTION of index 4.
 *
 *   tsx src/throat/index.ts
 *
 * @audit note·colour·uuid computed from the position math, never hand-asserted
 * @see ../chakra ../heart ../horo ./SKILL.md
 */
import { chakras, type Chakra } from '@/chakra'

/** Position of the throat center on the 7-position ring, root → crown (0-based). */
export const INDEX = 4

/** The throat center, projected from the computed seven (never recomputed here). */
export const center = (): Chakra => chakras()[INDEX]!

/** The throat's colour — the CMYK channel rendered FROM its uuid (not the traditional rainbow). */
export const color = (): string => center().hex

/** The throat's coordinate — its content-uuid, computed from the position MATH. */
export const uuid = (): string => center().uuid

if (import.meta.url === 'file://' + process.argv[1]) {
  const c = center()
  console.log('throat -- the throat center (Vishuddha), index ' + INDEX + ' (root → crown)')
  console.log('  name            = ' + c.name + ' (' + c.sanskrit + ')')
  console.log('  note/solfege    = ' + c.note + '/' + c.solfege)
  console.log('  hz              = ' + c.hz)
  console.log('  hex (computed)  = ' + c.hex)
  console.log('  traditionalColour = ' + c.traditionalColour + ' (overlay, not claimed identical)')
  console.log('  uuid            = ' + c.uuid.slice(0, 8))
}
