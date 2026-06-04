/**
 * СУПТО virtual fiscal device — the Наредба Н-18 *alternative regime* for online
 * sales paid remotely by card (virtual POS). Instead of a hardware ФУ + paper
 * касов бон, the software issues an **electronic receipt** document and emails
 * it to the customer; reporting to НАП is the monthly standardized audit file
 * (see `submit-audit-file`), not a per-sale device call.
 *
 * The e-receipt carries: the unique order/sale number (УНП), the virtual-POS
 * terminal number, a НАП-style fiscal QR payload, the lines + total. This is a
 * `FiscalDeviceDriver` ([[hooks]] membrane) implementation — same interface as a
 * physical device, so the sale flow is identical; only the driver differs. No
 * hardware, no external blocker: the alternative regime is pure software + the
 * monthly audit file.
 *
 * @standard BG Наредба-Н-18 §алтернативен-режим e-shop-card-payments
 * @standard BG Наредба-Н-18 §Приложение-38 (monthly reporting — the audit file)
 * @audit ISO-19011:2018 audit-trail
 * @see src/services/sales/fiscal-receipt.ts · src/services/sales/submit-audit-file.ts
 */

import type { FiscalDeviceDriver, FiscalReceipt } from '@/sale/fiscal-receipt'

export interface ElectronicReceipt {
  /** The unique sales number (УНП) — the receipt's regulatory identifier. */
  readonly unp: string
  /** In the alternative regime the УНП is the customer-facing receipt number. */
  readonly receiptNumber: string
  readonly virtualPosTerminal: string
  /** НАП-style fiscal QR payload. */
  readonly qrData: string
  readonly issuedAt: string
  readonly total: number
  readonly currency: string
  readonly paymentType: string
  readonly lines: FiscalReceipt['lines']
}

/**
 * Build the НАП fiscal-QR payload: `<device>*<УНП>*<date>*<time>*<sum>`.
 * Amounts are cents in erpax → rendered as currency units with two decimals.
 */
export function buildReceiptQrData(receipt: FiscalReceipt): string {
  const dt = new Date(receipt.issuedAt)
  const iso = dt.toISOString()
  const date = iso.slice(0, 10)
  const time = iso.slice(11, 19)
  const sum = (receipt.total / 100).toFixed(2)
  return [receipt.fiscalDeviceNumber, receipt.unp, date, time, sum].join('*')
}

/** Project a fiscal receipt into the alternative-regime electronic receipt. */
export function buildElectronicReceipt(
  receipt: FiscalReceipt,
  opts: { virtualPosTerminal: string },
): ElectronicReceipt {
  return {
    unp: receipt.unp,
    receiptNumber: receipt.unp,
    virtualPosTerminal: opts.virtualPosTerminal,
    qrData: buildReceiptQrData(receipt),
    issuedAt: receipt.issuedAt,
    total: receipt.total,
    currency: receipt.currency,
    paymentType: receipt.paymentType,
    lines: receipt.lines,
  }
}

/**
 * Alternative-regime virtual fiscal device — issues an electronic receipt with
 * no hardware. `deliver` is the pluggable e-mail/notification membrane (the
 * customer must receive the document with its QR + virtual-POS number).
 */
export function virtualFiscalDeviceDriver(opts: {
  virtualPosTerminal: string
  deliver?: (receipt: ElectronicReceipt) => Promise<void>
}): FiscalDeviceDriver {
  return {
    issue: async (fiscalReceipt) => {
      const eReceipt = buildElectronicReceipt(fiscalReceipt, { virtualPosTerminal: opts.virtualPosTerminal })
      if (opts.deliver) await opts.deliver(eReceipt)
      return { receiptNumber: eReceipt.receiptNumber }
    },
  }
}
