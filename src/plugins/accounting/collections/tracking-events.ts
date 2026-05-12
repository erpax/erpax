/**
 * Tracking Events — per-leg shipment status updates from carrier APIs.
 *
 * Slice UUU (2026-05-10): added per first-principles ERP gap. Append-
 * only event log for shipment status updates (picked-up, in-transit,
 * out-for-delivery, delivered, exception, returned). Polled or
 * webhook-pushed from `carriers.apiBaseUrl`. Drives revenue
 * recognition timing: under INCOTERMS DDP/DAP/DPU, control transfers
 * on delivery — the `delivered` event is what unlocks revenue per
 * IFRS-15 §38 point-in-time recognition.
 *
 * @standard ISO-8601-1:2019 date-time event-time
 * @standard INCOTERMS 2020 control-transfer-points
 * @standard EDIFACT IFTSTA international-multimodal-status-message
 * @audit ISO-19011:2018 audit-trail shipment-tracking
 * @accounting IFRS IFRS-15 §38 point-in-time-revenue-recognition
 * @compliance SOX §404 internal-controls delivery-evidence TOM-LOG-02
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./Shipments.ts
 * @see ./Carriers.ts
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/access/auth'
import { multiTenancyField, notesField, auditFields } from '@/fields/accounting/base-accounting-fields'

const TrackingEvents: CollectionConfig = {
  slug: 'tracking-events',
  labels: { singular: 'Tracking Event', plural: 'Tracking Events' },
  admin: {
    useAsTitle: 'eventCode',
    defaultColumns: ['shipment', 'eventCode', 'eventTime', 'location', 'carrier'],
    description:
      'Append-only carrier-side shipment status events. Polled / webhook-pushed from carrier APIs. The `delivered` event triggers IFRS-15 §38 revenue recognition under DDP/DAP/DPU INCOTERMS.',
  },
  access: accountingCollectionAccess({ feature: 'logistics' }),
  fields: [
    multiTenancyField(),
    { name: 'shipment', type: 'relationship', relationTo: 'shipments', required: true, index: true },
    { name: 'carrier', type: 'relationship', relationTo: 'carriers',
      admin: { description: 'Denormalised from shipment for fast filter.' } },
    { name: 'trackingNumber', type: 'text', index: true,
      admin: { description: 'Carrier-side tracking number (denormalised).' } },
    {
      name: 'eventCode',
      type: 'select',
      required: true,
      options: [
        { label: 'Label Created', value: 'label_created' },
        { label: 'Picked Up', value: 'picked_up' },
        { label: 'In Transit', value: 'in_transit' },
        { label: 'Customs Clearance Started', value: 'customs_started' },
        { label: 'Customs Clearance Cleared', value: 'customs_cleared' },
        { label: 'Customs Held', value: 'customs_held' },
        { label: 'Out for Delivery', value: 'out_for_delivery' },
        { label: 'Delivery Attempted', value: 'delivery_attempted' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Exception', value: 'exception' },
        { label: 'Returned to Sender', value: 'returned' },
        { label: 'Lost', value: 'lost' },
      ],
    },
    { name: 'eventTime', type: 'date', required: true, index: true,
      admin: { description: 'ISO 8601 — carrier-reported event timestamp (UTC).' } },
    { name: 'location', type: 'text',
      admin: { description: 'Free-text city/hub (e.g. `Sofia BG-1000`, `Frankfurt DE-60001`).' } },
    { name: 'locationCountry', type: 'text',
      admin: { description: 'ISO 3166-1 alpha-2 country at the event time.' } },
    { name: 'description', type: 'text',
      admin: { description: 'Carrier-supplied free-text event description.' } },
    { name: 'signedBy', type: 'text',
      admin: { description: 'Recipient name on delivery (proof-of-delivery field).' } },
    { name: 'sourcePayload', type: 'json',
      admin: { description: 'Raw carrier-API event payload for forensic / replay.' } },
    {
      name: 'eventSource',
      type: 'select',
      defaultValue: 'webhook',
      options: [
        { label: 'Webhook Push', value: 'webhook' },
        { label: 'API Poll', value: 'poll' },
        { label: 'Manual Entry', value: 'manual' },
        { label: 'EDI IFTSTA', value: 'edi_iftsta' },
      ],
    },
    { name: 'triggeredRevenueRecognition', type: 'checkbox', defaultValue: false,
      admin: { readOnly: true, description: 'Set to true when this `delivered` event triggered IFRS-15 §38 revenue recognition.' } },
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('tracking-events')],
  },
  timestamps: true,
}

export default TrackingEvents
