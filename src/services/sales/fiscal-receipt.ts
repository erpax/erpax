/**
 * СУПТО fiscal receipt (касов бон) — the УНП-carrying receipt the software
 * submits to the fiscal device (ФУ) on a sale's completion.
 *
 * Наредба Н-18: "the software must submit the УНП of the sale to the fiscal
 * device for inclusion in the fiscal receipt." This module is the *matter side*
 * of that membrane ([[hooks]]/[[identity]]): a pure receipt builder (carrying
 * the УНП) + a pluggable `FiscalDeviceDriver` interface whose real
 * implementation is the physical device protocol (injected per deployment, the
 * same optional-driver pattern as the country-client extractors). The default
 * `noopFiscalDeviceDriver` echoes a deterministic receipt number so the flow is
 * exercisable without hardware.
 *
 * @standard BG Наредба-Н-18 §СУПТО касов-бон УНП-on-receipt
 * @audit ISO-19011:2018 audit-trail
 * @see .claude/skills/supto/SKILL.md · src/standards/naredba-n-18/unp.ts
 */

import { isValidUnp } from '@/standards/naredba-n-18/unp'
import { bgTaxGroupForRate, type BgTaxGroup } from '@/standards/naredba-n-18/vat-groups'
import { calculateBgVat } from '@/services/country-clients/bg-vat'

export interface FiscalReceiptLine {
  readonly description: string
  readonly quantity: number
  readonly unitPrice: number
  readonly vatRate: number
  readonly amount: number
}

/** Per-rate VAT subtotal — the receipt's tax breakdown (Наредба Н-18 §касов-бон). */
export interface FiscalVatSubtotal {
  /** Fiscal tax-group letter (А/Б/В/Г) — Наредба Н-18 Приложение № 1. */
  readonly group: BgTaxGroup
  readonly rate: number
  readonly net: number
  readonly vat: number
}

export interface FiscalReceipt {
  /** The УНП printed on the receipt — the regulatory coordinate tying sale↔receipt. */
  readonly unp: string
  readonly fiscalDeviceNumber: string
  readonly operatorCode: string
  readonly issuedAt: string
  readonly currency: string
  readonly paymentType: string
  readonly lines: ReadonlyArray<FiscalReceiptLine>
  readonly total: number
  /** VAT computed per line on the net amount (cents). */
  readonly vatTotal: number
  /** VAT subtotals grouped by rate — the receipt's tax breakdown. */
  readonly vatBreakdown: ReadonlyArray<FiscalVatSubtotal>
}

export interface FiscalSaleInput {
  readonly unp?: string
  readonly fiscalDeviceNumber?: string
  readonly operatorCode?: string
  readonly currency?: string
  readonly paymentType?: string
  readonly total?: number
  readonly items?: ReadonlyArray<{
    description?: string
    quantity?: number
    unitPrice?: number
    vatRate?: number
    amount?: number
  }>
}

/** The membrane to the physical ФУ — real impl injected per deployment. */
export interface FiscalDeviceDriver {
  issue(receipt: FiscalReceipt): Promise<{ receiptNumber: string }>
}

/** Dev/test driver: echoes a deterministic receipt number derived from the УНП. */
export const noopFiscalDeviceDriver: FiscalDeviceDriver = {
  issue: async (receipt) => ({ receiptNumber: `RCP-${receipt.unp}` }),
}

/**
 * Group items into per-rate VAT subtotals via the canonical BG calculator
 * (round-half-away-from-zero per НАП). Shared by the fiscal receipt and the
 * standardized audit file so both speak one VAT engine.
 */
export function vatBreakdownForItems(
  items: ReadonlyArray<{ vatRate?: number; amount?: number }>,
): FiscalVatSubtotal[] {
  const byRate = new Map<number, FiscalVatSubtotal>()
  for (const i of items) {
    const rate = i.vatRate ?? 0
    const amount = i.amount ?? 0
    const { vatAmountMinor } = calculateBgVat({ netAmountMinor: amount, rateOverride: rate })
    const prev = byRate.get(rate)
    byRate.set(rate, {
      group: bgTaxGroupForRate(rate),
      rate,
      net: (prev?.net ?? 0) + amount,
      vat: (prev?.vat ?? 0) + vatAmountMinor,
    })
  }
  return [...byRate.values()].sort((a, b) => a.rate - b.rate)
}

/** Total VAT (cents) across a sale's items — the breakdown summed. */
export const vatTotalForItems = (items: ReadonlyArray<{ vatRate?: number; amount?: number }>): number =>
  vatBreakdownForItems(items).reduce((sum, g) => sum + g.vat, 0)

/** Build the fiscal receipt for a sale, carrying its УНП. Throws if the УНП is absent/invalid. */
export function buildFiscalReceipt(sale: FiscalSaleInput, issuedAt: string | Date = new Date()): FiscalReceipt {
  if (typeof sale.unp !== 'string' || !isValidUnp(sale.unp)) {
    throw new Error(`Наредба Н-18: cannot issue a fiscal receipt without a valid УНП (got '${String(sale.unp)}').`)
  }
  if (typeof sale.fiscalDeviceNumber !== 'string') {
    throw new Error('Наредба Н-18: fiscal receipt requires the fiscal-device number.')
  }
  const lines: FiscalReceiptLine[] = (sale.items ?? []).map((i) => ({
    description: i.description ?? '',
    quantity: i.quantity ?? 1,
    unitPrice: i.unitPrice ?? 0,
    vatRate: i.vatRate ?? 0,
    amount: i.amount ?? 0,
  }))
  // VAT per line through the canonical BG calculator (round-half-away-from-zero
  // per НАП — correct for сторно/negative lines too), grouped by rate.
  const vatBreakdown = vatBreakdownForItems(lines)
  const vatTotal = vatBreakdown.reduce((sum, g) => sum + g.vat, 0)
  return {
    unp: sale.unp,
    fiscalDeviceNumber: sale.fiscalDeviceNumber,
    operatorCode: sale.operatorCode ?? '0000',
    issuedAt: (issuedAt instanceof Date ? issuedAt : new Date(issuedAt)).toISOString(),
    currency: sale.currency ?? 'BGN',
    paymentType: sale.paymentType ?? 'cash',
    lines,
    total: sale.total ?? lines.reduce((s, l) => s + l.amount, 0),
    vatTotal,
    vatBreakdown,
  }
}

/** Build + submit the receipt to the device; returns the assigned касов бон number. */
export async function issueReceiptForSale(
  sale: FiscalSaleInput,
  driver: FiscalDeviceDriver = noopFiscalDeviceDriver,
  issuedAt: string | Date = new Date(),
): Promise<{ receipt: FiscalReceipt; receiptNumber: string }> {
  const receipt = buildFiscalReceipt(sale, issuedAt)
  const { receiptNumber } = await driver.issue(receipt)
  return { receipt, receiptNumber }
}
