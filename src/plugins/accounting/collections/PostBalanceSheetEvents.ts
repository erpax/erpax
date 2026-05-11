/**
 * Post-Balance-Sheet Events — IAS 10 events after the reporting period.
 *
 * Slice BBBBB-prep (2026-05-11): each row is one event occurring between
 * the reporting date and the date the financial statements are
 * authorised for issue. The §3 distinction matters: ADJUSTING events
 * (provide evidence of conditions existing at reporting date — book
 * the adjustment) vs NON-ADJUSTING events (arose after — disclose only).
 *
 * @standard IFRS IAS-10 §3 adjusting-vs-non-adjusting-events
 * @standard IFRS IAS-10 §8 adjusting-events-recognise
 * @standard IFRS IAS-10 §10 non-adjusting-events-disclose
 * @standard IFRS IAS-10 §17 going-concern-after-reporting-date
 * @standard IFRS IAS-10 §21 disclosure-requirements
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time event-date authorisation-date
 * @audit ISO 19011:2018 §6.4.6 audit-evidence-subsequent-events
 * @compliance SOX §404 internal-controls TOM-CL-03
 * @security ISO 27001 A.5.23 cloud-service-tenant-isolation
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/plugins/auth/access'
import { multiTenancyField, currencyField, statusField, notesField, auditFields, referenceField } from '../fields/base-accounting-fields'

const PostBalanceSheetEvents: CollectionConfig = {
  slug: 'post-balance-sheet-events',
  labels: { singular: 'Post-Balance-Sheet Event', plural: 'Post-Balance-Sheet Events' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'eventDate', 'eventKind', 'classification', 'estimatedImpact', 'status'],
    description:
      'IAS 10 — events occurring between reporting date and FS-authorisation date. Adjusting events book; non-adjusting events disclose.',
  },
  access: accountingCollectionAccess({ feature: 'period_end_closing' }),
  fields: [
    multiTenancyField(),
    referenceField({ description: 'Sequential reference (e.g. PBE-2026-Q1-001).' }),
    { name: 'period', type: 'relationship', relationTo: 'fiscal-periods', required: true, index: true },
    { name: 'eventDate', type: 'date', required: true, index: true },
    { name: 'description', type: 'textarea', required: true },
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
    { name: 'estimatedImpact', type: 'number', defaultValue: 0,
      admin: { description: 'Approximate financial impact (cents).' } },
    currencyField(),
    { name: 'sourceCollection', type: 'text', admin: { description: 'Slug of the related document if known.' } },
    { name: 'sourceId', type: 'text' },
    { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries',
      admin: { readOnly: true, description: 'JE booked when classification = adjusting.' } },
    { name: 'disclosedInFS', type: 'checkbox', defaultValue: false,
      admin: { description: 'IAS 10 §21 — disclosed in financial-statement notes when material.' } },
    statusField(
      [
        { label: 'Identified', value: 'identified' },
        { label: 'Assessed', value: 'assessed' },
        { label: 'Adjusted', value: 'adjusted' },
        { label: 'Disclosed', value: 'disclosed' },
        { label: 'Not Material', value: 'not_material' },
      ],
      'identified',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('post-balance-sheet-events')],
  },
  timestamps: true,
}

export default PostBalanceSheetEvents
