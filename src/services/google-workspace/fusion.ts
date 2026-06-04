/**
 * Google Workspace fusion — the [[merge]] law applied to external resources.
 *
 * A fetched Workspace resource (a Gmail message, a Calendar event, a Drive file,
 * a directory user) is fused into the erpax mesh by CONTENT-ADDRESSING it: tag it
 * with its source + cross-system `externalRef`, then compute its content-uuid. So
 * the SAME resource — re-fetched by the same tenant, or fetched by another erpax
 * instance — yields the SAME uuid, and the upsert dedups (same content ⇒ same id).
 * Fusion is therefore idempotent and federated by construction; the office layer
 * merges into the mesh with no coordination, exactly like any other erpax row.
 *
 * The target collection is read from the [[registry]] (the gap each service fills);
 * the caller upserts `record` into `target` keyed by `uuid`. No external entity
 * points INTO erpax — the erpax row carries the `externalRef` back out (the same
 * polymorphic-out rule as [[accounting]]).
 *
 * @standard RFC 9562 §5.8 content-addressed uuidv8 (the fusion identity)
 * @see ./registry.ts — the service catalogue + the `fills` gap-map
 * @see src/services/integrity/content-uuid.ts — computeContentUuid
 */
import { computeContentUuid } from '@/services/integrity'
import type { WorkspaceServiceId } from './registry'
import { workspaceApi } from './registry'

/** A raw external Workspace resource, before fusion. */
export interface WorkspaceResource {
  readonly service: WorkspaceServiceId
  /** the Google-native id (Gmail message id, Calendar iCalUID, Drive fileId, People resourceName). */
  readonly nativeId: string
  /** the identity-defining content (subject/body/start/end/name…) — what the content-uuid hashes. */
  readonly content: Record<string, unknown>
}

/** A fused resource — an erpax record + its content-addressed identity, ready to upsert. */
export interface FusedResource {
  readonly service: WorkspaceServiceId
  /** the erpax collection slug to upsert into (the [[registry]]'s `fills`). */
  readonly target: string
  /** the erpax record: the resource content + the source tag + the cross-system back-reference. */
  readonly record: Record<string, unknown> & { source: 'google-workspace'; externalRef: string }
  /** content-addressed identity — same resource ⇒ same uuid ⇒ idempotent merge (dedup on re-fetch). */
  readonly uuid: string
}

/** The stable cross-system key — `service:nativeId` (e.g. `gmail:18f2ab…`). */
export function externalRef(service: WorkspaceServiceId, nativeId: string): string {
  return `${service}:${nativeId}`
}

/**
 * Fuse an external Workspace resource into the mesh. Tags it with its source and
 * `externalRef`, content-addresses it (so re-fetch dedups), and routes it to the
 * erpax collection the [[registry]] says this service fills. Throws on an unknown
 * service id (the catalogue is the source of truth).
 */
export function fuseWorkspaceResource(res: WorkspaceResource, tenantId: string): FusedResource {
  const api = workspaceApi(res.service)
  if (!api) throw new Error(`google-workspace: unknown service '${res.service}'`)
  const record = {
    ...res.content,
    source: 'google-workspace' as const,
    externalRef: externalRef(res.service, res.nativeId),
  }
  const uuid = computeContentUuid(record, tenantId)
  return { service: res.service, target: api.fills, record, uuid }
}

/**
 * Do two fetches fuse to the SAME identity? — the idempotency / cross-instance
 * dedup check. True when the resources carry the same service+nativeId+content
 * for the same tenant (the [[merge]] guarantee made testable).
 */
export function fusesIdentically(a: WorkspaceResource, b: WorkspaceResource, tenantId: string): boolean {
  return fuseWorkspaceResource(a, tenantId).uuid === fuseWorkspaceResource(b, tenantId).uuid
}
