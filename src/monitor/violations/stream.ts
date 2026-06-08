/**
 * monitor/violations/stream — append-only cross violation queue from strict-apply.
 *
 * Blocked dispatch/effect pushes here; scanViolationsRealtime drains for monitor pickup.
 */
import type { CrossDimension } from '@/seal'

export type CrossViolationOrigin = 'strict-apply' | 'scan'

/** Minimal streamed event — merged into ViolationEvent on drain. */
export interface StreamedCrossViolation {
  readonly id: string
  readonly atomPath: string
  readonly accountCode: string
  readonly detail: string
  readonly severity: 'info' | 'warning' | 'error'
  readonly scannedAt: string
  readonly crossDimension: CrossDimension
  readonly crossEducation: string
  readonly uncrossedAxes: readonly string[]
  readonly origin: CrossViolationOrigin
  readonly gate?: string
}

const pending: StreamedCrossViolation[] = []
const subscribers = new Set<(event: StreamedCrossViolation) => void>()

/** Subscribe to cross-violation pushes — handler runs in the publisher tick. */
export function subscribeCrossViolationStream(
  handler: (event: StreamedCrossViolation) => void,
): () => void {
  subscribers.add(handler)
  return () => {
    subscribers.delete(handler)
  }
}

/** Push one cross violation from strict-apply (or scan enrichment). */
export function pushCrossViolationToStream(event: StreamedCrossViolation): void {
  pending.push(event)
  for (const handler of subscribers) {
    handler(event)
  }
}

/** Drain queued cross violations — consumed once per monitor scan tick. */
export function drainCrossViolationStream(): readonly StreamedCrossViolation[] {
  const out = [...pending]
  pending.length = 0
  return out
}

/** Peek without draining (tests). */
export function peekCrossViolationStream(): readonly StreamedCrossViolation[] {
  return [...pending]
}

/** Reset stream (tests). */
export function resetCrossViolationStream(): void {
  pending.length = 0
  subscribers.clear()
}
