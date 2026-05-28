/**
 * Control Tests — SOX §404 testing evidence (sampling, walkthrough, results).
 *
 * @standard ISO-19011:2018 audit-sampling
 * @compliance SOX §404 internal-controls testing-evidence
 * @compliance AICPA-AT-C 205 examination-engagements
 * @compliance SOC-2 testing-of-controls
 * @audit ISO-19011:2018 audit-trail control-test-evidence
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '../hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '../hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '../hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '../hooks/auditTrailAfterChange'
import { enforceSegregationOfDuties } from '../hooks/enforceSegregationOfDuties'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '../access/auth'
import { statusField, notesField, auditFields } from '../fields/base-accounting-fields'

const ControlTests: CollectionConfig = {
  slug: 'control-tests',
  labels: { singular: 'Control Test', plural: 'Control Tests' },
  admin: { useAsTitle: 'testId', defaultColumns: ['testId', 'controlName', 'periodEnd', 'result', 'status'] },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'auditor'),
    update: roleScopedAccess('admin', 'auditor'),
    delete: tenantAdmin,
  },
  fields: [
    { name: 'testId', type: 'text', required: true, unique: true, index: true },
    { name: 'controlName', type: 'text', required: true, admin: { description: 'e.g. "Period close — close-vs-creator SoD".' } },
    { name: 'controlObjective', type: 'textarea', required: true },
    { name: 'controlFrequency', type: 'select', options: ['continuous', 'daily', 'weekly', 'monthly', 'quarterly', 'annually', 'event-driven'].map(v => ({ label: v, value: v })) },
    {
      name: 'testType',
      type: 'select',
      required: true,
      options: [
        { label: 'Inquiry', value: 'inquiry' },
        { label: 'Observation', value: 'observation' },
        { label: 'Inspection', value: 'inspection' },
        { label: 'Re-performance', value: 'reperformance' },
        { label: 'Walkthrough', value: 'walkthrough' },
        { label: 'Automated test', value: 'automated' },
      ],
    },
    { name: 'periodStart', type: 'date', required: true },
    { name: 'periodEnd', type: 'date', required: true },
    { name: 'sampleSize', type: 'number', defaultValue: 0 },
    { name: 'exceptions', type: 'number', defaultValue: 0, admin: { description: 'Sample units that failed the test.' } },
    {
      name: 'result',
      type: 'select',
      options: [
        { label: 'Effective', value: 'effective' },
        { label: 'Effective with exceptions', value: 'effective_with_exceptions' },
        { label: 'Ineffective', value: 'ineffective' },
        { label: 'Not applicable', value: 'na' },
      ],
    },
    { name: 'evidence', type: 'textarea' },
    { name: 'tester', type: 'relationship', relationTo: 'users' },
    { name: 'reviewer', type: 'relationship', relationTo: 'users', admin: { description: 'Independent reviewer (≠ tester per SoD).' } },
    {
      name: 'findings',
      type: 'join',
      collection: 'audit-findings',
      on: 'controlTest',
      admin: { description: 'Findings raised from this test.' },
    },
    statusField(
      [
        { label: 'Planned', value: 'planned' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Tester Complete', value: 'tester_complete' },
        { label: 'Reviewed', value: 'reviewed' },
        { label: 'Signed Off', value: 'signed_off' },
      ],
      'planned',
    ),
    { name: 'signedOffAt', type: 'date', admin: { readOnly: true } },
    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      autoPopulateCreatedBy,
      enforceSegregationOfDuties('reviewer', 'tester'),
      autoSetTimestamp('signedOffAt', (d) => (d as { status?: string }).status === 'signed_off'),
    ],
    afterChange: [auditTrailAfterChange('control-tests')],
  },
  timestamps: true,
}

export default ControlTests
