/**
 * apply/clean — coordinated dry-clean cycle tests.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import {
  __resetDirectionBusForTests,
  cleanDirectionPath,
  interruptTokenFor,
  publishDirection,
} from '@/quantum/entanglement/direction-bus'
import {
  scanCleanAxes,
  classifyCleanFindings,
  applySafeCleanFixes,
  dryCleanCycle,
  loadCleanManifest,
  renderCleanReport,
  formatCleanSummary,
  CLEAN_MANIFEST_REL,
} from './clean'
import { efficiencyRatchet, type EfficiencyMetrics } from './efficiency'

const TEST_METRICS: Partial<EfficiencyMetrics> = {
  skillContextBytes: 1000,
  rulesOfMs: 1,
  readmeWaveDurationMs: 0,
  violationCount: 10,
  concentrationTopScore: 0.5,
  constantsCount: 0,
  workTamperProduct: 50,
  entropyEb: 100,
  freeEnergyBits: 40,
}

describe('scanCleanAxes — dry-run report', () => {
  let cwd: string

  beforeEach(() => {
    cwd = mkdtempSync(join(tmpdir(), 'erpax-clean-'))
    mkdirSync(join(cwd, 'src', 'apply'), { recursive: true })
    writeFileSync(join(cwd, 'src', 'apply', 'SKILL.md'), '# apply\n')
    writeFileSync(join(cwd, 'src', 'apply', 'index.ts'), 'export const APPLY = 1\n')
    writeFileSync(join(cwd, 'src', 'apply', 'test.ts'), "import { expect, it } from 'vitest'\nit('ok', () => expect(1).toBe(1))\n")
  })

  afterEach(() => {
    rmSync(cwd, { recursive: true, force: true })
    __resetDirectionBusForTests()
  })

  it('produces scan axes and taxonomy counts', () => {
    writeFileSync(join(cwd, 'session-debris.tmp'), 'junk')
    const scan = scanCleanAxes(cwd)
    expect(scan.axes['stray-ts'].count).toBeGreaterThanOrEqual(0)
    expect(scan.findings.some((f) => f.taxonomy === 'C-delete' && f.path.endsWith('.tmp'))).toBe(
      true,
    )
    const tax = classifyCleanFindings(scan.findings)
    expect(tax['C-delete']).toBeGreaterThanOrEqual(1)
    expect(scan.fingerprint).toMatch(/^[a-f0-9]{16}$/)
  })

  it('dry-run cycle emits manifest without deleting sidecars', () => {
    const debris = join(cwd, 'leftover.bak')
    writeFileSync(debris, 'old')
    const result = dryCleanCycle({ cwd, dryRun: true, metrics: TEST_METRICS })
    expect(result.aborted).toBe(false)
    expect(result.manifest.dryRun).toBe(true)
    expect(existsSync(debris)).toBe(true)
    expect(existsSync(join(cwd, CLEAN_MANIFEST_REL))).toBe(true)
    const report = renderCleanReport(result, cwd)
    expect(report).toContain('scan → classify')
    expect(report).toContain('stray-ts')
    expect(formatCleanSummary(cwd)).toContain('clean:')
  })

  it('--apply mode deletes safe C-delete sidecars', () => {
    const debris = join(cwd, 'leftover.bak')
    writeFileSync(debris, 'old')
    const result = dryCleanCycle({ cwd, dryRun: false, metrics: TEST_METRICS })
    expect(result.apply.applied).toContain('leftover.bak')
    expect(existsSync(debris)).toBe(false)
    const manifest = loadCleanManifest(cwd)
    expect(manifest?.applied).toContain('leftover.bak')
  })

  it('aborts when direction bus publishes mid-cycle token', () => {
    const path = cleanDirectionPath()
    const token = interruptTokenFor(path, 'test-clean-worker')
    publishDirection(path, { instruction: 'pivot away from clean', issuer: 'parent' })
    const result = dryCleanCycle({ cwd, dryRun: true, token, metrics: TEST_METRICS })
    expect(result.aborted).toBe(true)
    expect(result.abortReason).toMatch(/direction stale/)
  })
})

describe('efficiency ratchet — mock improvement after clean', () => {
  const base: EfficiencyMetrics = {
    skillContextBytes: 40_000,
    rulesOfMs: 800,
    readmeWaveDurationMs: 30_000,
    violationCount: 9000,
    concentrationTopScore: 2.5,
    constantsCount: 0,
    workTamperProduct: 100,
    entropyEb: 500,
    freeEnergyBits: 200,
  }

  it('passes when violation count decreases (fixture delta)', () => {
    const prev = { ...base }
    const next: EfficiencyMetrics = {
      skillContextBytes: 38_000,
      rulesOfMs: 750,
      readmeWaveDurationMs: 28_000,
      violationCount: 8950,
      concentrationTopScore: 2.4,
      constantsCount: 0,
      workTamperProduct: 120,
      entropyEb: 480,
      freeEnergyBits: 210,
    }
    const v = efficiencyRatchet(prev, next)
    expect(v.ok).toBe(true)
    expect(v.improvements.some((i) => i.metric === 'violationCount')).toBe(true)
  })
})
