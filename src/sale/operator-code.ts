/**
 * СУПТО operator-code derivation — feed the УНП's second segment (ZZZZ) from the
 * operator register, not a hand-typed literal. On CREATE, when a sale links an
 * `operators` row, its `code` becomes the sale's `operatorCode`; the УНП hook
 * then formats it into `XXXXXXXX-ZZZZ-NNNNNNN`. The operator register is the
 * source of truth for the code — the sale only references it (the `party` law:
 * one reference, the role/value resolved from the register, never re-keyed).
 *
 * Runs BEFORE `assignSaleUnpHook` (which consumes `operatorCode`). With no
 * linked operator, the field keeps its `0000` identity-element default.
 *
 * @standard BG Наредба-Н-18 §СУПТО operator-nomenclature УНП-second-segment
 * @audit ISO-19011:2018 audit-trail
 * @see src/services/sales/unp-sequence.ts · src/collections/Operators/index.ts
 */

import type { CollectionBeforeChangeHook } from 'payload'

/** Resolve a relationship value to its id (string, number, or `{ id }` object). */
function relId(v: unknown): string | undefined {
  if (typeof v === 'string' || typeof v === 'number') return String(v)
  if (v && typeof v === 'object' && 'id' in v) {
    const id = (v as { id?: unknown }).id
    if (typeof id === 'string' || typeof id === 'number') return String(id)
  }
  return undefined
}

/**
 * beforeChange hook factory. `operatorsSlug` is the operator register the УНП
 * code is read from. Idempotent: skips updates and device-less/operatorless drafts.
 */
export const deriveSaleOperatorCodeHook =
  (operatorsSlug = 'operators'): CollectionBeforeChangeHook =>
  async ({ data, operation, req }) => {
    if (operation !== 'create') return data
    const d = data as { operator?: unknown; operatorCode?: unknown }
    const operatorId = relId(d.operator)
    if (!operatorId) return data // no linked operator — keep the 0000 default

    const op = await req.payload.findByID({
      collection: operatorsSlug as never,
      id: operatorId,
      overrideAccess: true,
      req,
    })
    const code = (op as { code?: unknown } | null)?.code
    if (typeof code === 'string' && /^\d{1,4}$/.test(code)) {
      d.operatorCode = code // formatUnp pads to the 4-digit ZZZZ segment
    }
    return data
  }
