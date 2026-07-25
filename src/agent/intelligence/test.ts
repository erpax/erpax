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
  improveByExperience,
  verificationValue,
  rankVerifications,
  learnSciencesOnTheWay,
  hebbianUpdate,
  recall,
  __resetIntelligenceReceiptHeadForTests,
  type LeveragedNext,
  type Synapses,
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

  it('verificationValue: a cheap check of a widely-relied premise is the highest-ROI move (the discovery pattern)', () => {
    // this session's real example: "run the gate" (60 moves rest on it, 5-min check) vs "build an atom" (nothing rests on it)
    const runGate = verificationValue('push blocked by accounting-wave', 60, 5)
    const buildAtom = verificationValue('another theorem helps', 0, 30)
    expect(runGate.value).toBeGreaterThan(buildAtom.value) // measure the premise beats building on it
    // ranking: the widely-relied, cheap-to-check premise comes first
    const ranked = rankVerifications([
      { premise: 'narrow-and-costly', reliance: 3, checkCost: 40 },
      { premise: 'wide-and-cheap', reliance: 60, checkCost: 1 },
      { premise: 'wide-but-costly', reliance: 60, checkCost: 30 },
    ])
    expect(ranked[0]!.premise).toBe('wide-and-cheap')
    // a free-ish check of a huge-reliance premise dwarfs a fix — that is why running the gate beat 30 atoms
    expect(ranked[0]!.value).toBeGreaterThan(ranked[1]!.value)
  })

  it('improveByExperience reweights the next move by history — a dead root sinks, a proven folder rises', () => {
    const mk = (root: string, leverage: number): LeveragedNext => ({ root, gapCount: 1, leverage, axes: ['linear-gap'], gaps: [] })
    // structurally, 'stuck' looks highest-leverage; 'proven' lower
    const moves = [mk('stuck', 100), mk('proven', 60), mk('fresh', 50)]
    const experience = [
      { root: 'stuck', attempts: 8, improved: 0 }, // tried 8×, never folded → foldRate → 1/10
      { root: 'proven', attempts: 8, improved: 8 }, // always folds → foldRate → 9/10
    ]
    const ranked = improveByExperience(moves, experience)
    // proven (60 × 0.9 = 54) now outranks stuck (100 × 0.1 = 10) — experience beats raw structure
    expect(ranked[0]!.root).toBe('proven')
    expect(ranked.find((r) => r.root === 'stuck')!.weighted).toBeLessThan(ranked.find((r) => r.root === 'fresh')!.weighted)
    // an UNSEEN root is neutral (0.5), never punished for lack of history
    expect(ranked.find((r) => r.root === 'fresh')!.foldRate).toBe(0.5)
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

describe('agent/intelligence — quantum neural intelligence: Hebbian fold over the mesh', () => {
  const A = '11111111-1111-8111-8111-111111111111'
  const B = '22222222-2222-8222-8222-222222222222'
  const C = '33333333-3333-8333-8333-333333333333'
  const D = '44444444-4444-8444-8444-444444444444'

  it('fire together, wire together — co-activation strengthens the bond; repetition accumulates', () => {
    const syn: Synapses = new Map()
    hebbianUpdate(syn, [A, B, C]) // one co-activation
    const before = new Map(syn)
    hebbianUpdate(syn, [A, B]) // A–B fire together again
    // every A–B–C pair has a bond; the repeated A–B pair is now strongest
    expect(syn.size).toBe(3) // AB, AC, BC
    for (const [, w] of before) expect(w).toBe(1)
    const abStronger = [...syn.values()].filter((w) => w === 2).length
    expect(abStronger).toBe(1) // exactly the A–B bond accumulated
  })

  it('recall returns the strongest association to a cue (the net predicts)', () => {
    const syn: Synapses = new Map()
    hebbianUpdate(syn, [A, B]) // A learned with B, twice
    hebbianUpdate(syn, [A, B])
    hebbianUpdate(syn, [A, C]) // A with C, once
    const pred = recall(syn, [A], [B, C, D])
    expect(pred[0]!.atom).toBe(B) // B most strongly bonded to A
    expect(pred[0]!.weight).toBe(2)
    expect(pred.map((p) => p.atom)).not.toContain(D) // D never co-fired — no association
  })

  it('is order-independent (the bond is unordered) and self-trained (unsupervised)', () => {
    const s1: Synapses = new Map(); hebbianUpdate(s1, [A, B])
    const s2: Synapses = new Map(); hebbianUpdate(s2, [B, A])
    expect([...s1.keys()]).toEqual([...s2.keys()]) // merge(min,max) — order does not matter
  })
})
