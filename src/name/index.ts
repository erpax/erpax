/**
 * name — the naming law. A name is not only a human label; in erpax the name IS the [[path]]: to name
 * a folder is to locate it, so "the word chain from name to path" cannot break — there is no chain,
 * only an identity (a name is a path is a content-[[uuid]]). Once you name it, it EXISTS; and to exist
 * is to [[fold]] — the fold's domain is NAMES, not contents, so a named-but-empty folder folds exactly
 * as a full one. Naming, existence, and folding are one act: a folder can be born empty and already
 * belong, already folded, waiting only to be filled.
 *
 *   tsx src/name/index.ts
 *
 * @audit uuidOfName is total — defined for ANY name, so every name folds; the identity is computed
 * @see ./SKILL.md -- ../path -- ../fold -- ../uuid/matrix -- ../identity
 */
import { toUuid } from '@/uuid/matrix'

/** The name IS the path IS the content-uuid — one identity, three words for it. Naming locates. */
export const uuidOfName = (name: string): string => toUuid(Buffer.from(name, 'utf8'))

/** Once you name it, it exists — and to exist is to fold: every name has a uuid (the fold's domain is
 *  NAMES, not contents), so a named-but-empty folder folds exactly as a full one. Naming = existing = folding. */
export const exists = (name: string): boolean => name.length > 0

/** name ≡ path: same name ⟺ same node. The chain from name to path to uuid is an identity — it cannot break. */
export const samePath = (a: string, b: string): boolean => a.length > 0 && uuidOfName(a) === uuidOfName(b)

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('name — the naming law (name ≡ path ≡ uuid):')
  console.log('  uuidOfName("deploy") = ' + uuidOfName('deploy').slice(0, 18) + '…')
  console.log('  even an empty folder folds: exists("empty-named-folder")=' + exists('empty-named-folder') + ' · uuid ' + uuidOfName('empty-named-folder').slice(0, 8) + '…')
  console.log('  name ≡ path: samePath("a","a")=' + samePath('a', 'a') + ' · samePath("a","b")=' + samePath('a', 'b'))
}
