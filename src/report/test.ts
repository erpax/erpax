import { describe, it, expect } from 'vitest'
import { collapseReport, buildableReports, reportSuperpositionSize, FORMAT_LAW, type ReportFormat } from './index'
import type { Mesh } from '@/mesh'

// A report is a superposition (standards × format × data × reader) collapsed on request — computed,
// never a hand-written template, and legislation floors the collapse stricter than any standard.
describe('report — the document is a collapsed superposition, not a template', () => {
  // a hermetic mesh: an accounting collection under a BG statute, and a plain one
  const mesh = {
    atoms: ['accounting', 'invoices', 'ledger', 'accounts'],
    edges: [],
    standards: [
      { atom: 'accounting', tag: 'standard', id: 'IFRS' },
      { atom: 'invoices', tag: 'standard', id: 'BG Наредба Н-18' },
      { atom: 'ledger', tag: 'standard', id: 'СУПТО' },
    ],
    collections: [
      { slug: 'accounting', atom: 'accounting', operations: ['find', 'create', 'update', 'delete'], declaredAccess: 'accountingCollectionAccess' },
      { slug: 'invoices', atom: 'invoices', operations: ['find', 'create', 'update', 'delete'], declaredAccess: 'NONE' },
      { slug: 'ledger', atom: 'ledger', operations: ['find', 'create'], declaredAccess: 'NONE' },
      { slug: 'accounts', atom: 'accounts', operations: ['find'], declaredAccess: 'NONE' },
    ],
  } as unknown as Mesh

  it('collapses a format to a deterministic spec — the collections its standards govern', () => {
    const spec = collapseReport(mesh, { format: 'trial-balance' })
    expect(spec.format).toBe('trial-balance')
    expect(spec.standards).toEqual(FORMAT_LAW['trial-balance'].standards)
    // trial-balance needs accounting·ledger·accounts — all standing ⇒ buildable
    expect(spec.buildable).toBe(true)
    expect(spec.missing).toEqual([])
  })

  it('legislation floors STRICTER than a standard — a SAF-T export requires auditor-grade (Наредба beats IFRS)', () => {
    const saft = collapseReport(mesh, { format: 'saf-t' })
    expect(saft.requiredTier).toBe('auditor-grade') // BG Наредба Н-18 / СУПТО → the top tier
    const tb = collapseReport(mesh, { format: 'trial-balance' })
    // trial-balance answers only to IFRS/GAAP → role-scoped, strictly below the legislation floor
    expect(saft.requiredTier).not.toBe(tb.requiredTier)
  })

  it('the collapse REFUSES over a gap rather than fabricate — missing atoms are named, not invented', () => {
    // income-statement needs a `revenue` atom this mesh does not have
    const inc = collapseReport(mesh, { format: 'income-statement' })
    expect(inc.buildable).toBe(false)
    expect(inc.missing).toContain('revenue')
  })

  it('permission is checked against the legal floor — the requester must clear it', () => {
    const asAuditor = collapseReport(mesh, { format: 'saf-t', requesterTier: 'auditor-grade' })
    const asOpen = collapseReport(mesh, { format: 'saf-t', requesterTier: 'open' })
    expect(asAuditor.permitted).toBe(true)
    expect(asOpen.permitted).toBe(false) // open cannot build a statutory document
  })

  it('buildableReports partitions the 8 formats into self-buildable vs gap-blocked', () => {
    const { buildable, blocked } = buildableReports(process.cwd(), mesh)
    expect(buildable.length + blocked.length).toBe((Object.keys(FORMAT_LAW) as ReportFormat[]).length)
    expect(buildable).toContain('trial-balance') // its atoms all stand in the fixture
    expect(blocked.some((b) => b.format === 'income-statement')).toBe(true)
  })

  it('the superposition magnitude is MEASURED, not asserted — the "impossible unless computed" number', () => {
    const mag = reportSuperpositionSize(process.cwd(), mesh)
    expect(mag.standards).toBe(3) // three distinct ids in the fixture
    expect(mag.pairwiseStandards).toBe(9) // S²
    expect(mag.fullSuperposition).toBe(3 * 4 * 4 * 14) // standards × collections × 4 ops × 14 readers
  })
})
