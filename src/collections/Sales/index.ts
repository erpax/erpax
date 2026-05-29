import type { Access, CollectionConfig } from 'payload'
import { autoPopulateTenant } from '../../hooks/autoPopulateTenant'
import { autoSetTimestamp } from '../../hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '../../hooks/auditTrailAfterChange'
import { roleScopedAccess, scopedAccess } from '../../access/auth'
import { currencyField, statusField, auditFields, unpField, fiscalDeviceNumberField, operatorCodeField, saleStatusOptions } from '../../fields'
import { assignSaleUnpHook } from '../../services/sales/unp-sequence'
import { enforceSaleImmutability } from '../../services/sales/sale-immutability'
import { emitSaleClosedHook } from '../../services/sales/sale-event'

/**
 * СУПТО Sales (продажби) — the Наредба Н-18 sale register.
 *
 * Every sale carries an immutable УНП (`XXXXXXXX-ZZZZ-NNNNNNN`) assigned on
 * create from its fiscal device's per-ФУ gapless sequence. Completed sales are
 * frozen (no delete, no edit); corrections are reversals (сторно) that preserve
 * the original. The content-uuid plugin stamps a tamper-proof uuid (Law 8) and
 * the audit-trail hook hash-chains every write (Merkle journal). On close the
 * sale emits `sale:closed` keyed by its content-uuid (the `event` skill).
 *
 * @standard BG Наредба-Н-18 §СУПТО sale-register · УНП · no-delete · сторно
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §404 internal-controls
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see .claude/skills/supto/SKILL.md · src/services/sales/* · src/standards/naredba-n-18/unp.ts
 */

/** Наредба Н-18: a sale is never deleted — it is reversed (сторно), preserving the record. */
const neverDelete: Access = () => false

const Sales: CollectionConfig = {
  slug: 'sales',
  labels: { singular: 'Sale', plural: 'Sales' },
  admin: {
    useAsTitle: 'unp',
    defaultColumns: ['unp', 'saleDate', 'status', 'total', 'paymentType', 'fiscalReceiptNumber'],
  },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: neverDelete,
  },
  fields: [
    unpField(),
    { name: 'unpSequence', type: 'number', admin: { disabled: true } },
    fiscalDeviceNumberField(),
    { name: 'fiscalDevice', type: 'relationship', relationTo: 'fiscal-devices' },
    operatorCodeField(),
    { name: 'saleDate', type: 'date', required: true },
    statusField([...saleStatusOptions], 'open'),
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'description', type: 'text' },
        { name: 'quantity', type: 'number', defaultValue: 1 },
        { name: 'unitPrice', type: 'number', defaultValue: 0 },
        { name: 'vatRate', type: 'number', defaultValue: 0 },
        { name: 'amount', type: 'number', defaultValue: 0 },
      ],
    },
    { name: 'total', type: 'number', defaultValue: 0 },
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
    { name: 'fiscalReceiptNumber', type: 'text', admin: { description: 'Касов бон number — carries the УНП.' } },
    // Register links — operator (УНП second segment), virtual-POS terminal, issued receipt.
    { name: 'operator', type: 'relationship', relationTo: 'operators' },
    { name: 'terminal', type: 'relationship', relationTo: 'terminals' },
    { name: 'receipt', type: 'relationship', relationTo: 'receipts' },
    // The originating ecommerce order this sale fiscalizes (e-shop alternative regime).
    { name: 'order', type: 'relationship', relationTo: 'orders' },
    // сторно links — a reversal points back at its source; the source is sealed with its reversal.
    { name: 'reversalOf', type: 'relationship', relationTo: 'sales' },
    { name: 'reversedBy', type: 'relationship', relationTo: 'sales' },
    { name: 'reversalReason', type: 'text' },
    { name: 'closedAt', type: 'date', admin: { readOnly: true } },
    ...auditFields(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      assignSaleUnpHook('sales'),
      enforceSaleImmutability,
      autoSetTimestamp('closedAt', (data) => (data as { status?: string }).status === 'closed'),
    ],
    afterChange: [emitSaleClosedHook, auditTrailAfterChange('sales')],
  },
  timestamps: true,
}

export default Sales
