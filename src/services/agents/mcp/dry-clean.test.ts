/**
 * DRY-clean strategy ladder + drift-distribution tests.
 *
 * Slice GGGGGGGGG (2026-05-11). Pins the harmonic-cycle invariants:
 *
 *   - `pickStrategy` is a pure function of (score, sameArea, ceiling,
 *     floor, emergingConcepts) — covers every band boundary.
 *   - `dryCleanScan` returns a `driftDistribution` with
 *     `stableDriftCeiling`, `realDriftFloor`, `driftEntropy`, and a
 *     `cycleUuid` that is stable for a given (tools, thresholds) input.
 *
 * These are the invariants the ConsistencyAgent depends on for
 * deterministic, replayable cycles (Slices OOOOOOOO + PPPPPPPP).
 *
 * @standard ISO/IEC 25010:2023 §5.4 reusability (DRY by detection)
 * @audit Conservation Law 50 mcp-dry-cleanliness
 */
import { describe, it, expect } from 'vitest'
import {
  pickStrategy,
  dryCleanScan,
  MAX_DESCRIPTION_OVERLAP,
  DRIFT_THRESHOLD_EPSILON,
} from './dry-clean'
import type { ErpaxMcpTool } from './tool-defs'

function tool(name: string, description: string): ErpaxMcpTool {
  return {
    name,
    description,
    parameters: {} as ErpaxMcpTool['parameters'],
    handler: async () => ({ content: [{ text: '', type: 'text' as const }] }),
  }
}

describe('pickStrategy — entropy-band boundaries', () => {
  const ceiling = 0.45
  const floor = 0.50

  it('returns MONITOR below the entropy baseline (0.2)', () => {
    const { strategy } = pickStrategy({
      a: 'erpax.x.a', b: 'erpax.x.b',
      score: 0.1, sameArea: true,
      stableDriftCeiling: ceiling, realDriftFloor: floor,
    })
    expect(strategy).toBe('MONITOR')
  })

  it('returns ESCALATE for cross-area pairs at or above the real-drift floor', () => {
    const { strategy, rationale } = pickStrategy({
      a: 'erpax.x.a', b: 'erpax.y.b',
      score: 0.55, sameArea: false,
      stableDriftCeiling: ceiling, realDriftFloor: floor,
    })
    expect(strategy).toBe('ESCALATE')
    expect(rationale).toMatch(/fusion-breaking/)
  })

  it('returns SWAP_VOCAB for same-area pairs AT the stable ceiling', () => {
    const { strategy } = pickStrategy({
      a: 'erpax.x.a', b: 'erpax.x.b',
      score: ceiling, sameArea: true,
      stableDriftCeiling: ceiling, realDriftFloor: floor,
    })
    expect(strategy).toBe('SWAP_VOCAB')
  })

  it('returns EXTRACT for cross-area pairs in the (ceiling, floor) band', () => {
    const { strategy } = pickStrategy({
      a: 'erpax.x.a', b: 'erpax.y.b',
      score: 0.47, sameArea: false,
      stableDriftCeiling: ceiling, realDriftFloor: floor,
    })
    expect(strategy).toBe('EXTRACT')
  })

  it('returns CREATE_GAP for same-area mid-band pairs with ≥2 emerging concepts', () => {
    const { strategy, rationale } = pickStrategy({
      a: 'erpax.x.scan', b: 'erpax.x.audit',
      score: 0.30, sameArea: true,
      stableDriftCeiling: ceiling, realDriftFloor: floor,
      emergingConcepts: ['drift', 'cycle', 'pair'],
    })
    expect(strategy).toBe('CREATE_GAP')
    expect(rationale).toMatch(/drift|cycle|pair/)
  })

  it('falls through to EXTRACT for same-area mid-band pairs with insufficient emerging concepts', () => {
    const { strategy } = pickStrategy({
      a: 'erpax.x.a', b: 'erpax.x.b',
      score: 0.30, sameArea: true,
      stableDriftCeiling: ceiling, realDriftFloor: floor,
      emergingConcepts: ['single'],   // only 1 — does not qualify
    })
    expect(strategy).toBe('EXTRACT')
  })
})

describe('dryCleanScan — drift distribution + cycle uuid', () => {
  // All descriptions below carry ≥12 distinct tokens of ≥4 characters so
  // `dryCleanScan`'s MIN_TOKENS_FOR_OVERLAP_CHECK (8) is satisfied for
  // every pair — otherwise the pair is skipped silently.
  const LONG_A = 'architecture invariant suite covers every collection registry token check pair scan area boundary'
  const LONG_DUP = 'architecture invariant suite covers every collection registry token check pair scan area boundary'
  const LONG_C = 'completely distinct dialogue vocabulary stream record release notice manager outcome resolve session'
  // Shares ~10 of LONG_A's 13 tokens → jaccard ≈ 0.625 so the
  // ceiling + ε math stays below MAX_DESCRIPTION_OVERLAP (0.7).
  const LONG_PARTIAL = 'architecture invariant suite covers every standard token check pair scan area validation gate'

  it('produces a cycle uuid that is stable for the same input', () => {
    const tools = [
      tool('erpax.consistency.scan',  LONG_A),
      tool('erpax.consistency.audit', LONG_DUP),
    ]
    const r1 = dryCleanScan(tools)
    const r2 = dryCleanScan(tools)
    expect(r1.cycleUuid).toBe(r2.cycleUuid)
    expect(typeof r1.cycleUuid).toBe('string')
    expect(r1.cycleUuid.length).toBeGreaterThan(0)
  })

  it('computes a non-negative driftEntropy and clamps the real-drift floor at MAX_DESCRIPTION_OVERLAP', () => {
    const tools = [
      tool('erpax.consistency.scan',  LONG_A),
      tool('erpax.consistency.audit', LONG_DUP),
      tool('erpax.events.list',       LONG_C),
    ]
    const r = dryCleanScan(tools)
    expect(r.driftDistribution.driftEntropy).toBeGreaterThanOrEqual(0)
    expect(r.driftDistribution.realDriftFloor).toBeLessThanOrEqual(MAX_DESCRIPTION_OVERLAP)
  })

  it('keeps the real-drift floor exactly DRIFT_THRESHOLD_EPSILON above the ceiling (when below the hard floor)', () => {
    // Partial-overlap pair → ceiling ≈ 0.625 → ceiling + ε ≈ 0.675 < 0.7
    // So the realDriftFloor lands at ceiling + ε, not at MAX.
    const tools = [
      tool('erpax.consistency.scan',  LONG_A),
      tool('erpax.consistency.audit', LONG_PARTIAL),
    ]
    const r = dryCleanScan(tools)
    expect(r.driftDistribution.stableDriftCeiling).toBeLessThan(
      MAX_DESCRIPTION_OVERLAP - DRIFT_THRESHOLD_EPSILON,
    )
    const delta = r.driftDistribution.realDriftFloor - r.driftDistribution.stableDriftCeiling
    expect(Math.abs(delta - DRIFT_THRESHOLD_EPSILON)).toBeLessThan(1e-3)
  })

  it('exposes the next-disambiguation target as the highest-overlap pair', () => {
    const tools = [
      tool('erpax.alpha.x', LONG_A),
      tool('erpax.beta.y',  LONG_DUP),
      tool('erpax.gamma.z', LONG_C),
    ]
    const r = dryCleanScan(tools)
    const target = r.driftDistribution.nextDisambiguationTarget
    expect(target).toBeDefined()
    expect([target!.a, target!.b].sort()).toEqual(['erpax.alpha.x', 'erpax.beta.y'])
  })

  it('partitions pair scans into intra-area vs cross-area counts', () => {
    const tools = [
      tool('erpax.alpha.one', LONG_A),
      tool('erpax.alpha.two', LONG_DUP),
      tool('erpax.beta.one',  LONG_C),
    ]
    const r = dryCleanScan(tools)
    expect(r.driftDistribution.intraAreaPairsScanned).toBe(1)   // alpha.one ↔ alpha.two
    expect(r.driftDistribution.crossAreaPairsScanned).toBe(2)   // alpha.* ↔ beta.one
  })

  it('returns strategyDecisions only for pairs above the noise baseline', () => {
    const tools = [
      tool('erpax.alpha.one', LONG_A),
      tool('erpax.alpha.two', LONG_DUP),
    ]
    const r = dryCleanScan(tools)
    // Each strategyDecision should carry a uuid + a non-empty rationale.
    for (const d of r.strategyDecisions) {
      expect(d.pairUuid).toMatch(/^[a-f0-9]+$/)
      expect(d.rationale.length).toBeGreaterThan(0)
      expect(d.score).toBeGreaterThan(0)
    }
  })
})
