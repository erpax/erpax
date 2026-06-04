/**
 * Internal Controls — single-folder collection node.
 *
 * @standard COSO-2013 internal-control-integrated-framework
 * @compliance SOX §404 internal-controls
 * @standard PCAOB AS 2201 ICFR-audit
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { adminOnly } from '@/access/auth'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'

export const InternalControls: CollectionConfig = {
  slug: 'internal-controls',
  admin: { useAsTitle: 'title', defaultColumns: ['tenant', 'controlType', 'owner', 'isActive'], group: 'Compliance Foundation' },
  access: { read: authenticated, create: authenticated, update: authenticated, delete: adminOnly },
  hooks: { afterChange: [auditTrailAfterChange('internalControls')] },
  timestamps: true,
  fields: [
    { name: 'title', type: 'text', required: true, index: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'controlType', type: 'select', options: [{ label: 'Preventive', value: 'preventive' }, { label: 'Detective', value: 'detective' }, { label: 'Corrective', value: 'corrective' }, { label: 'Compensating', value: 'compensating' }], required: true },
    { name: 'controlCategory', type: 'select', options: [{ label: 'Authorization', value: 'authorization' }, { label: 'Segregation', value: 'segregation' }, { label: 'Reconciliation', value: 'reconciliation' }, { label: 'Access Security', value: 'access-security' }, { label: 'Accuracy', value: 'accuracy' }, { label: 'Exception', value: 'exception' }, { label: 'Documentation', value: 'documentation' }, { label: 'Change Management', value: 'change-management' }], required: true },
    { name: 'cosoComponent', type: 'select', options: [{ label: 'Control Environment', value: 'environment' }, { label: 'Risk Assessment', value: 'risk-assessment' }, { label: 'Control Activities', value: 'control-activities' }, { label: 'Information & Communication', value: 'information' }, { label: 'Monitoring Activities', value: 'monitoring' }] },
    { name: 'frequency', type: 'select', options: [{ label: 'Continuous', value: 'continuous' }, { label: 'Daily', value: 'daily' }, { label: 'Weekly', value: 'weekly' }, { label: 'Monthly', value: 'monthly' }, { label: 'Quarterly', value: 'quarterly' }, { label: 'Annual', value: 'annual' }, { label: 'As-Needed', value: 'as-needed' }] },
    { name: 'owner', type: 'relationship', relationTo: 'users' },
    { name: 'riskMitigated', type: 'textarea' },
    { name: 'isManualControl', type: 'checkbox' },
    { name: 'lastReviewDate', type: 'date' },
    { name: 'nextReviewDate', type: 'date' },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
  ],
}