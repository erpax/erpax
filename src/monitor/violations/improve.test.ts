/**
 * monitor/violations/improve — classify · prioritize · improve cycle (dry-run).
 */
import { describe, it, expect, beforeEach } from 'vitest'
import {
  improveInRealtime,
  prioritizeViolations,
  resetImproveReceiptChain,
  violationImproveClass,
  type ViolationEvent,
} from './improve'
import { violationEventId, resetViolationScanCache, scanViolationsRealtime } from './index'
import { runRealtimeImproveCycle, RealtimeImproveLoop } from './loop'
import {
  __resetDirectionBusForTests,
  improveDirectionPath,
  interruptTokenFor,
  publishDirection,
} from '@/quantum/entanglement/direction-bus'

const TS = '2026-06-08T12:00:00.000Z'

const mockViolation = (
  source: ViolationEvent['source'],
  atomPath: string,
  detail: string,
  extra: Partial<ViolationEvent> = {},
): ViolationEvent => ({
  id: violationEventId(source, atomPath, detail),
  source,
  atomPath,
  accountCode: atomPath,
  detail,
  severity: 'warning',
  scannedAt: TS,
  ...extra,
})

describe('monitor/violations/improve — violationImproveClass', () => {
  it('auto-fixes gap-eb and path-follow', () => {
    expect(violationImproveClass(mockViolation('gap-eb', 'seal', 'net 2 eb', { eb: 2 }))).toBe('auto')
    expect(violationImproveClass(mockViolation('path-follow', 'law/folder', 'missing'))).toBe('auto')
    expect(violationImproveClass(mockViolation('diamond-stray', 'card', 'foo.txt'))).toBe('auto')
  })

  it('human-gates tenant/invoices and structural rules', () => {
    expect(violationImproveClass(mockViolation('entanglement', 'tenants', 'slug unhooked'))).toBe(
      'human-gate',
    )
    expect(violationImproveClass(mockViolation('entanglement', 'invoices', 'number'))).toBe('human-gate')
    expect(violationImproveClass(mockViolation('rules-stray-ts', 'foo', 'bar.ts'))).toBe('human-gate')
    expect(violationImproveClass(mockViolation('import-boundary', 'agent', 'deep import'))).toBe(
      'human-gate',
    )
    expect(violationImproveClass(mockViolation('folder-law', 'bad/name', 'one-word'))).toBe('human-gate')
  })

  it('auto-fixes trinity.proof missing; gates code/form', () => {
    expect(
      violationImproveClass(
        mockViolation('finished-idea-cross', 'quantum/log', 'trinity.proof missing (test.ts)'),
      ),
    ).toBe('auto')
    expect(
      violationImproveClass(
        mockViolation('finished-idea-cross', 'x', 'trinity.code missing (index.ts)'),
      ),
    ).toBe('human-gate')
  })

  it('auto-fixes matrix reciprocity entanglement', () => {
    expect(
      violationImproveClass(
        mockViolation('entanglement', 'matrix', 'matrix reciprocity 99.0% · no-cloning=true'),
      ),
    ).toBe('auto')
  })
})

describe('monitor/violations/improve — prioritizeViolations', () => {
  it('sorts errors before warnings and auto before gated', () => {
    const events = [
      mockViolation('rules-stray-ts', 'a', 'stray', { severity: 'warning' }),
      mockViolation('path-follow', 'b', 'missing', { severity: 'error' }),
      mockViolation('entanglement', 'tenants', 'gated', { severity: 'warning' }),
      mockViolation('gap-eb', 'c', 'eb', { severity: 'warning', eb: 1 }),
    ]
    const sorted = prioritizeViolations(events)
    expect(sorted[0]!.source).toBe('path-follow')
    expect(sorted[1]!.source).toBe('gap-eb')
  })
})

describe('monitor/violations/improve — improveInRealtime dry-run', () => {
  beforeEach(() => {
    resetImproveReceiptChain()
    resetViolationScanCache()
  })

  it('dry-run applies without fs writes — seal credit eb journal', () => {
    const v = mockViolation('gap-eb', 'seal', 'net 1.5 eb', { eb: 1.5 })
    const r = improveInRealtime(v, { dryRun: true, at: TS })
    expect(r.applied).toBe(true)
    expect(r.sealCreditEb).toBe(1.5)
    expect(r.action).toBe('seal-credit-eb')
    expect(r.gated).toBe(false)
  })

  it('queues human-gate violations with escalate receipt', () => {
    const v = mockViolation('entanglement', 'invoices', 'seller/buyer')
    const r = improveInRealtime(v, { dryRun: true, at: TS })
    expect(r.gated).toBe(true)
    expect(r.action).toBe('queued-human')
    expect(r.receipt?.seq).toBe(0)
  })
})

describe('monitor/violations/loop — RealtimeImproveLoop', () => {
  beforeEach(() => {
    resetImproveReceiptChain()
    resetViolationScanCache()
  })

  it('runRealtimeImproveCycle returns toast + applied/queued partitions', () => {
    const cycle = runRealtimeImproveCycle({ dryRun: true, maxFixes: 2, emitWave: false })
    expect(cycle.snapshot.fingerprint).toMatch(/^[0-9a-f-]{36}$/)
    expect(cycle.prioritized.length).toBeGreaterThanOrEqual(0)
    expect(cycle.toast.title).toBeTruthy()
    expect(typeof cycle.queued).toBe('object')
    expect(cycle.workTamper.workSealed).toBeGreaterThanOrEqual(0)
  })

  it('reuses passed snapshot without rescanning', () => {
    const snap = scanViolationsRealtime({ waveSample: false, maxEvents: 10 })
    const cycle = runRealtimeImproveCycle({ dryRun: true, snapshot: snap, emitWave: false })
    expect(cycle.snapshot).toBe(snap)
  })

  it('RealtimeImproveLoop is an alias for runRealtimeImproveCycle', () => {
    expect(RealtimeImproveLoop).toBe(runRealtimeImproveCycle)
  })

  it('aborts mid-cycle when direction collapses before next violation fix', () => {
    __resetDirectionBusForTests()
    const path = improveDirectionPath()
    const token = interruptTokenFor(path, 'worker-test')
    const violations = [
      mockViolation('gap-eb', 'seal', 'net 1 eb', { eb: 1 }),
      mockViolation('gap-eb', 'path', 'net 2 eb', { eb: 2 }),
      mockViolation('gap-eb', 'wave', 'net 3 eb', { eb: 3 }),
    ]
    publishDirection(path, { instruction: 'audit cross-concept instead', issuer: 'coordinator' })
    const cycle = runRealtimeImproveCycle({
      dryRun: true,
      maxFixes: 10,
      emitWave: false,
      violations,
      directionToken: token,
      snapshot: {
        ok: true,
        scannedAt: TS,
        fingerprint: '0896eab2-0000-4000-8000-000000000001',
        events: violations,
        counts: { total: 3, bySource: { 'gap-eb': 3 } },
        waveOrdinal: 1,
        wavePathsSampled: 0,
      },
    })
    expect(cycle.redirected).toBe(true)
    expect(cycle.direction?.payload.instruction).toBe('audit cross-concept instead')
    expect(cycle.applied.filter((r) => r.applied)).toHaveLength(0)
  })
})
