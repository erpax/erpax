import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '../../hooks/autoPopulateTenant'
import { auditTrailAfterChange } from '../../hooks/auditTrailAfterChange'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '../../access/auth'
import { statusField, auditFields } from '../../fields'

/**
 * Fiscal Devices (ФУ) — the registry of fiscal units a СУПТО tenant operates.
 *
 * Each device carries an 8-digit individual number assigned by the
 * manufacturer; it is the first segment of every УНП (`XXXXXXXX-…`) and the
 * scope of the per-device gapless sale sequence (see the `supto` skill +
 * `services/supto/unp-sequence`). Devices are not deleted operationally —
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
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
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
