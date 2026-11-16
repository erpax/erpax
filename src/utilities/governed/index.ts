/**
 * The governed document types — what a governed page can be (src/fields/group/governedDocument), and
 * who reads and writes each. A leaf: the page's access and the role abilities (src/utilities/ability/roles)
 * both read it, so the rule for a type is stated once.
 *
 * What the types share is the page's `document` concern. A type whose standard needs fields of its own
 * declares a `block` (its own table, so the page never nears D1's width) and may add a `check`.
 */
import { APIError, type Block, type FieldHook } from 'payload'
import { idOf } from '@/hooks/collections/shared/enforceSegregationOfDuties'
import { currencyField } from '@/fields/select/currencyField'

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
  /** The plan feature a tenant's subscription must include for this type (as `accountingCollectionAccess({ feature })`). */
  readonly feature?: string
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

/** IAS 33 §12 — profit attributable to ordinary equity holders, less preference dividends (cents). */
const numeratorOf = (row: Record<string, unknown>): number => Number(row.netProfitAttributableToOrdinary ?? 0) - Number(row.preferredDividends ?? 0)
/** Cents over shares, as currency units per share to four places; nothing when there are no shares. */
const perShare = (cents: number, shares: number): number | null => (shares > 0 ? Math.round((cents / 100 / shares) * 10_000) / 10_000 : null)
const computed = (compute: (row: Record<string, unknown>) => number | null): FieldHook[] => [({ siblingData }) => compute((siblingData ?? {}) as Record<string, unknown>)]

/**
 * One period's earnings per share: the numerator and the weighted average of ordinary shares, the
 * share events that move it, and the basic and diluted figures, computed (IAS 33).
 *
 * @standard IFRS IAS-33 §10 basic-eps
 * @standard IAS-33 §11-§19 weighted-average-number-of-ordinary-shares
 * @standard IFRS IAS-33 §30-§63 diluted-eps
 * @standard IFRS IAS-33 §66-§70 disclosure
 * @standard US-GAAP ASC-260 earnings-per-share
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time period-end
 * @audit ISO 19011:2018 §6.4.6 audit-evidence-eps-computation
 * @compliance SOX §404 internal-controls
 */
export const EarningsPerShare: Block = {
  slug: 'earnings-per-share',
  interfaceName: 'EarningsPerShareBlock',
  labels: { singular: 'Earnings per share', plural: 'Earnings per share' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'period', type: 'relationship', relationTo: 'fiscal-periods', required: true },
        { name: 'periodEnd', type: 'date', required: true },
        currencyField(),
        {
          name: 'status',
          type: 'select',
          defaultValue: 'draft',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Computed', value: 'computed' },
            { label: 'Published', value: 'published' },
            { label: 'Restated', value: 'restated' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'netProfitAttributableToOrdinary', type: 'number', required: true, admin: { description: 'IAS 33 §12 — net profit/loss attributable to ordinary equity holders (cents).' } },
        { name: 'preferredDividends', type: 'number', defaultValue: 0, admin: { description: 'IAS 33 §14 — deducted from net profit when computing basic-EPS numerator.' } },
        { name: 'basicEpsNumerator', type: 'number', admin: { readOnly: true, description: 'netProfit − preferredDividends (cents), computed.' }, hooks: { beforeChange: computed(numeratorOf) } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'weightedAverageOrdinaryShares', type: 'number', required: true, admin: { description: 'IAS 33 §19 — time-weighted shares outstanding during the period.' } },
        { name: 'dilutivePotentialShares', type: 'number', defaultValue: 0, admin: { description: 'IAS 33 §31 — weighted-average dilutive potential ordinary shares (options + convertibles + IFRS 2 grants).' } },
        { name: 'antiDilutiveShares', type: 'number', defaultValue: 0, admin: { description: 'IAS 33 §41 — anti-dilutive shares EXCLUDED from diluted calculation (out-of-money options, etc.).' } },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'basicEps',
          type: 'number',
          admin: { readOnly: true, description: 'basicEpsNumerator / weightedAverageOrdinaryShares (per share, in currency units), computed.' },
          hooks: { beforeChange: computed((row) => perShare(numeratorOf(row), Number(row.weightedAverageOrdinaryShares ?? 0))) },
        },
        {
          name: 'dilutedEps',
          type: 'number',
          admin: { readOnly: true, description: 'basicEpsNumerator / (weightedAverageOrdinaryShares + dilutivePotentialShares), computed; a loss is not diluted (IAS 33 §41).' },
          hooks: {
            beforeChange: computed((row) => {
              const numerator = numeratorOf(row)
              const shares = Number(row.weightedAverageOrdinaryShares ?? 0)
              // potential shares that would reduce a loss per share are anti-dilutive and ignored
              return numerator <= 0 ? perShare(numerator, shares) : perShare(numerator, shares + Number(row.dilutivePotentialShares ?? 0))
            }),
          },
        },
      ],
    },
    {
      name: 'continuingVsDiscontinued',
      type: 'group',
      admin: { description: 'IAS 33 §66 — separate EPS for continuing vs discontinued operations.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'continuingEpsBasic', type: 'number' },
            { name: 'continuingEpsDiluted', type: 'number' },
            { name: 'discontinuedEpsBasic', type: 'number' },
            { name: 'discontinuedEpsDiluted', type: 'number' },
          ],
        },
      ],
    },
    {
      name: 'shareEvents',
      type: 'array',
      labels: { singular: 'Share Event', plural: 'Share Events' },
      admin: { description: 'Issuances / buy-backs / splits / bonus issues during the period — drive the weighted-average computation.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'eventDate', type: 'date', required: true },
            {
              name: 'eventKind',
              type: 'select',
              required: true,
              options: [
                { label: 'Issuance', value: 'issuance' },
                { label: 'Buy-back', value: 'buyback' },
                { label: 'Stock Split', value: 'split' },
                { label: 'Reverse Split', value: 'reverse_split' },
                { label: 'Bonus Issue', value: 'bonus' },
                { label: 'Conversion (debt → equity)', value: 'conversion' },
              ],
            },
            { name: 'sharesDelta', type: 'number', required: true, admin: { description: 'Change in shares outstanding (positive or negative).' } },
            { name: 'splitRatio', type: 'text', admin: { description: 'For splits: e.g. "2-for-1" or "1-for-3" (reverse).' } },
          ],
        },
      ],
    },
    { name: 'notes', type: 'textarea' },
  ],
}

/** The weighted average of ordinary shares divides the numerator, so it is positive (IAS 33 §19). */
export const epsError = (details: Record<string, unknown>): string | true =>
  Number(details.weightedAverageOrdinaryShares) > 0 ? true : 'An EPS computation names a positive weighted average of ordinary shares.'

/**
 * One group of insurance contracts measured under IFRS 17: its model, portfolio and cohort, the building
 * blocks of the measurement (fulfilment cash flows, discount rate, risk adjustment, contractual service
 * margin) and its loss component.
 *
 * @standard IFRS IFRS-17 §3 scope
 * @standard IFRS IFRS-17 §32 general-measurement-model-building-blocks
 * @standard IFRS IFRS-17 §38 contractual-service-margin
 * @standard IFRS IFRS-17 §53 premium-allocation-approach-simplified
 * @standard IFRS IFRS-17 §B100 variable-fee-approach
 * @standard IFRS IFRS-17 §93 disclosure-requirements
 * @standard IFRS IFRS-13 fair-value-input-hierarchy
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @audit ISO 19011:2018 §6.4.6 audit-evidence-insurance-contracts
 * @compliance Solvency II / IAIS ICS — actuarial reserving link
 * @compliance SOX §404 internal-controls TOM-INS-01
 */
export const InsuranceContract: Block = {
  slug: 'insurance-contract',
  interfaceName: 'InsuranceContractBlock',
  labels: { singular: 'Insurance contract', plural: 'Insurance contracts' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'measurementModel',
          type: 'select',
          required: true,
          options: [
            { label: 'GMM — General Measurement Model (default)', value: 'gmm' },
            { label: 'PAA — Premium Allocation Approach (≤1yr coverage)', value: 'paa' },
            { label: 'VFA — Variable Fee Approach (direct participation)', value: 'vfa' },
          ],
        },
        {
          name: 'lineOfBusiness',
          type: 'select',
          required: true,
          options: [
            { label: 'Life (term)', value: 'life_term' },
            { label: 'Life (whole life)', value: 'life_whole' },
            { label: 'Annuity', value: 'annuity' },
            { label: 'Health', value: 'health' },
            { label: 'Property & Casualty', value: 'p_and_c' },
            { label: 'Auto', value: 'auto' },
            { label: 'Marine / Aviation', value: 'marine_aviation' },
            { label: 'Reinsurance assumed', value: 'reinsurance_assumed' },
            { label: 'Reinsurance ceded', value: 'reinsurance_ceded' },
          ],
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'recognised',
          options: [
            { label: 'Recognised', value: 'recognised' },
            { label: 'In Coverage', value: 'in_coverage' },
            { label: 'Run-off (claims only)', value: 'runoff' },
            { label: 'Derecognised', value: 'derecognised' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'portfolioId', type: 'text', required: true, admin: { description: 'IFRS 17 §14 — portfolio = subject to similar risks AND managed together.' } },
        { name: 'cohortYear', type: 'number', required: true, admin: { description: 'IFRS 17 §22 — annual cohort grouping (no contracts ≥1yr apart in same group).' } },
        {
          name: 'profitabilityGroup',
          type: 'select',
          required: true,
          admin: { description: 'IFRS 17 §16 three groups per cohort.' },
          options: [
            { label: 'Profitable', value: 'profitable' },
            { label: 'No Significant Possibility of Loss', value: 'no_loss_possibility' },
            { label: 'Onerous (loss-recognition required)', value: 'onerous' },
          ],
        },
        { name: 'coverageEndDate', type: 'date' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'futureCashflowsEstimate', type: 'number', required: true, admin: { description: 'IFRS 17 §33 — probability-weighted estimate of fulfilment cash flows (cents).' } },
        { name: 'discountRate', type: 'number', required: true, min: 0, max: 100, admin: { description: 'IFRS 17 §36 — current rate reflecting time value + financial risk (% p.a.).', step: 0.001 } },
        currencyField(),
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'riskAdjustment', type: 'number', defaultValue: 0, admin: { description: 'IFRS 17 §37 — non-financial risk premium (cents).' } },
        { name: 'csm', type: 'number', defaultValue: 0, admin: { description: 'Contractual Service Margin — IFRS 17 §38 unearned profit (cents). Recognised as revenue over coverage units.' } },
        { name: 'lossComponent', type: 'number', defaultValue: 0, admin: { description: 'IFRS 17 §47 — loss recognised immediately for onerous groups.' } },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'reinsuranceContract',
          type: 'relationship',
          relationTo: 'pages',
          filterOptions: { documentType: { equals: 'insurance-contract' } },
          admin: { description: 'For reinsurance-held: link to the underlying gross contract.' },
        },
        { name: 'fairValueMeasurement', type: 'relationship', relationTo: 'fair-value-measurements' },
        { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries', admin: { readOnly: true } },
      ],
    },
    { name: 'notes', type: 'textarea' },
  ],
}

/** IFRS 17: the CSM is never negative (§38 — a shortfall is a loss component); an onerous group recognises its loss (§47); coverage ends after inception. */
export const insuranceError = (details: Record<string, unknown>, document: Record<string, unknown>): string | true => {
  if (Number(details.csm ?? 0) < 0) return 'A contractual service margin is never negative; a shortfall is a loss component (IFRS 17 §38).'
  if (details.profitabilityGroup === 'onerous' && !(Number(details.lossComponent ?? 0) > 0)) return 'An onerous group recognises its loss component (IFRS 17 §47).'
  const from = document.effectiveDate ? Date.parse(String(document.effectiveDate)) : Number.NaN
  const to = details.coverageEndDate ? Date.parse(String(details.coverageEndDate)) : Number.NaN
  return Number.isFinite(from) && Number.isFinite(to) && to <= from ? 'Coverage ends after the contracts take effect.' : true
}

/**
 * One debt instrument: lender, principal and terms, the repayment schedule, the covenants it is tested
 * against, and what secures and hedges it (IFRS 9, IAS 1, ASC 470).
 *
 * @accounting IFRS-9 financial-instruments
 * @accounting IAS-1 current-non-current-classification
 * @accounting US-GAAP ASC-470 debt
 */
export const DebtInstrument: Block = {
  slug: 'debt-instrument',
  interfaceName: 'DebtInstrumentBlock',
  labels: { singular: 'Debt instrument', plural: 'Debt instruments' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'entity', type: 'relationship', relationTo: 'legal-entities', required: true },
        {
          name: 'debtType',
          type: 'select',
          required: true,
          options: [
            { label: 'Bank Loan - Term', value: 'bank-term-loan' },
            { label: 'Bank Loan - Revolving', value: 'bank-revolving' },
            { label: 'Bank Loan - Accordion', value: 'bank-accordion' },
            { label: 'Bonds - Fixed Rate', value: 'bonds-fixed' },
            { label: 'Bonds - Floating Rate', value: 'bonds-floating' },
            { label: 'Convertible Bonds', value: 'convertible-bonds' },
            { label: 'Finance Lease', value: 'finance-lease' },
            { label: 'Operating Lease', value: 'operating-lease' },
            { label: 'Securitization', value: 'securitization' },
            { label: 'Government Grants/Subsidies (repayable)', value: 'government-grant' },
            { label: 'Vendor Financing', value: 'vendor-financing' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'debtStatus',
          type: 'select',
          required: true,
          defaultValue: 'active',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Performing', value: 'performing' },
            { label: 'Breach - Cure Period', value: 'breach-cure' },
            { label: 'Breach - Waived', value: 'breach-waived' },
            { label: 'Repaid', value: 'repaid' },
            { label: 'Refinanced', value: 'refinanced' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'lenderName', type: 'text', required: true, admin: { description: 'Bank, bondholder base, lessor name.' } },
        { name: 'lenderContact', type: 'text', admin: { description: 'Contact for covenant reporting, etc.' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'principalAmount', type: 'number', required: true },
        { name: 'outstandingBalance', type: 'number', required: true, admin: { description: 'Current principal outstanding as of balance sheet date.' } },
        currencyField({ required: true }),
        { name: 'maturityDate', type: 'date', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'interestRate', type: 'text', admin: { description: 'E.g., "3.5% fixed" or "EURIBOR+2.0% floating".' } },
        {
          name: 'interestPaymentFrequency',
          type: 'select',
          options: [
            { label: 'Monthly', value: 'monthly' },
            { label: 'Quarterly', value: 'quarterly' },
            { label: 'Semi-Annual', value: 'semi-annual' },
            { label: 'Annual', value: 'annual' },
          ],
        },
        {
          name: 'securityType',
          type: 'select',
          options: [
            { label: 'Unsecured', value: 'unsecured' },
            { label: 'Secured - Assets', value: 'secured-assets' },
            { label: 'Secured - Guarantees', value: 'secured-guarantees' },
            { label: 'Secured - Cross-Default', value: 'secured-cross-default' },
          ],
        },
      ],
    },
    {
      name: 'repaymentSchedule',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'paymentDate', type: 'date', required: true },
            { name: 'principalPayment', type: 'number', required: true },
            { name: 'interestPayment', type: 'number' },
            { name: 'totalPayment', type: 'number' },
            {
              name: 'paymentStatus',
              type: 'select',
              defaultValue: 'scheduled',
              options: [
                { label: 'Scheduled', value: 'scheduled' },
                { label: 'Paid', value: 'paid' },
                { label: 'Deferred', value: 'deferred' },
              ],
            },
          ],
        },
      ],
    },
    { name: 'securityDetails', type: 'richText', admin: { description: 'Collateral, guarantees, cross-default provisions.' } },
    {
      name: 'financialCovenants',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'covenantName', type: 'text', required: true },
            { name: 'threshold', type: 'text', required: true },
            { name: 'currentPerformance', type: 'text' },
            {
              name: 'testedFrequency',
              type: 'select',
              options: [
                { label: 'Quarterly', value: 'quarterly' },
                { label: 'Semi-Annual', value: 'semi-annual' },
                { label: 'Annual', value: 'annual' },
              ],
            },
            {
              name: 'complianceStatus',
              type: 'select',
              defaultValue: 'compliant',
              options: [
                { label: 'In Compliance', value: 'compliant' },
                { label: 'Breach Notice', value: 'breach' },
                { label: 'Waived', value: 'waived' },
              ],
            },
          ],
        },
        { name: 'covenantDefinition', type: 'richText' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'lastCovenantComplianceTest', type: 'date' },
        { name: 'nextCovenantTest', type: 'date' },
      ],
    },
    { name: 'operationalCovenants', type: 'richText', admin: { description: 'Non-financial covenants (reporting, insurance, etc.).' } },
    { name: 'restrictiveCovenants', type: 'richText', admin: { description: 'Restrictions (dividends, capex, asset sales, additional debt).' } },
    { name: 'prepaymentTerms', type: 'richText', admin: { description: 'Prepayment penalties, lockup periods, make-whole provisions.' } },
    { name: 'defaultProvisions', type: 'richText', admin: { description: 'Events of default, acceleration clauses, remedies.' } },
    { name: 'riskAssessment', type: 'richText', admin: { description: 'Refinance risk, interest rate risk, covenant risk assessment.' } },
    { name: 'guarantees', type: 'relationship', relationTo: 'legal-entities', hasMany: true, admin: { description: 'Subsidiaries or parent guaranteeing this debt.' } },
    { name: 'fxHedges', type: 'relationship', relationTo: 'fx-transactions', hasMany: true, admin: { description: 'FX hedging instruments if multi-currency.' } },
    { name: 'relatedControls', type: 'relationship', relationTo: 'internal-controls', hasMany: true },
  ],
}

/** A debt instrument matures after it is issued; a covenant in breach puts the instrument in breach (IAS 1 §74). */
export const debtError = (details: Record<string, unknown>, document: Record<string, unknown>): string | true => {
  const issued = document.effectiveDate ? Date.parse(String(document.effectiveDate)) : Number.NaN
  const matures = details.maturityDate ? Date.parse(String(details.maturityDate)) : Number.NaN
  if (Number.isFinite(issued) && Number.isFinite(matures) && matures <= issued) return 'A debt instrument matures after it is issued.'
  const breached = ((details.financialCovenants as { covenantName?: string; complianceStatus?: string }[] | undefined) ?? []).filter((c) => c.complianceStatus === 'breach')
  const inBreach = details.debtStatus === 'breach-cure' || details.debtStatus === 'breach-waived'
  return breached.length && !inBreach ? `A covenant in breach puts the instrument in breach (${breached.map((c) => c.covenantName).join(', ')}; IAS 1 §74).` : true
}

/**
 * One regulatory deferral balance a first-time IFRS adopter carries forward from its previous GAAP
 * (IFRS 14): asset or liability, the regulator, the balance and its movement, and its recovery period.
 *
 * @standard IFRS IFRS-14 §3 scope-first-time-adopter
 * @standard IFRS IFRS-14 §16 continuation-of-previous-GAAP
 * @standard IFRS IFRS-14 §27 disclosure-requirements
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @audit ISO 19011:2018 §6.4.6 audit-evidence-regulatory-deferral
 * @compliance SOX §404 internal-controls
 */
export const RegulatoryDeferralAccount: Block = {
  slug: 'regulatory-deferral-account',
  interfaceName: 'RegulatoryDeferralAccountBlock',
  labels: { singular: 'Regulatory deferral account', plural: 'Regulatory deferral accounts' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'kind',
          type: 'select',
          required: true,
          options: [
            { label: 'Regulatory deferral asset (under-recovery)', value: 'asset' },
            { label: 'Regulatory deferral liability (over-recovery)', value: 'liability' },
          ],
        },
        { name: 'regulator', type: 'text', required: true, admin: { description: 'Regulator name (e.g. Ofgem / FERC / EWRC-BG).' } },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'active',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Recovering', value: 'recovering' },
            { label: 'Recovered (zero)', value: 'recovered' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'balance', type: 'number', required: true, admin: { description: 'Carrying balance at reporting date (cents).' } },
        { name: 'movementInPeriod', type: 'number', defaultValue: 0, admin: { description: 'Net change in balance during the period (cents).' } },
        currencyField(),
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'discountRate', type: 'number', min: 0, max: 100, admin: { step: 0.01 } },
        { name: 'recoveryPeriodEnd', type: 'date', admin: { description: 'IFRS 14 §32 — period over which the balance is expected to be recovered/refunded.' } },
      ],
    },
    { name: 'notes', type: 'textarea' },
  ],
}

/** A balance marked recovered is zero, as its status says ("Recovered (zero)"). */
export const deferralError = (details: Record<string, unknown>): string | true =>
  details.status === 'recovered' && Number(details.balance ?? 0) !== 0 ? 'A recovered regulatory deferral balance is zero.' : true

const num = (row: Record<string, unknown>, name: string): number => Number(row[name] ?? 0)
/** IFRS 5 — fair value less costs to sell (cents). */
const fvlcts = (row: Record<string, unknown>): number => num(row, 'fairValue') - num(row, 'costsToSell')
/** IFRS 5 §15 — the write-down to the lower of carrying amount and fair value less costs to sell (cents). */
const impairmentOf = (row: Record<string, unknown>): number => Math.max(0, num(row, 'carryingAmountAtClassification') - fvlcts(row))

/**
 * One non-current asset, disposal group or discontinued operation classified as held for sale (IFRS 5):
 * what is classified, when, its carrying amount and fair value less costs to sell, the impairment that
 * follows, and the sale.
 *
 * @standard IFRS IFRS-5 §6-§9 classification-criteria
 * @standard IFRS IFRS-5 §15 measurement-lower-of-cv-and-fv-less-cts
 * @standard IFRS IFRS-5 §25 depreciation-suspended
 * @standard IFRS IFRS-5 §31-§40 discontinued-operations-presentation
 * @standard IFRS IFRS-13 fair-value-input-hierarchy
 * @standard US-GAAP ASC-205-20 discontinued-operations
 * @standard US-GAAP ASC-360-10 long-lived-assets-held-for-sale
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time classification-date
 * @audit ISO 19011:2018 §6.4.6 audit-evidence-disposal-classification
 * @compliance SOX §404 internal-controls
 */
export const HeldForSale: Block = {
  slug: 'held-for-sale',
  interfaceName: 'HeldForSaleBlock',
  labels: { singular: 'Held-for-sale classification', plural: 'Held-for-sale classifications' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'classificationKind',
          type: 'select',
          required: true,
          options: [
            { label: 'Single non-current asset', value: 'single_asset' },
            { label: 'Disposal group (multiple assets + liabs)', value: 'disposal_group' },
            { label: 'Discontinued operation (separate major line)', value: 'discontinued_op' },
          ],
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'classified',
          options: [
            { label: 'Classified', value: 'classified' },
            { label: 'Re-measured', value: 'remeasured' },
            { label: 'Sale Pending', value: 'sale_pending' },
            { label: 'Sold', value: 'sold' },
            { label: 'Reclassified Back (criteria failed)', value: 'reclassified' },
          ],
        },
        { name: 'expectedSaleDate', type: 'date', admin: { description: 'IFRS 5 §8 — sale highly probable within 12 months from classification.' } },
      ],
    },
    // one polymorphic relationship: the asset or disposal group, checked, populated and navigable
    { name: 'source', type: 'relationship', required: true, relationTo: ['fixed-assets', 'investment-properties', 'business-combinations'], admin: { description: 'The asset or disposal group classified as held for sale.' } },
    {
      type: 'row',
      fields: [
        { name: 'carryingAmountAtClassification', type: 'number', required: true },
        { name: 'fairValue', type: 'number', required: true },
        { name: 'costsToSell', type: 'number', defaultValue: 0 },
        currencyField(),
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'fairValueLessCostsToSell', type: 'number', admin: { readOnly: true, description: 'fairValue − costsToSell (cents), computed.' }, hooks: { beforeChange: computed(fvlcts) } },
        { name: 'impairmentLoss', type: 'number', admin: { readOnly: true, description: 'IFRS 5 §15 — Max(0, carrying − FVLCTS) (cents), computed.' }, hooks: { beforeChange: computed(impairmentOf) } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'isDiscontinuedOperation', type: 'checkbox', defaultValue: false, admin: { description: 'IFRS 5 §32 — separate major line of business or geographical area.' } },
        { name: 'segment', type: 'text', admin: { description: 'IFRS 8 segment this disposal belongs to.' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'actualSaleDate', type: 'date' },
        { name: 'actualSaleProceeds', type: 'number' },
        {
          name: 'gainLossOnDisposal',
          type: 'number',
          admin: { readOnly: true, description: 'Proceeds − (carrying amount − impairment) (cents), computed once sold.' },
          hooks: { beforeChange: computed((row) => (row.actualSaleProceeds === undefined || row.actualSaleProceeds === null ? null : num(row, 'actualSaleProceeds') - (num(row, 'carryingAmountAtClassification') - impairmentOf(row)))) },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'fairValueMeasurement', type: 'relationship', relationTo: 'fair-value-measurements' },
        { name: 'journalEntry', type: 'relationship', relationTo: 'journal-entries', admin: { readOnly: true } },
      ],
    },
    { name: 'notes', type: 'textarea' },
  ],
}

const TWELVE_MONTHS = (date: number): number => { const d = new Date(date); d.setUTCFullYear(d.getUTCFullYear() + 1); return d.getTime() }

/** IFRS 5 §8: the sale is expected within twelve months of classification; a sold classification names its sale date and proceeds. */
export const heldForSaleError = (details: Record<string, unknown>, document: Record<string, unknown>): string | true => {
  const classified = document.effectiveDate ? Date.parse(String(document.effectiveDate)) : Number.NaN
  const expected = details.expectedSaleDate ? Date.parse(String(details.expectedSaleDate)) : Number.NaN
  if (Number.isFinite(classified) && Number.isFinite(expected) && expected > TWELVE_MONTHS(classified)) return 'The sale is expected within twelve months of classification (IFRS 5 §8).'
  if (details.status === 'sold' && (!details.actualSaleDate || details.actualSaleProceeds === undefined || details.actualSaleProceeds === null)) return 'A sold classification names its sale date and proceeds.'
  return true
}

/**
 * One transaction with a related party (IAS 24): who the party is and why it is related, what passed and
 * on what terms, its approval, and its disclosure.
 *
 * @accounting IAS-24 related-party-disclosures
 * @accounting US-GAAP ASC-850 related-party-disclosures
 */
export const RelatedPartyTransaction: Block = {
  slug: 'related-party-transaction',
  interfaceName: 'RelatedPartyTransactionBlock',
  labels: { singular: 'Related party transaction', plural: 'Related party transactions' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'entity', type: 'relationship', relationTo: 'legal-entities', required: true },
        { name: 'relatedPartyName', type: 'text', required: true },
        {
          name: 'relatedPartyType',
          type: 'select',
          required: true,
          options: [
            { label: 'Key Management Personnel', value: 'key-management' },
            { label: 'Director', value: 'director' },
            { label: 'Officer', value: 'officer' },
            { label: 'Shareholder (>5%)', value: 'shareholder' },
            { label: 'Family Member', value: 'family' },
            { label: 'Other Entity (Controlled)', value: 'other-entity-controlled' },
            { label: 'Other Entity (Associate)', value: 'other-entity-associate' },
            { label: 'Other Entity (Joint Venture)', value: 'other-entity-jv' },
            { label: 'Post-employment Benefit Plan', value: 'benefit-plan' },
            { label: 'Government Entity', value: 'government' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'transactionType',
          type: 'select',
          required: true,
          options: [
            { label: 'Sale of Goods/Services', value: 'sale' },
            { label: 'Purchase of Goods/Services', value: 'purchase' },
            { label: 'Loan (Provided)', value: 'loan-provided' },
            { label: 'Loan (Received)', value: 'loan-received' },
            { label: 'Lease (Operating)', value: 'lease-operating' },
            { label: 'Lease (Finance)', value: 'lease-finance' },
            { label: 'Dividend Payment', value: 'dividend' },
            { label: 'Management Fee', value: 'management-fee' },
            { label: 'Royalty', value: 'royalty' },
            { label: 'Equity Investment', value: 'equity-investment' },
            { label: 'Guarantee', value: 'guarantee' },
            { label: 'Asset Purchase/Sale', value: 'asset-transaction' },
            { label: 'Other', value: 'other' },
          ],
        },
        { name: 'amount', type: 'number', required: true },
        currencyField({ required: true }),
      ],
    },
    { name: 'terms', type: 'richText', admin: { description: 'Payment terms, pricing basis, conditions, and any special terms.' } },
    { name: 'armLengthBasis', type: 'richText', admin: { description: "Evidence that transaction was at arm's length (IAS 24 §23)." } },
    {
      type: 'row',
      fields: [
        {
          name: 'approvalStatus',
          type: 'select',
          defaultValue: 'pending',
          options: [
            { label: 'Pre-Approved', value: 'pre-approved' },
            { label: 'Approved', value: 'approved' },
            { label: 'Pending Approval', value: 'pending' },
            { label: 'Rejected', value: 'rejected' },
          ],
        },
        { name: 'approverName', type: 'text', admin: { description: 'Board member or audit committee member who approved.' } },
        { name: 'approvalDate', type: 'date' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'disclosureRequired', type: 'checkbox', defaultValue: true, admin: { description: 'Must be disclosed per IAS 24.' } },
        { name: 'disclosedInFinancialStatements', type: 'checkbox', defaultValue: false },
        { name: 'disclosureReference', type: 'text', admin: { description: 'Note reference in financial statements (e.g., Note 32).' } },
      ],
    },
    { name: 'relatedControls', type: 'relationship', relationTo: 'internal-controls', hasMany: true, admin: { description: 'Controls designed to prevent unauthorized related party transactions.' } },
    { name: 'evidence', type: 'relationship', relationTo: 'audit-evidence', hasMany: true },
  ],
}

/** An approved transaction names who approved it and when; a disclosed one names its note. */
export const relatedPartyError = (details: Record<string, unknown>): string | true => {
  if ((details.approvalStatus === 'approved' || details.approvalStatus === 'pre-approved') && (!details.approverName || !details.approvalDate)) return 'An approved related party transaction names its approver and approval date.'
  if (details.disclosedInFinancialStatements === true && !details.disclosureReference) return 'A disclosed related party transaction names its note in the financial statements.'
  return true
}

/**
 * One report filed with a regulator or a funder: the entity, the standard it follows, the period it
 * covers, when it is due and was submitted, its status, the regulator's feedback and the findings.
 *
 * @standard SAF-T OECD standard-audit-file-tax
 * @standard XBRL business-reporting
 * @compliance local-regulatory-filing
 */
export const RegulatoryReport: Block = {
  slug: 'regulatory-report',
  interfaceName: 'RegulatoryReportBlock',
  labels: { singular: 'Regulatory report', plural: 'Regulatory reports' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'entity', type: 'relationship', relationTo: 'legal-entities', required: true },
        {
          name: 'reportType',
          type: 'select',
          required: true,
          options: [
            { label: '10-K/20-F', value: 'annual-filing' },
            { label: '10-Q', value: 'quarterly-filing' },
            { label: 'Form 10-Q', value: 'form-10q' },
            { label: 'SOX Attestation', value: 'sox-attestation' },
            { label: 'Annual Report', value: 'annual-report' },
            { label: 'Compliance Report', value: 'compliance-report' },
            { label: 'Audit Report', value: 'audit-report' },
            { label: 'Grant Report (funder)', value: 'grant-report' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'In Review', value: 'in-review' },
            { label: 'Submitted', value: 'submitted' },
            { label: 'Accepted', value: 'accepted' },
            { label: 'Rejected', value: 'rejected' },
            { label: 'Overdue', value: 'overdue' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'reportingStandard', type: 'relationship', relationTo: 'compliance-frameworks' },
        // the award a funder's report accounts for: without it the report cannot name the grant it reports on
        { name: 'grant', type: 'relationship', relationTo: 'government-grants', admin: { description: 'The award this report accounts for (grant-report type).' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'fiscalPeriodStart', type: 'date', required: true },
        { name: 'fiscalPeriodEnd', type: 'date', required: true },
        { name: 'dueDate', type: 'date', required: true },
        { name: 'submissionDate', type: 'date' },
      ],
    },
    { name: 'regulatoryFeedback', type: 'richText' },
    { name: 'findings', type: 'relationship', relationTo: 'audit-findings', hasMany: true },
  ],
}

/** The period ends after it starts; a submitted, accepted or rejected report names when it was submitted; a grant report names its grant. */
export const regulatoryReportError = (details: Record<string, unknown>): string | true => {
  const start = details.fiscalPeriodStart ? Date.parse(String(details.fiscalPeriodStart)) : Number.NaN
  const end = details.fiscalPeriodEnd ? Date.parse(String(details.fiscalPeriodEnd)) : Number.NaN
  if (Number.isFinite(start) && Number.isFinite(end) && end <= start) return 'A reporting period ends after it starts.'
  if (['submitted', 'accepted', 'rejected'].includes(String(details.status)) && !details.submissionDate) return 'A submitted report names its submission date.'
  if (details.reportType === 'grant-report' && !details.grant) return 'A grant report names the grant it accounts for.'
  return true
}

/**
 * Management's assessment of internal control over financial reporting for a period (SOX §404(a)): the
 * framework, the five COSO components assessed, the deficiencies and weaknesses found and their
 * remediation, the conclusion, and the officers who certify it.
 *
 * @compliance SOX §404(a) management-assessment-ICFR
 * @standard COSO-2013 internal-control-integrated-framework
 * @standard PCAOB AS 2201 ICFR
 */
export const IcfrAssessment: Block = {
  slug: 'icfr-assessment',
  interfaceName: 'IcfrAssessmentBlock',
  labels: { singular: 'ICFR assessment', plural: 'ICFR assessments' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'entity', type: 'relationship', relationTo: 'legal-entities', required: true },
        {
          name: 'controlFramework',
          type: 'select',
          required: true,
          options: [
            { label: 'COSO 2013', value: 'coso-2013' },
            { label: 'COSO 1992', value: 'coso-1992' },
            { label: 'COSO Guidance (Enterprise Risk Management)', value: 'coso-erm' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'draft',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Final', value: 'final' },
            { label: 'Auditor-Reviewed', value: 'auditor-reviewed' },
            { label: 'Certified', value: 'certified' },
            { label: 'Filed', value: 'filed' },
          ],
        },
      ],
    },
    { name: 'controlEnvironmentAssessment', type: 'richText', required: true, admin: { description: 'Assessment of control environment (tone at top, integrity, values, competence).' } },
    { name: 'riskAssessmentAssessment', type: 'richText', required: true, admin: { description: 'Assessment of risk identification and assessment processes.' } },
    { name: 'controlActivitiesAssessment', type: 'richText', required: true, admin: { description: 'Assessment of preventive/detective control activities.' } },
    { name: 'informationCommunicationAssessment', type: 'richText', required: true, admin: { description: 'Assessment of information systems and communication.' } },
    { name: 'monitoringAssessment', type: 'richText', required: true, admin: { description: 'Assessment of ongoing and separate monitoring activities.' } },
    {
      type: 'row',
      fields: [
        { name: 'significantDeficienciesIdentified', type: 'checkbox', defaultValue: false },
        { name: 'materialWeaknessesIdentified', type: 'checkbox', defaultValue: false },
      ],
    },
    { name: 'deficiencyDetails', type: 'richText', admin: { description: 'Description of any significant deficiencies or material weaknesses.' } },
    { name: 'remediationActions', type: 'richText', admin: { description: 'Remediation actions planned or in progress.' } },
    { name: 'conclusionStatement', type: 'richText', required: true, admin: { description: 'Conclusion: "...effective" or "...not effective" per SOX 302/906.' } },
    { name: 'managementAcknowledgment', type: 'richText', required: true, admin: { description: 'Management certification statement acknowledging responsibility for ICFR.' } },
    {
      name: 'certifyingOfficers',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'name', type: 'text', required: true },
            { name: 'signatureDate', type: 'date', required: true },
            { name: 'signatureDocument', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
    { name: 'relatedAuditFindings', type: 'relationship', relationTo: 'audit-findings', hasMany: true },
    { name: 'relatedControlTests', type: 'relationship', relationTo: 'control-tests', hasMany: true },
  ],
}

/** A deficiency or weakness found is described; a certified or filed assessment names the officers who certify it. */
export const icfrError = (details: Record<string, unknown>): string | true => {
  if ((details.significantDeficienciesIdentified === true || details.materialWeaknessesIdentified === true) && !details.deficiencyDetails) return 'An assessment that finds a significant deficiency or material weakness describes it.'
  const officers = (details.certifyingOfficers as unknown[] | undefined) ?? []
  if ((details.status === 'certified' || details.status === 'filed') && officers.length === 0) return 'A certified assessment names the officers who certify it.'
  return true
}

/** ISO 27002 §5.3 / SOX §404 — whoever wrote a budget does not approve it. The page's author is Payload's
 *  `createdBy`, or on create the requesting user, as `enforceSegregationOfDuties` decides it. */
const approvedByAnother: FieldHook = ({ value, originalDoc, operation, req }) => {
  const approver = idOf(value)
  if (approver === undefined) return value
  const author = idOf((originalDoc as { createdBy?: unknown } | undefined)?.createdBy ?? (operation === 'create' ? req?.user?.id : undefined))
  if (author !== undefined && author === approver) throw new APIError('Segregation of duties: the author of a budget does not approve it (ISO 27002 §5.3, SOX §404).', 400)
  return value
}

/**
 * A period budget for a department or cost center: its line items by GL account, the total they make,
 * the project it books to, and its approval by someone other than its author.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time fiscal-year period
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS IAS-8 accounting-policies-changes-and-errors
 * @accounting US-GAAP ASC-270 interim-reporting
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §404 internal-controls budget-approval-workflow
 * @security ISO-27002 §5.3 segregation-of-duties approval-vs-creation
 */
export const Budget: Block = {
  slug: 'budget',
  interfaceName: 'BudgetBlock',
  labels: { singular: 'Budget plan', plural: 'Budget plans' },
  fields: [
    {
      type: 'row',
      fields: [
        // costs on a funded project book to the project, and the project carries the award
        { name: 'project', type: 'relationship', relationTo: 'projects', admin: { description: 'The project this belongs to. Costs book to the project; the project carries the award.' } },
        { name: 'fiscalYear', type: 'number', required: true, min: 2000, max: 2100 },
        { name: 'department', type: 'text', required: true, admin: { description: 'Department or cost center' } },
        {
          name: 'budgetPeriod',
          type: 'select',
          defaultValue: 'monthly',
          options: [
            { label: 'Monthly', value: 'monthly' },
            { label: 'Quarterly', value: 'quarterly' },
            { label: 'Annual', value: 'annual' },
          ],
        },
      ],
    },
    {
      name: 'budgetLineItems',
      type: 'array',
      minRows: 1,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'glAccount', type: 'relationship', relationTo: 'gl-accounts', required: true },
            { name: 'accountNumber', type: 'text', admin: { disabled: true } },
            { name: 'accountName', type: 'text', admin: { disabled: true } },
            { name: 'accountType', type: 'text', admin: { disabled: true } },
            { name: 'budgetAmount', type: 'number', required: true, min: 0 },
          ],
        },
        { name: 'notes', type: 'textarea', localized: true },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'totalBudget',
          type: 'number',
          defaultValue: 0,
          admin: { readOnly: true, description: 'The sum of the line items, computed.' },
          hooks: { beforeChange: computed((row) => ((row.budgetLineItems as { budgetAmount?: number }[] | undefined) ?? []).reduce((sum, item) => sum + Number(item.budgetAmount ?? 0), 0)) },
        },
        currencyField(),
        {
          name: 'status',
          type: 'select',
          defaultValue: 'draft',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Submitted', value: 'submitted' },
            { label: 'Approved', value: 'approved' },
            { label: 'Active', value: 'active' },
            { label: 'Archived', value: 'archived' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'approvedBy', type: 'relationship', relationTo: 'users', hooks: { beforeChange: [approvedByAnother] } },
        {
          name: 'approvedAt',
          type: 'date',
          admin: { readOnly: true, description: 'Stamped when the approver lands.' },
          hooks: { beforeChange: [({ value, siblingData }) => (siblingData?.approvedBy && !value ? new Date().toISOString() : value)] },
        },
      ],
    },
    { name: 'notes', type: 'textarea' },
  ],
}

/** An approved or active budget names who approved it. */
export const budgetError = (details: Record<string, unknown>): string | true =>
  (details.status === 'approved' || details.status === 'active') && !details.approvedBy ? 'An approved budget names its approver.' : true

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
  // was earnings-per-share: read by every member of the tenant, written by admins and accountants, only
  // where the plan includes earnings_per_share. The reference (EPS-2026-Q1) is the page title.
  {
    value: 'earnings-per-share',
    label: 'EPS computation',
    read: ['user'],
    write: ['admin', 'accountant'],
    requires: [],
    unique: ['title'],
    feature: 'earnings_per_share',
    block: EarningsPerShare,
    check: epsError,
  },
  // was insurance-contracts: read by every member, written by admins and accountants, where the plan includes
  // insurance_contracts. The reference (INS-2026-001) is the page title, the inception date the effective date.
  {
    value: 'insurance-contract',
    label: 'Insurance contract',
    read: ['user'],
    write: ['admin', 'accountant'],
    requires: ['effectiveDate'],
    unique: ['title'],
    feature: 'insurance_contracts',
    block: InsuranceContract,
    check: insuranceError,
  },
  // was debt-schedule: read by admin, audit staff and compliance; written by admins. The instrument's name is
  // the page title, its id (ISIN/CUSIP) the code, its issuance date the effective date, the agreement an attachment.
  {
    value: 'debt-instrument',
    label: 'Debt instrument',
    read: ['admin', 'audit-staff', 'compliance-officer'],
    write: ['admin'],
    requires: ['code', 'effectiveDate'],
    unique: ['code'],
    block: DebtInstrument,
    check: debtError,
  },
  // was regulatory-deferral-accounts: read by every member, written by admins and accountants, where the plan
  // includes rate_regulated_activities. The reference (RDA-2026-001) is the page title.
  {
    value: 'regulatory-deferral-account',
    label: 'Regulatory deferral account',
    read: ['user'],
    write: ['admin', 'accountant'],
    requires: [],
    unique: ['title'],
    feature: 'rate_regulated_activities',
    block: RegulatoryDeferralAccount,
    check: deferralError,
  },
  // was held-for-sale-classifications: read by every member, written by admins and accountants, where the plan
  // includes held_for_sale. The reference (HFS-2026-Q1-001) is the page title, the classification date the effective date.
  {
    value: 'held-for-sale',
    label: 'Held-for-sale classification',
    read: ['user'],
    write: ['admin', 'accountant'],
    requires: ['effectiveDate'],
    unique: ['title'],
    feature: 'held_for_sale',
    block: HeldForSale,
    check: heldForSaleError,
  },
  // was related-party-transactions: read by admin, audit staff and compliance; written by admins. The description
  // is the page title, the nature of the relationship its content, the transaction date the effective date.
  {
    value: 'related-party-transaction',
    label: 'Related party transaction',
    read: ['admin', 'audit-staff', 'compliance-officer'],
    write: ['admin'],
    requires: ['effectiveDate'],
    block: RelatedPartyTransaction,
    check: relatedPartyError,
  },
  // was regulatory-reports: read by admin, audit staff and compliance; written by admins. The report's name is the
  // page title, its jurisdiction the page's (required), the filed document an attachment.
  {
    value: 'regulatory-report',
    label: 'Regulatory report',
    read: ['admin', 'audit-staff', 'compliance-officer'],
    write: ['admin'],
    requires: ['jurisdiction'],
    block: RegulatoryReport,
    check: regulatoryReportError,
  },
  // was management-assessment-icfr: read by admin, audit staff and compliance; written by admins. The period is the
  // page title, the scope its content, the assessment date the effective date, the auditor's attestation an attachment.
  {
    value: 'icfr-assessment',
    label: 'ICFR assessment',
    read: ['admin', 'audit-staff', 'compliance-officer'],
    write: ['admin'],
    requires: ['effectiveDate'],
    block: IcfrAssessment,
    check: icfrError,
  },
  // was budget-planning: read by every member of the tenant; written by admins and accountants. The budget id is
  // the page title (unique in its tenant).
  {
    value: 'budget',
    label: 'Budget plan',
    read: ['user'],
    write: ['admin', 'accountant'],
    requires: [],
    unique: ['title'],
    block: Budget,
    check: budgetError,
  },
]
