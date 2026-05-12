/**
 * Job Positions — open positions + org-chart anchor.
 *
 * Slice GGGG (2026-05-10): HR-domain — distinct from `employees` (a
 * person filling a position). A position can be vacant, filled, or
 * planned; one position = one person at a time. Drives the org chart,
 * recruiting pipeline, and headcount planning.
 *
 * @standard ISO-8601-1:2019 date-time
 * @accounting IFRS IAS-19 employee-benefits (planned-headcount accruals)
 * @audit ISO-19011:2018 audit-trail headcount-evidence
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./Employees.ts
 * @see ./RecruitingPipeline.ts
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/hooks/autoPopulateTenant'
import { autoPopulateCreatedBy } from '@/hooks/autoPopulateCreatedBy'
import { auditTrailAfterChange } from '@/hooks/auditTrailAfterChange'
import { accountingCollectionAccess } from '@/access/auth'
import { multiTenancyField, currencyField, statusField, notesField, auditFields, legalEntityField } from '@/fields/accounting/base-accounting-fields'

const JobPositions: CollectionConfig = {
  slug: 'job-positions',
  labels: { singular: 'Job Position', plural: 'Job Positions' },
  admin: {
    useAsTitle: 'positionTitle',
    defaultColumns: ['positionCode', 'positionTitle', 'department', 'level', 'currentEmployee', 'status'],
    description:
      'Job position (an org-chart slot). One position = at most one current employee. Drives recruiting + headcount budget.',
  },
  access: accountingCollectionAccess(),
  fields: [
    multiTenancyField(),
    { name: 'positionCode', type: 'text', required: true, unique: true, index: true },
    { name: 'positionTitle', type: 'text', required: true, index: true },
    { name: 'department', type: 'text', index: true },
    { name: 'costCenter', type: 'relationship', relationTo: 'cost-centers' },
    legalEntityField(),
    { name: 'reportsTo', type: 'relationship', relationTo: 'job-positions',
      admin: { description: 'Manager position (org-chart parent).' } },
    { name: 'level', type: 'select', options: [
      { label: 'Intern', value: 'intern' },
      { label: 'Junior / IC1', value: 'junior' },
      { label: 'Mid / IC2', value: 'mid' },
      { label: 'Senior / IC3', value: 'senior' },
      { label: 'Staff / IC4', value: 'staff' },
      { label: 'Principal / IC5', value: 'principal' },
      { label: 'Manager M1', value: 'manager_m1' },
      { label: 'Manager M2', value: 'manager_m2' },
      { label: 'Director', value: 'director' },
      { label: 'VP', value: 'vp' },
      { label: 'C-Suite', value: 'c_suite' },
    ]},
    {
      name: 'employmentType',
      type: 'select',
      defaultValue: 'full_time',
      options: [
        { label: 'Full-time', value: 'full_time' },
        { label: 'Part-time', value: 'part_time' },
        { label: 'Fixed-term', value: 'fixed_term' },
        { label: 'Contractor', value: 'contractor' },
        { label: 'Intern', value: 'intern' },
      ],
    },
    { name: 'fte', type: 'number', min: 0, max: 1, defaultValue: 1,
      admin: { description: 'Full-Time Equivalent (1.0 = full-time).' } },
    { name: 'jobDescription', type: 'textarea' },
    { name: 'requirements', type: 'textarea',
      admin: { description: 'Skills, certifications, experience required.' } },
    { name: 'workLocation', type: 'text' },
    {
      name: 'workArrangement',
      type: 'select',
      options: [
        { label: 'On-site', value: 'on_site' },
        { label: 'Hybrid', value: 'hybrid' },
        { label: 'Remote', value: 'remote' },
      ],
    },
    currencyField(),
    {
      name: 'salaryRange',
      type: 'group',
      fields: [
        { name: 'min', type: 'number',
          admin: { description: 'Minimum annual salary (cents).' } },
        { name: 'mid', type: 'number' },
        { name: 'max', type: 'number' },
      ],
    },
    { name: 'budgetedAnnualCost', type: 'number',
      admin: { description: 'Budgeted total cost incl. salary + payroll taxes + benefits + bonus (cents).' } },
    { name: 'currentEmployee', type: 'relationship', relationTo: 'employees',
      admin: { readOnly: true, description: 'Current incumbent (null = vacant).' } },
    { name: 'effectiveStartDate', type: 'date', required: true },
    { name: 'effectiveEndDate', type: 'date',
      admin: { description: 'Date position is closed / removed from headcount.' } },
    { name: 'isApprovedHeadcount', type: 'checkbox', defaultValue: false,
      admin: { description: 'Position approved in the annual headcount plan.' } },
    statusField(
      [
        { label: 'Planned', value: 'planned' },
        { label: 'Approved (in budget)', value: 'approved' },
        { label: 'Open (recruiting)', value: 'open' },
        { label: 'Filled', value: 'filled' },
        { label: 'On Hold', value: 'on_hold' },
        { label: 'Closed (eliminated)', value: 'closed' },
      ],
      'planned',
    ),
    ...auditFields({ readOnly: true }),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('job-positions')],
  },
  timestamps: true,
}

export default JobPositions
