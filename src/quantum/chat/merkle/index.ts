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

/** @index-cross.foldback child=quantum/chat/merkle parent=quantum/chat — this cross folds back into its parent. */
