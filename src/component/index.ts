/**
 * component — an [[atom]] RENDERED. A reusable UI building block (button, card, modal, field) is
 * an atom made into something you can put on screen — and an atom rendered is its [[pixel]]. So a
 * component's visible identity is its content-[[uuid]] pixel: there is no separate "look" to assign,
 * the look is READ OFF the identity. `componentPixel(uuid) = pixel(uuid)` — the component shows
 * exactly the pixel its atom-uuid computes.
 *
 * Where [[pixel]] is the atom rendered as one dot and [[vitepress]] is the whole corpus rendered as
 * a site, a **component** is the atom rendered as a reusable on-screen unit — same identity, render
 * scale in between. Two components built from the same content render identically (`sameComponent`),
 * because they are the same atom: the design is DRY and tamper-evident by construction.
 *
 * HONEST: this binds the COLOUR face (uuid → digit → spectrum, via [[pixel]]). Sound, vibration and
 * shape are the same uuid's other [[signal]] facets — the design/accessibility teams wire those onto
 * the rendered component; the proven core is that the visible identity is computed, never painted on.
 *
 *   tsx src/component/index.ts
 *
 * @audit a component's visible identity IS its atom-uuid pixel — computed, never hand-styled
 * @see ../pixel -- ../atom -- ../uuid -- ../signal -- ../vitepress -- ./SKILL.md
 */
import { pixel, samePixel, type Pixel } from '@/pixel'
import { toUuid } from '@/uuid/matrix'

/** The pixel a component shows is the pixel of its atom-uuid: a component IS an atom rendered. */
export function componentPixel(uuid: string): Pixel {
  return pixel(uuid)
}

/**
 * Same content ⇒ same uuid ⇒ same component render: components built from identical atoms are the
 * same component on screen. The render is the identity, so equality of content is equality of look.
 */
export const sameComponent = (a: string, b: string): boolean => samePixel(a, b)

if (import.meta.url === 'file://' + process.argv[1]) {
  const u = toUuid(Buffer.from('component:demo', 'utf8'))
  const p = componentPixel(u)
  console.log('component — the atom rendered (uuid → its pixel):')
  console.log('  ' + u.slice(0, 8) + '… → digit ' + p.digit + ' → ' + p.color)
  console.log('  sameComponent(u, u) =', sameComponent(u, u))
}
