import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '../../hooks/autoPopulateTenant'
import { auditTrailAfterChange } from '../../hooks/auditTrailAfterChange'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '../../access/auth'
import { statusField, auditFields } from '../../fields'

/**
 * Operators — the СУПТО operator register. Each operator has the 4-digit code
 * that forms the second segment of every УНП (`XXXXXXXX-ZZZZ-…`), mapped to a
 * user. Operators are decommissioned (status), not deleted, to preserve the
 * audit trail.
 *
 * @standard BG Наредба-Н-18 §СУПТО operator-nomenclature
 * @audit ISO-19011:2018 audit-trail
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see src/standards/naredba-n-18/unp.ts
 */
const Operators: CollectionConfig = {
  slug: 'operators',
  labels: { singular: 'Operator', plural: 'Operators' },
  admin: { useAsTitle: 'code', defaultColumns: ['code', 'name', 'status'] },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: tenantAdmin,
  },
  fields: [
    {
      name: 'code',
      type: 'text',
      required: true,
      index: true,
      validate: (value: string | string[] | null | undefined) =>
        typeof value === 'string' && /^\d{1,4}$/.test(value)
          ? true
          : 'Operator code must be 1–4 digits (Наредба Н-18).',
      admin: { description: '4-digit operator code — second УНП segment.' },
    },
    { name: 'name', type: 'text', required: true },
    { name: 'user', type: 'relationship', relationTo: 'users' },
    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Decommissioned', value: 'decommissioned' },
      ],
      'active',
    ),
    ...auditFields(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    afterChange: [auditTrailAfterChange('operators')],
  },
  timestamps: true,
}

export default Operators
