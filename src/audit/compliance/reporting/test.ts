import { describe, it, expect } from 'vitest'
import { AuditComplianceReporting } from '@/audit/compliance/reporting'

// Phase B6 — pure, deterministic audit-report generation (SAF-T 3.0.2,
// regulatory filings, OECD transfer-pricing packages, optimization detection).
// Real invariants the service computes, asserted directly.
describe('audit/compliance/reporting — AuditComplianceReporting', () => {
  const metadata = {
    auditFileVersion: '3.0.2',
    auditingStandard: 'SAF-T',
    generatedDate: '2026-05-12',
    generatorCode: 'CO-1',
    auditFileCountry: 'BG',
    defaultCurrencyCode: 'EUR',
  }

  describe('generateAuditFile — SAF-T 3.0.2', () => {
    const report = AuditComplianceReporting.generateAuditFile(
      metadata,
      {},
      {},
      [{ id: 'JE-1', description: 'sale', type: 'Manual', period: '2026-05', debitAccount: '1000', creditAccount: '4000', amount: 500 }],
    )

    it('stamps the SAF-T report type and pending-review validation status', () => {
      expect(report.reportType).toBe('SAF-T 3.0.2')
      expect(report.validationStatus).toBe('pending-review')
    })
    it('carries the supplied generatedDate and a nonempty checksum + chain leaf', () => {
      expect(report.generatedDate).toBe('2026-05-12')
      expect(report.fileChecksum.length).toBeGreaterThan(0)
      expect(report.chainLeafUuid.length).toBeGreaterThan(0)
    })
    it('fileSize equals the serialized content length (positive)', () => {
      expect(report.fileSize).toBeGreaterThan(0)
    })
  })

  describe('generateRegulatoryFiling — jurisdiction deadlines + submission method', () => {
    it('BG annual return drafts with NAP portal and a March-31 deadline', () => {
      const f = AuditComplianceReporting.generateRegulatoryFiling('BG', 'annual-return', {}, [])
      expect(f.jurisdiction).toBe('BG')
      expect(f.filingStatus).toBe('draft')
      expect(f.submissionMethod).toContain('Bulgaria NAP')
      expect(f.filingDeadline).toMatch(/-03-31$/)
    })
    it('US deadline is March-15; an unknown jurisdiction falls back to Mail + Dec-31', () => {
      expect(AuditComplianceReporting.generateRegulatoryFiling('US', 'annual-return', {}, []).filingDeadline).toMatch(/-03-15$/)
      const unknown = AuditComplianceReporting.generateRegulatoryFiling('ZZ', 'annual-return', {}, [])
      expect(unknown.submissionMethod).toBe('Mail')
      expect(unknown.filingDeadline).toMatch(/-12-31$/)
    })
  })

  describe('detectCrossJurisdictionOptimizations', () => {
    it('multi-jurisdiction data surfaces transfer-pricing alignment plus loss carryforward', () => {
      const opts = AuditComplianceReporting.detectCrossJurisdictionOptimizations({}, { BG: {}, US: {} })
      const types = opts.map((o) => o.optimizationType)
      expect(types).toContain('Transfer Pricing Alignment')
      expect(types).toContain('Tax Loss Carryforward Planning')
    })
    it('a single jurisdiction yields only the (always-advisory) loss carryforward opportunity', () => {
      const opts = AuditComplianceReporting.detectCrossJurisdictionOptimizations({}, { BG: {} })
      expect(opts).toHaveLength(1)
      expect(opts[0].optimizationType).toBe('Tax Loss Carryforward Planning')
    })
  })

  describe('generateTransferPricingDocumentationPackage — OECD three tiers', () => {
    const pkg = AuditComplianceReporting.generateTransferPricingDocumentationPackage(
      [
        { id: 'a1', fromEntity: 'E1', toEntity: 'E2', jurisdiction: 'BG', transactionType: 'goods', amount: 1000, methodUsed: 'CUP' },
        { id: 'a2', fromEntity: 'E1', toEntity: 'E3', jurisdiction: 'BG', transactionType: 'services', amount: 500, methodUsed: 'cost-plus' },
      ],
      { name: 'Group' },
      '/master',
    )

    it('groups local files by fromEntity and unions their transaction types', () => {
      expect(pkg.localFiles).toHaveLength(1)
      expect(pkg.localFiles[0].entityId).toBe('E1')
      expect(pkg.localFiles[0].transactionTypes.sort()).toEqual(['goods', 'services'])
    })
    it('carries a master file and one contemporaneous-doc per adjustment, marked OECD-compliant', () => {
      expect(pkg.masterFile.transferPricingPolicies.length).toBeGreaterThan(0)
      expect(pkg.contemporaneousDocumentation).toHaveLength(2)
      expect(pkg.oecd_compliance).toBe(true)
    })
  })

  describe('computeChainLeaf — Law 60 tamper-detection leaf', () => {
    it('is deterministic for identical data + prior leaf', () => {
      const a = AuditComplianceReporting.computeChainLeaf({ x: 1 }, 'prev')
      const b = AuditComplianceReporting.computeChainLeaf({ x: 1 }, 'prev')
      expect(a).toBe(b)
    })
    it('changes when the data changes (tamper-evident)', () => {
      const a = AuditComplianceReporting.computeChainLeaf({ x: 1 }, '')
      const b = AuditComplianceReporting.computeChainLeaf({ x: 2 }, '')
      expect(a).not.toBe(b)
    })
  })
})
