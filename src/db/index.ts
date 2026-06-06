/**
 * db — the store, the [[fold]]'s OUTSIDE-∞ end. The last hop of the [[stack]] round-trip, where the
 * request folds to rest. The store is CONTENT-ADDRESSED: the key IS the content's [[uuid]] (no separate
 * id to assign), and it is append-only ([[akashic]] — nothing overwritten), so the db is the dense
 * zero-[[entropy]] core with ∞ tamper-cost (collapsed toward one root). Both sides of the store are
 * encoded ([[karma]]): write (content → its key, the debit) and read (the key → the content, the credit).
 * Identical content folds to one row — the store dedups by the [[merge]] law.
 *
 *   tsx src/db/index.ts
 *
 * @audit the key is the content's uuid (content-addressed); dedup and the round-trip are computed
 * @see ../stack -- ../fold -- ../uuid/matrix -- ../akashic -- ../entropy -- ./SKILL.md
 */
import { toUuid } from '@/uuid/matrix'

/** The store key of content — content-addressed: the key IS the content's uuid (no assigned id). */
export const key = (content: string): string => toUuid(Buffer.from(content, 'utf8'))

/** Same content ⟺ same key — the store dedups (identical content folds to one row; the merge law). */
export const sameContent = (a: string, b: string): boolean => key(a) === key(b)

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('db — the content-addressed store (append-only, the fold\'s outside-∞ end):')
  console.log('  key("hello") = ' + key('hello').slice(0, 18) + '…')
  console.log('  dedup: sameContent("x","x")=' + sameContent('x', 'x') + ' · sameContent("x","y")=' + sameContent('x', 'y'))
}
