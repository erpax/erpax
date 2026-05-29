/**
 * СУПТО / Наредба Н-18 field factories — the reusable substrate (sequence
 * position 1) the fiscal collections compose. DRY: one definition for the УНП,
 * the 8-digit fiscal-device number, the 4-digit operator code, the fiscal-QR
 * payload — used by `fiscal-devices`, `sales`, `fiscal-receipts`,
 * `supto-operators`, `virtual-pos-terminals`.
 *
 * @standard BG Наредба-Н-18 §СУПТО
 * @see .claude/skills/supto/SKILL.md · src/standards/naredba-n-18/unp.ts
 */

import type { Field } from 'payload'

/** The УНП text field — unique, indexed, assigned + frozen by the sequence hook. */
export const unpField = (): Field => ({
  name: 'unp',
  type: 'text',
  unique: true,
  index: true,
  admin: { readOnly: true, description: 'Unique sales number (УНП) — assigned + frozen on create.' },
})

/** 8-digit fiscal-device (ФУ) individual number — first УНП segment. */
export const fiscalDeviceNumberField = (required = true): Field => ({
  name: 'fiscalDeviceNumber',
  type: 'text',
  required,
  index: true,
  validate: (value: string | string[] | null | undefined) =>
    (!required && (value == null || value === '')) || (typeof value === 'string' && /^\d{8}$/.test(value))
      ? true
      : 'Fiscal-device number must be exactly 8 digits (Наредба Н-18).',
  admin: { description: '8-digit ФУ individual number — first УНП segment.' },
})

/** 4-digit operator code — second УНП segment (defaults to the 0000 identity element). */
export const operatorCodeField = (): Field => ({
  name: 'operatorCode',
  type: 'text',
  defaultValue: '0000',
  validate: (value: string | string[] | null | undefined) =>
    value == null || (typeof value === 'string' && /^\d{1,4}$/.test(value))
      ? true
      : 'Operator code must be up to 4 digits.',
})

/** The НАП fiscal-QR payload string carried on an electronic receipt. */
export const fiscalQrField = (): Field => ({
  name: 'qrData',
  type: 'text',
  admin: { readOnly: true, description: 'НАП fiscal-QR payload (device*УНП*date*time*sum).' },
})

/** The СУПТО sale/receipt status ring (open → closed → voided → reversed). */
export const saleStatusOptions = [
  { label: 'Open', value: 'open' },
  { label: 'Closed', value: 'closed' },
  { label: 'Voided', value: 'voided' },
  { label: 'Reversed', value: 'reversed' },
] as const
