/**
 * Compliance Frameworks — single-folder collection node.
 *
 * @standard ISO-37301:2021 compliance-management-systems
 * @standard COSO-2013 internal-control-integrated-framework
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import type { CollectionConfig } from 'payload'
import { authenticated } from '@/authenticated'
import { superAdminOnly } from '@/auth'

export const ComplianceFrameworks: CollectionConfig = {
  slug: 'compliance-frameworks',
  admin: { useAsTitle: 'name', defaultColumns: ['code', 'name', 'category', 'isActive'], group: 'Compliance Foundation', description: 'Read-only reference data' },
  access: { read: authenticated, create: superAdminOnly, update: superAdminOnly, delete: superAdminOnly },
  timestamps: true,
  fields: [
    { name: 'code', type: 'text', required: true, unique: true, index: true },
    { name: 'name', type: 'text', required: true },
    { name: 'category', type: 'select', options: [{ label: 'Accounting', value: 'accounting' }, { label: 'Auditing', value: 'auditing' }, { label: 'Control Framework', value: 'control-framework' }, { label: 'Data Protection', value: 'data-protection' }, { label: 'Information Security', value: 'info-security' }, { label: 'Banking', value: 'banking' }, { label: 'Tax', value: 'tax' }, { label: 'ESG', value: 'esg' }, { label: 'Other', value: 'other' }], required: true },
    { name: 'description', type: 'textarea' },
    { name: 'issuingBody', type: 'text' },
    { name: 'officialResourceUrl', type: 'text' },
    { name: 'effectiveDate', type: 'date' },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
  ],
}