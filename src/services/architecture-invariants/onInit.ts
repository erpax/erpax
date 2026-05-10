/**
 * Architecture-invariants — runtime gate (Slice MMMM, 2026-05-10).
 *
 * Bind `runInvariantsAtBoot()` to `payload.onInit` so every Worker /
 * Node boot runs the 5-axis architecture gate. Behaviour:
 *
 *   - **Default:** warn-only. Failing invariants are logged at `error`
 *     but boot proceeds. This protects existing deploys from a broken
 *     gate refusing service.
 *   - **`STRICT_INVARIANTS=1`:** fail-on-failure. Boot throws when any
 *     invariant in axes {standards, expansion, compression, entropy}
 *     fails. The `fallback` axis is always advisory (some bindings —
 *     AI, browser, mtls — are legitimately absent in dev / staging).
 *
 * Production deployment recommended: `STRICT_INVARIANTS=1` so a broken
 * invariant refuses to boot rather than silently ship a regression.
 *
 * @audit ISO-19011:2018 §6.4 audit-evidence-runtime-gate
 * @compliance SOX §404 internal-controls boot-time-verification
 * @standard ISO/IEC 25010:2023 reliability-fault-tolerance
 */

import type { Payload } from 'payload'
import { runAllInvariants, formatInvariantResult, type InvariantSuiteResult } from './index'

/**
 * Hook for `payload.onInit`. Returns the suite result so callers can
 * inspect or fail the boot when desired.
 */
export async function runInvariantsAtBoot(payload: Payload): Promise<InvariantSuiteResult> {
  // Skip the fallback axis at boot — it requires runtime conditions
  // (no AI binding, no notification target) that don't always hold
  // during normal startup. The vitest suite still runs all 5 axes.
  const suite = await runAllInvariants({ payload, skipAxes: ['fallback'] })

  const formatted = formatInvariantResult(suite)
  if (suite.fails.length === 0) {
    payload.logger.info({ msg: 'architecture-invariants:ok', summary: formatted })
  } else {
    payload.logger.error({ msg: 'architecture-invariants:fail', summary: formatted, fails: suite.fails })
  }

  // Strict mode — fail boot when any non-fallback axis has a failure.
  const strict =
    typeof process !== 'undefined' &&
    typeof process.env !== 'undefined' &&
    process.env.STRICT_INVARIANTS === '1'
  if (strict && suite.fails.length > 0) {
    throw new Error(
      `architecture-invariants: ${suite.fails.length} failure(s) under STRICT_INVARIANTS=1\n${formatted}`,
    )
  }

  return suite
}
