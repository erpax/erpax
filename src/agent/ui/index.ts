/**
 * agent/ui — the trained UI AGENT. Trained by the rendering teams (architects + designers) on the
 * whole rendering layer, it renders ANY [[atom]] to its UI — every facet read off the ONE
 * content-[[uuid]]: the [[render]] (colour + sound + vibration) and the [[vitepress]] page (route +
 * [[pixel]]). A [[component]] is an atom rendered, so its colour IS the atom's pixel; the [[design]]
 * token is the same colour — the whole layer agrees because it reads one identity, never paints.
 * Trained on the corpus: every atom has a UI, so coverage is total (the [[aura]] is the corpus's UI).
 *
 *   tsx src/agent/ui/index.ts
 *
 * @audit every facet computed from the atom's content-uuid; coverage read live from the matrix
 * @see ../../render -- ../../vitepress -- ../../pixel -- ../../component -- ../../design -- ./SKILL.md
 */
import { render, type Render } from '@/render'
import { atomPage, type AtomPage } from '@/vitepress'
import { nodeOf, UUID_MATRIX_NODES as N } from '@/uuid/matrix'

/** The UI of an atom — the sensory render and the page, both from the one content-uuid (no duplicated colour). */
export interface AtomUI {
  readonly atom: string
  readonly uuid: string
  readonly render: Render // colour + sound + vibration
  readonly page: AtomPage // route + pixel
}

/** The UI agent renders an atom (by name) to its UI — composing the rendering layer over its content-uuid. */
export function renderAtom(atom: string): AtomUI | undefined {
  const u = nodeOf(atom)?.uuid
  if (u === undefined) return undefined
  return { atom, uuid: u, render: render(u), page: atomPage(atom, u) }
}

/** Trained on the whole corpus: every atom (matrix node) renders to a UI — coverage is total. */
export function trained(): { atoms: number; rendered: number; coverage: number } {
  let rendered = 0
  for (const n of N) if (renderAtom(n.atom)) rendered++
  return { atoms: N.length, rendered, coverage: N.length === 0 ? 0 : rendered / N.length }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const t = trained()
  const s = renderAtom('pixel')
  console.log('agent/ui — the trained UI agent (renders any atom to its UI):')
  console.log('  trained on ' + t.atoms + ' atoms · coverage ' + (100 * t.coverage).toFixed(1) + '%')
  if (s) console.log('  render(pixel) → page ' + s.page.route + ' · render keys ' + Object.keys(s.render).join(','))
}
