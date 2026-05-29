import type { Access, CollectionConfig } from 'payload'
import { autoPopulateTenant } from '../../hooks/autoPopulateTenant'
import { autoSetTimestamp } from '../../hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '../../hooks/auditTrailAfterChange'
import { roleScopedAccess, scopedAccess } from '../../access/auth'
import { currencyField, statusField, auditFields } from '../../fields'
import { assignSaleUnpHook } from '../../services/supto/unp-sequence'
import { enforceSaleImmutability } from '../../services/supto/sale-immutability'
import { emitSaleClosedHook } from '../../services/supto/sale-event'

/**
 * СУПТО Sales (продажби) — the Наредба Н-18 sale register.
 *
 * Every sale carries an immutable УНП (`XXXXXXXX-ZZZZ-NNNNNNN`) assigned on
 * create from its fiscal device's per-ФУ gapless sequence. Completed sales are
 * frozen (no delete, no edit); corrections are reversals (сторно) that preserve
 * the original. The content-uuid plugin stamps a tamper-proof uuid (Law 8) and
 * the audit-trail hook hash-chains every write (Merkle journal). On close the
 * sale emits `supto:sale:closed` keyed by its content-uuid (the `event` skill).
 *
 * @standard BG Наредба-Н-18 §СУПТО sale-register · УНП · no-delete · сторно
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §404 internal-controls
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see .claude/skills/supto/SKILL.md · src/services/supto/* · src/standards/naredba-n-18/unp.ts
 */

/** Наредба Н-18: a sale is never deleted — it is reversed (сторно), preserving the record. */
const neverDelete: Access = () => false

const SuptoSales: CollectionConfig = {
  slug: 'supto-sales',
  labels: { singular: 'Sale (СУПТО)', plural: 'Sales (СУПТО)' },
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
    {
      name: 'unp',
      type: 'text',
      unique: true,
      index: true,
      admin: { readOnly: true, description: 'Unique sales number (УНП) — assigned + frozen on create.' },
    },
    { name: 'unpSequence', type: 'number', admin: { disabled: true } },
    {
      name: 'fiscalDeviceNumber',
      type: 'text',
      required: true,
      index: true,
      validate: (value: string | string[] | null | undefined) =>
        typeof value === 'string' && /^\d{8}$/.test(value)
          ? true
          : 'Fiscal-device number must be exactly 8 digits (Наредба Н-18).',
      admin: { description: '8-digit ФУ id — scopes the УНП sequence.' },
    },
    { name: 'fiscalDevice', type: 'relationship', relationTo: 'fiscal-devices' },
    {
      name: 'operatorCode',
      type: 'text',
      defaultValue: '0000',
      validate: (value: string | string[] | null | undefined) =>
        value == null || (typeof value === 'string' && /^\d{1,4}$/.test(value))
          ? true
          : 'Operator code must be up to 4 digits.',
    },
    { name: 'saleDate', type: 'date', required: true },
    statusField(
      [
        { label: 'Open', value: 'open' },
        { label: 'Closed', value: 'closed' },
        { label: 'Voided', value: 'voided' },
        { label: 'Reversed', value: 'reversed' },
      ],
      'open',
    ),
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
    // сторно links — a reversal points back at its source; the source is sealed with its reversal.
    { name: 'reversalOf', type: 'relationship', relationTo: 'supto-sales' },
    { name: 'reversedBy', type: 'relationship', relationTo: 'supto-sales' },
    { name: 'reversalReason', type: 'text' },
    { name: 'closedAt', type: 'date', admin: { readOnly: true } },
    ...auditFields(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      assignSaleUnpHook('supto-sales'),
      enforceSaleImmutability,
      autoSetTimestamp('closedAt', (data) => (data as { status?: string }).status === 'closed'),
    ],
    afterChange: [emitSaleClosedHook, auditTrailAfterChange('supto-sales')],
  },
  timestamps: true,
}

export default SuptoSales
