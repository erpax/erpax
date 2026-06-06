/**
 * crown — the crown center (Sahasrara): the 7th and last of the seven [[chakra]] centers,
 * index 6 on the root → crown walk. The traditional role — connection, unity, consciousness,
 * the whole, the return to the one — is a CULTURAL overlay, not a claim. Only position → note →
 * uuid is computed (from the SAME position math as every center); the computed CMYK colour is
 * NOT claimed identical to the traditional rainbow violet. This atom only PROJECTS index 6 of
 * the seven centers chakras() already computes — it never recomputes the math.
 *
 *   tsx src/crown/index.ts
 *
 * @audit note, colour and uuid computed from the position math, never hand-asserted
 * @see ../chakra ../heart ../horo ./SKILL.md
 */
import { chakras, type Chakra } from '@/chakra'

/** The crown is index 6 (the 7th center) on the root → crown walk. */
export const INDEX = 6

/** The crown center — projected from the seven chakras() compute, never recomputed. */
export const center = (): Chakra => chakras()[INDEX]!

/** The crown's colour — the CMYK channel rendered FROM the position uuid (not the rainbow violet). */
export const color = (): string => center().hex

/** The crown's coordinate — the content-uuid computed from the position MATH (never the colour). */
export const uuid = (): string => center().uuid

if (import.meta.url === 'file://' + process.argv[1]) {
  const c = center()
  console.log('crown — the crown center (' + c.sanskrit + ')')
  console.log('  name            = ' + c.name)
  console.log('  sanskrit        = ' + c.sanskrit)
  console.log('  note/solfege    = ' + c.note + '/' + c.solfege)
  console.log('  hz              = ' + c.hz)
  console.log('  hex             = ' + c.hex)
  console.log('  traditional     = ' + c.traditionalColour + ' (overlay, not claimed identical)')
  console.log('  uuid            = ' + c.uuid.slice(0, 8))
}
