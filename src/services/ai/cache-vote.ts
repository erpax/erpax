/**
 * cache-vote — respond from the AI cache FIRST, ranked by rating/voting.
 *
 * `callWorkersAi` (cloudflare-ai.ts) already caches by a content-derived key
 * (`deriveAiCacheKey` — the query's content-uuid: same tenant·feature·model·inputs ⇒
 * same address ⇒ a hit, zero AI cost). This adds the missing half — "based on rating
 * and voting": when a query accrues MULTIPLE candidate answers (non-deterministic
 * models, repeated runs, competing agents), the cache is a VOTED-answer store, and the
 * highest-voted candidate is served. A confirmed answer is never recomputed; consensus,
 * not last-write, decides. Same answer ⇒ one slot, votes accrue (the merge law) — no
 * ballot-stuffing of identical outputs.
 *
 * Pure: no IO. The candidate set is loaded from / saved to the `AI_CACHE` KV by the
 * caller; this module only decides the winner and folds in a new vote.
 *
 * @standard ISO/IEC 25010 §5.5 testability (pure, deterministic)
 */

export interface CachedCandidate<T> {
  /** the cached answer. */
  readonly output: T
  /** votes/confirmations for this answer (the rating signal — peers/agents that confirmed it). */
  readonly votes: number
  /** model confidence in [0,1] (tiebreaker when votes tie). */
  readonly confidence?: number
}

/**
 * The cache-first verdict: pick the best cached answer — most votes, then highest
 * confidence, then first-seen (stable). Returns null when the set is empty (a true
 * cache miss ⇒ the caller runs inference).
 */
export function selectBestCandidate<T>(candidates: readonly CachedCandidate<T>[]): CachedCandidate<T> | null {
  if (candidates.length === 0) return null
  return candidates.reduce((best, c) => {
    if (c.votes !== best.votes) return c.votes > best.votes ? c : best
    return (c.confidence ?? 0) > (best.confidence ?? 0) ? c : best
  })
}

/**
 * Fold a (new or repeat) answer into the candidate set: an identical answer (by
 * `keyOf`) accrues one vote and lifts its confidence; a novel answer joins with one
 * vote. The merge law — same content ⇒ one slot. Returns a new array (pure).
 */
export function voteFor<T>(
  candidates: readonly CachedCandidate<T>[],
  output: T,
  keyOf: (o: T) => string,
  confidence?: number,
): CachedCandidate<T>[] {
  const k = keyOf(output)
  let found = false
  const next = candidates.map((c) => {
    if (keyOf(c.output) !== k) return c
    found = true
    return { output: c.output, votes: c.votes + 1, confidence: Math.max(c.confidence ?? 0, confidence ?? 0) || undefined }
  })
  if (!found) next.push({ output, votes: 1, confidence })
  return next
}
