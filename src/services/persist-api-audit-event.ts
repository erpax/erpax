/**
 * `persistApiAuditEvent` — typed bridge from any `ApiResult<T>` returned
 * by the EU-fallback resolvers (`lookupEuFallbackRate`,
 * `lookupVatValidationFallback`, `lookupSanctionsFallback`,
 * `lookupEInvoicingParticipantFallback`, the BG-specific signers /
 * mTLS dispatchers) into a row on the `api-audit-events` Payload
 * collection.
 *
 * One call = one durable audit row. Every external system the project
 * contacts gets an entry, attributed to the publisher (`source` field
 * carries `'БНБ'` / `'ECB'` / `'VIES'` / `'EU CFSP'` / `'Peppol Directory'`
 * / `'НАП'` / per-bank ASPSP names) so SOX §404 walk-throughs can pivot
 * on (tenant, kind, source, period) without joining ad-hoc tables.
 *
 * @standard ISO-19011:2018 audit-trail external-system-evidence
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §404 internal-controls external-system-traceability
 * @see ../plugins/accounting/collections/ApiAuditEvents.ts
 * @see ./country-api-clients.ts
 */

import type { Payload, RequiredDataFromCollectionSlug } from 'payload'

export type ApiAuditEventKind =
  | 'fx_rate'
  | 'vat_validation'
  | 'sanctions'
  | 'e_invoicing'
  | 'business_registry'
  | 'tax_authority'
  | 'bank_directory'
  | 'open_banking'
  | 'address_validation'
  | 'payroll'
  | 'statistics'
  | 'other'

/**
 * The shape every API-resolver `ApiResult<T>` reduces to before
 * persistence. Mirrors `ApiResult` plus the routing fields the audit
 * collection needs (kind, country, tenant, payloads).
 */
export interface PersistApiAuditEventInput<T = unknown> {
  /** Tenant the call was made for. */
  readonly tenantId: string
  /** API category — controls the `kind` select on the collection. */
  readonly kind: ApiAuditEventKind
  /** ISO-3166-1 alpha-2. */
  readonly country: string
  /** Authority label from the resolver (e.g. `'БНБ'`, `'ECB'`). */
  readonly source: string
  /** Whether the resolver returned `ok: true`. */
  readonly resultOk: boolean
  /** Optional error message — populated when `resultOk` is false. */
  readonly errorMessage?: string
  /** Sanitised request envelope (no secrets). */
  readonly payloadIn?: Record<string, unknown>
  /** Response data from `ApiResult.data`. */
  readonly payloadOut?: T
  /** Optional explicit eventId — defaults to `crypto.randomUUID()`. */
  readonly eventId?: string
}

/**
 * Persist one external-API call as an `api-audit-events` row.
 *
 * Idempotent on `eventId` — passing the same id twice updates the
 * existing row (callers that retry an upstream call with the same
 * correlation id won't duplicate audit rows).
 */
export async function persistApiAuditEvent<T>(
  payload: Payload,
  event: PersistApiAuditEventInput<T>,
): Promise<{ id: string }> {
  const eventId = event.eventId ?? cryptoRandomId()
  const doc = {
    tenant: event.tenantId,
    eventId,
    kind: event.kind,
    country: event.country.toUpperCase(),
    source: event.source,
    resultOk: event.resultOk,
    errorMessage: event.resultOk ? undefined : event.errorMessage,
    payloadIn: event.payloadIn,
    payloadOut: event.payloadOut,
  }

  // Idempotent upsert keyed on eventId.
  const existing = (await payload.find({
    collection: 'api-audit-events',
    where: { eventId: { equals: eventId } },
    limit: 1,
  })) as unknown as { docs: Array<{ id: string }> }

  // Audit rows carry dynamic external-API json (payloadIn/payloadOut), so the
  // builder is cast to this collection's create type at the boundary.
  const data = doc as unknown as RequiredDataFromCollectionSlug<'api-audit-events'>

  if (existing.docs?.[0]) {
    const updated = await payload.update({
      collection: 'api-audit-events',
      id: existing.docs[0].id,
      data,
    })
    return { id: String(updated.id) }
  }
  const created = await payload.create({ collection: 'api-audit-events', data })
  return { id: String(created.id) }
}

function cryptoRandomId(): string {
  const c = (globalThis as { crypto?: { randomUUID?: () => string } }).crypto
  return c?.randomUUID?.() ?? Math.random().toString(36).slice(2)
}
