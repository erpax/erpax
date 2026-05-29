import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '../../hooks/autoPopulateTenant'
import { auditTrailAfterChange } from '../../hooks/auditTrailAfterChange'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '../../access/auth'
import { currencyField, statusField, auditFields } from '../../fields'

/**
 * Terminals — virtual POS terminals for the Наредба Н-18 alternative regime.
 * Online sales paid remotely by card report their virtual-POS terminal number
 * (printed on the electronic receipt), with its payment-service provider +
 * settlement account. Registered with НАП at e-shop declaration time.
 *
 * @standard BG Наредба-Н-18 §алтернативен-режим virtual-POS-terminal
 * @audit ISO-19011:2018 audit-trail
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see src/services/sales/virtual-device.ts
 */
const Terminals: CollectionConfig = {
  slug: 'terminals',
  labels: { singular: 'Virtual POS Terminal', plural: 'Virtual POS Terminals' },
  admin: { useAsTitle: 'terminalNumber', defaultColumns: ['terminalNumber', 'provider', 'status'] },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: tenantAdmin,
  },
  fields: [
    { name: 'terminalNumber', type: 'text', required: true, unique: true, index: true, admin: { description: 'Virtual POS terminal number (printed on the e-receipt).' } },
    { name: 'provider', type: 'text', admin: { description: 'Payment-service provider operating the virtual POS.' } },
    { name: 'accountNumber', type: 'text', admin: { description: 'Settlement account (IBAN) the terminal pays into.' } },
    currencyField(),
    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
      'active',
    ),
    ...auditFields(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    afterChange: [auditTrailAfterChange('terminals')],
  },
  timestamps: true,
}

export default Terminals
