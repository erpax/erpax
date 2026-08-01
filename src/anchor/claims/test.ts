import { describe, expect, it } from 'vitest'

import { judge, type Change } from '@/constitution'
import { classify, integrity, manifest, runFrom, verdictHolds, type MeasureRun } from '@/convention/discern'

import {
  assertThreatClaim,
  citationIsPinned,
  CLAIMS,
  EVIDENCE,
  OverClaim,
  PINNED,
  pinned,
  SURFACES,
  THREAT_MODEL,
} from './index'

/**
 * The evidence PROSE is the atom's, exported beside its claims — this only supplies the outcome.
 * Writing those sentences here as well would be the duplication that hides a third divergence.
 */
const run: MeasureRun = runFrom(EVIDENCE, (m) => (EVIDENCE.some((e) => e.measuredBy === m) ? true : undefined))

describe('anchor/claims — pinned standards, calibrated threat', () => {
  it('a BARE citation does not identify a document — FIPS 203 and 204 carry errata', () => {
    expect(citationIsPinned('FIPS 203')).toBe(false)
    expect(citationIsPinned('FIPS 203 (2024-08-13)')).toBe(true)
    expect(pinned('FIPS 204')?.hasErrata).toBe(true)
    expect(pinned('FIPS 205')?.hasErrata).toBe(false)
  })

  it('draft and selected-but-unpublished standards are marked NOT final', () => {
    expect(pinned('FIPS 206')?.final).toBe(false) // FN-DSA, draft
    expect(pinned('HQC')?.final).toBe(false) // selected 2025, standard pending
    // that flag is what makes them compasses rather than a judgement call
    for (const p of PINNED.filter((s) => !s.final)) {
      expect(CLAIMS.some((c) => 'closedBy' in c && c.closedBy.includes(p.id))).toBe(true)
    }
  })

  it('THE CALIBRATION: it defends harvest-now-decrypt-later, not an imminent break', () => {
    expect(THREAT_MODEL.defends).toBe('harvest-now-decrypt-later')
    expect(THREAT_MODEL.doesNotDefend).toBe('imminent-break')
    // the gap is not rhetorical — it is roughly two orders of magnitude, and dated
    expect(THREAT_MODEL.logicalQubitsNeededOrder).toBeGreaterThan(THREAT_MODEL.logicalQubitsDemonstratedOrder * 10)
    expect(THREAT_MODEL.asOf).toMatch(/^\d{4}-\d{2}$/) // a figure without a date goes stale silently
  })

  it('an imminent-break claim is REFUSED as an over-claim', () => {
    expect(() => assertThreatClaim('protects against imminent quantum break')).toThrow(OverClaim)
    expect(() => assertThreatClaim('quantum computers can break our keys today')).toThrow(/not the one being mitigated/)
    // the honest claim passes
    expect(() => assertThreatClaim('mitigates harvest-now-decrypt-later on synced channels')).not.toThrow()
  })

  it('THE UNCOMFORTABLE ONE: nothing here signs, so the primitives are COMPASSES', () => {
    const m = manifest('anchor', CLAIMS, SURFACES)
    const compassNames = m.compasses.map((c) => c.property)
    expect(compassNames).toContain('anchor.slhDsaSigning')
    expect(compassNames).toContain('anchor.mlKemChannel')
    expect(compassNames).toContain('anchor.fnDsa')
    expect(compassNames).toContain('anchor.hqc')
    // a verdict for "sign a root, flip one byte" would name a test that cannot exercise it —
    // verdictHolds would reject it as a tautology, which is exactly what discern is for
    expect(verdictHolds({ property: 'anchor.slhDsaSigning', measuredBy: 'src/anchor/claims/test.ts' }, () => undefined).holds).toBe(false)
  })

  it('what erpax genuinely computes IS a verdict, and holds', () => {
    const m = manifest('anchor', CLAIMS, SURFACES)
    expect(m.verdicts.map((v) => v.property)).toEqual([
      'anchor.manifestComplete',
      'anchor.channelRequiresMlKem',
      'anchor.rootRequiresPqSignature',
      'anchor.standardsPinned',
      'anchor.threatModelCalibrated',
    ])
    for (const v of m.verdicts) expect(verdictHolds(v, run).holds).toBe(true)
  })

  it('INTEGRITY is 5 of 9 — lower and true, not higher and asserted', () => {
    const m = manifest('anchor', CLAIMS, SURFACES)
    expect(integrity([m], run)).toBeCloseTo(5 / 9, 6)
    // it rises ONLY when a compass becomes a tested verdict — pinning a PQC library, not editing prose
    expect(m.compasses.every((c) => c.closedBy.length > 10 && c.owner.length > 0)).toBe(true)
  })

  it('every compass names what would close it AND who owns closing it', () => {
    for (const c of manifest('anchor', CLAIMS, SURFACES).compasses) {
      expect(classify(c)).toBe('compass')
      expect(c.closedBy).toMatch(/KAT|standard|implementation/)
      expect(c.owner).toBe('security')
    }
  })
})

describe('anchor/claims — judged by the constitution', () => {
  const change: Change = {
    atom: 'anchor/claims',
    dualities: [
      { builds: 'citationIsPinned', breaks: 'a bare standard id is refused' },
      { builds: 'assertThreatClaim', breaks: 'an imminent-break claim throws' },
      { builds: 'CLAIMS', breaks: 'an unimplemented primitive is a compass, never a verdict' },
    ],
    anchors: ['FIPS 205 (2024-08-13)', 'FIPS 203 (2024-08-13)', 'NIST SP 800-227'],
    claims: [
      {
        text: 'erpax is post-quantum secure',
        boundary:
          'erpax DECLARES its post-quantum surfaces and gates their manifest; it does not sign or ' +
          'encapsulate — no PQC implementation is installed, so the four primitives are compasses ' +
          'and integrity reads 5 of 9. It mitigates harvest-now-decrypt-later, never an imminent ' +
          'break, and the qubit figures are declared with their date because they move',
      },
    ],
    axes: [
      { name: 'build⊕break', ring: [3, 3] },
      // three refusals (bare citation · imminent-break claim · tautology verdict) meet three
      // admissions (pinned citation · calibrated claim · held verdict) — each is exercised above
      { name: 'refuse⊕admit', ring: [3, 3] },
    ],
    served: [{ result: 'the integrity ratio for anchor', recompute: 'src/anchor/claims/index.ts' }],
    postings: [
      { debit: 'surface/claimed', credit: 'surface/measured', amount: 5 },
      { debit: 'surface/measured', credit: 'surface/claimed', amount: 5 },
    ],
    edges: [
      { from: 'claims', to: 'anchor' },
      { from: 'anchor', to: 'claims' },
    ],
    quantities: [
      { name: 'verdicts', value: 5, derivation: 'src/anchor/claims/index.ts' },
      { name: 'compasses', value: 4, derivation: 'src/anchor/claims/index.ts' },
    ],
    keepers: [],
    seed: ['src/anchor/claims/index.ts'],
  }

  it('is SEALED under all nine laws', () => {
    const v = judge(change)
    expect(v.verdicts.filter((x) => !x.holds)).toEqual([])
    expect(v.sealed).toBe(true)
  })
})
