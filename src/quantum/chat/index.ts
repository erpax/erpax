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

/** A message's content-uuid — the leaf the thread folds. */
export const messageUuid = (message: string): string => toUuid(Buffer.from(message, 'utf8'))

/** NOVEL iff its content-uuid is not already a leaf of the thread (a real new answer, not a repeat). */
export const isNovel = (messageUuids: readonly string[], message: string): boolean =>
  !messageUuids.includes(messageUuid(message))

/**
 * ASK: of the candidate questions, the next whose answer would be NOVEL to the thread —
 * the first not yet covered. Returns undefined when the thread already covers every
 * candidate (nothing left to improve over this space). The chat that greets a visitor
 * and chats to infinity always has a next uncovered thing to ask, until coverage = 1.
 *
 * HONEST BOUNDARY: this SELECTS the next uncovered question from a given set; it does
 * not GENERATE questions (no LLM in the fold). The intelligence is which-is-novel.
 */
export const nextAsk = (messageUuids: readonly string[], candidates: readonly string[]): string | undefined =>
  candidates.find((q) => isNovel(messageUuids, q))

/**
 * IMPROVE: fold a message into the thread. `improved` is true iff it was novel — the
 * distinct coverage grew. A duplicate answer re-folds the chain (history still moves)
 * but does not improve coverage.
 *
 * HONEST BOUNDARY: improvement = coverage grew, NOT answer correctness — a novel but
 * wrong answer still counts as covered; quality is a separate judgement.
 */
export const improve = (
  messageUuids: readonly string[],
  message: string,
): { readonly thread: string; readonly messageUuids: readonly string[]; readonly improved: boolean } => {
  const improved = isNovel(messageUuids, message)
  const next = [...messageUuids, messageUuid(message)]
  return { thread: threadUuid(next), messageUuids: next, improved }
}

/** Coverage of a candidate space: the fraction of candidate questions the thread has answered. */
export const coverage = (messageUuids: readonly string[], candidates: readonly string[]): number =>
  candidates.length === 0 ? 1 : candidates.filter((q) => messageUuids.includes(messageUuid(q))).length / candidates.length

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('quantum/chat — thread = merkle chain of message-uuids:')
  console.log('  thread([a,b]) = ' + threadUuid(['a', 'b']).slice(0, 8) + '… · appended changes it = ' + appended(['a', 'b'], 'c'))
}
