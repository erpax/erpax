/**
 * Shipments — fulfillment + carrier tracking.
 *
 * @standard ISO-8601-1:2019 date-time shipped-at delivered-at
 * @standard EN-16931:2017 §BG-13 delivery-information
 * @standard ISO-3166-1:2020 country-codes ship-from ship-to
 * @audit ISO-19011:2018 audit-trail fulfillment-evidence
 * @compliance SOX §404 internal-controls dispatch-controls
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { autoSetTimestamp } from '@/auto/set/timestamp'
import { adminOrAccountant, scopedAccess, tenantAdmin } from '@/auth'
import { statusField, notesField, auditFields } from '@/base/accounting/field'

const Shipments: CollectionConfig = {
  slug: 'shipments',
  labels: { singular: 'Shipment', plural: 'Shipments' },
  admin: { useAsTitle: 'shipmentNumber', defaultColumns: ['shipmentNumber', 'order', 'carrier', 'trackingNumber', 'status'] },
  access: {
    read: scopedAccess(),
    create: adminOrAccountant,
    update: adminOrAccountant,
    delete: tenantAdmin,
  },
  fields: [
    { name: 'shipmentNumber', type: 'text', required: true, unique: true, index: true },
    // Slice XXXXXXXX-c (2026-05-11): retargeted from 'orders' → 'sales-orders'.
    // EN-16931 §BG-13 delivery-information ties the shipment to the
    // customer-side sales order it fulfils.
    { name: 'order', type: 'relationship', relationTo: 'sales-orders', required: true },
    { name: 'shipFromAddress', type: 'relationship', relationTo: 'addresses' },
    { name: 'shipToAddress', type: 'relationship', relationTo: 'addresses', required: true },
    {
      name: 'carrier',
      type: 'select',
      options: [
        { label: 'DHL', value: 'dhl' },
        { label: 'FedEx', value: 'fedex' },
        { label: 'UPS', value: 'ups' },
        { label: 'USPS', value: 'usps' },
        { label: 'Royal Mail', value: 'royal_mail' },
        { label: 'Speedy (BG)', value: 'speedy' },
        { label: 'Econt (BG)', value: 'econt' },
        { label: 'Local courier', value: 'local' },
        { label: 'Self-pickup', value: 'pickup' },
      ],
    },
    { name: 'trackingNumber', type: 'text', index: true },
    { name: 'trackingUrl', type: 'text' },
    { name: 'shippingCost', type: 'number', defaultValue: 0, admin: { description: 'In cents.' } },
    {
      name: 'lines',
      type: 'array',
      fields: [
        { name: 'item', type: 'relationship', relationTo: 'items' },
        { name: 'quantity', type: 'number', required: true, min: 0 },
      ],
    },
    statusField(
      [
        { label: 'Pending', value: 'pending' },
        { label: 'Picked', value: 'picked' },
        { label: 'Packed', value: 'packed' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'In Transit', value: 'in_transit' },
        { label: 'Out for Delivery', value: 'out_for_delivery' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Returned', value: 'returned' },
        { label: 'Lost', value: 'lost' },
      ],
      'pending',
    ),
    { name: 'shippedAt', type: 'date', admin: { readOnly: true } },
    { name: 'deliveredAt', type: 'date', admin: { readOnly: true } },
    ...auditFields(),
    notesField(),
  ],
  hooks: standardCollectionHooks('shipments', { beforeChange: [autoSetTimestamp('shippedAt', (d) => (d as { status?: string }).status === 'shipped'), autoSetTimestamp('deliveredAt', (d) => (d as { status?: string }).status === 'delivered')] }),
  timestamps: true,
}

export default Shipments
