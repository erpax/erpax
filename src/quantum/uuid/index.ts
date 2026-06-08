/**
 * quantum/uuid — the collapse that is the address.
 *
 * A content-uuid is sha-256 measuring content into one 128-bit point — allocation
 * and naming are the same act. Same content ⇒ same uuid (deterministic, observer-
 * independent); no-cloning holds on the live matrix. The Merkle fold is the corpus-
 * wide collapse to one eigenstate.
 *
 *   tsx src/quantum/uuid/index.ts "hello"
 *
 * @standard RFC 9562 §5.8 content-uuid
 * @audit collapse + no-cloning computed on live matrix; never hand-asserted
 * @see ../../uuid/matrix — ../index.ts — ./SKILL.md
 */
import { toUuid } from '@/uuid/matrix'
import { noCloning, collapse as merkleCollapse } from '@/quantum'

/** Collapse content bytes to a 128-bit content-uuid (allocation = measurement). */
export const collapseToUuid = (content: string | Buffer): string =>
  toUuid(typeof content === 'string' ? Buffer.from(content, 'utf8') : content)

/** Observer-independent: identical content always measures to the same point. */
export const collapseDeterministic = (a: string, b: string): boolean =>
  collapseToUuid(a) === collapseToUuid(b) && collapseToUuid(a) !== collapseToUuid(b + '\0')

/** No-cloning on the live matrix — every atom occupies a unique eigenstate. */
export const noCloningHolds = (): boolean => noCloning().holds

/** Corpus-wide Merkle collapse is intact (one eigenstate). */
export const merkleCollapseHolds = (): boolean => merkleCollapse()

if (import.meta.url === `file://${process.argv[1]}`) {
  const sample = process.argv[2] ?? 'erpax'
  const id = collapseToUuid(sample)
  console.log(`quantum/uuid — collapse "${sample}"`)
  console.log(`  uuid: ${id}`)
  console.log(`  deterministic: ${collapseDeterministic(sample, sample)}`)
  console.log(`  no-cloning: ${noCloningHolds()}  merkle: ${merkleCollapseHolds()}`)
}
