import type { CollectionConfig } from 'payload'
import { isSuperAdminAccess } from '../../access/isSuperAdmin'
import { authenticated } from '../../access/authenticated'
import { preventAuditTrailModification } from './hooks/preventModification'

export const AuditTrailEvents: CollectionConfig = {
  slug: 'audit-trail-events',
  admin: { useAsTitle: 'description', defaultColumns: ['tenant', 'changedBy', 'collectionName', 'operation', 'changedAt'], group: 'Evidence & Findings', description: 'Immutable audit log' },
  access: { read: authenticated, create: isSuperAdminAccess, update: isSuperAdminAccess, delete: isSuperAdminAccess },
  hooks: { beforeChange: [preventAuditTrailModification] },
  timestamps: false,
  fields: [
    { name: 'operation', type: 'select', options: [{ label: 'Create', value: 'create' }, { label: 'Update', value: 'update' }, { label: 'Delete', value: 'delete' }], required: true, index: true },
    { name: 'collectionName', type: 'text', required: true, index: true },
    { name: 'documentId', type: 'text', required: true, index: true },
    { name: 'changedBy', type: 'relationship', relationTo: 'users', required: true, index: true },
    { name: 'changedAt', type: 'date', required: true, index: true },
    { name: 'changesSummary', type: 'textarea' },
    { name: 'changeDetails', type: 'json' },
    { name: 'approvedBy', type: 'relationship', relationTo: 'users' },
    { name: 'approvalStatus', type: 'select', options: [{ label: 'Approved', value: 'approved' }, { label: 'Pending', value: 'pending' }, { label: 'Flagged', value: 'flagged' }] },
    { name: 'changeReason', type: 'textarea' },
    { name: 'systemDetails', type: 'json' },
    { name: 'isDelete', type: 'checkbox', defaultValue: false },
  ],
}