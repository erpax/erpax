/**
 * Performance Reviews — annual / quarterly review records.
 *
 * Slice GGGG (2026-05-10): per-employee review with self-assessment +
 * manager review + (optional) peer feedback. Drives merit-increase
 * recommendations + promotion decisions + PIP triggers.
 *
 * @standard ISO-8601-1:2019 date-time
 * @compliance GDPR Art.5 PII processing
 * @compliance EU Equal Treatment Directive 2000/78
 * @audit ISO-19011:2018 audit-trail performance-evidence
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./Employees.ts
 */

import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/hooks/standardCollectionHooks'
import { accountingCollectionAccess } from '@/access/auth'
import { currencyField, statusField, notesField, auditFields, referenceField } from '@/fields/base-accounting-fields'

const PerformanceReviews: CollectionConfig = {
  slug: 'performance-reviews',
  labels: { singular: 'Performance Review', plural: 'Performance Reviews' },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'employee', 'reviewPeriod', 'overallRating', 'reviewer', 'status'],
    description:
      'Per-employee periodic review (annual / quarterly). Self + manager + (optional) peer assessments → rating + merit / promotion outcome.',
  },
  access: accountingCollectionAccess(),
  fields: [
    referenceField(),
    { name: 'employee', type: 'relationship', relationTo: 'employees', required: true, index: true },
    { name: 'reviewer', type: 'relationship', relationTo: 'users', required: true,
      admin: { description: 'Manager / reviewing leader.' } },
    {
      name: 'reviewType',
      type: 'select',
      required: true,
      defaultValue: 'annual',
      options: [
        { label: 'Annual', value: 'annual' },
        { label: 'Mid-year', value: 'mid_year' },
        { label: 'Quarterly', value: 'quarterly' },
        { label: 'Probation Review', value: 'probation' },
        { label: 'Promotion Review', value: 'promotion' },
        { label: 'PIP Review (Performance Improvement Plan)', value: 'pip' },
        { label: '360-Degree', value: '360' },
        { label: 'Project Closeout', value: 'project_closeout' },
      ],
    },
    { name: 'reviewPeriod', type: 'text', required: true,
      admin: { description: 'e.g. 2026-FY, 2026-H1, 2026-Q1.' } },
    { name: 'reviewDate', type: 'date', required: true },
    { name: 'periodStartDate', type: 'date' },
    { name: 'periodEndDate', type: 'date' },
    {
      name: 'selfAssessment',
      type: 'group',
      fields: [
        { name: 'submittedAt', type: 'date' },
        { name: 'achievements', type: 'textarea' },
        { name: 'challenges', type: 'textarea' },
        { name: 'developmentAreas', type: 'textarea' },
        { name: 'careerGoals', type: 'textarea' },
        { name: 'selfRating', type: 'select', options: [
          { label: 'Far Exceeds Expectations', value: 'far_exceeds' },
          { label: 'Exceeds Expectations', value: 'exceeds' },
          { label: 'Meets Expectations', value: 'meets' },
          { label: 'Partially Meets', value: 'partially_meets' },
          { label: 'Does Not Meet', value: 'does_not_meet' },
        ]},
      ],
    },
    {
      name: 'managerReview',
      type: 'group',
      fields: [
        { name: 'submittedAt', type: 'date' },
        { name: 'strengths', type: 'textarea' },
        { name: 'areasForImprovement', type: 'textarea' },
        { name: 'goalAchievement', type: 'textarea' },
        { name: 'developmentPlan', type: 'textarea' },
      ],
    },
    {
      name: 'overallRating',
      type: 'select',
      options: [
        { label: 'Far Exceeds Expectations (5)', value: 'far_exceeds' },
        { label: 'Exceeds Expectations (4)', value: 'exceeds' },
        { label: 'Meets Expectations (3)', value: 'meets' },
        { label: 'Partially Meets (2)', value: 'partially_meets' },
        { label: 'Does Not Meet (1)', value: 'does_not_meet' },
        { label: 'Too New to Rate', value: 'too_new' },
      ],
    },
    { name: 'numericScore', type: 'number', min: 1, max: 5 },
    {
      name: 'competencyRatings',
      type: 'array',
      labels: { singular: 'Competency Rating', plural: 'Competency Ratings' },
      dbName: 'pr_comp_rating',
      fields: [
        { name: 'competency', type: 'text', required: true },
        { name: 'rating', type: 'number', min: 1, max: 5, required: true },
        { name: 'comment', type: 'text', localized: true },
      ],
    },
    {
      name: 'outcome',
      type: 'group',
      fields: [
        { name: 'recommendsPromotion', type: 'checkbox', defaultValue: false },
        { name: 'newJobPosition', type: 'relationship', relationTo: 'job-positions' },
        { name: 'recommendsMeritIncrease', type: 'checkbox', defaultValue: false },
        currencyField(),
        { name: 'meritIncreasePercent', type: 'number' },
        { name: 'meritIncreaseAmount', type: 'number',
          admin: { description: 'Annualised increase (cents).' } },
        { name: 'recommendsBonus', type: 'checkbox', defaultValue: false },
        { name: 'bonusAmount', type: 'number' },
        { name: 'requiresPip', type: 'checkbox', defaultValue: false,
          admin: { description: 'Performance Improvement Plan required.' } },
      ],
    },
    {
      name: 'goalsForNextPeriod',
      type: 'array',
      labels: { singular: 'Goal', plural: 'Goals' },
      dbName: 'pr_next_goals',
      fields: [
        { name: 'goal', type: 'text', required: true },
        { name: 'measurableOutcome', type: 'text' },
        { name: 'targetDate', type: 'date' },
      ],
    },
    { name: 'employeeAcknowledged', type: 'checkbox', defaultValue: false },
    { name: 'employeeAcknowledgedAt', type: 'date' },
    { name: 'employeeComments', type: 'textarea' },
    statusField(
      [
        { label: 'Draft', value: 'draft' },
        { label: 'Self-Assessment In Progress', value: 'self_in_progress' },
        { label: 'Manager Review In Progress', value: 'mgr_in_progress' },
        { label: 'Calibration', value: 'calibration' },
        { label: 'Awaiting Acknowledgement', value: 'awaiting_ack' },
        { label: 'Acknowledged (final)', value: 'acknowledged' },
        { label: 'Disputed', value: 'disputed' },
      ],
      'draft',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: standardCollectionHooks('performance-reviews'),
  timestamps: true,
}

export default PerformanceReviews
