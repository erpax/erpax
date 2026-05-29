/**
 * Virtual fiscal device tests — the alternative regime issues an electronic
 * receipt (УНП + QR + virtual-POS number), delivered, with no hardware.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard BG Наредба-Н-18 §алтернативен-режим
 * @see src/services/supto/virtual-device.ts
 */

import { describe, it, expect, vi } from 'vitest'
import { buildFiscalReceipt, type FiscalSaleInput } from './fiscal-receipt'
import { buildReceiptQrData, buildElectronicReceipt, virtualFiscalDeviceDriver } from './virtual-device'

const SALE: FiscalSaleInput = {
  unp: '12345678-0042-0000001',
  fiscalDeviceNumber: '12345678',
  operatorCode: '0042',
  currency: 'BGN',
  paymentType: 'card',
  total: 1_200_00,
  items: [{ description: 'Widget', quantity: 2, unitPrice: 600_00, vatRate: 20, amount: 1_000_00 }],
}
const receipt = buildFiscalReceipt(SALE, '2026-04-10T09:30:15Z')

describe('buildReceiptQrData', () => {
  it('emits the НАП fiscal-QR payload device*УНП*date*time*sum (cents → units)', () => {
    expect(buildReceiptQrData(receipt)).toBe('12345678*12345678-0042-0000001*2026-04-10*09:30:15*1200.00')
  })
})

describe('buildElectronicReceipt', () => {
  const e = buildElectronicReceipt(receipt, { virtualPosTerminal: 'VPOS-001' })

  it('uses the УНП as the receipt number and carries the virtual-POS terminal', () => {
    expect(e.receiptNumber).toBe('12345678-0042-0000001')
    expect(e.unp).toBe('12345678-0042-0000001')
    expect(e.virtualPosTerminal).toBe('VPOS-001')
  })

  it('includes the QR payload + lines + total', () => {
    expect(e.qrData).toContain('12345678-0042-0000001')
    expect(e.lines).toHaveLength(1)
    expect(e.total).toBe(1_200_00)
  })
})

describe('virtualFiscalDeviceDriver', () => {
  it('issues an electronic receipt (no hardware) and returns the receipt number', async () => {
    const driver = virtualFiscalDeviceDriver({ virtualPosTerminal: 'VPOS-001' })
    expect((await driver.issue(receipt)).receiptNumber).toBe('12345678-0042-0000001')
  })

  it('delivers the e-receipt document to the customer membrane', async () => {
    const deliver = vi.fn().mockResolvedValue(undefined)
    const driver = virtualFiscalDeviceDriver({ virtualPosTerminal: 'VPOS-001', deliver })
    await driver.issue(receipt)
    expect(deliver).toHaveBeenCalledWith(
      expect.objectContaining({ unp: '12345678-0042-0000001', virtualPosTerminal: 'VPOS-001', qrData: expect.any(String) }),
    )
  })

  it('plugs into issueReceiptForSale as a drop-in FiscalDeviceDriver', async () => {
    const { issueReceiptForSale } = await import('./fiscal-receipt')
    const driver = virtualFiscalDeviceDriver({ virtualPosTerminal: 'VPOS-001' })
    const { receiptNumber } = await issueReceiptForSale(SALE, driver, '2026-04-10T09:30:15Z')
    expect(receiptNumber).toBe('12345678-0042-0000001')
  })
})
