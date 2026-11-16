/**
 * The governed document types — what a governed page can be (src/fields/group/governedDocument), and
 * who reads and writes each. A leaf: the page's access and the role abilities (src/utilities/ability/roles)
 * both read it, so the rule for a type is stated once.
 *
 * What the types share is the page's `document` concern. A type whose standard needs fields of its own
 * declares a `block` (its own table, so the page never nears D1's width) and may add a `check`.
 */
import type { Block } from 'payload'

export interface GovernedType {
  readonly value: string
  readonly label: string
  /** Roles that read this type (a super-admin reads every type). */
  readonly read: readonly string[]
  /** Roles that write this type (a super-admin writes every type). */
  readonly write: readonly string[]
  /** `document` fields this type requires. */
  readonly requires: readonly ('code' | 'effectiveDate' | 'classification' | 'jurisdiction')[]
  /** The fields this type's standard needs beyond the shared concern: `document.details`, one block. */
  readonly block?: Block
  /** What no two documents of this type in one tenant share: the title (a GDPR record is known by its name), the code (a charter by its id). */
  readonly unique?: readonly ('title' | 'code')[]
  /** A rule of this type over its details block (and the shared concern it sits in), or true. */
  readonly check?: (details: Record<string, unknown>, document: Record<string, unknown>) => string | true
}

/**
 * A principal officer certifies the filing, assertion by assertion.
 *
 * @compliance SOX §302 corporate-responsibility
 * @compliance SOX §906 criminal-certification
 */
export const ManagementCertification: Block = {
  slug: 'management-certification',
  interfaceName: 'ManagementCertificationBlock',
  labels: { singular: 'Management certification', plural: 'Management certifications' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'certificationType',
          type: 'select',
          required: true,
          options: [
            { label: 'SOX 302', value: 'sox-302' },
            { label: 'SOX 906', value: 'sox-906' },
            { label: 'Section 13 or 15(d)', value: 'section-13-15d' },
            { label: 'Internal Controls', value: 'internal-controls' },
            { label: 'Financial Statement', value: 'financial-statement' },
            { label: 'Other', value: 'other' },
          ],
        },
        { name: 'certifyingOfficer', type: 'text', required: true },
        { name: 'entity', type: 'relationship', relationTo: 'legal-entities', required: true },
      ],
    },
    {
      name: 'assertions',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'assertion', type: 'text', required: true },
            {
              name: 'certificationLevel',
              type: 'select',
              required: true,
              defaultValue: 'fully-certified',
              options: [
                { label: 'Fully Certified', value: 'fully-certified' },
                { label: 'With Reservations', value: 'with-reservations' },
                { label: 'Qualified', value: 'qualified' },
                { label: 'Adverse', value: 'adverse' },
              ],
            },
          ],
        },
      ],
    },
    { name: 'relatedFindings', type: 'relationship', relationTo: 'audit-findings', hasMany: true, admin: { description: 'The findings behind a qualified or adverse assertion.' } },
  ],
}

/** A qualified or adverse assertion names the findings behind it. */
export const certificationError = (details: Record<string, unknown>): string | true => {
  const assertions = (details.assertions as { certificationLevel?: string }[] | undefined) ?? []
  const findings = (details.relatedFindings as unknown[] | undefined) ?? []
  return assertions.some((a) => a.certificationLevel === 'qualified' || a.certificationLevel === 'adverse') && findings.length === 0
    ? 'A qualified or adverse assertion names the findings behind it.'
    : true
}

/** Every governed type — each kept from the collection it was. */
/**
 * A statutory report: its sections, and where each of its fields is sourced from.
 *
 * @standard SAF-T OECD audit-file
 * @standard XBRL business-reporting
 * @standard IFRS-Taxonomy
 */
export const StatutoryReportTemplate: Block = {
  slug: 'statutory-report-template',
  interfaceName: 'StatutoryReportTemplateBlock',
  labels: { singular: 'Statutory report template', plural: 'Statutory report templates' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'reportType',
          type: 'select',
          required: true,
          options: [
            { label: 'Annual Report', value: 'annual-report' },
            { label: 'Tax Return', value: 'tax-return' },
            { label: 'Regulatory Filing', value: 'regulatory-filing' },
            { label: 'Financial Statements', value: 'financial-statements' },
            { label: 'Audit Report', value: 'audit-report' },
          ],
        },
        { name: 'entityType', type: 'relationship', relationTo: 'entity-types' },
        { name: 'effectiveTo', type: 'date', admin: { description: 'The last day the template applies; it takes effect on the effective date.' } },
      ],
    },
    {
      name: 'sections',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'sectionName', type: 'text' },
            { name: 'sequence', type: 'number' },
            { name: 'mandatory', type: 'checkbox' },
          ],
        },
      ],
    },
    {
      name: 'fieldMappings',
      type: 'array',
      admin: { description: 'Where each field of the report is sourced from.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'mappingName', type: 'text', required: true },
            { name: 'fieldName', type: 'text', required: true },
            {
              name: 'fieldType',
              type: 'select',
              options: [
                { label: 'Text', value: 'text' },
                { label: 'Number', value: 'number' },
                { label: 'Date', value: 'date' },
                { label: 'Currency', value: 'currency' },
                { label: 'Percentage', value: 'percentage' },
                { label: 'Boolean', value: 'boolean' },
              ],
            },
            { name: 'mandatory', type: 'checkbox', defaultValue: true },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'sourceCollection', type: 'text' },
            { name: 'sourceField', type: 'text' },
          ],
        },
        { name: 'transformation', type: 'richText' },
        { name: 'validationRules', type: 'richText' },
      ],
    },
  ],
}

/** A template ends after it takes effect. */
export const templateError = (details: Record<string, unknown>, document: Record<string, unknown>): string | true => {
  const from = document.effectiveDate ? Date.parse(String(document.effectiveDate)) : Number.NaN
  const to = details.effectiveTo ? Date.parse(String(details.effectiveTo)) : Number.NaN
  return Number.isFinite(from) && Number.isFinite(to) && to <= from ? 'A statutory report template ends after it takes effect.' : true
}

/**
 * A date by which something is owed (a filing, an audit, a payment), and the reminders scheduled for it.
 *
 * @standard ISO-37301:2021 compliance-management-systems
 * @standard ISO-8601-1:2019 due-date
 */
export const ComplianceDeadline: Block = {
  slug: 'compliance-deadline',
  interfaceName: 'ComplianceDeadlineBlock',
  labels: { singular: 'Compliance deadline', plural: 'Compliance deadlines' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'deadlineType',
          type: 'select',
          required: true,
          options: [
            { label: 'Filing Deadline', value: 'filing-deadline' },
            { label: 'Audit Deadline', value: 'audit-deadline' },
            { label: 'Certification Deadline', value: 'certification-deadline' },
            { label: 'Reporting Deadline', value: 'reporting-deadline' },
            { label: 'Payment Deadline', value: 'payment-deadline' },
            { label: 'Disclosure Deadline', value: 'disclosure-deadline' },
          ],
        },
        { name: 'entity', type: 'relationship', relationTo: 'legal-entities', required: true },
        { name: 'requirement', type: 'relationship', relationTo: 'compliance-requirements' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'dueDate', type: 'date', required: true },
        { name: 'submissionDate', type: 'date' },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'on-track',
          options: [
            { label: 'On Track', value: 'on-track' },
            { label: 'At Risk', value: 'at-risk' },
            { label: 'Overdue', value: 'overdue' },
            { label: 'Submitted', value: 'submitted' },
            { label: 'Completed', value: 'completed' },
          ],
        },
        {
          name: 'priority',
          type: 'select',
          options: [
            { label: 'Critical', value: 'critical' },
            { label: 'High', value: 'high' },
            { label: 'Medium', value: 'medium' },
            { label: 'Low', value: 'low' },
          ],
        },
      ],
    },
    { name: 'penalty', type: 'text' },
    {
      name: 'notifications',
      type: 'array',
      admin: { description: 'The reminders scheduled for this deadline.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'notificationTitle', type: 'text', required: true },
            { name: 'daysBeforeDue', type: 'number', required: true },
            { name: 'sentDate', type: 'date' },
            {
              name: 'status',
              type: 'select',
              defaultValue: 'scheduled',
              options: [
                { label: 'Scheduled', value: 'scheduled' },
                { label: 'Sent', value: 'sent' },
                { label: 'Delivered', value: 'delivered' },
                { label: 'Failed', value: 'failed' },
              ],
            },
          ],
        },
        {
          name: 'notificationType',
          type: 'select',
          hasMany: true,
          options: [
            { label: 'Email', value: 'email' },
            { label: 'In-App', value: 'in-app' },
            { label: 'SMS', value: 'sms' },
            { label: 'Calendar Event', value: 'calendar-event' },
          ],
        },
        { name: 'notificationContent', type: 'richText' },
        {
          name: 'recipients',
          type: 'array',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'recipientEmail', type: 'email' },
                { name: 'recipientRole', type: 'text' },
              ],
            },
          ],
        },
      ],
    },
  ],
}

/** A submitted or completed deadline names when it was submitted. */
export const deadlineError = (details: Record<string, unknown>): string | true =>
  (details.status === 'submitted' || details.status === 'completed') && !details.submissionDate
    ? 'A submitted or completed deadline names its submission date.'
    : true

/**
 * One entry of the record of processing activities (GDPR Art. 30): who processes what, on which basis,
 * for whom, where it goes, and how long it is kept.
 *
 * @standard ISO-8601-1:2019 date-time review-due-at
 * @compliance GDPR Art.30(1) records-controller
 * @compliance GDPR Art.30(2) records-processor
 * @compliance GDPR Art.5(1)(e) storage-limitation
 * @compliance ISO-27701:2025 records-of-processing
 * @audit ISO-19011:2018 audit-trail ropa-evidence
 * @security ISO-27001 A.5.34 privacy-and-pii
 */
export const ProcessingActivity: Block = {
  slug: 'processing-activity',
  interfaceName: 'ProcessingActivityBlock',
  labels: { singular: 'Processing activity', plural: 'Processing activities' },
  fields: [
    {
      type: 'row',
      fields: [
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
          name: 'status',
          type: 'select',
          defaultValue: 'active',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Suspended', value: 'suspended' },
            { label: 'Retired', value: 'retired' },
          ],
        },
      ],
    },
    {
      name: 'dataCategories',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'category', type: 'text', required: true },
            { name: 'special', type: 'checkbox', defaultValue: false, admin: { description: 'Art.9 special category data?' } },
          ],
        },
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
      admin: { description: 'Art.44 transfers — list each destination + safeguard.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'country', type: 'text', required: true },
            {
              name: 'safeguard',
              type: 'select',
              options: [
                { label: 'Adequacy decision', value: 'adequacy_decision' },
                { label: 'Standard contractual clauses', value: 'sccs' },
                { label: 'Binding corporate rules', value: 'bcrs' },
                { label: 'Derogation', value: 'derogation' },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'retentionPeriod', type: 'text', required: true, admin: { description: 'How long we keep this data + basis.' } },
        { name: 'reviewDueAt', type: 'date', required: true, admin: { description: 'Schedule a review at least annually.' } },
        { name: 'dpo', type: 'relationship', relationTo: 'users', admin: { description: 'Data Protection Officer responsible for this activity.' } },
      ],
    },
    { name: 'securityMeasures', type: 'textarea', admin: { description: 'Technical + organisational measures (Art.32).' } },
    { name: 'notes', type: 'textarea' },
  ],
}

/** A transfer to a third country names the safeguard it rests on (GDPR Art. 44–46). */
export const processingError = (details: Record<string, unknown>): string | true => {
  const transfers = (details.thirdCountryTransfers as { country?: string; safeguard?: string | null }[] | undefined) ?? []
  const bare = transfers.filter((t) => !t.safeguard).map((t) => t.country)
  return bare.length ? `A transfer to a third country names its safeguard (${bare.join(', ')}).` : true
}

/**
 * The internal audit function under its charter: who leads it and whom it reports to, its plan, its
 * engagements and the follow-up of their findings, and its quality reviews (IIA IPPF).
 *
 * @standard IIA IPPF international-professional-practices-framework
 * @audit ISO-19011:2018 audit-programme
 * @compliance SOX §404 internal-controls
 */
export const InternalAuditFunction: Block = {
  slug: 'internal-audit-function',
  interfaceName: 'InternalAuditFunctionBlock',
  labels: { singular: 'Internal audit function', plural: 'Internal audit functions' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'entity', type: 'relationship', relationTo: 'legal-entities', required: true },
        {
          name: 'reportingLine',
          type: 'select',
          required: true,
          options: [
            { label: 'Reports to Audit Committee', value: 'audit-committee' },
            { label: 'Reports to CFO', value: 'cfo' },
            { label: 'Reports to CEO', value: 'ceo' },
            { label: 'Dotted Line to Board', value: 'board-dotted' },
          ],
        },
        {
          name: 'auditFunctionStatus',
          type: 'select',
          required: true,
          defaultValue: 'established',
          options: [
            { label: 'Established & Operating', value: 'established' },
            { label: 'Establishing', value: 'establishing' },
            { label: 'Under Review', value: 'under-review' },
            { label: 'Dormant', value: 'dormant' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'chiefAuditExecutive', type: 'text', required: true, admin: { description: 'Chief Audit Executive (CAE) / Head of Internal Audit.' } },
        { name: 'chiefAuditExecutiveContact', type: 'text', admin: { description: 'Email/phone.' } },
        { name: 'auditCommittee', type: 'relationship', relationTo: 'audit-committees', admin: { description: 'Primary audit committee for governance oversight.' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'auditStaffCount', type: 'number', admin: { description: 'Number of internal audit staff.' } },
        { name: 'auditBudget', type: 'number', admin: { description: 'Annual internal audit budget.' } },
        { name: 'riskBasedAuditing', type: 'checkbox', defaultValue: true, admin: { description: 'Uses risk-based approach aligned with entity risk register.' } },
      ],
    },
    { name: 'auditPlan', type: 'richText', admin: { description: 'Annual audit plan (risks, scope, staff allocation).' } },
    {
      type: 'row',
      fields: [
        { name: 'auditPlanYear', type: 'text', admin: { description: 'Fiscal year of the plan.' } },
        { name: 'auditPlanApprovedDate', type: 'date' },
        { name: 'auditPlanDocument', type: 'upload', relationTo: 'media', admin: { description: 'Annual audit plan (PDF).' } },
      ],
    },
    {
      name: 'auditEngagements',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'engagementName', type: 'text', required: true },
            {
              name: 'engagementType',
              type: 'select',
              required: true,
              options: [
                { label: 'Financial Audit', value: 'financial' },
                { label: 'Operational Audit', value: 'operational' },
                { label: 'Compliance Audit', value: 'compliance' },
                { label: 'IT Audit', value: 'it' },
                { label: 'Fraud Investigation', value: 'fraud' },
                { label: 'Special Review', value: 'special-review' },
              ],
            },
            {
              name: 'status',
              type: 'select',
              defaultValue: 'planned',
              options: [
                { label: 'Planned', value: 'planned' },
                { label: 'In Progress', value: 'in-progress' },
                { label: 'Field Work Complete', value: 'fieldwork-complete' },
                { label: 'Report Issued', value: 'report-issued' },
                { label: 'Cancelled', value: 'cancelled' },
              ],
            },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'startDate', type: 'date', required: true },
            { name: 'completionDate', type: 'date' },
            { name: 'reportIssued', type: 'checkbox', defaultValue: false },
          ],
        },
        { name: 'objectiveScope', type: 'richText' },
      ],
    },
    { name: 'auditReports', type: 'relationship', relationTo: 'audit-committee-minutes', hasMany: true, admin: { description: 'Links to minutes where audit reports were presented.' } },
    { name: 'auditFindings', type: 'relationship', relationTo: 'audit-findings', hasMany: true, admin: { description: 'Findings from internal audit engagements.' } },
    {
      name: 'followUpTracking',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'findingReference', type: 'text', required: true },
            { name: 'targetImplementationDate', type: 'date', required: true },
            { name: 'implementationDate', type: 'date' },
            {
              name: 'followUpStatus',
              type: 'select',
              defaultValue: 'not-started',
              options: [
                { label: 'Not Started', value: 'not-started' },
                { label: 'In Progress', value: 'in-progress' },
                { label: 'Completed', value: 'completed' },
                { label: 'Not Implemented', value: 'not-implemented' },
              ],
            },
          ],
        },
        { name: 'managementAction', type: 'richText', required: true },
        { name: 'notes', type: 'richText' },
      ],
    },
    { name: 'performanceMetrics', type: 'richText', admin: { description: 'KPIs: audit hours, engagements completed, findings, etc.' } },
    { name: 'qualityAssurance', type: 'richText', admin: { description: 'Internal and external quality assurance reviews (IIA IPPF).' } },
    {
      type: 'row',
      fields: [
        { name: 'lastQualityReview', type: 'date', admin: { description: 'Date of last external QA review (required every 5 years).' } },
        { name: 'nextQualityReview', type: 'date' },
      ],
    },
    { name: 'professionalStandards', type: 'richText', admin: { description: 'Adherence to IIA International Standards, code of ethics.' } },
    { name: 'resourceAdequacy', type: 'richText', admin: { description: 'Assessment of adequacy of internal audit resources.' } },
    { name: 'independenceAndObjectivity', type: 'richText', admin: { description: 'Statement of independence and objectivity per IIA 1100 series.' } },
  ],
}

const FIVE_YEARS = (date: number): number => { const d = new Date(date); d.setUTCFullYear(d.getUTCFullYear() + 5); return d.getTime() }
const dateOf = (value: unknown): number => (value ? Date.parse(String(value)) : Number.NaN)

/** An external quality review recurs within five years (IIA IPPF); an engagement completes after it starts. */
export const auditFunctionError = (details: Record<string, unknown>): string | true => {
  const last = dateOf(details.lastQualityReview)
  const next = dateOf(details.nextQualityReview)
  if (Number.isFinite(last) && Number.isFinite(next) && next > FIVE_YEARS(last)) return 'The next external quality review falls within five years of the last.'
  const engagements = (details.auditEngagements as { engagementName?: string; startDate?: unknown; completionDate?: unknown }[] | undefined) ?? []
  const backwards = engagements.filter((e) => Number.isFinite(dateOf(e.completionDate)) && dateOf(e.completionDate) < dateOf(e.startDate)).map((e) => e.engagementName)
  return backwards.length ? `An engagement completes after it starts (${backwards.join(', ')}).` : true
}

export const GOVERNED_TYPES: readonly GovernedType[] = [
  // was reporting-standards: read by admin, audit staff, compliance and finance; written by a super-admin
  {
    value: 'reporting-standard',
    label: 'Reporting standard',
    read: ['admin', 'audit-staff', 'compliance-officer', 'finance'],
    write: [],
    requires: ['code', 'effectiveDate', 'classification'],
  },
  // was management-certifications: read by admin, audit staff and compliance; written by admins.
  // The name is the page title, the scope its content, the certification date its effective date.
  {
    value: 'management-certification',
    label: 'Management certification',
    read: ['admin', 'audit-staff', 'compliance-officer'],
    write: ['admin'],
    requires: ['effectiveDate'],
    block: ManagementCertification,
    check: certificationError,
  },
  // was statutory-report-templates: read by admin, audit staff and compliance; written by a super-admin.
  // The name is the page title, the effective-from date its effective date, the template document an attachment.
  {
    value: 'statutory-report-template',
    label: 'Statutory report template',
    read: ['admin', 'audit-staff', 'compliance-officer'],
    write: [],
    requires: ['effectiveDate', 'jurisdiction'],
    block: StatutoryReportTemplate,
    check: templateError,
  },
  // was compliance-deadlines: read by admin, audit staff, compliance and finance; written by admins.
  // The name is the page title, the jurisdiction the page's; the due date stays in the block (it is owed, not in effect).
  {
    value: 'compliance-deadline',
    label: 'Compliance deadline',
    read: ['admin', 'audit-staff', 'compliance-officer', 'finance'],
    write: ['admin'],
    requires: [],
    block: ComplianceDeadline,
    check: deadlineError,
  },
  // was data-processing-activities: read by every member of the tenant; written by admins. The activity's
  // name is the page title (unique in its tenant), its purpose the page's content.
  {
    value: 'processing-activity',
    label: 'Processing activity',
    read: ['user'],
    write: ['admin'],
    requires: [],
    unique: ['title'],
    block: ProcessingActivity,
    check: processingError,
  },
  // was internal-audit-function: read by admin, audit staff and compliance; written by admins. The function's
  // name is the page title, its charter the content, the charter id the code (unique in its tenant), the
  // approval date the effective date, the charter PDF an attachment.
  {
    value: 'internal-audit-function',
    label: 'Internal audit function',
    read: ['admin', 'audit-staff', 'compliance-officer'],
    write: ['admin'],
    requires: ['effectiveDate'],
    unique: ['code'],
    block: InternalAuditFunction,
    check: auditFunctionError,
  },
]
