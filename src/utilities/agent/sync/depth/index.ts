/**
 * agent/sync/depth — the cascade guard, and the reason it lives alone.
 *
 * `MAX_BROADCAST_DEPTH` is a bare integer with no dependencies, and it used to sit in
 * `chat-broadcast.ts` — a file deep inside the corpus's largest import tangle, importing
 * `@/ai/industry`, `@/agent`, `../effect-processor`, `../context` and `./payload-chat`. Any atom that
 * wanted the number inherited that whole subtree: [[team]]/comms took exactly one symbol from
 * `@/agent/sync` and paid for the entire barrel ([[rules]]/cycle).
 *
 * A constant with no dependencies belongs in a module with no dependencies. This file imports
 * nothing, so importing it adds no edge — that is the whole content of the atom, and it is why the
 * 178-file component splits when the consumer points here instead.
 *
 * `chat-broadcast.ts` re-exports it, so the public surface is unchanged.
 *
 * @law a constant that depends on nothing must be reachable without depending on anything
 * @invariant this module has zero imports — the property that makes it a valid cut point
 * @invariant the guard is a positive integer; a zero or negative bound would disable the check
 * @see ./SKILL.md -- ../chat-broadcast.ts
 */

/** Past this many cascade hops the broadcast stops re-dispatching — the runaway guard. */
export const MAX_BROADCAST_DEPTH = 32

/** Does this hop count still permit a re-dispatch? The comparison the guard actually makes. */
export function withinBroadcastDepth(depth: number): boolean {
  return Number.isInteger(depth) && depth >= 0 && depth < MAX_BROADCAST_DEPTH
}

/** @index-cross.foldback child=agent/sync/depth parent=agent/sync — this cross folds back into its parent. */
