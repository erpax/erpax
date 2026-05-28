import { createMembershipAdminMutateAccess } from '../../../access/membershipAdminMutateAccess'

/**
 * Pages: only global super-admins or per-tenant membership **admin** can create / update / delete.
 *
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27002 §5.15 access-control
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @see createMembershipAdminMutateAccess
 * @see docs/STANDARDS.md §4.4
 */
export const superAdminOrTenantAdminAccess = createMembershipAdminMutateAccess('pages')
