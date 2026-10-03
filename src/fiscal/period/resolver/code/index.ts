/**
 * fiscal/period/resolver/code — the two identifiers a resolved period carries.
 *
 * The regulatory code names the period the way the framework it reports under expects
 * (`P05_2026`, or `Q2_2026` under XBRL for a quarterly config). The chain leaf binds the period's
 * payload to the prior leaf — the fold's one algebra, `merge(a, b)` ([[merge]]). Both were private
 * statics of the resolver hub [[rules]]/concentration named; both are pure, so they live here.
 *
 * @standard SAF-T period coding
 * @standard XBRL period identifiers
 * @see ../index.ts · ./SKILL.md
 */
import { merge } from '@/merge'
import type { FiscalPeriodConfig } from '@/fiscal/period/resolver'

/** The period code the configured regulatory framework expects. */
export function regulatoryCode(config: FiscalPeriodConfig, fiscalYear: number, fiscalPeriod: number): string {
  const p = `P${String(fiscalPeriod).padStart(2, '0')}_${fiscalYear}`
  if (config.regulatoryFramework === 'xbrl' && config.periodType === 'quarterly') return `Q${fiscalPeriod}_${fiscalYear}`
  return p
}

/**
 * The chain leaf IS the fold — `merge(a,b) = toUuid(a ‖ b)`, the corpus's one algebra ([[merge]]).
 *
 * It was hand-rolled as `Buffer.from(payload + priorLeaf).toString('base64').substring(0, 32)`,
 * described as a "hash placeholder" and shipped into live audit paths. It was not a hash: base64 maps
 * 3 bytes to 4 chars, so 32 chars covered only the FIRST 24 BYTES — everything after the month was
 * invisible, two dates in one month produced the same leaf, the prior leaf was ignored entirely so the
 * chain never chained, and the leaf decoded back to plaintext. Tamper-cost zero under a tamper-detection
 * banner. The test holds each of those sentences as an assertion, so it cannot quietly read as true again.
 */
export function chainLeaf(payload: string, priorLeaf: string): string {
  return merge(payload, priorLeaf)
}
