/**
 * Internal Audit Function — single-folder collection node.
 *
 * @standard IIA IPPF international-professional-practices-framework
 * @audit ISO-19011:2018 audit-programme
 * @compliance SOX §404 internal-controls
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import { CollectionConfig } from 'payload'
import { roleBasedAccess } from '@/access/roleBasedAccess'

export const InternalAuditFunction: CollectionConfig = {
  slug: 'internal-audit-function',
  admin: {
    useAsTitle: 'functionName',
  },
  access: roleBasedAccess({
    read: ['super-admin', 'admin', 'audit-staff', 'compliance-officer'],
    create: ['super-admin', 'admin'],
    update: ['super-admin', 'admin'],
    delete: ['super-admin'],
  }),
  fields: [
    {
      name: 'entity',
      type: 'relationship',
      relationTo: 'legal-entities',
      required: true,
    },
    {
      name: 'functionName',
      type: 'text',
      required: true,
      admin: { description: 'E.g., "Internal Audit Department".' },
    },
    {
      name: 'auditCharter',
      type: 'richText',
      required: true,
      admin: { description: 'Internal audit charter per IIA Standards (IPPF, COSO).' },
    },
    {
      name: 'charterId',
      type: 'text',
      unique: true,
      admin: { description: 'Charter version/date identifier.' },
    },
    {
      name: 'charterApprovedDate',
      type: 'date',
      required: true,
    },
    {
      name: 'reportingLine',
      type: 'select',
      options: [
        { label: 'Reports to Audit Committee', value: 'audit-committee' },
        { label: 'Reports to CFO', value: 'cfo' },
        { label: 'Reports to CEO', value: 'ceo' },
        { label: 'Dotted Line to Board', value: 'board-dotted' },
      ],
      required: true,
    },
    {
      name: 'chiefAuditExecutive',
      type: 'text',
      required: true,
      admin: { description: 'Chief Audit Executive (CAE) / Head of Internal Audit.' },
    },
    {
      name: 'chiefAuditExecutiveContact',
      type: 'text',
      admin: { description: 'Email/phone.' },
    },
    {
      name: 'auditCommittee',
      type: 'relationship',
      relationTo: 'audit-committees',
      admin: { description: 'Primary audit committee for governance oversight.' },
    },
    {
      name: 'auditStaffCount',
      type: 'number',
      admin: { description: 'Number of internal audit staff.' },
    },
    {
      name: 'auditBudget',
      type: 'number',
      admin: { description: 'Annual internal audit budget.' },
    },
    {
      name: 'auditPlan',
      type: 'richText',
      admin: { description: 'Annual audit plan (risks, scope, staff allocation).' },
    },
    {
      name: 'auditPlanYear',
      type: 'text',
      admin: { description: 'Fiscal year of the plan.' },
    },
    {
      name: 'auditPlanApprovedDate',
      type: 'date',
    },
    {
      name: 'auditPlanDocument',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Annual audit plan (PDF).' },
    },
    {
      name: 'auditEngagements',
      type: 'array',
      fields: [
        { name: 'engagementName', type: 'text', required: true },
        { name: 'engagementType', type: 'select', options: [
          { label: 'Financial Audit', value: 'financial' },
          { label: 'Operational Audit', value: 'operational' },
          { label: 'Compliance Audit', value: 'compliance' },
          { label: 'IT Audit', value: 'it' },
          { label: 'Fraud Investigation', value: 'fraud' },
          { label: 'Special Review', value: 'special-review' },
        ], required: true},
        { name: 'objectiveScope', type: 'richText' },
        { name: 'startDate', type: 'date', required: true },
        { name: 'completionDate', type: 'date' },
        { name: 'status', type: 'select', options: [
          { label: 'Planned', value: 'planned' },
          { label: 'In Progress', value: 'in-progress' },
          { label: 'Field Work Complete', value: 'fieldwork-complete' },
          { label: 'Report Issued', value: 'report-issued' },
          { label: 'Cancelled', value: 'cancelled' },
        ], defaultValue: 'planned'},
        { name: 'reportIssued', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'auditReports',
      type: 'relationship',
      relationTo: 'audit-committee-minutes',
      hasMany: true,
      admin: { description: 'Links to minutes where audit reports were presented.' },
    },
    {
      name: 'auditFindings',
      type: 'relationship',
      relationTo: 'audit-findings',
      hasMany: true,
      admin: { description: 'Findings from internal audit engagements.' },
    },
    {
      name: 'followUpTracking',
      type: 'array',
      fields: [
        { name: 'findingReference', type: 'text', required: true },
        { name: 'managementAction', type: 'richText', required: true },
        { name: 'targetImplementationDate', type: 'date', required: true },
        { name: 'implementationDate', type: 'date' },
        { name: 'followUpStatus', type: 'select', options: [
          { label: 'Not Started', value: 'not-started' },
          { label: 'In Progress', value: 'in-progress' },
          { label: 'Completed', value: 'completed' },
          { label: 'Not Implemented', value: 'not-implemented' },
        ], defaultValue: 'not-started'},
        { name: 'notes', type: 'richText' },
      ],
    },
    {
      name: 'performanceMetrics',
      type: 'richText',
      admin: { description: 'KPIs: audit hours, engagements completed, findings, etc.' },
    },
    {
      name: 'qualityAssurance',
      type: 'richText',
      admin: { description: 'Internal and external quality assurance reviews (IIA IPPF).' },
    },
    {
      name: 'lastQualityReview',
      type: 'date',
      admin: { description: 'Date of last external QA review (required every 5 years).' },
    },
    {
      name: 'nextQualityReview',
      type: 'date',
    },
    {
      name: 'professionalStandards',
      type: 'richText',
      admin: { description: 'Adherence to IIA International Standards, code of ethics.' },
    },
    {
      name: 'resourceAdequacy',
      type: 'richText',
      admin: { description: 'Assessment of adequacy of internal audit resources.' },
    },
    {
      name: 'independenceAndObjectivity',
      type: 'richText',
      admin: { description: 'Statement of independence and objectivity per IIA 1100 series.' },
    },
    {
      name: 'riskBasedAuditing',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Uses risk-based approach aligned with entity risk register.' },
    },
    {
      name: 'auditFunctionStatus',
      type: 'select',
      options: [
        { label: 'Established & Operating', value: 'established' },
        { label: 'Establishing', value: 'establishing' },
        { label: 'Under Review', value: 'under-review' },
        { label: 'Dormant', value: 'dormant' },
      ],
      required: true,
      defaultValue: 'established',
    },
    {
      name: 'charterDocument',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Formal audit charter (PDF).' },
    },
  ],
}
