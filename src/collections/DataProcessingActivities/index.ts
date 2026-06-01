/**
 * Data Processing Activities — GDPR Art.30 Records of Processing Activities (RoPA).
 *
 * Mandatory register for controllers (Art.30(1)) and processors (Art.30(2)) —
 * each row documents one processing activity (purpose, lawful basis,
 * data categories, retention, recipients, transfers).
 *
 * @standard ISO-8601-1:2019 date-time review-due-at
 * @compliance GDPR Art.30(1) records-controller
 * @compliance GDPR Art.30(2) records-processor
 * @compliance GDPR Art.5(1)(e) storage-limitation
 * @compliance ISO-27701:2019 §6.3.1 records-of-processing
 * @audit ISO-19011:2018 audit-trail ropa-evidence
 * @security ISO-27001 A.5.34 privacy-and-pii
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '../../hooks/standardCollectionHooks'
import { roleScopedAccess, scopedAccess, tenantAdmin } from '../../access/auth'
import { statusField, notesField, auditFields } from '../../fields/base-accounting-fields'

const DataProcessingActivities: CollectionConfig = {
  slug: 'data-processing-activities',
  labels: { singular: 'Processing Activity', plural: 'Processing Activities' },
  admin: { useAsTitle: 'activityName', defaultColumns: ['activityName', 'purpose', 'lawfulBasis', 'controllerOrProcessor', 'reviewDueAt'] },
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin'),
    update: roleScopedAccess('admin'),
    delete: tenantAdmin,
  },
  fields: [
    { name: 'activityName', type: 'text', required: true, unique: true },
    { name: 'purpose', type: 'textarea', required: true },
    {
      name: 'controllerOrProcessor',
      type: 'select',
      required: true,
      options: [
        { label: 'Controller (Art.30(1))', value: 'controller' },
        { label: 'Processor (Art.30(2))', value: 'processor' },
        { label: 'Joint controller (Art.26)', value: 'joint_controller' },
      ],
    },
    {
      name: 'lawfulBasis',
      type: 'select',
      required: true,
      options: [
        { label: 'Consent (Art.6(1)(a))', value: 'consent' },
        { label: 'Contract (Art.6(1)(b))', value: 'contract' },
        { label: 'Legal obligation (Art.6(1)(c))', value: 'legal_obligation' },
        { label: 'Vital interests (Art.6(1)(d))', value: 'vital_interests' },
        { label: 'Public task (Art.6(1)(e))', value: 'public_task' },
        { label: 'Legitimate interests (Art.6(1)(f))', value: 'legitimate_interests' },
      ],
    },
    {
      name: 'dataCategories',
      type: 'array',
      fields: [
        { name: 'category', type: 'text', required: true },
        { name: 'special', type: 'checkbox', defaultValue: false, admin: { description: 'Art.9 special category data?' } },
      ],
    },
    {
      name: 'dataSubjectCategories',
      type: 'array',
      fields: [{ name: 'category', type: 'text', required: true, admin: { description: 'e.g. customers, employees, prospects.' } }],
    },
    {
      name: 'recipientCategories',
      type: 'array',
      fields: [{ name: 'recipient', type: 'text', localized: true, required: true }],
    },
    {
      name: 'thirdCountryTransfers',
      type: 'array',
      // Shortened DB table name keeps the nested `safeguard` enum identifier
      // under the 63-char Postgres/SQLite cap. Without this, the generated
      // enum is `enum_data_processing_activities_third_country_transfers_safeguard`
      // (65 chars) and `migrate:generate` throws.
      dbName: 'transfers',
      admin: { description: 'Art.44 transfers — list each destination + safeguard.' },
      fields: [
        { name: 'country', type: 'text', required: true },
        { name: 'safeguard', type: 'select', options: ['adequacy_decision', 'sccs', 'bcrs', 'derogation'].map(v => ({ label: v, value: v })) },
      ],
    },
    { name: 'retentionPeriod', type: 'text', required: true, admin: { description: 'How long we keep this data + basis.' } },
    { name: 'securityMeasures', type: 'textarea', admin: { description: 'Technical + organisational measures (Art.32).' } },
    statusField([
      { label: 'Active', value: 'active' },
      { label: 'Suspended', value: 'suspended' },
      { label: 'Retired', value: 'retired' },
    ], 'active'),
    { name: 'reviewDueAt', type: 'date', required: true, admin: { description: 'Schedule a review at least annually.' } },
    { name: 'dpo', type: 'relationship', relationTo: 'users', admin: { description: 'Data Protection Officer responsible for this activity.' } },
    ...auditFields(),
    notesField(),
  ],
  hooks: standardCollectionHooks('data-processing-activities'),
  timestamps: true,
}

export default DataProcessingActivities
