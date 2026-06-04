/**
 * Architecture invariants — single canonical gate (RUNNABLE — no Payload boot).
 *
 * "ERPax is compatible with all standards and its agnostic architecture is stable
 *  in expansion and compression. Fallbacks make all work seamlessly preserving
 *  integrity with zero extra entropy."
 *
 * 5 axes, each with one or more concrete checks (see
 * `src/architecture/invariant/checks.ts`):
 *
 *   1. **standards**   — every collection / chain cites a published standard
 *   2. **expansion**   — barrel ↔ plugin symmetric; feature gates real; chain
 *                        steps reference real collections; `requires` have a producer
 *   3. **compression** — free tier non-empty; tier ladder inclusive; core chains free
 *   4. **fallback**    — AI binding returns `{ ok:false }` when missing; notification
 *                        fan-out reports per-channel result
 *   5. **entropy**     — no duplicate slugs / dbNames / chain ids; feature key ==
 *                        feature.id; no inline taxonomy literals; the dissolved-tree
 *                        law (locality, singular-model/plural-collection, ≥2-cross balance)
 *
 * WHY NO BOOT (the fix): the suite used to `getPayload({ config })` in a beforeAll.
 * That loads the full 520-collection config + the D1 adapter into a vitest worker
 * fork, which OOM-crashed the worker after ~85 min (`Worker exited unexpectedly`),
 * so the suite never completed and the pre-push gate had to be bypassed with
 * --no-verify. The architecture invariants are STATIC (filesystem walk + regex) and
 * run STRICT without Payload. The payload-dependent checks self-skip to a `warn`
 * when no `ctx.payload` is supplied (and the suite asserts only `fails` is empty —
 * warns are allowed), so removing the boot loses no real coverage; it never ran.
 *
 * The pure DEGRADATION checks (axis 4) DO keep real coverage — they need no DB, only
 * that the AI/notification chokepoints return an envelope instead of throwing — so
 * they run here against a minimal stub. The LIVE-DATA sampling checks
 * (audit-chain-integrity, dangling-refs, uuid-lock sampling) genuinely need a seeded
 * Payload and belong in an integration run; here they honestly `warn` (skipped).
 */

import { describe, it, expect } from 'vitest'
import type { Payload } from 'payload'
import { runAllInvariants, formatInvariantResult } from '@/architecture/invariant'
import {
  checkAiFallbackReturnsError,
  checkNotificationFallback,
} from '@/architecture/invariant/checks'

// A minimal stub — enough for the pure degradation checks (a MISSING AI binding,
// a notification with NO target). It is NOT a database: `create` returns a fake
// doc so `sendNotification` can log, `find` returns empty. The live-data sampling
// checks are not exercised by this stub (they self-skip without a real Payload).
const stubPayload = {
  create: async () => ({ id: 'invariant-stub' }),
  find: async () => ({ docs: [], totalDocs: 0 }),
  logger: { info: () => {}, warn: () => {}, error: () => {}, debug: () => {} },
} as unknown as Payload

// `skipRuntime` excludes the handler-invoking checks (Law 41 MCP self-test, Law 53
// self-closure) — they exercise the live system, are slow / can hang a worker, and
// run in the integration suite. The STATIC architecture invariants run strict here.
const TIMEOUT = 90_000

describe('Architecture invariants — ERPax all-axes gate (static, no boot)', () => {
  // ONE comprehensive run — the per-axis breakdown is reported in the failure
  // message (formatInvariantResult names the axis · check · offenders), so separate
  // per-axis `it`s would only re-run the (slow) static walks redundantly.
  it('runs all 5 axes with zero failures (warns are allowed)', async () => {
    const suite = await runAllInvariants({ skipRuntime: true })
    if (suite.fails.length > 0) {
      console.error('\n' + formatInvariantResult(suite))
    }
    expect(suite.fails).toEqual([])
    expect(suite.totalChecks).toBeGreaterThanOrEqual(15)
  }, TIMEOUT)
})

describe('axis 4 — fallback: graceful degradation (stubbed, no boot)', () => {
  it('the AI chokepoint returns a typed error envelope when the binding is missing', async () => {
    const r = await checkAiFallbackReturnsError({ payload: stubPayload })
    expect(r.severity).toBe('pass')
  })

  it('notification fan-out reports per-channel deliveries when targets are missing', async () => {
    const r = await checkNotificationFallback({ payload: stubPayload })
    expect(r.severity).toBe('pass')
  })
})
