/**
 * quantum/query — a query as a content-uuid: a normalized query string hashes to a uuid, so the same
 * query (whitespace/case folded) shares one identity — a cache key / [[merge]] — and a changed query
 * invalidates by content-address. The generic counterpart of [[quantum]]/sql. Merges into [[query]].
 * Composes [[query]] · [[quantum]] · [[uuid]] · [[merge]].
 *
 *   tsx src/quantum/query/index.ts
 *
 * @standard RFC 9562 §5.8 content-uuid (the query cache key)
 * @see ../../query -- ../sql -- ../../uuid/matrix -- ./SKILL.md
 */
import { toUuid } from '@/uuid/matrix'

/** A query's content-uuid from its normalized text (trimmed + lower-cased). */
export const queryUuid = (normalized: string): string => toUuid(Buffer.from('query:' + normalized.trim().toLowerCase(), 'utf8'))

/** Two query texts are the same iff their content-uuids match. */
export const sameQuery = (a: string, b: string): boolean => queryUuid(a) === queryUuid(b)

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('quantum/query — "SELECT 1 " == " select 1": ' + sameQuery('SELECT 1 ', ' select 1'))
}
