/**
 * The governed document types — what a governed page can be (src/fields/group/governedDocument), and
 * who reads and writes each. A leaf: the page's access and the role abilities (src/utilities/ability/roles)
 * both read it, so the rule for a type is stated once.
 */

export interface GovernedType {
  readonly value: string
  readonly label: string
  /** Roles that read this type (a super-admin reads every type). */
  readonly read: readonly string[]
  /** Roles that write this type (a super-admin writes every type). */
  readonly write: readonly string[]
  /** `document` fields this type requires. */
  readonly requires: readonly ('code' | 'effectiveDate' | 'classification')[]
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
]
