/**
 * СУПТО / Наредба Н-18 field factories — the reusable substrate (sequence
 * position 1) the fiscal collections compose. DRY: one definition for the УНП,
 * the 8-digit fiscal-device number, the 4-digit operator code, the fiscal-QR
 * payload — used by `fiscal-devices`, `sales`, `fiscal-receipts`,
 * `supto-operators`, `virtual-pos-terminals`.
 *
 * @standard BG Наредба-Н-18 §СУПТО
 * @see .claude/skills/supto/SKILL.md · src/naredba/n/18/unp/index.ts
 */

import type { Field } from 'payload'

/** The СУПТО sale/receipt status ring (open → closed → voided → reversed). */
export const saleStatusOptions = [
  { label: 'Open', value: 'open' },
  { label: 'Closed', value: 'closed' },
  { label: 'Voided', value: 'voided' },
  { label: 'Reversed', value: 'reversed' },
] as const

export * from './periods'
