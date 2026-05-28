import { isSuperAdmin } from '../../../access/isSuperAdmin'
import { getUserTenantIDs } from '../../../utilities/getUserTenantIDs'
import { Access } from 'payload'

/**
 * Tenants:update + delete access predicate — super-admin globally, or
 * tenant-admin scoped to their own tenant rows.
 *
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @security ISO-27001 A.5.23 information-security-for-cloud-services tenant-isolation
 * @security ISO-27002 §5.15 access-control
 * @compliance GDPR Art.28 processor-controls
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @see docs/STANDARDS.md §4.4
 */
export const updateAndDeleteAccess: Access = ({ req }) => {
  if (!req.user) {
    return false
  }

  if (isSuperAdmin(req.user)) {
    return true
  }

  return {
    id: {
      in: getUserTenantIDs(req.user, 'admin'),
    },
  }
}
