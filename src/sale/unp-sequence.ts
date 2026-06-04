/**
 * СУПТО УНП assignment — the per-fiscal-device gapless sequence hook.
 *
 * On CREATE of a sale, assigns the УНП (`XXXXXXXX-ZZZZ-NNNNNNN`) by taking the
 * next sequence for the sale's fiscal device (ФУ) within the tenant: max(prior
 * `unpSequence`) + 1, starting at 1. The number is the human/regulatory handle;
 * the content-`uuid` (injected by the contentUuidPlugin) is the machine/tamper
 * identity. Idempotent — never reassigns an existing УНП; refuses to mutate it
 * on update (the УНП is frozen at creation, Наредба Н-18).
 *
 * Uniqueness is doubly guarded: the `unp` field is `unique` (a collision throws),
 * and a production deployment serialises per-ФУ issuance through the
 * `RATE_LIMITER`/counter Durable Object (see the `bindings` skill) to make the
 * `max+1` read-modify-write atomic under concurrency.
 *
 * @standard BG Наредба-Н-18 §СУПТО УНП per-fiscal-device-gapless-sequence
 * @audit ISO-19011:2018 audit-trail
 * @see src/standards/naredba-n-18/unp.ts
 * @see .claude/skills/supto/SKILL.md · .claude/skills/number/SKILL.md
 */

import type { CollectionBeforeChangeHook } from 'payload'
import { formatUnp, isValidUnp } from '@/naredba/n/18/unp'
import { requiresFiscalization } from '@/naredba/n/18/scope'

interface SaleShape {
  unp?: unknown
  unpSequence?: unknown
  fiscalDeviceNumber?: unknown
  operatorCode?: unknown
  status?: unknown
  paymentType?: unknown
  tenant?: unknown
}

/** Resolve the tenant id off a doc (string, or a `{ id }` relationship object). */
function tenantOf(data: SaleShape): string | undefined {
  const t = data.tenant
  if (typeof t === 'string') return t
  if (t && typeof t === 'object' && 'id' in t) {
    const id = (t as { id?: unknown }).id
    if (typeof id === 'string') return id
  }
  return undefined
}

const str = (v: unknown): string | undefined => (typeof v === 'string' && v ? v : undefined)

/** Assign the next per-ФУ gapless УНП onto `d` (mutates `unp` + `unpSequence`). */
async function assignNextUnp(
  collectionSlug: string,
  d: SaleShape,
  device: string,
  req: Parameters<CollectionBeforeChangeHook>[0]['req'],
): Promise<void> {
  const operatorCode = str(d.operatorCode) ?? '0000'
  const tenant = tenantOf(d)
  const prior = await req.payload.find({
    collection: collectionSlug as never,
    where: {
      fiscalDeviceNumber: { equals: device },
      ...(tenant ? { tenant: { equals: tenant } } : {}),
    },
    sort: '-unpSequence',
    limit: 1,
    overrideAccess: true,
    req,
  })
  const lastSeq = Number((prior.docs[0] as SaleShape | undefined)?.unpSequence ?? 0)
  const sequence = (Number.isFinite(lastSeq) ? lastSeq : 0) + 1
  d.fiscalDeviceNumber = device
  d.unpSequence = sequence
  d.unp = formatUnp({ fiscalDeviceId: device, operatorCode, sequence })
}

const NO_BYPASS =
  'Наредба Н-18: a cash/card/voucher sale cannot be closed without a fiscal device — no СУПТО bypass (every in-scope closed sale carries a УНП).'

/**
 * beforeChange hook factory. `collectionSlug` is the sales collection the УНП
 * sequence is scoped within (per fiscal device, per tenant).
 *
 * No СУПТО bypass: a **fiscalization-scope** sale (cash/card/voucher — чл. 3
 * ал. 1) that is **closed** MUST carry a УНП. Closing such a sale without a
 * fiscal device is rejected; a closing sale that lacks a number gets one
 * assigned. Sales settled by a lawfully-exempt channel (bank transfer / direct
 * debit / PSP / postal money transfer) may close without a УНП — they are out
 * of СУПТО scope, not a bypass.
 */
export const assignSaleUnpHook =
  (collectionSlug: string): CollectionBeforeChangeHook =>
  async ({ data, operation, originalDoc, req }) => {
    const d = data as SaleShape
    const orig = originalDoc as SaleShape | undefined
    const effectiveClosed = (d.status ?? orig?.status) === 'closed'
    const inScope = requiresFiscalization(str(d.paymentType) ?? str(orig?.paymentType))
    const alreadyNumbered =
      (typeof orig?.unp === 'string' && isValidUnp(orig.unp)) ||
      (typeof d.unp === 'string' && isValidUnp(d.unp))

    if (operation === 'update') {
      // Frozen on creation — reject any later attempt to change the УНП.
      const prev = str(orig?.unp)
      if (prev && typeof d.unp === 'string' && d.unp !== prev) {
        throw new Error(`Наредба Н-18: УНП is frozen at creation; '${prev}' cannot become '${String(d.unp)}'.`)
      }
      // No bypass: closing an as-yet-unnumbered in-scope sale must number it now.
      if (effectiveClosed && !alreadyNumbered) {
        const device = str(d.fiscalDeviceNumber) ?? str(orig?.fiscalDeviceNumber)
        if (device) await assignNextUnp(collectionSlug, d, device, req)
        else if (inScope) throw new Error(NO_BYPASS)
        // exempt + no device → lawfully closes without a УНП (out of scope)
      }
      return data
    }

    // create
    if (typeof d.unp === 'string' && isValidUnp(d.unp)) return data // idempotent

    const device = str(d.fiscalDeviceNumber)
    if (!device) {
      // No device: allowed for an open draft, or a closed *exempt* sale.
      // A closed in-scope (cash/card/voucher) sale without a device is a bypass.
      if (effectiveClosed && inScope) throw new Error(NO_BYPASS)
      return data
    }
    await assignNextUnp(collectionSlug, d, device, req)
    return data
  }
