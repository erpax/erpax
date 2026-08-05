import { messageUuid } from '../merkle'

/**
 * ASK: of the candidate questions, the next whose answer would be NOVEL to the thread —
 * the first not yet covered. Returns undefined when the thread already covers every
 * candidate (nothing left to improve over this space).
 */
export const nextAsk = (messageUuids: readonly string[], candidates: readonly string[]): string | undefined =>
  candidates.find((q) => !messageUuids.includes(messageUuid(q)))

/** Coverage of a candidate space: the fraction of candidate questions the thread has answered. */
export const coverage = (messageUuids: readonly string[], candidates: readonly string[]): number =>
  candidates.length === 0 ? 1 : candidates.filter((q) => messageUuids.includes(messageUuid(q))).length / candidates.length
