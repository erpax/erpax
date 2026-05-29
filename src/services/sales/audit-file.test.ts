/**
 * СУПТО audit-file tests — mirror the Приложение-38 law: deterministic rows,
 * net control sum (reversals subtract), well-formed XML.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard BG Наредба-Н-18 §Приложение-38
 * @see src/services/sales/audit-file.ts
 */

import { describe, it, expect } from 'vitest'
import { buildSalesAuditReport, toSalesAuditXml, type SalesAuditInput } from './audit-file'

const SALES: SalesAuditInput[] = [
  { unp: '12345678-0042-0000002', fiscalDeviceNumber: '12345678', operatorCode: '0042', saleDate: '2026-04-20T10:00:00Z', total: 1_200_00, vatTotal: 200_00, currency: 'BGN', paymentType: 'card', status: 'closed', fiscalReceiptNumber: 'R-2' },
  { unp: '12345678-0042-0000001', fiscalDeviceNumber: '12345678', operatorCode: '0042', saleDate: '2026-04-10T09:00:00Z', total: 500_00, vatTotal: 100_00, status: 'closed' },
  { unp: '12345678-0042-0000003', fiscalDeviceNumber: '12345678', operatorCode: '0042', saleDate: '2026-04-21T11:00:00Z', total: -1_200_00, vatTotal: -200_00, status: 'closed', reversalOf: '12345678-0042-0000002' },
]

describe('buildSalesAuditReport', () => {
  const report = buildSalesAuditReport({ sales: SALES, periodStart: '2026-04-01', periodEnd: '2026-04-30', tenantEik: '123456789' })

  it('counts every sale', () => {
    expect(report.count).toBe(3)
  })

  it('nets the control sum (reversal subtracts)', () => {
    // 500.00 + 1200.00 - 1200.00 = 500.00
    expect(report.controlSum).toBe(500_00)
  })

  it('nets the VAT control sum (reversal subtracts)', () => {
    // 200.00 + 100.00 - 200.00 = 100.00
    expect(report.vatControlSum).toBe(100_00)
  })

  it('sorts rows deterministically by УНП', () => {
    expect(report.rows.map((r) => r.unp)).toEqual([
      '12345678-0042-0000001',
      '12345678-0042-0000002',
      '12345678-0042-0000003',
    ])
  })

  it('routes blanks to identity elements (operator/currency/payment)', () => {
    const r1 = report.rows[0]
    expect(r1.currency).toBe('BGN')
    expect(r1.paymentType).toBe('cash')
    expect(r1.fiscalReceiptNumber).toBeNull()
  })

  it('carries the reversal back-link', () => {
    const rev = report.rows.find((r) => r.total < 0)
    expect(rev?.reversalOf).toBe('12345678-0042-0000002')
  })
})

describe('toSalesAuditXml', () => {
  const report = buildSalesAuditReport({ sales: SALES, periodStart: '2026-04-01', periodEnd: '2026-04-30', tenantEik: '123456789' })
  const xml = toSalesAuditXml(report)

  it('emits a well-formed header with count + control sum', () => {
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(xml).toContain('<Count>3</Count>')
    expect(xml).toContain('<ControlSum>50000</ControlSum>')
    expect(xml).toContain('<VatControlSum>10000</VatControlSum>')
    expect(xml).toContain('<TenantEIK>123456789</TenantEIK>')
  })

  it('emits one <Sale> per row carrying the УНП + VAT', () => {
    expect((xml.match(/<Sale>/g) ?? []).length).toBe(3)
    expect(xml).toContain('<UNP>12345678-0042-0000001</UNP>')
    expect(xml).toContain('<Vat>20000</Vat>')
  })
})
