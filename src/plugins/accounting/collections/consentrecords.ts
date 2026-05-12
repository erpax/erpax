/**
 * Consent Records — GDPR Art.6(1)(a) lawful-basis evidence.
 *
 * Captures explicit consent given by data subjects (customers, users) for
 * specific processing purposes — required to demonstrate lawful basis
 * under Art.6(1)(a) and to honour withdrawal requests under Art.7(3).
 *
 * @standard ISO-8601-1:2019 date-time given-at withdrawn-at
 * @compliance GDPR Art.6(1)(a) lawful-basis-consent
 * @compliance GDPR Art.7 conditions-for-consent
 * @compliance GDPR Art.7(3) right-to-withdraw-consent
 * @compliance ISO-27701:2019 §6.3.1.4 record-of-consent
 * @audit ISO-19011:2018 audit-trail consent-evidence
 * @security ISO-27001 A.5.34 privacy-and-pii
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { autoSetTimestamp } from '@/hooks/autoSetTimestamp'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { roleScopedAccess, scopedAccess, adminOnly } from '@/access/auth'
import { multiTenancyField, statusField, notesField, auditFields } from '@/fields/accounting/base-accounting-fields'

const ConsentRecords: CollectionConfig = {
  slug: 'consent-records',
  labels: { singular: 'Consent Record', plural: 'Consent Records' },
  admin: { useAsTitle: 'consentId', defaultColumns: ['consentId', 'dataSubject', 'purpose', 'status', 'givenAt'] },
  // Append-mostly: consent records are evidence; never mutated except for status withdrawal.
  access: {
    read: scopedAccess(),
    create: roleScopedAccess('admin', 'user'),
    update: roleScopedAccess('admin', 'user'), // user can withdraw their own
    delete: adminOnly,
  },
  fields: [
    multiTenancyField(),
    { name: 'consentId', type: 'text', required: true, unique: true, index: true },
    { name: 'dataSubject', type: 'relationship', relationTo: 'users', required: true },
    {
      name: 'purpose',
      type: 'select',
      required: true,
      options: [
        { label: 'Marketing emails', value: 'marketing' },
        { label: 'Analytics / telemetry', value: 'analytics' },
        { label: 'Transactional emails', value: 'transactional' },
        { label: 'Profiling for product recommendations', value: 'profiling' },
        { label: 'Third-party data sharing', value: 'third_party_sharing' },
        { label: 'Cookies — non-essential', value: 'cookies_optional' },
      ],
    },
    { name: 'lawfulBasis', type: 'select', defaultValue: 'consent', options: [
      { label: 'Art.6(1)(a) Consent', value: 'consent' },
      { label: 'Art.6(1)(b) Contract', value: 'contract' },
      { label: 'Art.6(1)(c) Legal obligation', value: 'legal_obligation' },
      { label: 'Art.6(1)(d) Vital interests', value: 'vital_interests' },
      { label: 'Art.6(1)(e) Public task', value: 'public_task' },
      { label: 'Art.6(1)(f) Legitimate interests', value: 'legitimate_interests' },
    ] },
    { name: 'consentText', type: 'textarea', required: true, admin: { description: 'Exact text presented to the data subject at the moment of consent.' } },
    { name: 'consentVersion', type: 'text', admin: { description: 'Version identifier of the consent text (for re-consent flows).' } },
    { name: 'capturedVia', type: 'select', options: ['web_form', 'api', 'paper', 'verbal', 'email_double_optin'].map(v => ({ label: v, value: v })) },
    { name: 'ipAddress', type: 'text', admin: { description: 'Captured at consent time for evidence (Art.7(1)).' } },
    { name: 'userAgent', type: 'text' },
    statusField(
      [
        { label: 'Given', value: 'given' },
        { label: 'Withdrawn', value: 'withdrawn' },
        { label: 'Expired', value: 'expired' },
      ],
      'given',
    ),
    { name: 'givenAt', type: 'date', admin: { readOnly: true } },
    { name: 'withdrawnAt', type: 'date', admin: { readOnly: true } },
    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [
      autoPopulateCreatedBy,
      autoSetTimestamp('givenAt', (d) => (d as { status?: string }).status === 'given'),
      autoSetTimestamp('withdrawnAt', (d) => (d as { status?: string }).status === 'withdrawn'),
    ],
    afterChange: [auditTrailAfterChange('consent-records')],
  },
  timestamps: true,
}

export default ConsentRecords
