/**
 * The governed document types — what a governed page can be (src/fields/group/governedDocument), and
 * who reads and writes each. A leaf: the page's access and the role abilities (src/utilities/ability/roles)
 * both read it, so the rule for a type is stated once.
 *
 * What the types share is the page's `document` concern. A type whose standard needs fields of its own
 * declares a `block` (its own table, so the page never nears D1's width) and may add a `check`.
 */
import type { Block, FieldHook } from 'payload'
import { currencyField } from '@/fields/text/currencyField'

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
]
