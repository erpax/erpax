/**
 * realtime — delivery of events as they arrive: an append-only log + a per-subscriber cursor.
 * `since(log, cursor)` is the live tail (everything after the cursor); `advance` moves a cursor
 * past what it has seen. This is the pull-side delivery semantics over a [[stream]] (the SSE
 * transport with its lamport/uuid-chain). Deterministic and pure. Composes [[stream]] · [[event]] · [[live]] · [[sequence]].
 *
 *   tsx src/realtime/index.ts
 *
 * @standard append-only log + cursor (the pull-based realtime model)
 * @see ../stream -- ../event -- ../live -- ./SKILL.md
 */

/** Append an event to the log (returns a new log — immutable). */
export const append = <T>(log: readonly T[], event: T): T[] => [...log, event]

/** The live tail: every event after the cursor. */
export const since = <T>(log: readonly T[], cursor: number): readonly T[] => log.slice(Math.max(0, cursor))

/** The cursor that has consumed the whole log so far. */
export const advance = (log: readonly unknown[]): number => log.length

if (import.meta.url === 'file://' + process.argv[1]) {
  let log: number[] = []
  log = append(append(log, 1), 2)
  const cur = advance(log)
  log = append(log, 3)
  console.log('realtime — tail since cursor=' + cur + ' → ' + JSON.stringify(since(log, cur)) + ' (just the new event)')
}
