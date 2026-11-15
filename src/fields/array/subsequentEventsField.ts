import { APIError, type CollectionBeforeChangeHook, type Field } from 'payload'

import { currencyField } from '@/fields/text/currencyField'

/**
 * Events after the reporting period (IAS 10; ISA 560 "subsequent events") — what happened between the
 * end of a fiscal period and the authorisation of its financial statements. It was the
 * post-balance-sheet-events collection, one row per event pointing at its period; an event belongs to
 * the period it follows, so it is a row on the fiscal period.
 *
 *   · an event falls after the period ends (IAS 10 §3);
 *   · an ADJUSTING event (§8, evidence of conditions at the reporting date) is booked: it is marked
 *     `adjusted` only with the journal entry that books it;
 *   · a NON-ADJUSTING or going-concern event (§10, §14) is disclosed: it is marked `disclosed` only once
 *     it is in the financial-statement notes (§21);
 *   · `adjusted` belongs to adjusting events, `disclosed` to the others.
 */

export interface SubsequentEvent {
  eventDate?: string | null
  classification?: string | null
  status?: string | null
  journalEntry?: unknown
  disclosedInFS?: boolean | null
}

/** Why an event row breaks IAS 10, or true. */
export const eventError = (event: SubsequentEvent, periodEnd: string | null | undefined): string | true => {
  if (event.eventDate && periodEnd && new Date(event.eventDate).getTime() <= new Date(periodEnd).getTime())
    return `An event after the reporting period falls after the period ends (${String(periodEnd).slice(0, 10)}) — IAS 10 §3.`
  const adjusting = event.classification === 'adjusting'
  if (event.status === 'adjusted' && !adjusting) return 'Only an adjusting event is adjusted; a non-adjusting one is disclosed (IAS 10 §8, §10).'
  if (event.status === 'adjusted' && !event.journalEntry) return 'An adjusted event names the journal entry that books it (IAS 10 §8).'
  if (event.status === 'disclosed' && adjusting) return 'An adjusting event is booked, not only disclosed (IAS 10 §8).'
  if (event.status === 'disclosed' && !event.disclosedInFS) return 'A disclosed event is in the financial-statement notes (IAS 10 §21).'
  return true
}

/** The fiscal period's `beforeChange`: every event row against the period's own end date. */
export const subsequentEventRules: CollectionBeforeChangeHook = ({ data, originalDoc }) => {
  if (!data) return data
  const events = ((data as { subsequentEvents?: SubsequentEvent[] }).subsequentEvents ??
    (originalDoc as { subsequentEvents?: SubsequentEvent[] } | undefined)?.subsequentEvents ??
    []) as SubsequentEvent[]
  const end =
    (data as { dates?: { endDate?: string | null } }).dates?.endDate ?? (originalDoc as { dates?: { endDate?: string | null } } | undefined)?.dates?.endDate
  for (const [index, event] of events.entries()) {
    const error = eventError(event, end)
    if (error !== true) throw new APIError(`Subsequent event ${index + 1}: ${error}`, 400)
  }
  return data
}

export const subsequentEventsField = (): Field => ({
  name: 'subsequentEvents',
  type: 'array',
  labels: { singular: 'Event after the reporting period', plural: 'Events after the reporting period' },
  admin: { description: 'IAS 10 — what happened after this period ended and before its statements were authorised. Adjusting events are booked; the others are disclosed.' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'eventDate', type: 'date', required: true },
        {
          name: 'classification',
          type: 'select',
          required: true,
          options: [
            { label: 'Adjusting (IAS 10 §8 — recognise in FS)', value: 'adjusting' },
            { label: 'Non-adjusting (IAS 10 §10 — disclose only)', value: 'non_adjusting' },
            { label: 'Going-concern impact (IAS 10 §14)', value: 'going_concern' },
          ],
        },
        {
          name: 'eventKind',
          type: 'select',
          required: true,
          options: [
            { label: 'Litigation settlement (court ruling)', value: 'litigation' },
            { label: 'Asset impairment evidence', value: 'impairment_evidence' },
            { label: 'Bankruptcy of customer', value: 'customer_bankruptcy' },
            { label: 'Sale of asset/business', value: 'sale' },
            { label: 'Acquisition / business combination', value: 'acquisition' },
            { label: 'Major restructuring announced', value: 'restructuring' },
            { label: 'Significant FX rate change', value: 'fx_change' },
            { label: 'Natural disaster / casualty', value: 'casualty' },
            { label: 'Major share issuance / buy-back', value: 'capital_event' },
            { label: 'Dividend declared', value: 'dividend' },
            { label: 'Other', value: 'other' },
          ],
        },
      ],
    },
    { name: 'description', type: 'textarea', localized: true, required: true },
    {
      type: 'row',
      fields: [
        { name: 'estimatedImpact', type: 'number', defaultValue: 0, admin: { description: 'Approximate financial impact (cents).' } },
        currencyField(),
        {
          name: 'status',
          type: 'select',
          defaultValue: 'identified',
          options: [
            { label: 'Identified', value: 'identified' },
            { label: 'Assessed', value: 'assessed' },
            { label: 'Adjusted', value: 'adjusted' },
            { label: 'Disclosed', value: 'disclosed' },
            { label: 'Not Material', value: 'not_material' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries', admin: { description: 'The entry that books an adjusting event (required to mark it adjusted).' } },
        { name: 'disclosedInFS', type: 'checkbox', defaultValue: false, admin: { description: 'IAS 10 §21 — in the financial-statement notes.' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'sourceCollection', type: 'text', admin: { description: 'Slug of the related document, if known.' } },
        { name: 'sourceId', type: 'text' },
      ],
    },
    { name: 'notes', type: 'textarea' },
  ],
})
