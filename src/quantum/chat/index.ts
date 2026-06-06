/**
 * quantum/chat — a chat thread as a merkle chain: each message is a content-uuid, and the thread
 * folds its message-uuids into ONE chain-uuid (a tamper-evident history — change or reorder any
 * message and the thread-uuid changes). Merges into [[chat]]. Composes [[merge]] · [[uuid]] · [[quantum]].
 *
 *   tsx src/quantum/chat/index.ts
 *
 * @standard merkle hash-chain; RFC 9562 §5.8 content-uuid
 * @see ../../chat -- ../../uuid/matrix (merge) -- ../communication -- ./SKILL.md
 */
import { merge, toUuid } from '@/uuid/matrix'

const SEED = toUuid(Buffer.from('chat:thread', 'utf8'))

/** Fold a thread's message-uuids into one chain-uuid (merkle) — the tamper-evident history. */
export const threadUuid = (messageUuids: readonly string[]): string => messageUuids.reduce((acc, u) => merge(acc, u), SEED)

/** Appending a message changes the thread-uuid (the history cannot be silently rewritten). */
export const appended = (before: readonly string[], message: string): boolean => threadUuid([...before, message]) !== threadUuid(before)

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('quantum/chat — thread = merkle chain of message-uuids:')
  console.log('  thread([a,b]) = ' + threadUuid(['a', 'b']).slice(0, 8) + '… · appended changes it = ' + appended(['a', 'b'], 'c'))
}
