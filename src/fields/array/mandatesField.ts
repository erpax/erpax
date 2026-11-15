import type { Field, PayloadRequest } from 'payload'

import { stampWhen } from '@/hooks/collections/shared/stampWhen'

/**
 * SEPA Direct Debit mandates — the authorisations a customer signed for the tenant to collect by direct
 * debit (ISO 20022 pain.008, EPC130-08 SDD rulebook). It was the sepa-mandates collection, which repeated
 * the debtor's name and address; a mandate is the customer's, so it is a row on the party.
 *
 *   · a mandate id is unique;
 *   · a mandate expires 36 months after its last collection, or after its signature if it was never
 *     collected (EPC130-08) — computed by the server;
 *   · its sequence state follows: pending first collection → recurring → expired, unless the final
 *     collection was submitted;
 *   · revocation is stamped by the server;
 *   · a stored mandate is never removed, only revoked or cancelled, and mandates belong to a customer
 *     (`partyRows`, the parties hook);
 *   · a pain.008 payment run collects only against an active, unexpired mandate of the tenant (`mandateError`).
 */

export const MANDATE_VALIDITY_MONTHS = 36

/** `iso` plus `months` calendar months, in UTC, the day clamped to the month's last (31 Jan + 1 → 28/29 Feb). */
export const addMonths = (iso: string, months: number): string | null => {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  const day = d.getUTCDate()
  d.setUTCDate(1)
  d.setUTCMonth(d.getUTCMonth() + months)
  const last = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate()
  d.setUTCDate(Math.min(day, last))
  return d.toISOString()
}

/** EPC130-08: valid for 36 months after the most recent collection, or after signature if never collected. */
export const mandateExpiry = (lastCollectionAt: unknown, signatureDate: unknown): string | null => {
  const from = lastCollectionAt || signatureDate
  return from ? addMonths(String(from), MANDATE_VALIDITY_MONTHS) : null
}

export interface Mandate {
  id?: string | null
  mandateId?: string | null
  status?: string | null
  sequenceState?: string | null
  signatureDate?: string | null
  lastCollectionAt?: string | null
  expiryDate?: string | null
}

/** The sequence state a mandate is in: the final collection, once submitted, stays; otherwise it follows the dates. */
export const sequenceStateOf = (mandate: Mandate, now: string): string => {
  if (mandate.sequenceState === 'final_submitted') return 'final_submitted'
  const expiry = mandateExpiry(mandate.lastCollectionAt, mandate.signatureDate)
  if (expiry && expiry < now) return 'expired'
  return mandate.lastCollectionAt ? 'active_recurring' : 'pending_first'
}

/** Why a direct debit cannot collect against `mandateId` on `on` (ISO date), or true. */
export const mandateError = (mandateId: unknown, mandate: Mandate | undefined, on: string): string | true => {
  if (!mandateId) return 'A direct debit names the mandate it collects against.'
  if (!mandate) return `No mandate ${String(mandateId)} of this tenant.`
  if (mandate.status !== 'active') return `Mandate ${String(mandateId)} is ${mandate.status ?? 'not active'}.`
  if (mandate.expiryDate && String(mandate.expiryDate) < on)
    return `Mandate ${String(mandateId)} expired on ${String(mandate.expiryDate).slice(0, 10)} (EPC130-08: 36 months after its last collection).`
  return true
}

/** The tenant's mandate with this id, read with the caller's own access (another tenant's mandate is not found). */
export const mandateOf = async (mandateId: string, req: PayloadRequest): Promise<Mandate | undefined> => {
  const { docs } = await req.payload.find({
    collection: 'parties',
    where: { 'mandates.mandateId': { equals: mandateId } },
    depth: 0,
    limit: 1,
    overrideAccess: false,
    req,
  })
  const mandates = (docs[0] as { mandates?: Mandate[] } | undefined)?.mandates ?? []
  return mandates.find((m) => m.mandateId === mandateId)
}

export const mandatesField = (): Field => ({
  name: 'mandates',
  type: 'array',
  labels: { singular: 'SEPA mandate', plural: 'SEPA mandates' },
  admin: { description: 'SEPA Direct Debit mandates this customer signed (pain.008). Revoke or cancel a mandate; it is never removed.' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'mandateId', type: 'text', required: true, unique: true, admin: { description: 'Unique mandate identifier carried in pain.008 MndtId.' } },
        {
          name: 'localInstrument',
          type: 'select',
          required: true,
          defaultValue: 'CORE',
          options: [
            { label: 'CORE — Core SDD (B2C)', value: 'CORE' },
            { label: 'B2B — B2B SDD', value: 'B2B' },
          ],
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'active',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Suspended', value: 'suspended' },
            { label: 'Revoked (by debtor)', value: 'revoked' },
            { label: 'Cancelled (by creditor)', value: 'cancelled' },
            { label: 'Expired', value: 'expired' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'debtorIban', type: 'text', required: true, admin: { description: 'ISO 13616 IBAN of the debtor.' } },
        { name: 'debtorBic', type: 'text', admin: { description: 'ISO 9362 BIC.' } },
        { name: 'creditorIdentifier', type: 'text', required: true, admin: { description: 'Creditor identifier (CI) assigned by the regulator.' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'signatureDate', type: 'date', required: true, defaultValue: () => new Date().toISOString(), admin: { description: 'Date the debtor signed the mandate.' } },
        {
          name: 'signatureMethod',
          type: 'select',
          defaultValue: 'wet_ink',
          options: [
            { label: 'Wet-ink signature', value: 'wet_ink' },
            { label: 'Electronic signature (eIDAS qualified)', value: 'qualified_electronic' },
            { label: 'Electronic signature (advanced)', value: 'advanced_electronic' },
            { label: 'Click-to-accept (recorded online consent)', value: 'click_accept' },
          ],
        },
        { name: 'mandateDocument', type: 'upload', relationTo: 'media', admin: { description: 'The signed mandate (PDF) or the recorded consent.' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'lastCollectionAt', type: 'date', admin: { readOnly: true, description: 'Most recent collection under this mandate — restarts the 36 months.' } },
        {
          name: 'expiryDate',
          type: 'date',
          admin: { readOnly: true, description: 'Computed: 36 months after the last collection, or after signature if never collected (EPC130-08).' },
          hooks: { beforeChange: [({ siblingData }) => mandateExpiry(siblingData?.lastCollectionAt, siblingData?.signatureDate)] },
        },
        {
          name: 'sequenceState',
          type: 'select',
          defaultValue: 'pending_first',
          options: [
            { label: 'Pending first collection', value: 'pending_first' },
            { label: 'Active (recurring)', value: 'active_recurring' },
            { label: 'Final collection submitted', value: 'final_submitted' },
            { label: 'Expired (>36 months no use)', value: 'expired' },
          ],
          admin: { description: 'Follows the dates: pending until the first collection, then recurring, expired after 36 months unused. Set "final" when the last collection is submitted.' },
          hooks: { beforeChange: [({ siblingData }) => sequenceStateOf((siblingData ?? {}) as Mandate, new Date().toISOString())] },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'revokedAt', type: 'date', admin: { readOnly: true, description: 'Set by the server when the mandate is revoked.' }, hooks: { beforeChange: [stampWhen('revoked')] } },
        { name: 'revocationReason', type: 'textarea' },
      ],
    },
    { name: 'notes', type: 'textarea' },
  ],
})
