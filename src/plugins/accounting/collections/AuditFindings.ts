/**
 * Audit Findings — issues raised by internal/external auditors against controls.
 *
 * @standard ISO-19011:2018 audit-finding
 * @standard ISO/IEC-27007 ISMS-auditing
 * @compliance SOX §404 deficiency-classification
 * @compliance SOC-2 CC4.1 monitoring-and-evaluation
 * @audit ISO-19011:2018 audit-trail finding-evidence
 * @security ISO-27001 §9.2 internal-audit
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { enforceSegregationOfDuties } from '@/hooks/enforceSegregationOfDuties'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '@/plugins/auth/access'
import { multiTenancyField, statusField, notesField, auditFields } from '../fields/base-accounting-fields'

const AuditFindings: CollectionConfig = {
  slug: 'audit-findings',
  labels: { singular: 'Audit Finding', plural: 'Audit Findings' },
  admin: { useAsTitle: 'findingId', defaultColumns: ['findingId', 'severity', 'classification', 'status', 'reportedAt'] },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'auditor'),
    update: roleScopedAccess('admin', 'auditor'),
    delete: tenantAdmin,
  },
  fields: [
    multiTenancyField(),
    { name: 'findingId', type: 'text', required: true, unique: true, index: true },
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'description', type: 'textarea', localized: true, required: true },
    {
      name: 'severity',
      type: 'select',
      required: true,
      options: [
        { label: 'Observation (informational)', value: 'observation' },
        { label: 'Deficiency', value: 'deficiency' },
        { label: 'Significant Deficiency (SOX)', value: 'significant_deficiency' },
        { label: 'Material Weakness (SOX)', value: 'material_weakness' },
      ],
    },
    {
      name: 'classification',
      type: 'select',
      required: true,
      options: [
        { label: 'Design — control not designed adequately', value: 'design' },
        { label: 'Operating — control not operating effectively', value: 'operating' },
        { label: 'Documentation', value: 'documentation' },
        { label: 'Compensating', value: 'compensating' },
      ],
    },
    { name: 'controlTest', type: 'relationship', relationTo: 'control-tests', admin: { description: 'Originating control test (if any).' } },
    { name: 'reportedAt', type: 'date', required: true },
    { name: 'reportedBy', type: 'relationship', relationTo: 'users' },
    { name: 'remediationPlan', type: 'textarea' },
    { name: 'remediationOwner', type: 'relationship', relationTo: 'users' },
    { name: 'targetCloseDate', type: 'date' },
    statusField(
      [
        { label: 'Open', value: 'open' },
        { label: 'In Remediation', value: 'in_remediation' },
        { label: 'Closed — remediated', value: 'closed_remediated' },
        { label: 'Closed — accepted risk', value: 'closed_accepted' },
        { label: 'Closed — false positive', value: 'closed_false_positive' },
      ],
      'open',
    ),
    { name: 'closedAt', type: 'date', admin: { readOnly: true } },
    { name: 'closedBy', type: 'relationship', relationTo: 'users' },
    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      autoPopulateCreatedBy,
      enforceSegregationOfDuties('closedBy', 'reportedBy'),
      autoSetTimestamp('closedAt', (d) => String((d as { status?: string }).status ?? '').startsWith('closed')),
    ],
    afterChange: [auditTrailAfterChange('audit-findings')],
  },
  timestamps: true,
}

export default AuditFindings
