/**
 * Recruiting Pipeline — applicants / interviews / offers per position.
 *
 * Slice GGGG (2026-05-10): GDPR Art.6(1)(b) recruitment lawful basis
 * (necessary for steps prior to entering a contract). Each candidate
 * application is one row; status walks through the funnel; PII is
 * subject to retention limits per GDPR Art.5(1)(e).
 *
 * @standard ISO-8601-1:2019 date-time
 * @compliance GDPR Art.6(1)(b) recruitment-lawful-basis
 * @compliance GDPR Art.5(1)(e) storage-limitation
 * @compliance EU Equal Treatment Directive 2000/78
 * @compliance ADA / EEOC US-equal-opportunity
 * @audit ISO-19011:2018 audit-trail recruiting-evidence
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./JobPositions.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '@/access/auth'
import { currencyField, statusField, notesField, auditFields } from '@/fields/base-accounting-fields'

const RecruitingPipeline: CollectionConfig = {
  slug: 'recruiting-pipeline',
  labels: { singular: 'Candidate Application', plural: 'Recruiting Pipeline' },
  admin: {
    useAsTitle: 'candidateName',
    defaultColumns: ['candidateName', 'position', 'stage', 'recruiter', 'applicationDate', 'status'],
    description:
      'GDPR-compliant candidate pipeline. One row per (candidate × position). Funnel: applied → screening → interview → offer → hired / rejected.',
  },
  access: accountingCollectionAccess(),
  fields: [
    { name: 'candidateName', type: 'text', required: true, index: true },
    { name: 'firstName', type: 'text' },
    { name: 'lastName', type: 'text' },
    { name: 'email', type: 'email', required: true, index: true },
    { name: 'phone', type: 'text' },
    { name: 'linkedinUrl', type: 'text' },
    { name: 'position', type: 'relationship', relationTo: 'job-positions', required: true, index: true },
    { name: 'recruiter', type: 'relationship', relationTo: 'users' },
    { name: 'hiringManager', type: 'relationship', relationTo: 'users' },
    { name: 'applicationDate', type: 'date', required: true, index: true },
    {
      name: 'source',
      type: 'select',
      options: [
        { label: 'Job Board (LinkedIn / Indeed / etc.)', value: 'job_board' },
        { label: 'Company Website', value: 'company_website' },
        { label: 'Employee Referral', value: 'referral' },
        { label: 'Recruiter (agency)', value: 'agency' },
        { label: 'Internal Transfer', value: 'internal' },
        { label: 'University Career Fair', value: 'university' },
        { label: 'Direct Sourcing (cold reach)', value: 'sourced' },
        { label: 'Re-application (former candidate)', value: 'reapplied' },
      ],
    },
    { name: 'referrer', type: 'relationship', relationTo: 'employees',
      admin: { description: 'Referring employee (when source = referral).' } },
    {
      name: 'stage',
      type: 'select',
      required: true,
      defaultValue: 'applied',
      options: [
        { label: 'Applied', value: 'applied' },
        { label: 'Screening', value: 'screening' },
        { label: 'Phone Screen', value: 'phone_screen' },
        { label: 'Technical / Take-Home', value: 'technical' },
        { label: 'Onsite / Final Interview', value: 'onsite' },
        { label: 'Reference Check', value: 'reference_check' },
        { label: 'Offer Extended', value: 'offer_extended' },
        { label: 'Offer Accepted', value: 'offer_accepted' },
        { label: 'Offer Declined', value: 'offer_declined' },
        { label: 'Hired (onboarding)', value: 'hired' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Withdrawn (candidate pulled)', value: 'withdrawn' },
      ],
    },
    {
      name: 'interviewSchedule',
      type: 'array',
      labels: { singular: 'Interview', plural: 'Interviews' },
      dbName: 'rp_intvw',
      fields: [
        { name: 'round', type: 'text' },
        { name: 'scheduledDate', type: 'date' },
        { name: 'interviewers', type: 'relationship', relationTo: 'users', hasMany: true },
        { name: 'feedback', type: 'select', options: [
          { label: 'Strong Hire', value: 'strong_hire' },
          { label: 'Hire', value: 'hire' },
          { label: 'No Hire', value: 'no_hire' },
          { label: 'Strong No Hire', value: 'strong_no_hire' },
        ]},
        { name: 'feedbackNotes', type: 'textarea' },
      ],
    },
    {
      name: 'offerDetails',
      type: 'group',
      fields: [
        currencyField(),
        { name: 'baseSalary', type: 'number',
          admin: { description: 'Annual base salary (cents).' } },
        { name: 'signOnBonus', type: 'number' },
        { name: 'equityGrant', type: 'text' },
        { name: 'targetStartDate', type: 'date' },
        { name: 'offerExtendedDate', type: 'date' },
        { name: 'offerExpiryDate', type: 'date' },
      ],
    },
    { name: 'rejectionReason', type: 'select', options: [
      { label: 'Not Qualified', value: 'not_qualified' },
      { label: 'Other Candidate Selected', value: 'other_selected' },
      { label: 'Compensation Mismatch', value: 'comp_mismatch' },
      { label: 'Cultural Fit', value: 'cultural_fit' },
      { label: 'Position Cancelled', value: 'position_cancelled' },
      { label: 'Failed Background / Reference', value: 'background_check' },
      { label: 'Other', value: 'other' },
    ]},
    { name: 'consentRecord', type: 'relationship', relationTo: 'consent-records',
      admin: { description: 'GDPR Art.6 consent for retention beyond standard retention period.' } },
    { name: 'piiRetentionUntil', type: 'date',
      admin: { description: 'GDPR Art.5(1)(e) — date after which PII must be purged unless consent renewed.' } },
    { name: 'createdEmployee', type: 'relationship', relationTo: 'employees',
      admin: { readOnly: true, description: 'Employee record created on hire.' } },
    statusField(
      [
        { label: 'Active', value: 'active' },
        { label: 'Hired', value: 'hired' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Withdrawn', value: 'withdrawn' },
        { label: 'On Hold (talent pool)', value: 'on_hold' },
        { label: 'PII Purged (GDPR retention expired)', value: 'pii_purged' },
      ],
      'active',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('recruiting-pipeline'),
  timestamps: true,
}

export default RecruitingPipeline
