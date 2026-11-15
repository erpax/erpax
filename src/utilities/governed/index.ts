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
  readonly requires: readonly ('code' | 'effectiveDate' | 'classification')[]
  /** The fields this type's standard needs beyond the shared concern: `document.details`, one block. */
  readonly block?: Block
  /** A rule of this type over its details block, or true. */
  readonly check?: (details: Record<string, unknown>) => string | true
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
]
