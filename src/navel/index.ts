/**
 * navel — the solar plexus center (Manipura): index 2 of the seven [[chakra]] centers
 * (root → crown), a standalone PROJECTION of [[chakra]]. The traditional role — will, power,
 * agency, self-definition, the fire of identity and action — is a cultural overlay, NOT a claim.
 * Only position → note → uuid is computed (from the position MATH via chakras()[2]); the CMYK
 * colour is rendered FROM that uuid and is NOT claimed identical to the traditional rainbow
 * (Manipura's yellow). This file never recomputes the math — it only projects center index 2.
 *
 *   tsx src/navel/index.ts
 *
 * @audit note·colour·uuid computed from the position math, never hand-asserted
 * @see ../chakra ../heart ../horo ./SKILL.md
 */
import { chakras, type Chakra } from '@/chakra'

/** Index of the solar plexus center on the 7-position ring (root = 0 → crown = 6). */
export const INDEX = 2

/** The solar plexus center, projected from the computed chakra ring (never recomputed here). */
export const center = (): Chakra => chakras()[INDEX]!

/** The center's colour — CMYK hex rendered FROM the uuid (never the reverse). */
export const color = (): string => center().hex

/** The center's coordinate — its content-uuid, computed from the position math. */
export const uuid = (): string => center().uuid

if (import.meta.url === 'file://' + process.argv[1]) {
  const c = center()
  console.log('navel — the solar plexus center (Manipura), index ' + INDEX + ' of seven')
  console.log('  name              = ' + c.name)
  console.log('  sanskrit          = ' + c.sanskrit)
  console.log('  note/solfege      = ' + c.note + '/' + c.solfege)
  console.log('  hz                = ' + c.hz)
  console.log('  hex               = ' + c.hex)
  console.log('  traditionalColour = ' + c.traditionalColour)
  console.log('  uuid              = ' + c.uuid.slice(0, 8))
}
