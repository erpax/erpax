/**
 * quantum/communication — communication on the quantum level: a [[message]] is a content-uuid, so
 * it obeys NO-CLONING (each meaning has one uuid — a forged message has a different uuid, never the
 * same identity) and the channel is ENTANGLEMENT (sender and receiver share the binding). A received
 * message is INTACT iff its content-uuid matches the original — tamper-evidence by architecture.
 * Merges into [[communication]]. Composes [[entanglement]] · [[quantum]] · [[uuid]].
 *
 *   tsx src/quantum/communication/index.ts
 *
 * @standard no-cloning (Wootters–Zurek 1982); RFC 9562 §5.8 content-uuid
 * @see ../../communication -- ../../entanglement -- ./SKILL.md
 */
import { sameMessage, type Communication } from '@/communication'
import { noCloning } from '@/entanglement'

/** A received message is intact iff its content-uuid matches the original (no-cloning of meaning). */
export const intact = (original: Communication, received: Communication): boolean => sameMessage(original, received)

/** No-cloning holds on the matrix: every content-uuid is unique, so a forged message cannot share an identity. */
export const noCloningHolds = (): boolean => noCloning()

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('quantum/communication — no-cloning holds=' + noCloningHolds())
}
