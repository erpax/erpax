import { describe, it, expect } from 'vitest'
import {
  railCoverage,
  coverageReport,
  assertCoverageRatchet,
  assertContractedRailsResolve,
  unresolvedContractedEndpoints,
  CONTRACTED_ENDPOINTS,
} from './index'

/**
 * The ratchet IS the gate: pure registry derivation, no network, so it runs in CI and
 * cannot flake. It does not demand 178 contracts — it forbids the gap from growing.
 */

/** Unproven claims on 2026-08-19. Lower this with every contract written; never raise it. */
/**
 * Ratcheted 48 → 20 (2026-08-19). Every remaining unproven rail is CREDENTIALED
 * (mtls 2 · oauth2 11 · api_key 5 · basic 2) — zero public rails are unproven, so
 * this floor cannot drop further without provisioned credentials, not more work.
 */
const UNCOVERED_CEILING = 20

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
      if (!r.claimed) expect(r.covered && !CONTRACTED_ENDPOINTS.has(r.endpoint)).toBe(false)
    }
    const rep = coverageReport()
    expect(rep.covered + rep.uncovered.length).toBe(rep.claimed)
    expect(rep.claimed + rep.catalogue).toBe(rep.total)
  })

  it('marks the three sealed contracts as covered wherever they appear', () => {
    const covered = railCoverage().filter((r) => r.covered)
    expect(covered.length).toBeGreaterThan(0)
    for (const r of covered) expect(CONTRACTED_ENDPOINTS.has(r.endpoint)).toBe(true)
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

describe('outward/coverage — a contract may not name a rail that does not exist', () => {
  it('every contracted endpoint resolves to a catalogued rail', () => {
    // Keyed by NAME this failed open: 'ECB Euro Reference Rates' matched zero rails,
    // so a contract that existed marked nothing covered and 9 rows read as debt.
    expect(unresolvedContractedEndpoints()).toEqual([])
    expect(() => assertContractedRailsResolve()).not.toThrow()
  })

  it('FAILS when a contracted endpoint matches nothing — it must not fail open', () => {
    const rails = railCoverage().filter((r) => r.endpoint !== [...CONTRACTED_ENDPOINTS][0])
    expect(unresolvedContractedEndpoints(rails).length).toBeGreaterThan(0)
    expect(() => assertContractedRailsResolve(rails)).toThrow(/under-reporting/)
  })
})

describe('outward/coverage — the floor is credentials, not effort', () => {
  it('no PUBLIC rail claims a client without a contract', () => {
    // A public rail can always be captured, so an unproven one is just undone work.
    // A credentialed one cannot — that is a different, honest kind of gap.
    const publicUnproven = railCoverage().filter((r) => r.claimed && !r.covered && r.auth === 'none')
    expect(publicUnproven.map((r) => r.name)).toEqual([])
  })
})
