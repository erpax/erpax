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
]
