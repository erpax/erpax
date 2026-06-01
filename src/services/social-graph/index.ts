/**
 * social-graph — reciprocity logic for the universal `connections` edge.
 *
 * Real behaviour, not a comment: two directed edges between the same pair in
 * opposite directions are reciprocal; a mutual `follow` resolves to a `friend`
 * relation (the ActivityStreams Follow→Accept→friendship pattern). Pure (no
 * I/O) so it is testable; a `connections` afterChange hook consumes it to set
 * `reciprocal` and, for mutual follows, upgrade the context.
 *
 * @standard W3C ActivityStreams 2.0 Follow/Accept reciprocity
 */

export interface Edge {
  from: string | number
  to: string | number
  context: string
}

const key = (v: string | number | { id?: string | number }): string =>
  String(typeof v === 'object' && v !== null ? v.id : v)

/** Two edges form a reciprocal pair: opposite directions, same pair, same context. */
export function isReciprocal(a: Edge, b: Edge): boolean {
  return (
    key(a.from) === key(b.to) &&
    key(a.to) === key(b.from) &&
    key(a.from) !== key(a.to) &&
    a.context === b.context
  )
}

/** Contexts that, when mutual, upgrade to a symmetric relation. */
const MUTUAL_UPGRADE: Record<string, string> = { follow: 'friend', connect: 'friend' }

/**
 * Given an edge and the set of edges pointing back at its `from`, derive
 * whether it is reciprocal and the resolved (possibly upgraded) context.
 */
export function resolveReciprocity(edge: Edge, candidates: Edge[]): { reciprocal: boolean; context: string } {
  const back = candidates.some((c) => isReciprocal(edge, c))
  if (back && MUTUAL_UPGRADE[edge.context]) {
    return { reciprocal: true, context: MUTUAL_UPGRADE[edge.context] }
  }
  return { reciprocal: back, context: edge.context }
}
