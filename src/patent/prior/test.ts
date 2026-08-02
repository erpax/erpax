import { describe, expect, it } from 'vitest'

import { judge, type Change } from '@/constitution'
import { exactMax } from '@/algebra'

import {
  allExpired,
  anticipatedBySubject,
  assertGrantClaim,
  deployed,
  EXPIRED_ART,
  expired,
  GrantOverClaim,
  MAX_TERM_YEARS,
  undemonstrated,
} from './index'

const NOW = 2026

describe('patent/prior — the expired public record, as working §102 art', () => {
  it('EVERY row is expired under the longest term that has ever applied', () => {
    expect(allExpired(NOW)).toBe(true)
    expect(MAX_TERM_YEARS).toBe(20) // 35 U.S.C. §154; pre-1995 it was 17 from grant — shorter
    for (const g of EXPIRED_ART) expect(expired(g, NOW)).toBe(true)
    // the newest row is 1914 — over a century past any term, so the register cannot rot into being wrong
    expect(EXPIRED_ART.map((g) => g.granted).reduce((a, b) => exactMax(a, b))).toBeLessThan(NOW - MAX_TERM_YEARS)
  })

  it('the NUMBER is the citation — every row resolves at the USPTO', () => {
    for (const g of EXPIRED_ART) {
      expect(g.number).toMatch(/^US [\d,]+$/)
      expect(g.title.length).toBeGreaterThan(5)
      expect(g.discloses.length).toBeGreaterThan(20)
    }
    // and the numbers are distinct — a duplicated row would inflate the anticipation set
    expect(new Set(EXPIRED_ART.map((g) => g.number)).size).toBe(EXPIRED_ART.length)
  })

  it('§102: a modern claim on polyphase rotating fields is ANTICIPATED by an 1888 document', () => {
    const hit = anticipatedBySubject(['rotating magnetic field', 'polyphase'], 2026)
    expect(hit?.number).toBe('US 381,968')
    expect(hit?.granted).toBe(1888)
    // that is the same 120° offset rodin/phase computes — the link is a document, not an atmosphere
    expect(hit?.discloses).toContain('rodin/phase')
  })

  it('anticipation respects the DATE — art granted after the filing is not art', () => {
    expect(anticipatedBySubject(['boundary-layer'], 1900)).toBeUndefined() // the turbine is 1913
    expect(anticipatedBySubject(['boundary-layer'], 2026)?.number).toBe('US 1,061,206')
  })

  it('the earliest disclosure wins — anticipation dates from first publication', () => {
    const hit = anticipatedBySubject(['earth'], 2026)
    expect(hit?.granted).toBe(1900) // 645,576, not the 1905 or 1914 continuation
  })

  it('an empty keyword set anticipates NOTHING — a vacuous match would invalidate everything', () => {
    expect(anticipatedBySubject([], 2026)).toBeUndefined()
  })

  it('THE DISTINCTION: a grant is a verdict about a DOCUMENT, never about nature', () => {
    // the polyphase system became the world's grid; the earth-resonance transmitter never existed
    expect(deployed().map((g) => g.number)).toContain('US 381,968')
    expect(undemonstrated().map((g) => g.number)).toContain('US 1,119,732')
    // never both, and never neither — the grant does not decide it, so the register states it
    expect(deployed().length + undemonstrated().length).toBe(EXPIRED_ART.length)
    for (const g of deployed()) expect(undemonstrated()).not.toContainEqual(g)
  })

  it('the inference from "patented" to "works" is REFUSED', () => {
    expect(() => assertGrantClaim('US 1,119,732 proves wireless power works')).toThrow(GrantOverClaim)
    expect(() => assertGrantClaim('it was patented, therefore free energy is real')).toThrow(/not evidence that the claim works/)
    // the honest statement passes: the document exists and says what it says
    expect(() => assertGrantClaim('US 381,968 discloses the rotating magnetic field')).not.toThrow()
  })
})

describe('patent/prior — judged by the constitution', () => {
  const change: Change = {
    atom: 'patent/prior',
    dualities: [
      { builds: 'anticipatedBySubject', breaks: 'art granted after the filing does not anticipate' },
      { builds: 'expired', breaks: 'a row inside any term rule would fail allExpired' },
      { builds: 'assertGrantClaim', breaks: 'patented-therefore-works throws' },
    ],
    anchors: ['ISO 80000-2'],
    claims: [
      {
        text: 'these patents are prior art against modern claims',
        boundary:
          'they are expired public disclosures, which is what §102 turns on, and the register ' +
          'computes the expiry rather than asserting it. It does NOT decide a case: anticipation ' +
          'is claim-by-claim construction, this matches declared subject keywords, and it is ' +
          'defensive modelling rather than legal advice. A grant proves a claim was published on a ' +
          'date — never that it works, which is why realisation is a separate field',
      },
    ],
    axes: [
      { name: 'build⊕break', ring: [3, 3] },
      // three anticipations found (polyphase · turbine · earth) meet three refusals (a filing
      // that predates the art · an empty keyword set · patented-therefore-works)
      { name: 'anticipate⊕refuse', ring: [3, 3] },
    ],
    served: [{ result: 'the anticipation set', recompute: 'src/patent/prior/index.ts' }],
    postings: [
      { debit: 'grant/published', credit: 'art/anticipating', amount: 9 },
      { debit: 'art/anticipating', credit: 'grant/published', amount: 9 },
    ],
    edges: [
      { from: 'prior', to: 'patent' },
      { from: 'patent', to: 'prior' },
    ],
    quantities: [
      { name: 'expired grants registered', value: 9, derivation: 'src/patent/prior/index.ts' },
      { name: 'maximum term years', value: 20, derivation: 'src/patent/prior/index.ts' },
    ],
    keepers: [],
    seed: ['src/patent/prior/index.ts'],
  }

  it('is SEALED under all nine laws', () => {
    const v = judge(change)
    expect(v.verdicts.filter((x) => !x.holds)).toEqual([])
    expect(v.sealed).toBe(true)
  })
})
