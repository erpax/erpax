import { describe, it, expect } from 'vitest'
import { CHECKS, REQUIRED, coverageAudit, providersFor, unwired, type DocumentType, type Provider } from './index'

const ALL_PROVIDERS: Provider[] = ['grao', 'registryAgency', 'cadastre', 'notaryChamber', 'nra', 'qtsp', 'sanctionsList']
const DOC_TYPES = Object.keys(REQUIRED) as DocumentType[]

describe('notary/check — the per-document duty, rosetta-audited', () => {
  it('the matrix is closed — every required check has a provider + standard row (no dangling duty)', () => {
    for (const dt of DOC_TYPES) {
      for (const check of REQUIRED[dt]) {
        expect(CHECKS[check]).toBeDefined()
        expect(CHECKS[check].provider).toBeTruthy()
        expect(CHECKS[check].standard).toBeTruthy()
      }
    }
  })

  it('different documents demand different checks — a POA is not a deed of sale', () => {
    expect(REQUIRED.sale).toContain('title') // property instrument checks title
    expect(REQUIRED.poa).not.toContain('title') // a power of attorney does not
    expect(REQUIRED.sale.length).toBeGreaterThan(REQUIRED.poa.length)
  })

  it('LEAVE NO GAP — with nothing wired, every required check is reported as a gap', () => {
    for (const dt of DOC_TYPES) {
      const a = coverageAudit(dt, [])
      expect(a.covered).toBe(0)
      expect(a.gaps.length).toBe(a.required)
      expect(a.complete).toBe(false)
    }
  })

  it('zero gaps only when EVERY provider a document touches is wired (production-grade = complete)', () => {
    for (const dt of DOC_TYPES) {
      const a = coverageAudit(dt, ALL_PROVIDERS)
      expect(a.complete).toBe(true)
      expect(a.gaps).toEqual([])
      expect(a.covered).toBe(a.required)
    }
  })

  it('a partial wiring surfaces exactly the missing providers as gaps (not silently passed)', () => {
    const a = coverageAudit('sale', ['grao', 'qtsp']) // identity/capacity + signature/timestamp only
    expect(a.complete).toBe(false)
    const missingProviders = new Set(a.gaps.map((g) => g.provider))
    expect(missingProviders.has('registryAgency')).toBe(true) // title/encumbrance/... still gaps
    expect(missingProviders.has('grao')).toBe(false) // wired ⇒ not a gap
  })

  it('providersFor lists the distinct adapters to wire for a document', () => {
    expect(providersFor('sale')).toEqual(expect.arrayContaining(['grao', 'registryAgency', 'cadastre', 'qtsp']))
    expect(providersFor('certification').sort()).toEqual(['grao', 'qtsp'])
  })

  it('an unwired provider REFUSES — never fabricates a passing check', async () => {
    await expect(unwired('registryAgency').run('title', 'parcel-42')).rejects.toThrow(/not wired/)
  })
})
