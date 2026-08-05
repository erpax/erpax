import { messageUuid, threadUuid, isNovel } from '../merkle'

/**
 * IMPROVE: fold a message into the thread. `improved` is true iff it was novel — the
 * distinct coverage grew. A duplicate answer re-folds the chain (history still moves)
 * but does not improve coverage.
 */
export const improve = (
  messageUuids: readonly string[],
  message: string,
): { readonly thread: string; readonly messageUuids: readonly string[]; readonly improved: boolean } => {
  const improved = isNovel(messageUuids, message)
  const next = [...messageUuids, messageUuid(message)]
  return { thread: threadUuid(next), messageUuids: next, improved }
}

export interface ChatSession {
  readonly topic: string
  readonly messageUuids: readonly string[]
  /** current tamper-evident thread-uuid — the session's record of every folded change. */
  readonly thread: string
  readonly sealed: boolean
}

/** Open a session on a topic — the seed folds the topic (deterministic). */
export const startSession = (topic: string): ChatSession => {
  const seed = [messageUuid(`session:${topic}`)]
  return { topic, messageUuids: seed, thread: threadUuid(seed), sealed: false }
}

/** Fold a message (an improvement, a tool result) into the session. */
export const sessionAppend = (s: ChatSession, message: string): ChatSession => {
  const r = improve(s.messageUuids, message)
  return { ...s, messageUuids: r.messageUuids, thread: r.thread }
}

/** Seal the session — its thread-uuid is the tamper-evident record persisted to Payload. */
export const sealSession = (s: ChatSession): ChatSession => ({ ...s, sealed: true })
