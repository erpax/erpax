import { enforceDocumentTenantForUser } from '@/enforce/document/tenant/for/user'

/**
 * Multi-tenant plugin: uploads scoped to the active tenant.
 *
 * @rfc 6838 mime-type media-type
 * @security ISO-27001 A.5.23 cloud-service-isolation tenant-scope
 * @compliance GDPR Art.5(1)(c) data-minimization
 * @see docs/STANDARDS.md §3
 */
export const mediaBeforeChange = [enforceDocumentTenantForUser]
