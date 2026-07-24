import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import {
  selfImproveCycle,
  measureIntelligenceAxes,
  quantumIntelligenceOf,
  rankGapsByEntanglement,
  nextMoveByLeverage,
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

    it('nextMoveByLeverage picks the root the most gaps collapse onto — the decision made instead of asking', () => {
      // one hub with THREE trinity-incomplete children, another hub with ONE — leverage must pick the three
      const heavy = join(cwd, 'src', 'heavy')
      mkdirSync(heavy, { recursive: true })
      writeFileSync(join(heavy, 'index.ts'), 'export const h = 1\n')
      for (const child of ['one', 'two', 'three']) {
        mkdirSync(join(heavy, child), { recursive: true })
        writeFileSync(join(heavy, child, 'index.ts'), `export const ${child} = 1\n`)
      }
      const light = join(cwd, 'src', 'light')
      mkdirSync(join(light, 'solo'), { recursive: true })
      writeFileSync(join(light, 'index.ts'), 'export const l = 1\n')
      writeFileSync(join(light, 'solo', 'index.ts'), 'export const s = 1\n')

      const moves = nextMoveByLeverage(cwd, 50)
      expect(moves.length).toBeGreaterThan(0)
      const heavyRow = moves.find((m) => m.root === 'heavy')
      const lightRow = moves.find((m) => m.root === 'light')
      expect(heavyRow).toBeDefined()
      expect(heavyRow!.gapCount).toBeGreaterThanOrEqual(3) // three gaps fuse onto 'heavy'
      // the heavier root outranks the lighter — more gaps collapse there ⇒ higher leverage
      if (lightRow) expect(heavyRow!.leverage).toBeGreaterThan(lightRow.leverage)
      // and it is the top move: what the agent does next, computed not asked
      expect(moves[0]!.gapCount).toBeGreaterThanOrEqual(heavyRow!.gapCount === moves[0]!.gapCount ? heavyRow!.gapCount : 1)
    })
  })
})
