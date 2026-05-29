import type { Access, CollectionConfig } from 'payload'
import { autoPopulateTenant } from '../../hooks/autoPopulateTenant'
import { auditTrailAfterChange } from '../../hooks/auditTrailAfterChange'
import { roleScopedAccess, scopedAccess } from '../../access/auth'
import { statusField, auditFields } from '../../fields'

/**
 * Audit Submissions — the evidence log of each Наредба Н-18 Приложение-38
 * standardized audit file built/submitted to НАП (monthly, by the 15th). Each
 * row records the period, the self-checking header (count + net control sum),
 * the submission status + НАП response, and the XML. Never deleted — it is the
 * compliance trail.
 *
 * @standard BG Наредба-Н-18 §Приложение-38 audit-file-submission-log
 * @audit ISO-19011:2018 §6.4 audit-evidence
 * @compliance SOX §404 internal-controls
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see src/services/sales/submit-audit-file.ts · src/jobs/salesAuditFileJob.ts
 */
const neverDelete: Access = () => false

const AuditSubmissions: CollectionConfig = {
  slug: 'audit-submissions',
  labels: { singular: 'Audit Submission', plural: 'Audit Submissions' },
  admin: {
    useAsTitle: 'periodEnd',
    defaultColumns: ['periodStart', 'periodEnd', 'count', 'controlSum', 'status', 'submittedAt'],
  },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'accountant'),
    update: roleScopedAccess('admin', 'accountant'),
    delete: neverDelete,
  },
  fields: [
    { name: 'periodStart', type: 'date', required: true },
    { name: 'periodEnd', type: 'date', required: true },
    { name: 'count', type: 'number', defaultValue: 0, admin: { description: 'Number of sales in the file.' } },
    { name: 'controlSum', type: 'number', defaultValue: 0, admin: { description: 'Net arithmetic total (cents) — the integrity check.' } },
    statusField(
      [
        { label: 'Built', value: 'built' },
        { label: 'Submitted', value: 'submitted' },
        { label: 'Accepted', value: 'accepted' },
        { label: 'Rejected', value: 'rejected' },
      ],
      'built',
    ),
    { name: 'submittedAt', type: 'date' },
    { name: 'napResponse', type: 'textarea', admin: { description: 'НАП submission response / acknowledgement.' } },
    { name: 'xml', type: 'textarea', admin: { description: 'The submitted Приложение-38 XML.' } },
    ...auditFields(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    afterChange: [auditTrailAfterChange('audit-submissions')],
  },
  timestamps: true,
}

export default AuditSubmissions
