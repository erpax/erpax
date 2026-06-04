/**
 * Daily-report tests — per-ФУ daily turnover: count, gross, VAT by group, by
 * payment type; reversals net; foreign device/day rows excluded.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard BG Наредба-Н-18 §дневен-отчет · §Приложение-1
 * @see src/services/sales/daily-report.ts
 */

import { describe, it, expect } from 'vitest'
import { buildDailyReport, type DailySaleInput } from '@/sale/daily-report'

const SALES: DailySaleInput[] = [
  { fiscalDeviceNumber: '12345678', saleDate: '2026-04-10T09:00:00Z', total: 1_200_00, paymentType: 'card', items: [{ vatRate: 20, amount: 1_000_00 }] },
  { fiscalDeviceNumber: '12345678', saleDate: '2026-04-10T18:00:00Z', total: 545_00, paymentType: 'cash', items: [{ vatRate: 9, amount: 500_00 }] },
  // сторно of the first sale (negative)
  { fiscalDeviceNumber: '12345678', saleDate: '2026-04-10T19:00:00Z', total: -1_200_00, paymentType: 'card', items: [{ vatRate: 20, amount: -1_000_00 }] },
  // different day — excluded
  { fiscalDeviceNumber: '12345678', saleDate: '2026-04-11T09:00:00Z', total: 999_00, paymentType: 'cash', items: [{ vatRate: 20, amount: 800_00 }] },
  // different device — excluded
  { fiscalDeviceNumber: '87654321', saleDate: '2026-04-10T09:00:00Z', total: 700_00, paymentType: 'card', items: [{ vatRate: 20, amount: 600_00 }] },
]

describe('buildDailyReport', () => {
  const r = buildDailyReport({ sales: SALES, fiscalDeviceNumber: '12345678', date: '2026-04-10' })

  it('counts only the device + day rows', () => {
    expect(r.count).toBe(3) // two sales + one reversal
  })

  it('nets gross turnover (reversal subtracts)', () => {
    // 1200.00 + 545.00 - 1200.00 = 545.00
    expect(r.grossTotal).toBe(545_00)
  })

  it('nets VAT and groups by tax group (А/Б/В/Г)', () => {
    // 20%: 1000.00 - 1000.00 = 0 net, 0 vat ; 9%: 500.00 → 45.00 vat
    expect(r.vatTotal).toBe(45_00)
    expect(r.vatByGroup).toEqual([
      { group: 'Г', rate: 9, net: 500_00, vat: 45_00 },
      { group: 'Б', rate: 20, net: 0, vat: 0 },
    ])
  })

  it('splits turnover by payment type', () => {
    // card: 1200 - 1200 = 0 ; cash: 545
    expect(r.byPaymentType).toEqual({ card: 0, cash: 545_00 })
  })
})
