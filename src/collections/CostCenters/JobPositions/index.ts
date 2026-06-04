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
import { standardCollectionHooks } from '@/hooks/standardCollectionHooks'
import { trainingAfterChange } from '@/services/agent-sync/training-broadcast'
import { accountingCollectionAccess } from '@/access/auth'
import { currencyField, statusField, notesField, auditFields, legalEntityField } from '@/fields/base-accounting-fields'
import { competencyLineField } from '@/fields/competency'

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
    { name: 'positionCode', type: 'text', required: true, unique: true, index: true },
    { name: 'positionTitle', type: 'text', required: true, index: true },
    // Occupation backbone (deep-research verified): an ESCO occupation rolls up
    // 1:1 to exactly one ISCO-08 unit group — so a position classifies
    // deterministically for workforce reporting / interoperability.
    { name: 'escoOccupation', type: 'text', index: true,
      admin: { description: 'ESCO occupation URI (level 5+). Rolls up to one ISCO-08 unit group.' } },
    { name: 'iscoUnitGroup', type: 'text', index: true,
      admin: { description: 'ISCO-08 unit group code (4-digit). Deterministic rollup from the ESCO occupation.' } },
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
      admin: { description: 'Free-text requirements narrative. Structured requirements live in `requiredCompetencies`.' } },
    // The job IS a required-competency set — the SAME line definition an actor
    // holds, in `required` mode. Skill-match (recruiting) = required − held.
    competencyLineField({ mode: 'required' }),
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
  // afterChange arms the auto-train loop: an incumbent's gap vs this role is
  // priced on the decompression curve and broadcast as a training plan ([[train]]).
  hooks: standardCollectionHooks('job-positions', { afterChange: [trainingAfterChange()] }),
  timestamps: true,
}

export default JobPositions
