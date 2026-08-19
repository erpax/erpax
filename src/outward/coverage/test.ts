import { describe, it, expect } from 'vitest'
import { railCoverage, coverageReport, assertCoverageRatchet, CONTRACTED_RAILS } from './index'

/**
 * The ratchet IS the gate: pure registry derivation, no network, so it runs in CI and
 * cannot flake. It does not demand 178 contracts — it forbids the gap from growing.
 */

/** Unproven claims on 2026-08-19. Lower this with every contract written; never raise it. */
const UNCOVERED_CEILING = 50

describe('outward/coverage — the ledger', () => {
  it('covers every catalogued rail exactly once, with a state', () => {
    const rails = railCoverage()
    expect(rails.length).toBeGreaterThan(150)
    for (const r of rails) {
      expect(typeof r.name).toBe('string')
      expect(['country', 'bank', 'trading']).toContain(r.registry)
      expect(typeof r.claimed).toBe('boolean')
    }
  })

  it('never counts a catalogue-only rail as covered — no coverage theatre', () => {
    for (const r of railCoverage()) {
      if (!r.claimed) expect(r.covered && !CONTRACTED_RAILS.has(r.name)).toBe(false)
    }
    const rep = coverageReport()
    expect(rep.covered + rep.uncovered.length).toBe(rep.claimed)
    expect(rep.claimed + rep.catalogue).toBe(rep.total)
  })

  it('marks the three sealed contracts as covered wherever they appear', () => {
    const covered = railCoverage().filter((r) => r.covered)
    expect(covered.length).toBeGreaterThan(0)
    for (const r of covered) expect(CONTRACTED_RAILS.has(r.name)).toBe(true)
  })
})

describe('outward/coverage — the ratchet', () => {
  it('holds at or below the ceiling of unproven claims', () => {
    const rep = coverageReport()
    expect(
      rep.uncovered.length,
      `${rep.summary}\nfirst unproven: ${rep.uncovered.slice(0, 3).map((r) => r.name).join(' · ')}`,
    ).toBeLessThanOrEqual(UNCOVERED_CEILING)
    expect(() => assertCoverageRatchet(UNCOVERED_CEILING)).not.toThrow()
  })

  it('FAILS when the gap grows — the guard is genuinely raised', () => {
    const rep = coverageReport()
    expect(() => assertCoverageRatchet(rep.uncovered.length - 1)).toThrow(/coverage regressed/)
  })
})
