import { enforceDocumentTenantForUser } from '../../../hooks/enforceDocumentTenantForUser'

/**
 * Multi-tenant plugin: attach/create categories within the active tenant.
 *
 * @security ISO-27001 A.5.23 cloud-service-isolation tenant-scope
 * @see docs/STANDARDS.md §3
 */
export const categoriesBeforeChange = [enforceDocumentTenantForUser]
