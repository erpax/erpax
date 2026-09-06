/**
 * СУПТО fiscal-reference validation — a sale must be issued on a registered,
 * active ФУ by a registered, active operator. On CREATE, reject a sale that
 * links a *decommissioned* fiscal-device or operator (Наредба Н-18: a
 * deregistered ФУ cannot issue receipts; a decommissioned operator cannot sell).
 *
 * Lenient by design: only references that are PRESENT are validated — a
 * device-less / operator-less draft passes, so tenant setup and seed flows are
 * never blocked. This ties the fiscal-device + operator registers into the sale
 * lifecycle (the `party` law: validate the referenced register row, don't copy
 * its state onto the sale).
 *
 * @standard BG Наредба-Н-18 §СУПТО fiscal-device-register · operator-nomenclature
 * @audit ISO-19011:2018 audit-trail
 * @see src/fiscal/devices/index.ts · src/operators/index.ts
 */

import type { CollectionBeforeChangeHook, PayloadRequest } from 'payload'
import { relationId as relId } from '@/field/relation'

/** Resolve a relationship value to its id (string, number, or `{ id }` object). */

/** Throw if the referenced register row exists and is decommissioned. */
async function assertNotDecommissioned(
  req: PayloadRequest,
  collection: string,
  id: string | number | undefined,
  label: string,
): Promise<void> {
  if (id === undefined) return
  const doc = await req.payload.findByID({ collection: collection as never, id, overrideAccess: true, req })
  const status = (doc as { status?: unknown } | null)?.status
  if (status === 'decommissioned') {
    throw new Error(`Наредба Н-18: cannot issue a sale on a decommissioned ${label}.`)
  }
}

/**
 * beforeChange hook factory. Validates the sale's `fiscalDevice` + `operator`
 * relationships are not decommissioned. Slugs default to the registers.
 */
export const validateReferenceHook =
  (opts: { devicesSlug?: string; operatorsSlug?: string } = {}): CollectionBeforeChangeHook =>
  async ({ data, operation, req }) => {
    if (operation !== 'create') return data
    const d = data as { fiscalDevice?: unknown; operator?: unknown }
    await assertNotDecommissioned(req, opts.devicesSlug ?? 'fiscal-devices', relId(d.fiscalDevice), 'fiscal device')
    await assertNotDecommissioned(req, opts.operatorsSlug ?? 'operators', relId(d.operator), 'operator')
    return data
  }

/** @index-cross.foldback child=sale/fiscal/reference parent=sale/fiscal — this cross folds back into its parent. */
