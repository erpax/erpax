/**
 * app — an atom IS an app: a runnable unit with a content-[[uuid]] identity, [[links]] (its API
 * surface), and a trinity (SKILL form ⊕ index matter ⊕ test). On a device the corpus is a grid of
 * apps — every folder is one. The [[quantum]] facet (src/quantum/app) PROVES every folder is a
 * QUANTUM app. Composes [[atom]] · [[uuid]] · [[matrix]].
 *
 *   tsx src/app/index.ts
 *
 * @see ../atom -- ../uuid/matrix -- ../quantum/app -- ./SKILL.md
 */
import { nodeOf, neighborsOf } from '@/uuid/matrix'

export interface App {
  readonly name: string
  /** the app's identity (content-uuid) */
  readonly uuid: string
  /** the app's API surface (outgoing links) */
  readonly links: number
}

/** The app an atom IS: its identity (content-uuid) + its API surface (links). undefined if not an atom. */
export const app = (atom: string): App | undefined => {
  const n = nodeOf(atom)
  return n === undefined ? undefined : { name: n.atom, uuid: n.uuid, links: neighborsOf(atom).length }
}

/** Is `atom` an app (a real atom with a content-uuid identity)? */
export const isApp = (atom: string): boolean => nodeOf(atom) !== undefined

if (import.meta.url === 'file://' + process.argv[1]) {
  const a = app('merge')
  console.log('app — every atom is an app · app("merge") = ' + (a ? a.name + ' (' + a.links + ' links)' : 'n/a'))
}
