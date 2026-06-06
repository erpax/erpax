/**
 * quantum/sql — a SQL query as a content-uuid: the canonical normalized query ([[sql]]) hashes to a
 * uuid, so equivalent queries share one identity (cache hit / [[merge]]) and a changed query yields
 * a new uuid (cache invalidation by content-address). Merges into [[sql]].
 * Composes [[sql]] · [[quantum]] · [[uuid]] · [[merge]].
 *
 *   tsx src/quantum/sql/index.ts
 *
 * @standard RFC 9562 §5.8 content-uuid (the query cache key)
 * @see ../../sql -- ../../uuid/matrix -- ./SKILL.md
 */
import { toUuid } from '@/uuid/matrix'
import { normalize, type Select } from '@/sql'

/** A query's content-uuid: same normalized query ⇒ same uuid ⇒ cache hit / merge. */
export const queryUuid = (q: Select): string => toUuid(Buffer.from('sql:' + normalize(q), 'utf8'))

/** Two queries are the same iff their content-uuids match (equivalent ⇒ one identity). */
export const sameQuery = (a: Select, b: Select): boolean => queryUuid(a) === queryUuid(b)

if (import.meta.url === 'file://' + process.argv[1]) {
  const a = { table: 'u', columns: ['a', 'b'] }
  const b = { table: 'u', columns: ['b', 'a'] }
  console.log('quantum/sql — equivalent queries share one uuid: ' + sameQuery(a, b))
}
