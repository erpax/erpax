/**
 * Fiscal-receipt tests — mirror the supto law: the receipt carries the УНП,
 * computes VAT per line, and goes through the device driver membrane.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard BG Наредба-Н-18 §СУПТО касов-бон
 * @see src/services/sales/fiscal-receipt.ts
 */

import { describe, it, expect, vi } from 'vitest'
import {
  buildFiscalReceipt,
  issueReceiptForSale,
  noopFiscalDeviceDriver,
  type FiscalSaleInput,
} from './fiscal-receipt'

const SALE: FiscalSaleInput = {
  unp: '12345678-0042-0000001',
  fiscalDeviceNumber: '12345678',
  operatorCode: '0042',
  currency: 'BGN',
  paymentType: 'card',
  total: 1_200_00,
  items: [{ description: 'Widget', quantity: 2, unitPrice: 600_00, vatRate: 20, amount: 1_000_00 }],
}

describe('buildFiscalReceipt', () => {
  it('carries the УНП and device number on the receipt', () => {
    const r = buildFiscalReceipt(SALE, '2026-04-10T09:00:00Z')
    expect(r.unp).toBe('12345678-0042-0000001')
    expect(r.fiscalDeviceNumber).toBe('12345678')
    expect(r.issuedAt).toBe('2026-04-10T09:00:00.000Z')
  })

  it('computes VAT per line on the net amount', () => {
    const r = buildFiscalReceipt(SALE)
    expect(r.vatTotal).toBe(200_00) // 1000.00 * 20%
    expect(r.lines).toHaveLength(1)
  })

  it('groups VAT into per-rate subtotals (mixed 20%/9%/0%)', () => {
    const r = buildFiscalReceipt({
      ...SALE,
      items: [
        { description: 'Std', vatRate: 20, amount: 1_000_00 },
        { description: 'Reduced', vatRate: 9, amount: 500_00 },
        { description: 'Zero', vatRate: 0, amount: 200_00 },
      ],
    })
    expect(r.vatBreakdown).toEqual([
      { rate: 0, net: 200_00, vat: 0 },
      { rate: 9, net: 500_00, vat: 45_00 },
      { rate: 20, net: 1_000_00, vat: 200_00 },
    ])
    expect(r.vatTotal).toBe(245_00)
  })

  it('rounds сторно (negative) VAT away from zero per НАП', () => {
    // -50 * 9% = -4.50 → -5 (away from zero), where Math.round would give -4.
    const r = buildFiscalReceipt({ ...SALE, items: [{ vatRate: 9, amount: -50 }] })
    expect(r.vatTotal).toBe(-5)
  })

  it('routes blanks to identity elements (currency/payment/operator)', () => {
    const r = buildFiscalReceipt({ unp: '12345678-0042-0000001', fiscalDeviceNumber: '12345678' })
    expect(r.currency).toBe('BGN')
    expect(r.paymentType).toBe('cash')
    expect(r.operatorCode).toBe('0000')
  })

  it('refuses to issue without a valid УНП', () => {
    expect(() => buildFiscalReceipt({ fiscalDeviceNumber: '12345678' })).toThrow(/valid УНП/)
    expect(() => buildFiscalReceipt({ unp: 'bad', fiscalDeviceNumber: '12345678' })).toThrow(/valid УНП/)
  })

  it('requires the fiscal-device number', () => {
    expect(() => buildFiscalReceipt({ unp: '12345678-0042-0000001' })).toThrow(/fiscal-device number/)
  })
})

describe('issueReceiptForSale', () => {
  it('builds + submits through the driver, returning the receipt number', async () => {
    const { receiptNumber, receipt } = await issueReceiptForSale(SALE)
    expect(receiptNumber).toBe('RCP-12345678-0042-0000001')
    expect(receipt.unp).toBe('12345678-0042-0000001')
  })

  it('passes the built receipt to an injected device driver', async () => {
    const driver = { issue: vi.fn().mockResolvedValue({ receiptNumber: 'FU-777' }) }
    const { receiptNumber } = await issueReceiptForSale(SALE, driver)
    expect(receiptNumber).toBe('FU-777')
    expect(driver.issue).toHaveBeenCalledWith(expect.objectContaining({ unp: '12345678-0042-0000001' }))
  })

  it('the noop driver echoes a deterministic number from the УНП', async () => {
    expect((await noopFiscalDeviceDriver.issue(buildFiscalReceipt(SALE))).receiptNumber).toBe(
      'RCP-12345678-0042-0000001',
    )
  })
})
