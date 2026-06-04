import type { Access, CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { adminOrAccountant, scopedAccess } from '@/access/auth'
import {
  currencyField,
  statusField,
  auditFields,
  unpField,
  fiscalDeviceNumberField,
  operatorCodeField,
  fiscalQrField,
} from '@/fields'

/**
 * Receipts (касови бонове / electronic receipts) — the Наредба Н-18 fiscal
 * receipt as a persisted document. Carries the sale's УНП, the fiscal-QR
 * payload, the virtual-POS terminal (alternative regime), and the lines. A
 * receipt is never deleted (reversal happens on the sale); content-uuid + the
 * audit chain make it tamper-evident.
 *
 * @standard BG Наредба-Н-18 §СУПТО касов-бон · §алтернативен-режим e-receipt
 * @audit ISO-19011:2018 audit-trail
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see src/services/sales/fiscal-receipt.ts · src/services/sales/virtual-device.ts
 */
const neverDelete: Access = () => false

const Receipts: CollectionConfig = {
  slug: 'receipts',
  labels: { singular: 'Receipt', plural: 'Receipts' },
  admin: {
    useAsTitle: 'receiptNumber',
    defaultColumns: ['receiptNumber', 'unp', 'issuedAt', 'total', 'paymentType', 'status'],
  },
  access: {
    read: scopedAccess(),
    create: adminOrAccountant,
    update: adminOrAccountant,
    delete: neverDelete,
  },
  fields: [
    { name: 'receiptNumber', type: 'text', index: true, admin: { description: 'Касов бон number (or УНП in the alternative regime).' } },
    unpField(),
    { name: 'sale', type: 'relationship', relationTo: 'sales' },
    fiscalDeviceNumberField(false),
    operatorCodeField(),
    { name: 'virtualPosTerminal', type: 'relationship', relationTo: 'terminals' },
    fiscalQrField(),
    { name: 'issuedAt', type: 'date' },
    { name: 'total', type: 'number', defaultValue: 0 },
    { name: 'vatTotal', type: 'number', defaultValue: 0 },
    {
      name: 'vatBreakdown',
      type: 'array',
      admin: { readOnly: true, description: 'VAT subtotals per Наредба Н-18 tax group (А/Б/В/Г) — frozen at issuance.' },
      fields: [
        { name: 'group', type: 'text', admin: { description: 'Tax-group letter (Приложение № 1).' } },
        { name: 'rate', type: 'number', admin: { description: 'VAT rate (%).' } },
        { name: 'net', type: 'number', admin: { description: 'Net amount (cents).' } },
        { name: 'vat', type: 'number', admin: { description: 'VAT amount (cents).' } },
      ],
    },
    currencyField(),
    {
      name: 'paymentType',
      type: 'select',
      defaultValue: 'cash',
      options: [
        { label: 'Cash', value: 'cash' },
        { label: 'Card', value: 'card' },
        { label: 'Bank Transfer', value: 'bank_transfer' },
        { label: 'Voucher', value: 'voucher' },
      ],
    },
    { name: 'deliveredTo', type: 'text', admin: { description: 'Customer e-mail the e-receipt was sent to (alternative regime).' } },
    statusField(
      [
        { label: 'Issued', value: 'issued' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Void', value: 'void' },
      ],
      'issued',
    ),
    {
      name: 'lines',
      type: 'array',
      fields: [
        { name: 'description', type: 'text' },
        { name: 'quantity', type: 'number', defaultValue: 1 },
        { name: 'unitPrice', type: 'number', defaultValue: 0 },
        { name: 'vatRate', type: 'number', defaultValue: 0 },
        { name: 'amount', type: 'number', defaultValue: 0 },
      ],
    },
    ...auditFields(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    afterChange: [auditTrailAfterChange('receipts')],
  },
  timestamps: true,
}

export default Receipts
