/**
 * @erpax/auth/access — canonical access predicates.
 *
 * Centralized access control for all collections and fields in ERPax.
 * Provides collection-level and field-level predicates that route all
 * access control decisions through this module, ensuring consistent
 * enforcement of RBAC + multi-tenant isolation across the entire system.
 *
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @standard NIST SP-800-162 attribute-based-access-control
 * @security ISO-27001 A.5.15 access-control
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 § 5.15 access-control
 * @security ISO-27002 § 5.4 segregation-of-duties
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @see docs/STANDARDS.md § 4.4
 */

export { isSuperAdmin, authenticated, tenantScoped, adminOnly } from '@/plugins/auth/access/predicates'
export type { }

export { tenantFieldAccess, readOnlyExceptSuperAdmin } from '@/plugins/auth/access/field-access'
