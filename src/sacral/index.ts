/**
 * sacral -- the sacral center (Svadhisthana), index 1 of the seven [[chakra]]s
 * (root → crown). A standalone PROJECTION of [[chakra]]: it does not recompute
 * the math — chakras() already decodes all seven [[horo]] positions, and this
 * atom only reads index 1.
 *
 * HONEST. The traditional role (life-force, creativity, generative flow, desire —
 * the well of vitality) is a cultural overlay, NOT a claim. Only position → note →
 * uuid is computed: the uuid is from the position MATH (never from the colour),
 * and the computed CMYK colour rendered FROM that uuid is NOT claimed identical to
 * the traditional rainbow orange. Ground it in [[law]] (zero entropy via uuid).
 *
 *   tsx src/sacral/index.ts
 *
 * @audit note·colour·uuid computed from the position math, never hand-asserted
 * @see ../chakra ../heart ../horo ./SKILL.md
 */
import { chakras, type Chakra } from '@/chakra'

/** The sacral center is index 1 of the seven (root=0 → crown=6). */
export const INDEX = 1

/** The sacral center — index 1 of the computed seven (projected, never recomputed). */
export const center = (): Chakra => chakras()[INDEX]!

/** The sacral center's colour — the CMYK channel rendered from its uuid (not the rainbow). */
export const color = (): string => center().hex

/** The sacral center's coordinate — its content-uuid, computed from the position MATH. */
export const uuid = (): string => center().uuid

if (import.meta.url === 'file://' + process.argv[1]) {
  const c = center()
  console.log('sacral — the sacral center (Svadhisthana), index ' + INDEX + ' of seven')
  console.log('  name             = ' + c.name)
  console.log('  sanskrit         = ' + c.sanskrit)
  console.log('  note/solfege     = ' + c.note + '/' + c.solfege)
  console.log('  hz               = ' + c.hz)
  console.log('  hex              = ' + color())
  console.log('  traditionalColour= ' + c.traditionalColour + ' (overlay, not claimed identical)')
  console.log('  uuid             = ' + uuid().slice(0, 8))
}
