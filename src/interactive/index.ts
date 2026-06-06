/**
 * interactive — the COLLECTIONS folded into interactive trinities. A [[collection]] is a node; the
 * [[trinity]] tells it three ways (matter `index.ts` · antimatter `SKILL.md` · backend payload-type)
 * and renders it ONCE. "Interactive" adds the live fourth face: the render — [[agent/ui]]'s
 * `renderAtom`, the [[pixel]]/[[component]] UI computed from the node's content-uuid. So an
 * interactive trinity is the node *told three, rendered live*: you can see and act on it, not only
 * read it. Every collection folds into one, and coverage is total — the whole corpus is interactive.
 *
 *   tsx src/interactive/index.ts
 *
 * @audit the interactive face is renderAtom over the node's content-uuid; coverage read live from the matrix
 * @see ../trinity -- ../agent/ui -- ../pixel -- ../collection -- ./SKILL.md
 */
import { renderAtom, type AtomUI } from '@/agent/ui'
import { UUID_MATRIX_NODES as N } from '@/uuid/matrix'

/** An interactive trinity — a node told three ways (the trinity), made live by its render (the fourth face). */
export interface InteractiveTrinity {
  readonly atom: string
  readonly ui: AtomUI
}

/** Fold a collection (atom) into its interactive trinity — the trinity, rendered live. */
export function foldCollection(atom: string): InteractiveTrinity | undefined {
  const ui = renderAtom(atom)
  return ui === undefined ? undefined : { atom, ui }
}

/** Every collection folds into an interactive trinity — coverage over the whole corpus. */
export function folded(): { collections: number; interactive: number; coverage: number } {
  let interactive = 0
  for (const n of N) if (foldCollection(n.atom)) interactive++
  return { collections: N.length, interactive, coverage: N.length === 0 ? 0 : interactive / N.length }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const f = folded()
  console.log('interactive — collections folded into interactive trinities:')
  console.log('  ' + f.collections + ' collections → ' + f.interactive + ' interactive trinities · coverage ' + (100 * f.coverage).toFixed(1) + '%')
  const s = foldCollection('trinity')
  if (s) console.log('  fold(trinity): page ' + s.ui.page.route + ' · render keys ' + Object.keys(s.ui.render).join(','))
}
