import { describe, it, expect } from 'vitest'
import {
  requiredAccessTier,
  tierOfAccessFactory,
  tierRank,
  accessComplianceGaps,
  accessComplianceLeak,
  assertAccessCompliant,
  type CollectionAccessInput,
} from '@/access/standard'
import type { Mesh } from '@/mesh'

describe('access/standard — the API access derived from and gated by its legal surface', () => {
  it('the required tier is the STRICTEST across a collection\'s standards (the superposition collapse)', () => {
    expect(requiredAccessTier(['SOX:2002', 'ISO-27001']).tier).toBe('auditor-grade') // SOX wins over ISO
    expect(requiredAccessTier(['ISO-27001']).tier).toBe('tenant-isolated')
    expect(requiredAccessTier(['GDPR:§17']).tier).toBe('role-scoped')
    expect(requiredAccessTier(['Наредба-Н-18']).tier).toBe('auditor-grade')
    expect(requiredAccessTier([]).tier).toBe('open') // no standard ⇒ no floor
    expect(requiredAccessTier(['some-unlisted-standard']).tier).toBe('authenticated') // cited ⇒ not public
  })

  it('a factory name maps to the tier it actually provides', () => {
    expect(tierOfAccessFactory('accountingCollectionAccess')).toBe('auditor-grade')
    expect(tierOfAccessFactory('roleScopedAccess')).toBe('role-scoped')
    expect(tierOfAccessFactory('tenantAdmin')).toBe('tenant-isolated')
    expect(tierOfAccessFactory('NONE')).toBe('open')
    expect(tierRank('auditor-grade')).toBeGreaterThan(tierRank('open'))
  })

  it('a collection meeting its floor has NO gap; writes take the full floor, reads relax one rung', () => {
    const ok: CollectionAccessInput = { slug: 'invoices', atom: 'invoices', standardIds: ['SOX:2002'], declaredFactory: 'accountingCollectionAccess' }
    expect(accessComplianceGaps([ok])).toEqual([])
  })

  it('a SOX collection with NO access is flagged on every WRITE op — the auditor-facing gap', () => {
    const weak: CollectionAccessInput = { slug: 'ledger', atom: 'ledger', standardIds: ['SOX:2002 §404'], declaredFactory: 'NONE' }
    const gaps = accessComplianceGaps([weak])
    const ops = gaps.map((g) => g.operation).sort()
    // find (relaxed to role-scoped) + create/update/delete (auditor-grade) all exceed 'open'
    expect(ops).toEqual(['create', 'delete', 'find', 'update'])
    expect(gaps.every((g) => g.declared === 'open')).toBe(true)
    expect(gaps.find((g) => g.operation === 'delete')!.required).toBe('auditor-grade')
    expect(gaps.find((g) => g.operation === 'find')!.required).toBe('role-scoped') // read relaxed one rung
  })

  it('a mid-tier collection is flagged only where it falls short — tenant-isolated under a SOX floor', () => {
    const mid: CollectionAccessInput = { slug: 'journals', atom: 'journals', standardIds: ['SOX:2002'], declaredFactory: 'tenantAdmin' }
    const gaps = accessComplianceGaps([mid])
    // tenant-isolated meets the relaxed read floor (role-scoped? no — read floor is role-scoped, tenant<role) ⇒ flagged on all four
    expect(gaps.length).toBeGreaterThan(0)
    expect(gaps.every((g) => g.declared === 'tenant-isolated')).toBe(true)
  })

  it('assertAccessCompliant is the GATE — fails closed when gaps exceed the ceiling, passes at/below', () => {
    // a hermetic mesh with one SOX collection that has NO access → 4 gaps
    const mesh = {
      atoms: ['ledger'],
      edges: [],
      standards: [{ atom: 'ledger', tag: 'standard', id: 'SOX:2002 §404' }],
      collections: [{ slug: 'ledger', atom: 'ledger', operations: ['find', 'create', 'update', 'delete'], declaredAccess: 'NONE' }],
    } as unknown as Mesh
    expect(() => assertAccessCompliant(process.cwd(), 0, mesh)).toThrow(/below their legal floor/)
    expect(() => assertAccessCompliant(process.cwd(), 4, mesh)).not.toThrow() // at ceiling ⇒ passes (ratchet)
  })

  it('accessComplianceLeak prices the gaps as security crackLeak — zero gaps leak nothing, each seam bleeds', () => {
    const weak: CollectionAccessInput = { slug: 'ledger', atom: 'ledger', standardIds: ['SOX:2002 §404'], declaredFactory: 'NONE' }
    const gaps = accessComplianceGaps([weak])
    const leak = accessComplianceLeak(gaps, 512)
    expect(leak.cracks).toBe(gaps.length) // each ungated endpoint is a crack
    expect(leak.leak).toBeGreaterThan(0) // an under-governed API bleeds
    // fully fused access ⇒ zero leak
    expect(accessComplianceLeak([], 512).leak).toBe(0)
  })
})

describe('access/standard — national & international SECURITY regimes are tiered', () => {
  it('EU/international security & trust regimes floor at auditor-grade', () => {
    for (const s of ['NIS2', 'EU 2022/2555', 'DORA', 'eIDAS 910/2014', 'PCI-DSS']) {
      expect(requiredAccessTier([s]).tier).toBe('auditor-grade')
    }
  })
  it('product/cloud security hardening standards floor at role-scoped', () => {
    for (const s of ['CRA Cyber Resilience Act', 'NIST SP 800-53', 'NIST CSF', 'ISO 27017']) {
      expect(tierRank(requiredAccessTier([s]).tier)).toBeGreaterThanOrEqual(tierRank('role-scoped'))
    }
  })
  it('the strictest of a mixed set wins (superposition collapse)', () => {
    expect(requiredAccessTier(['NIST', 'DORA', 'IFRS']).tier).toBe('auditor-grade') // DORA dominates
  })
  it('matches ISO by NUMBER, so ISO/IEC 27001 tiers correctly (regex-gap regression)', () => {
    expect(requiredAccessTier(['ISO/IEC 27001']).tier).toBe('tenant-isolated')
    expect(requiredAccessTier(['ISO 27001']).tier).toBe('tenant-isolated')
    expect(requiredAccessTier(['ISO/IEC 27017']).tier).toBe('role-scoped')
  })
})
