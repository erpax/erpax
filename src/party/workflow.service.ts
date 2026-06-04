/**
 * Generic status workflow — directed-graph transition validator.
 *
 * Used by both `BillStatusWorkflow` (payables) and `InvoiceStatusWorkflow`
 * (receivables). Both walk the same graph; only the state set differs.
 *
 * @audit ISO-19011:2018 audit-trail state-transitions
 * @security ISO-27002 §5.4 segregation-of-duties
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §5
 */

import { TransitionTable } from '@/types/parties'

/**
 * Returns true iff `from -> to` is a legal transition under `table`.
 * Self-transitions are allowed only if explicitly listed.
 */
export function canTransition<S extends string>(
  table: TransitionTable<S>,
  from: S,
  to: S,
): boolean {
  return table[from]?.includes(to) ?? false
}

/**
 * Apply a transition or throw with a clear error.
 */
export function transitionOrThrow<S extends string>(
  table: TransitionTable<S>,
  from: S,
  to: S,
  label = 'document',
): S {
  if (!canTransition(table, from, to)) {
    const allowed = (table[from] ?? []).join(', ') || '(none — terminal state)'
    throw new Error(
      `Invalid ${label} status transition: ${from} → ${to}. Allowed from "${from}": ${allowed}`,
    )
  }
  return to
}

/** All states reachable from a starting state in `table` (BFS). */
export function reachableStates<S extends string>(
  table: TransitionTable<S>,
  from: S,
): Set<S> {
  const seen = new Set<S>([from])
  const queue: S[] = [from]
  while (queue.length) {
    const next = queue.shift()!
    for (const target of table[next] ?? []) {
      if (!seen.has(target)) {
        seen.add(target)
        queue.push(target)
      }
    }
  }
  return seen
}

/** Terminal states (no outgoing transitions). */
export function terminalStates<S extends string>(table: TransitionTable<S>): S[] {
  return (Object.entries(table) as Array<[S, readonly S[]]>)
    .filter(([_, outgoing]) => outgoing.length === 0)
    .map(([state]) => state)
}
