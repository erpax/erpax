/**
 * Collection-scope predicates — declarative `Where` filters for tenant /
 * version-status scoping. Internal files in this folder
 * (`collectionScopes`, `constants`, `filters`, `types`) inherit these standards.
 *
 * @security ISO-27001 A.5.23 information-security-for-cloud-services tenant-isolation
 * @security ISO-27002 §5.15 access-control
 * @security ISO-27002 §8.3 information-access-restriction
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @see docs/STANDARDS.md §4.4
 */

export {
  SCOPE_BY_COLLECTION,
  type CollectionKey,
} from '@/scope/collectionScopes'
export { TENANT_FIELD, VERSION_STATUS_FIELD, VersionStatus, type VersionStatusValue } from '@/scope/constants'
export { wherePublished, wherePublishedAnd } from '@/scope/filters'
export type { CollectionScope } from '@/scope/types'
