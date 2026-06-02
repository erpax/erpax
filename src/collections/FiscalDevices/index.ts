import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '../../hooks/autoPopulateTenant'
import { auditTrailAfterChange } from '../../hooks/auditTrailAfterChange'
import { adminOrAccountant, scopedAccess, tenantAdmin } from '../../access/auth'
import { statusField, auditFields } from '../../fields'

/**
 * Fiscal Devices (ФУ) — the registry of fiscal units a СУПТО tenant operates.
 *
 * Each device carries an 8-digit individual number assigned by the
 * manufacturer; it is the first segment of every УНП (`XXXXXXXX-…`) and the
 * scope of the per-device gapless sale sequence (see the `supto` skill +
 * `services/sales/unp-sequence`). Devices are not deleted operationally —
 * they are decommissioned (status), preserving the audit trail.
 *
 * @standard BG Наредба-Н-18 §СУПТО fiscal-device-register
 * @audit ISO-19011:2018 audit-trail
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see .claude/skills/supto/SKILL.md
 */
const FiscalDevices: CollectionConfig = {
  slug: 'fiscal-devices',
  labels: { singular: 'Fiscal Device', plural: 'Fiscal Devices' },
  admin: {
    useAsTitle: 'individualNumber',
    defaultColumns: ['individualNumber', 'model', 'manufacturer', 'status'],
  },
  access: {
    read: scopedAccess(),
    create: adminOrAccountant,
    update: adminOrAccountant,
    delete: tenantAdmin,
  },
  fields: [
    {
      name: 'individualNumber',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      validate: (value: string | string[] | null | undefined) =>
        typeof value === 'string' && /^\d{8}$/.test(value)
          ? true
          : 'Fiscal-device number must be exactly 8 digits (Наредба Н-18).',
      admin: { description: '8-digit ФУ individual number assigned by the manufacturer — first УНП segment.' },
    },
    { name: 'model', type: 'text' },
    { name: 'manufacturer', type: 'text' },
    // Per-device configuration — overrides the country-derived defaults
    // (the config cascade: device → tenant → country). Both optional; when
    // absent the resolver falls back to the tenant/country values.
    {
      name: 'currency',
      type: 'text',
      admin: { description: 'ISO 4217 currency this ФУ issues receipts in — overrides the tenant/country default.' },
    },
    {
      name: 'taxGroups',
      type: 'array',
      admin: { description: 'Active fiscal tax groups (Приложение № 1) on this device — group letter → VAT rate. Empty ⇒ country VAT bands.' },
      fields: [
        { name: 'group', type: 'text', admin: { description: 'Tax-group letter (А/Б/В/Г).' } },
        { name: 'rate', type: 'number', admin: { description: 'VAT rate (%) configured for this group on this device.' } },
      ],
    },
    // The default operator + virtual-POS terminal for *automated* sales on this
    // device (e-shop orders, subscription charges have no human cashier). The
    // config cascade stamps these onto the sale; an explicit operator/terminal
    // on a manual sale still wins. See `fiscal-context.ts`.
    {
      name: 'defaultOperator',
      type: 'relationship',
      relationTo: 'operators',
      admin: { description: 'Operator whose code (ZZZZ) numbers automated sales on this device.' },
    },
    {
      name: 'defaultTerminal',
      type: 'relationship',
      relationTo: 'terminals',
      admin: { description: 'Virtual-POS terminal printed on automated e-receipts from this device.' },
    },
    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Decommissioned', value: 'decommissioned' },
      ],
      'active',
    ),
    { name: 'registeredAt', type: 'date' },
    ...auditFields(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    afterChange: [auditTrailAfterChange('fiscal-devices')],
  },
  timestamps: true,
}

export default FiscalDevices
