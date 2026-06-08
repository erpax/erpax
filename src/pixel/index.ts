/**
 * pixel — the ATOM, rendered. An [[atom]] is a content-[[uuid]] (identity); a pixel is that uuid made
 * VISIBLE — its colour, computed from the uuid's [[digit]] (its position on the A432 ring). The atom
 * and the pixel are the same thing at two scales: the identity, and its rendered face. Everything on
 * screen is pixels, and every pixel is an atom's uuid-colour — the smallest unit of the [[analog]]
 * [[aura]]. A [[component]] is an atom rendered as pixels; [[vitepress]] is the whole corpus rendered.
 *
 * HONEST: the colour is COMPUTED from the uuid (digit → spectrum), never assigned. Sound and
 * vibration are the same digit's other [[signal]] facets (the full sensory render lives in
 * signal/aura) — the colour face is here; the teams wire the rest.
 *
 *   tsx src/pixel/index.ts
 *
 * @audit colour computed from the uuid's digit, never painted on
 * @see ../digit -- ../color -- ../aura -- ../component -- ../vitepress -- ./SKILL.md
 */
import { digitalRootOfUuid } from '@/digit'
import { colorOf } from '@/color'
import { toUuid } from '@/uuid/matrix'

/** A pixel — a content-uuid rendered: its digit (position on the ring) and the colour that digit shows. */
export interface Pixel {
  readonly digit: number
  readonly color: string
}

/** Render a content-uuid to its pixel — the atom's visible face, computed from the uuid alone. */
export function pixel(uuid: string): Pixel {
  const digit = digitalRootOfUuid(uuid)
  return { digit, color: colorOf(digit) }
}

/** Same content ⇒ same uuid ⇒ same pixel: the atom IS the pixel, identity and render are one. */
export const samePixel = (a: string, b: string): boolean => pixel(a).color === pixel(b).color && pixel(a).digit === pixel(b).digit

if (import.meta.url === 'file://' + process.argv[1]) {
  const u = toUuid(Buffer.from('pixel:demo', 'utf8'))
  const p = pixel(u)
  console.log('pixel — the atom rendered (uuid → digit → colour):')
  console.log('  ' + u.slice(0, 8) + '… → digit ' + p.digit + ' → ' + p.color)
}
