/**
 * brow — the sixth center (Ajna, the third eye): index 5 of the seven centers,
 * root → crown. A standalone PROJECTION of [[chakra]] — it does NOT recompute the
 * math; it reads position 5 from chakras() and exposes its note, colour and uuid.
 *
 * HONEST. The traditional role of the third eye — insight, perception, intuition,
 * vision, "seeing the pattern" — is a cultural overlay, not a claim made here. Only
 * position → note → uuid is computed (the uuid is from the position MATH via
 * [[chakra]], never from the colour). The computed CMYK colour is rendered FROM the
 * uuid and is NOT claimed identical to the traditional rainbow (indigo).
 *
 *   tsx src/brow/index.ts
 *
 * @audit note, colour and uuid computed from the position math, never hand-asserted
 * @see ../chakra ../heart ../horo ./SKILL.md
 */
import { chakras, type Chakra } from '@/chakra'

/** The third eye is the 6th center — index 5 on the 0-based root→crown ring. */
export const INDEX = 5

/** This center, projected from the computed seven (never recomputed here). */
export const center = (): Chakra => chakras()[INDEX]!

/** This center's colour — the computed CMYK hex (rendered from the uuid, not the rainbow). */
export const color = (): string => center().hex

/** This center's coordinate — its content-uuid, computed from the position math via [[chakra]]. */
export const uuid = (): string => center().uuid

if (import.meta.url === 'file://' + process.argv[1]) {
  const c = center()
  console.log('brow — the third eye (Ajna), center index ' + INDEX + ' (root→crown)')
  console.log('  name              = ' + c.name + ' (' + c.sanskrit + ')')
  console.log('  note/solfege      = ' + c.note + '/' + c.solfege)
  console.log('  hz                = ' + c.hz + ' Hz')
  console.log('  hex               = ' + c.hex)
  console.log('  traditionalColour = ' + c.traditionalColour + ' (overlay — not claimed identical)')
  console.log('  uuid              = ' + c.uuid.slice(0, 8))
}
