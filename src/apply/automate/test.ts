/**
 * apply/automate — orchestration loop tests.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import {
  __resetDirectionBusForTests,
  automateDirectionPath,
  interruptTokenFor,
  publishDirection,
} from '@/quantum/entanglement/direction-bus'
import {
  automateCycle,
  automateWatchIntervalMs,
  tamperCostOf,
  tamperCostReport,
  taskInventory,
  rulesLightScan,
  formatAutomateSummary,
  loadAutomateManifest,
  AUTOMATE_MANIFEST_REL,
  AUTOMATE_CYCLE_BUDGET_MS,
} from './index'
import { efficiencyRatchet, type EfficiencyMetrics } from '../efficiency'
import type { CorpusAnalytics } from '@/readme'

const TEST_METRICS: Partial<EfficiencyMetrics> = {
  skillContextBytes: 1000,
  rulesOfMs: 1,
  readmeWaveDurationMs: 0,
  violationCount: 10,
  concentrationTopScore: 0.5,
  constantsCount: 0,
  workTamperProduct: 50,
  entropyEb: 40,
  freeEnergyBits: 35,
}

const mockCorpus = (sealed: number, total: number, bond: number): CorpusAnalytics => ({
  folderCount: total,
  sealed,
  balanced: sealed,
  meanBondDegree: bond,
  totalVariance: 0,
  withBindings: 0,
  distinctStandards: 1,
  byHoro: [],
  entropy: {
    unit: 'eb',
    totalGapEb: total - sealed,
    totalSealEb: sealed * 2,
    netEntropyEb: total - sealed,
    sealGapRatio: sealed / Math.max(total, 1),
    sealedMass: sealed,
    unsealedMass: total - sealed,
    bySector: [],
  },
  quantumThinking: {
    atomsWithThinking: 0,
    totalSuperposition: 0,
    totalCollapse: 0,
    totalSealUuids: sealed,
    sealedThinking: sealed,
    byPartition: [],
  },
})

describe('tamperCostOf — monotone corpus signals', () => {
  it('rises when sealed coverage increases', () => {
    const vfd = { violationFloorDistance: 50 }
    const low = tamperCostOf(mockCorpus(10, 100, 5), undefined, vfd)
    const high = tamperCostOf(mockCorpus(50, 100, 5), undefined, vfd)
    expect(high.product).toBeGreaterThanOrEqual(low.product)
    expect(high.contentUuidPct).toBeGreaterThan(low.contentUuidPct)
  })

  it('tamperCostReport flags regression when product drops', () => {
    const cwd = mkdtempSync(join(tmpdir(), 'erpax-automate-tamper-'))
    mkdirSync(join(cwd, 'src', 'apply'), { recursive: true })
    writeFileSync(
      join(cwd, AUTOMATE_MANIFEST_REL),
      `${JSON.stringify({
        _law: 'test',
        cycleId: 'prior',
        tamper: { product: 999_999 },
      })}\n`,
    )
    const report = tamperCostReport(mockCorpus(5, 100, 3), cwd, { violationFloorDistance: 10 })
    expect(report.priorProduct).toBe(999_999)
    expect(report.product).toBeLessThan(999_999)
    expect(report.monotone).toBe(false)
    rmSync(cwd, { recursive: true, force: true })
  })
})

describe('efficiencyRatchet — automate mock cycle improves metrics', () => {
  const base: EfficiencyMetrics = {
    skillContextBytes: 40_000,
    rulesOfMs: 800,
    readmeWaveDurationMs: 0,
    violationCount: 9000,
    concentrationTopScore: 2.5,
    constantsCount: 0,
    workTamperProduct: 100,
    entropyEb: 50,
    freeEnergyBits: 40,
  }

  it('passes when workTamperProduct rises and entropy falls', () => {
    const next: EfficiencyMetrics = {
      ...base,
      workTamperProduct: 130,
      entropyEb: 45,
      freeEnergyBits: 55,
      violationCount: 8950,
    }
    const v = efficiencyRatchet(base, next)
    expect(v.ok).toBe(true)
    expect(v.improvements.some((i) => i.metric === 'workTamperProduct')).toBe(true)
  })

  it('fails when workTamperProduct decreases', () => {
    const next = { ...base, workTamperProduct: 90 }
    const v = efficiencyRatchet(base, next)
    expect(v.ok).toBe(false)
  })
})

describe('automateCycle — single pass', () => {
  let cwd: string

  beforeEach(() => {
    cwd = mkdtempSync(join(tmpdir(), 'erpax-automate-'))
    mkdirSync(join(cwd, 'src', 'apply'), { recursive: true })
    writeFileSync(join(cwd, 'src', 'apply', 'SKILL.md'), '# apply\n')
    writeFileSync(join(cwd, 'src', 'apply', 'index.ts'), 'export const APPLY = 1\n')
    writeFileSync(join(cwd, 'src', 'apply', 'test.ts'), "import { expect, it } from 'vitest'\nit('ok', () => expect(1).toBe(1))\n")
  })

  afterEach(() => {
    rmSync(cwd, { recursive: true, force: true })
    __resetDirectionBusForTests()
  })

  it('completes cycle and emits manifest', () => {
    const result = automateCycle({ cwd, dryRun: true, skipClean: true, metrics: TEST_METRICS })
    expect(result.aborted).toBe(false)
    expect(existsSync(join(cwd, AUTOMATE_MANIFEST_REL))).toBe(true)
    expect(result.manifest.cycleId).toMatch(/^[a-f0-9]{12}$/)
    expect(formatAutomateSummary(cwd)).toContain('automate:')
  })

  it('aborts on direction stale mid-cycle', () => {
    const path = automateDirectionPath()
    const token = interruptTokenFor(path, 'test-automate')
    publishDirection(path, { instruction: 'pivot away from automate', issuer: 'parent' })
    const result = automateCycle({ cwd, dryRun: true, token, skipClean: true, metrics: TEST_METRICS })
    expect(result.aborted).toBe(true)
    expect(result.abortReason).toMatch(/direction stale/)
  })

  it('taskInventory returns session stats', () => {
    const inv = taskInventory(cwd)
    expect(inv.session.totalAtoms).toBeGreaterThanOrEqual(0)
    expect(Array.isArray(inv.duplicateHints)).toBe(true)
  })

  it('rulesLightScan is light (clean axes only)', () => {
    const scan = rulesLightScan(cwd)
    expect(scan.fingerprint).toMatch(/^[a-f0-9]{16}$/)
    expect(scan.axes['stray-ts']).toBeDefined()
  })
})

describe('automate bindings — HORO interval and budget', () => {
  it('watch interval is horo-derived (not hand seconds default)', () => {
    const ms = automateWatchIntervalMs()
    expect(ms).toBeGreaterThanOrEqual(5_000)
    expect(ms).not.toBe(5000)
  })

  it('cycle budget is bounded', () => {
    expect(AUTOMATE_CYCLE_BUDGET_MS).toBeGreaterThan(0)
    expect(AUTOMATE_CYCLE_BUDGET_MS).toBeLessThan(120_000)
  })
})
