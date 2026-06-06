/**
 * root -- the 1st [[chakra]] (Muladhara), index 0 of the seven (root → crown):
 * a standalone PROJECTION of [[chakra]], never a recomputation. The math lives in
 * chakras(); here we only read center #0 — its position → note → content-uuid, with
 * the colour rendered FROM that uuid (never the reverse).
 *
 * HONEST. The traditional role — survival, grounding, security, stability, the base
 * everything else stands on — is a cultural overlay, not a computed claim. Only the
 * position → note → uuid is computed. The computed CMYK colour (hex) is the rendered
 * frame of the position; it is NOT claimed identical to the traditional rainbow red.
 *
 *   tsx src/root/index.ts
 *
 * @audit note·colour·uuid computed from the position math, never hand-asserted
 * @see ../chakra ../horo ../heart ./SKILL.md
 */
import { chakras, type Chakra } from '@/chakra'

/** Index of the root center on the 7-position ring (0 = root, 6 = crown). */
export const INDEX = 0

/** The root center — projected straight out of chakras(), the single source of the math. */
export const center = (): Chakra => chakras()[INDEX]!

/** The root's computed colour (CMYK hex), rendered FROM the uuid — not the traditional red. */
export const color = (): string => center().hex

/** The root's coordinate — its content-uuid, computed from the position MATH (never the colour). */
export const uuid = (): string => center().uuid

if (import.meta.url === 'file://' + process.argv[1]) {
  const c = center()
  console.log('root -- the 1st chakra (Muladhara), index ' + INDEX + ' (root → crown):')
  console.log('  name             = ' + c.name + ' (' + c.sanskrit + ')')
  console.log('  note / solfege   = ' + c.note + ' / ' + c.solfege)
  console.log('  hz               = ' + c.hz)
  console.log('  hex (computed)   = ' + c.hex)
  console.log('  traditionalColour= ' + c.traditionalColour + ' (cultural overlay, not claimed identical)')
  console.log('  uuid             = ' + c.uuid.slice(0, 8))
}
