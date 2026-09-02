/**
 * monitor/violation — what ONE violation is: the singular model beside the plural store.
 *
 * `models(singular) ⊕ collections(plural)` is a conservation law ([[balance]]): a plural
 * atom with no singular model is a store with no type — you can hold the rows and never
 * say what a row IS. `monitor/violations` scans, counts and streams them; this says what
 * it found one OF.
 *
 * @see ./SKILL.md
 */
import type { ViolationEvent, ViolationSeverity, ViolationSource } from '@/monitor/violations'

/** info < warning < error — declared once, instead of re-derived at each comparison. */
export const SEVERITY_ORDER = [
  'info',
  'warning',
  'error',
] as const satisfies readonly ViolationSeverity[]

/** Rank a severity. An UNKNOWN one ranks lowest: a typo may not manufacture an error. */
export function severityRank(s: ViolationSeverity): number {
  const i = SEVERITY_ORDER.indexOf(s as (typeof SEVERITY_ORDER)[number])
  return i < 0 ? 0 : i
}

/** Does this violation clear `floor`? The question every filter was re-deriving. */
export function atLeast(v: ViolationEvent, floor: ViolationSeverity): boolean {
  return severityRank(v.severity) >= severityRank(floor)
}

/** One violation's identity: source ⊗ atom ⊗ detail — the same finding twice is one row. */
export function violationKey(v: Pick<ViolationEvent, 'source' | 'atomPath' | 'detail'>): string {
  return `${v.source} ${v.atomPath} ${v.detail}`
}

export type { ViolationEvent, ViolationSeverity, ViolationSource }
