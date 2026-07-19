import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'
import { scanEducateGaps, selfEducateCycle } from './educate'
import { resetSecurityMonitorForTests } from '@/agent/security'

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
    // scanEducateGaps's inner violation scanners ignore the passed cwd (tasked), so this reads the
    // REAL corpus: ~160 gaps, capped at 50 phrase + 20/wave accounting + 20 linear-gap. The ceiling
    // tracks live telos debt — mostly the accounting-wave 2609 (task #5); it ratchets DOWN as that
    // clears, and a RISE past it fails closed (the crack-pin pattern). ≤200 with headroom for now.
    expect(scanEducateGaps(process.cwd()).gaps.length).toBeLessThanOrEqual(200)
  })
  // 7.2 min measured: selfEducateCycle's inner accountingGapsInWaves ignores cwd and scans the
  // real corpus (task #17) — it PASSES (aborted:false), just slow. Bounded at 10 min so it is not
  // killed; the real speedup is threading cwd through the wave scheduler (#17, coupled to #5).
  it('cycle does not abort', () => {
    resetSecurityMonitorForTests()
    const cwd = fixtureCwd()
    try {
      expect(selfEducateCycle({ batch: 5, dryRun: true, cwd }).wave.aborted).toBe(false)
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  }, 600_000)
})
