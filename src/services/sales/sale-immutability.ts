/**
 * СУПТО sale immutability — Наредба Н-18 forbids deleting or modifying a
 * completed sale. Corrections happen ONLY via reversal (сторно), which is a
 * NEW sale that preserves the original (see `reverse-sale.ts` + the `reverse`
 * skill). This beforeChange hook freezes a sale's identity + money once it is
 * `closed`/`voided`/`reversed`: the only permitted update is the status
 * transition `closed → reversed` plus stamping the `reversedBy` back-link.
 *
 * Combined with `delete: () => false` on the collection and content-uuid Law 8
 * tamper detection, this gives the regulation's "no built-in delete; reversal
 * preserves the reversed data" guarantee.
 *
 * @standard BG Наредба-Н-18 §СУПТО no-delete · reversal-only · data-preservation
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §404 internal-controls
 * @see src/services/supto/reverse-sale.ts · .claude/skills/reverse/SKILL.md
 */

import type { CollectionBeforeChangeHook } from 'payload'

/** A completed sale is one of these — its content is frozen. */
const COMPLETED = new Set(['closed', 'voided', 'reversed'])

/** Fields that may NEVER change once a sale is completed. */
const FROZEN_FIELDS = [
  'unp',
  'unpSequence',
  'fiscalDeviceNumber',
  'operatorCode',
  'saleDate',
  'total',
  'currency',
  'items',
  'paymentType',
  'fiscalReceiptNumber',
] as const

export const enforceSaleImmutability: CollectionBeforeChangeHook = ({ data, operation, originalDoc }) => {
  if (operation !== 'update' || !originalDoc) return data
  const prevStatus = (originalDoc as { status?: unknown }).status
  if (typeof prevStatus !== 'string' || !COMPLETED.has(prevStatus)) return data

  const d = data as Record<string, unknown>
  const o = originalDoc as Record<string, unknown>

  for (const field of FROZEN_FIELDS) {
    if (field in d && JSON.stringify(d[field]) !== JSON.stringify(o[field])) {
      throw new Error(
        `Наредба Н-18: a completed sale is immutable — '${field}' cannot change on УНП ${String(o.unp)}. ` +
          `Issue a reversal (сторно) instead.`,
      )
    }
  }

  // Status may only advance completed → reversed (the сторно seal); no other transition.
  const nextStatus = d.status
  if (typeof nextStatus === 'string' && nextStatus !== prevStatus && nextStatus !== 'reversed') {
    throw new Error(
      `Наредба Н-18: a ${prevStatus} sale (УНП ${String(o.unp)}) may only transition to 'reversed', not '${nextStatus}'.`,
    )
  }

  return data
}
