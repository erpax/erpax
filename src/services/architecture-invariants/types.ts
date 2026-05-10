/**
 * Architecture invariants — contract types.
 *
 * Slice LLLL (2026-05-10): a single canonical gate that asserts ERPax
 * honors its own contracts across 5 axes. Reusable from:
 *
 *   - the vitest suite (`tests/architecture/invariants.spec.ts`)
 *   - `payload.onInit` for production startup verification
 *   - the maintainer's pre-push gate
 *
 * The 5 axes mirror the maintainer's Socratic test:
 *   - **standards**   — every claim ERPax makes traces back to a
 *                       published standard (Q5: is it standard?)
 *   - **expansion**   — adding a tenant / feature / collection / chain
 *                       does NOT break any invariant (architecture
 *                       supports growth without entropy)
 *   - **compression** — removing a feature / collection / chain still
 *                       leaves a usable subset (free tier is a real
 *                       superset of zero, enterprise is a real superset
 *                       of business, etc.)
 *   - **fallback**    — every external dependency (AI binding, country
 *                       API, browser rendering) has a graceful failure
 *                       mode that returns a typed error, never throws
 *   - **entropy**     — no duplicates / inconsistencies / inline
 *                       reinventions of canonical helpers
 *
 * @standard ISO/IEC 25010:2023 functional-suitability + reliability
 * @audit ISO-19011:2018 §6.4 audit-evidence
 * @compliance SOX §404 internal-controls invariants
 */

export type InvariantAxis =
  | 'standards'
  | 'expansion'
  | 'compression'
  | 'fallback'
  | 'entropy'

export type InvariantSeverity = 'fail' | 'warn' | 'pass'

export interface InvariantResult {
  /** Which of the 5 axes the check belongs to. */
  readonly axis: InvariantAxis
  /** Stable check id (kebab-case). */
  readonly check: string
  /** Pass / fail / warn. `warn` is recorded but does NOT break CI. */
  readonly severity: InvariantSeverity
  /** Human-readable reason (always present for fail / warn). */
  readonly reason?: string
  /** Optional list of files / slugs / ids that triggered the result. */
  readonly offenders?: ReadonlyArray<string>
  /** Optional metadata for downstream consumers. */
  readonly metadata?: Record<string, unknown>
}

/** Roll-up returned by `runAllInvariants()`. */
export interface InvariantSuiteResult {
  readonly totalChecks: number
  readonly fails: ReadonlyArray<InvariantResult>
  readonly warns: ReadonlyArray<InvariantResult>
  readonly passes: ReadonlyArray<InvariantResult>
}

/** Optional context — pass `payload` for the runtime checks. */
export interface InvariantContext {
  /** Payload instance — required for fallback + some entropy checks. */
  readonly payload?: import('payload').Payload
  /** Repo root (defaults to `process.cwd()`). */
  readonly repoRoot?: string
  /** Skip an axis entirely (for partial runs). */
  readonly skipAxes?: ReadonlyArray<InvariantAxis>
}
