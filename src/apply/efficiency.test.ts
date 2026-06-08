import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import {
  efficiencyRatchet,
  efficiencySnapshot,
  recordEfficiencyPass,
  loadEfficiencyStore,
  persistEfficiencyStore,
  renderEfficiencyDelta,
  formatEfficiencySummary,
  measureConstantsCount,
  type EfficiencyMetrics,
  type EfficiencyStore,
} from './efficiency'

describe('efficiencyRatchet — pass must improve or document exception', () => {
  const base: EfficiencyMetrics = {
    skillContextBytes: 40_000,
    rulesOfMs: 800,
    readmeWaveDurationMs: 30_000,
    violationCount: 9000,
    concentrationTopScore: 2.5,
    constantsCount: 0,
    workTamperProduct: 100,
    entropyEb: 50,
    freeEnergyBits: 40,
  }

  it('passes on first snapshot (no prior)', () => {
    const next = { ...base }
    const v = efficiencyRatchet(null, next)
    expect(v.ok).toBe(true)
    expect(v.regressions).toEqual([])
  })

  it('passes when all lower-is-better metrics decrease and workTamper rises', () => {
    const prev = { ...base }
    const next: EfficiencyMetrics = {
      skillContextBytes: 38_000,
      rulesOfMs: 750,
      readmeWaveDurationMs: 28_000,
      violationCount: 8950,
      concentrationTopScore: 2.4,
      constantsCount: 0,
      workTamperProduct: 120,
      entropyEb: 45,
      freeEnergyBits: 50,
    }
    const v = efficiencyRatchet(prev, next)
    expect(v.ok).toBe(true)
    expect(v.improvements.length).toBeGreaterThan(0)
    expect(v.regressions).toEqual([])
  })

  it('fails when skillContextBytes regresses without exception', () => {
    const prev = { ...base }
    const next = { ...base, skillContextBytes: 41_000 }
    const v = efficiencyRatchet(prev, next)
    expect(v.ok).toBe(false)
    expect(v.regressions.some((r) => r.metric === 'skillContextBytes')).toBe(true)
  })

  it('allows documented exception on regression', () => {
    const prev = { ...base }
    const next = { ...base, rulesOfMs: 900 }
    const v = efficiencyRatchet(prev, next, [
      { metric: 'rulesOfMs', reason: 'cold cache after ratchet.json edit' },
    ])
    expect(v.ok).toBe(true)
    expect(v.regressions.some((r) => r.metric === 'rulesOfMs')).toBe(true)
  })

  it('fails when freeEnergyBits decreases', () => {
    const prev = { ...base }
    const next = { ...base, freeEnergyBits: 30 }
    const v = efficiencyRatchet(prev, next)
    expect(v.ok).toBe(false)
    expect(v.regressions.some((r) => r.metric === 'freeEnergyBits')).toBe(true)
  })

  it('fails when workTamperProduct decreases', () => {
    const prev = { ...base }
    const next = { ...base, workTamperProduct: 90 }
    const v = efficiencyRatchet(prev, next)
    expect(v.ok).toBe(false)
    expect(v.regressions.some((r) => r.metric === 'workTamperProduct')).toBe(true)
  })

  it('renderEfficiencyDelta shows two-pass table', () => {
    const prev = { ...base }
    const next = { ...base, skillContextBytes: 39_000, workTamperProduct: 110 }
    const table = renderEfficiencyDelta(prev, next)
    expect(table).toContain('skillContextBytes')
    expect(table).toContain('↓ -1000')
    expect(table).toContain('workTamperProduct')
  })

  it('formatEfficiencySummary includes pass id and status', () => {
    const snap = efficiencySnapshot('session:apply', {
      metrics: { ...base, readmeWaveDurationMs: 0, workTamperProduct: 0 },
    })
    const ratchet = efficiencyRatchet(null, snap.metrics)
    const line = formatEfficiencySummary(snap, ratchet)
    expect(line).toContain('efficiency:session:apply')
    expect(line).toContain('✓')
  })
})

describe('efficiency store — persist roundtrip', () => {
  let cwd: string

  beforeEach(() => {
    cwd = mkdtempSync(join(tmpdir(), 'erpax-eff-'))
  })

  afterEach(() => {
    rmSync(cwd, { recursive: true, force: true })
  })

  it('writes and loads efficiency.generated.json', () => {
    const metrics: EfficiencyMetrics = {
      skillContextBytes: 42_000,
      rulesOfMs: 700,
      readmeWaveDurationMs: 5000,
      violationCount: 100,
      concentrationTopScore: 1.2,
      constantsCount: 0,
      workTamperProduct: 88,
      entropyEb: 10,
      freeEnergyBits: 70,
    }
    const store: EfficiencyStore = {
      _law: 'efficiency UP only — test',
      latest: metrics,
      passes: [{ passId: 'readme:waves', capturedAt: '2026-06-08T00:00:00.000Z', metrics }],
    }
    persistEfficiencyStore(store, cwd)
    expect(loadEfficiencyStore(cwd)).toEqual(store)
  })

  it('recordEfficiencyPass appends with metric overrides (no live scan)', () => {
    const m1: EfficiencyMetrics = {
      skillContextBytes: 40_000,
      rulesOfMs: 800,
      readmeWaveDurationMs: 1000,
      violationCount: 10,
      concentrationTopScore: 2,
      constantsCount: 0,
      workTamperProduct: 50,
      entropyEb: 5,
      freeEnergyBits: 40,
    }
    const r1 = recordEfficiencyPass('readme:waves', {
      cwd,
      persist: true,
      metrics: m1,
    })
    expect(r1.ratchet.ok).toBe(true)

    const m2: EfficiencyMetrics = {
      ...m1,
      violationCount: 9,
      workTamperProduct: 55,
    }
    const r2 = recordEfficiencyPass('improve:watch', { cwd, metrics: m2 })
    expect(r2.ratchet.ok).toBe(true)
    expect(loadEfficiencyStore(cwd).passes).toHaveLength(2)
  })
})

describe('efficiency measures — spot checks', () => {
  it('measureConstantsCount is non-negative', () => {
    expect(measureConstantsCount()).toBeGreaterThanOrEqual(0)
  })
})
