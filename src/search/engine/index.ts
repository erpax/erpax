/**
 * search/engine — the search engine over the corpus: a query resolves to matching atoms, ranked.
 * A pure read over the live [[matrix]] (atom names) — the [[search]] act made an engine. Optimizing
 * content for this engine's ranking is `search/engine/optimization` (SEO).
 *
 *   tsx src/search/engine/index.ts
 *
 * @audit pure over the live matrix node set; never hand-asserted
 * @see ../../search -- ../../uuid/matrix -- ./optimization -- ./SKILL.md
 */
import { UUID_MATRIX_NODES as N } from '@/uuid/matrix'

/** Search the corpus: atoms whose name contains the query (case-insensitive); empty query → none. */
export const search = (query: string): string[] => {
  const q = query.toLowerCase().trim()
  return q === '' ? [] : N.filter((n) => n.atom.toLowerCase().includes(q)).map((n) => n.atom)
}

/** Rank matches: earliest substring position first, then shortest atom (the closest match). */
export const rank = (query: string): string[] => {
  const q = query.toLowerCase().trim()
  return search(query).sort((a, b) => a.toLowerCase().indexOf(q) - b.toLowerCase().indexOf(q) || a.length - b.length)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('search/engine — rank("quantum"): ' + rank('quantum').slice(0, 8).join(' '))
  console.log('  matches for "cost": ' + search('cost').length)
}
