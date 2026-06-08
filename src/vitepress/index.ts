/**
 * vitepress — the form coil, rendered. The corpus walk maps every atom to its PAGE; this
 * matter-twin maps every atom to its page AND its PIXEL — so each rendered page carries its own
 * content-[[uuid]] colour. Where [[pixel]] renders ONE atom (uuid → colour) and [[payload]] realises
 * its substance, VitePress renders the WHOLE corpus as a site of pixel-coloured pages.
 *
 * The route is the address (path = router): an atom at srcDir-relative path `identity/signal`
 * speaks at `/identity/signal/SKILL`. The pixel is the same atom's uuid-colour. One atom, two faces:
 * where it is read (route) and how it looks (pixel) — bound by the one identity.
 *
 *   tsx src/vitepress/index.ts
 *
 * @audit route computed from the path (path = address), pixel computed from the uuid — never assigned
 * @see ../pixel -- ../payload -- ../identity -- ../duality -- ./SKILL.md -- ../../.vitepress/corpus.mts
 */
import { pixel, type Pixel } from '@/pixel'
import { toUuid } from '@/uuid/matrix'

/** A rendered corpus page — where the atom is read (route) and how it looks (its uuid-pixel). */
export interface AtomPage {
  /** the docs route = the address: `/<path>/SKILL` (the path is the router). */
  readonly route: string
  /** the atom's visible face — colour computed from its content-uuid. */
  readonly pixel: Pixel
}

/** srcDir-relative path → docs route, mirroring corpus.mts `routeOf`: `identity/signal` → `/identity/signal/SKILL`. */
export function routeOf(path: string): string {
  const segs = path.split(/[\\/]/).filter(Boolean)
  return '/' + [...segs, 'SKILL'].join('/')
}

/**
 * Map an atom to its rendered page: its route (the path-address) and its pixel (the uuid-colour).
 * The corpus thus becomes a site of pixel-coloured pages — every page carries its content-uuid hue.
 */
export function atomPage(path: string, uuid: string): AtomPage {
  return { route: routeOf(path), pixel: pixel(uuid) }
}

/** Render many atoms at once — the corpus as a field of pixel-coloured pages (order preserved). */
export const sitePages = (atoms: readonly { path: string; uuid: string }[]): readonly AtomPage[] =>
  atoms.map(({ path, uuid }) => atomPage(path, uuid))

/** Same path + same uuid ⇒ same page: route and pixel are both read off identity, never painted. */
export const samePage = (a: AtomPage, b: AtomPage): boolean =>
  a.route === b.route && a.pixel.digit === b.pixel.digit && a.pixel.color === b.pixel.color

if (import.meta.url === 'file://' + process.argv[1]) {
  const path = 'identity/signal'
  const uuid = toUuid(Buffer.from('vitepress:demo:' + path, 'utf8'))
  const page = atomPage(path, uuid)
  console.log('vitepress — the corpus rendered (atom → page + pixel):')
  console.log('  ' + path + ' → ' + page.route + '  ▉ ' + page.pixel.color + ' (digit ' + page.pixel.digit + ')')
}
