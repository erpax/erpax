/**
 * Compliance Requirements — single-folder collection node.
 *
 * @standard ISO-37301:2021 obligation-register
 * @compliance SOX §404 control-objective
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import type { CollectionConfig } from 'payload'
import { authenticated } from '@/authenticated'
import { superAdminOnly } from '@/auth'

export const ComplianceRequirements: CollectionConfig = {
  slug: 'compliance-requirements',
  admin: { useAsTitle: 'title', defaultColumns: ['code', 'framework', 'severity', 'isActive'], group: 'Compliance Foundation', description: 'Read-only reference data' },
  access: { read: authenticated, create: superAdminOnly, update: superAdminOnly, delete: superAdminOnly },
  timestamps: true,
  fields: [
    { name: 'code', type: 'text', required: true, unique: true, index: true },
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'framework', type: 'relationship', relationTo: 'compliance-frameworks', required: true },
    { name: 'section', type: 'text' },
    { name: 'severity', type: 'select', options: [{ label: 'Critical', value: 'critical' }, { label: 'High', value: 'high' }, { label: 'Medium', value: 'medium' }, { label: 'Low', value: 'low' }, { label: 'Info', value: 'info' }] },
    { name: 'resourceUrl', type: 'text' },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
  ],
}