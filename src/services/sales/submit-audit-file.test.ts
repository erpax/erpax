/**
 * Audit-file submission tests — collect the period's sales, build the report,
 * submit the XML through the pluggable submitter.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard BG Наредба-Н-18 §Приложение-38
 * @see src/services/sales/submit-audit-file.ts
 */

import { describe, it, expect, vi } from 'vitest'
import type { Payload } from 'payload'
import { collectSales, submitSalesAuditFile } from './submit-audit-file'

const DOCS = [
  { unp: '12345678-0042-0000001', fiscalDeviceNumber: '12345678', operatorCode: '0042', saleDate: '2026-04-10T09:00:00Z', total: 500_00, status: 'closed' },
  { unp: '12345678-0042-0000002', fiscalDeviceNumber: '12345678', operatorCode: '0042', saleDate: '2026-04-20T10:00:00Z', total: 1_200_00, status: 'closed', reversalOf: { id: 'x' } },
]

const mockPayload = (docs: Array<Record<string, unknown>> = DOCS) => ({ find: vi.fn().mockResolvedValue({ docs }) })
const asPayload = (m: ReturnType<typeof mockPayload>) => m as unknown as Payload

describe('collectSales', () => {
  it('queries closed sales for the tenant + period, mapping relationship ids', async () => {
    const m = mockPayload()
    const sales = await collectSales(asPayload(m), { tenant: 't1', periodStart: '2026-04-01', periodEnd: '2026-04-30' })
    expect(sales).toHaveLength(2)
    expect(sales[1].reversalOf).toBe('x') // relationship object → id
    expect(m.find).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'sales',
        where: {
          tenant: { equals: 't1' },
          saleDate: { greater_than_equal: '2026-04-01', less_than_equal: '2026-04-30' },
        },
        pagination: false,
      }),
    )
  })

  it('derives per-sale VAT from the sale items (canonical BG calculator)', async () => {
    const m = mockPayload([
      { unp: '12345678-0042-0000001', fiscalDeviceNumber: '12345678', saleDate: '2026-04-10T09:00:00Z', total: 1_200_00, items: [{ vatRate: 20, amount: 1_000_00 }, { vatRate: 9, amount: 500_00 }] },
    ])
    const sales = await collectSales(asPayload(m), { tenant: 't1', periodStart: '2026-04-01', periodEnd: '2026-04-30' })
    expect(sales[0].vatTotal).toBe(245_00) // 1000*20% + 500*9%
  })
})

describe('submitSalesAuditFile', () => {
  it('builds the report + XML and submits via the pluggable submitter', async () => {
    const m = mockPayload()
    const submit = vi.fn().mockResolvedValue({ status: 200 })
    const { report, xml, submission } = await submitSalesAuditFile(asPayload(m), {
      tenant: 't1',
      periodStart: '2026-04-01',
      periodEnd: '2026-04-30',
      tenantEik: '123456789',
      submit,
    })
    expect(report.count).toBe(2)
    expect(report.controlSum).toBe(1_700_00)
    expect(xml).toContain('<AuditFile')
    expect(submit).toHaveBeenCalledWith(xml, report)
    expect(submission).toEqual({ status: 200 })
  })

  it('builds without submitting when no submitter is given', async () => {
    const m = mockPayload([])
    const { report, submission } = await submitSalesAuditFile(asPayload(m), {
      tenant: 't1',
      periodStart: '2026-04-01',
      periodEnd: '2026-04-30',
    })
    expect(report.count).toBe(0)
    expect(submission).toBeUndefined()
  })
})
