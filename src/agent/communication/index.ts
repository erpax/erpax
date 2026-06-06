/**
 * agent/communication — agent-to-agent message transfer: a directed [[communication]] between two
 * agent ids, the message a content-uuid (no-cloning, tamper-evident — [[quantum]]/communication). A
 * relayed message keeps its uuid (the content is preserved, never cloned). Merges into [[communication]].
 * Composes [[agent]] · [[communication]] · [[message]].
 *
 *   tsx src/agent/communication/index.ts
 *
 * @see ../../agent -- ../../communication -- ../chat -- ./SKILL.md
 */
import { communicate, sameMessage, type Communication } from '@/communication'

/** A directed agent-to-agent message (content-uuid). */
export const send = (from: string, to: string, contentUuid: string): Communication => communicate(from, to, contentUuid)

/** Relay a message to a new recipient, preserving its content-uuid (no-cloning of the content). */
export const relay = (m: Communication, to: string): Communication => communicate(m.to, to, m.uuid)

/** Two transfers carry the same message iff their content-uuids match. */
export { sameMessage }

if (import.meta.url === 'file://' + process.argv[1]) {
  const m = send('a', 'b', 'u1')
  console.log('agent/communication — relay preserves the uuid: ' + sameMessage(m, relay(m, 'c')))
}
