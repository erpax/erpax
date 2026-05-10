/**
 * Architecture invariants — single canonical gate.
 *
 * Slice LLLL (2026-05-10): the test the maintainer asked for —
 *   "ERPax is compatible with all standards and its agnostic
 *    architecture is stable in expansion and compression. Fallbacks
 *    make all work seamlessly preserving integrity with zero extra
 *    entropy."
 *
 * 5 axes, each with one or more concrete checks (see
 * `src/services/architecture-invariants/checks.ts`):
 *
 *   1. **standards**   — every collection / chain cites a published standard
 *   2. **expansion**   — barrel ↔ plugin symmetric; feature gates real;
 *                        chain steps reference real collections; chain
 *                        `requires` always have a producer
 *   3. **compression** — free tier non-empty; tier ladder inclusive;
 *                        core chains runnable on free
 *   4. **fallback**    — AI binding returns `{ ok:false }` when missing;
 *                        notification fan-out reports per-channel result
 *   5. **entropy**     — no duplicate slugs / dbNames / chain ids;
 *                        feature key == feature.id; no inline taxonomy
 *                        literals (must pull from src/standards/<id>/)
 *
 * Static checks run without Payload (file walk + regex). Runtime checks
 * (axis 4) need a live Payload — wrapped in a beforeAll.
 */

import { describe, it, expect, beforeAll } from 'vitest'
import type { Payload } from 'payload'
import { getPayload } from 'payload'
import config from '@payload-config'
import {
  runAllInvariants,
  formatInvariantResult,
  type InvariantContext,
} from '@/services/architecture-invariants'

describe('Architecture invariants — ERPax all-axes gate', () => {
  let payload: Payload | undefined
  const ctx: InvariantContext = {}

  beforeAll(async () => {
    try {
      payload = await getPayload({ config })
      ;(ctx as { payload?: Payload }).payload = payload
    } catch {
      // payload optional — static axes still run
    }
  }, 60_000)

  it('runs all 5 axes with zero failures (warns are allowed)', async () => {
    const suite = await runAllInvariants(ctx)
    if (suite.fails.length > 0) {
      console.error('\n' + formatInvariantResult(suite))
    }
    expect(suite.fails).toEqual([])
    expect(suite.totalChecks).toBeGreaterThanOrEqual(15)
  }, 60_000)

  it('axis 1 — standards: every collection + chain cites a published standard', async () => {
    const suite = await runAllInvariants({ ...ctx, skipAxes: ['expansion', 'compression', 'fallback', 'entropy'] })
    expect(suite.fails).toEqual([])
  }, 30_000)

  it('axis 2 — expansion: adding a tenant / feature / collection / chain holds invariants', async () => {
    const suite = await runAllInvariants({ ...ctx, skipAxes: ['standards', 'compression', 'fallback', 'entropy'] })
    expect(suite.fails).toEqual([])
  }, 30_000)

  it('axis 3 — compression: free tier is real, tier ladder is inclusive', async () => {
    const suite = await runAllInvariants({ ...ctx, skipAxes: ['standards', 'expansion', 'fallback', 'entropy'] })
    expect(suite.fails).toEqual([])
  }, 30_000)

  it('axis 4 — fallback: AI + notifications degrade gracefully (return error, not throw)', async () => {
    const suite = await runAllInvariants({ ...ctx, skipAxes: ['standards', 'expansion', 'compression', 'entropy'] })
    expect(suite.fails).toEqual([])
  }, 60_000)

  it('axis 5 — entropy: no duplicates, no inline reinventions of canonical helpers', async () => {
    const suite = await runAllInvariants({ ...ctx, skipAxes: ['standards', 'expansion', 'compression', 'fallback'] })
    expect(suite.fails).toEqual([])
  }, 30_000)
})
