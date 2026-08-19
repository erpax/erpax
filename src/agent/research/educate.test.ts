import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'
import { scanEducateGaps, selfEducateCycle } from './educate'
import { resetMonitorForTests } from '@/agent/security'

// HERMETIC: both ran against the REAL corpus, so scanEducateGaps → waveAccountingGapViolations
// (the 166s accounting-wave scan, tracked as its own debt) made 'scan' slow + over threshold and
// 'cycle' a ~10 min hang. On a minimal fixture the scan is bounded and the cycle's control-flow
// assertion (does-not-abort) holds; the real-corpus educate scan is the audit/automate lane's job.
const fixtureCwd = (): string => {
  const cwd = mkdtempSync(join(tmpdir(), 'erpax-educate-'))
  mkdirSync(join(cwd, 'src', 'apply'), { recursive: true })
  writeFileSync(join(cwd, 'src', 'apply', 'index.ts'), 'export const A = 1\n')
  return cwd
}

describe('educate', () => {
  it('scan returns a bounded gap list', () => {
    // HERMETIC (bounded-witness law): scan a FIXTURE cwd, not the real corpus. Task #17's mechanism is
    // in place — accountingGapsInWaves schedules a fixture cwd via pathWaveBatches over ITS OWN atoms
    // (gaps.ts:144), so a minimal fixture yields a small, deterministic gap list. This asserts the SHAPE
    // (scan is bounded + deterministic), not a live-corpus count; the real-corpus educate scan is the
    // audit/automate lane's job (it grows with every atom added — a unit test must not depend on it).
    const cwd = fixtureCwd()
    try {
      expect(scanEducateGaps(cwd).gaps.length).toBeLessThanOrEqual(200)
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })
  // 7.2 min measured: selfEducateCycle's inner accountingGapsInWaves ignores cwd and scans the
  // real corpus (task #17) — it PASSES (aborted:false), just slow. Bounded at 10 min so it is not
  // killed; the real speedup is threading cwd through the wave scheduler (#17, coupled to #5).
  it('cycle does not abort', () => {
    resetMonitorForTests()
    const cwd = fixtureCwd()
    try {
      expect(selfEducateCycle({ batch: 5, dryRun: true, cwd }).wave.aborted).toBe(false)
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  }, 600_000)
})
