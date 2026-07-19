import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import {
  selfImproveCycle,
  measureIntelligenceAxes,
  quantumIntelligenceOf,
  rankGapsByEntanglement,
  learnSciencesOnTheWay,
  __resetIntelligenceReceiptHeadForTests,
} from './index'
import { linearGaps } from '@/quantum'
import { resetSecurityMonitorForTests } from '@/agent/security'
import { __resetWaveRunnerForTests } from '@/apply/wave'

vi.mock('@/payload/approval', () => ({
  payloadApprovalGate: () => ({ approved: true, step: 'skipped' as const }),
}))

describe('agent/intelligence', () => {
  beforeEach(() => {
    __resetWaveRunnerForTests()
    __resetIntelligenceReceiptHeadForTests()
    resetSecurityMonitorForTests()
  })

  it('quantumIntelligenceOf is a pure number', () => {
    const n = quantumIntelligenceOf('agent')
    expect(typeof n).toBe('number')
    expect(n).toBeGreaterThanOrEqual(0)
  })

  it('learnSciencesOnTheWay maps science to modules', () => {
    const steps = learnSciencesOnTheWay(['fold', 'entropy'])
    expect(steps.some((s) => s.science === 'fold')).toBe(true)
    expect(steps[0]?.module).toMatch(/^@\//)
  })

  it('dry cycle does not abort when wave lock free', () => {
    // hermetic cwd: without one this ran selfImproveCycle against the REAL corpus — the
    // waveAccountingGapViolations scan (166s) + coordinatedWave = ~11 min hang. The assertion
    // is about cycle CONTROL FLOW (does-not-abort, receipts, non-increasing violations), which
    // holds on a minimal fixture; the full-corpus improve cycle is the automate lane's job.
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-intel-dry-'))
    mkdirSync(join(cwd, 'src', 'apply'), { recursive: true })
    writeFileSync(join(cwd, 'src', 'apply', 'index.ts'), 'export const A = 1\n')
    try {
      const r = selfImproveCycle({ batch: 5, dryRun: true, skipPayload: true, cwd })
      expect(r.aborted).toBe(false)
      expect(r.receipts.length).toBeGreaterThan(0)
      expect(r.after.violationCount).toBeLessThanOrEqual(r.before.violationCount)
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })

  describe('fixture', () => {
    let cwd: string

    beforeEach(() => {
      cwd = mkdtempSync(join(tmpdir(), 'erpax-intel-'))
      mkdirSync(join(cwd, 'src'), { recursive: true })
    })

    afterEach(() => {
      rmSync(cwd, { recursive: true, force: true })
    })

    it('linear gaps detect trinity-incomplete on fixture', () => {
      const gapDir = join(cwd, 'src', 'hub', 'gap')
      mkdirSync(gapDir, { recursive: true })
      writeFileSync(join(cwd, 'src', 'hub', 'index.ts'), 'export const x = 1\n')
      writeFileSync(join(gapDir, 'index.ts'), 'export const y = 1\n')
      const before = linearGaps(cwd).gaps.filter((g) => g.atomPath === 'hub/gap').length
      expect(before).toBeGreaterThan(0)
      const m = measureIntelligenceAxes(cwd)
      expect(m.linearGaps).toBeGreaterThan(0)
      expect(rankGapsByEntanglement(cwd, 5).length).toBeGreaterThan(0)
    })
  })
})
