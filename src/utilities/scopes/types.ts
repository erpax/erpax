/**
 * Collection-scope shape — feature flags per collection (lifecycle,
 * tenancy, schedule-publish, permissions).
 *
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.15 access-control
 * @see ./collectionScopes.ts
 */

export type CollectionScope = {
  lifecycle: 'none' | 'payloadVersions'
  tenancy: boolean
  schedulePublish: boolean
  permissions: 'none' | 'definitions' | 'assignments'
}
