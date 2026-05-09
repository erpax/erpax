/**
 * Canonical audit-trail types per ISO 19011:2018 §6.4.6 (audit evidence).
 *
 * Single source of truth for the shape of a "row in the audit trail".
 * Consumed by:
 *   - the structured-log emitter (`src/hooks/auditTrailAfterChange.ts`)
 *   - the persistent collection (`AuditEvents` in the accounting plugin)
 *   - any downstream subscriber (analytics, GDPR data-subject log, etc.)
 *
 * @standard ISO-19011:2018 §6.4.6 audit-evidence-collection
 * @standard ISO-19011:2018 §6.5 audit-conclusions
 * @compliance SOX §404 internal-controls evidence-preservation
 * @compliance SOC-2 CC4.1 monitoring-and-evaluation
 * @compliance GDPR Art.30 records-of-processing-activities
 * @see ./README.md
 */

/**
 * Operations that produce audit evidence. The first three (`create | update
 * | delete`) project Payload v3's `afterChange` lifecycle directly. The
 * remaining four cover the canonical SOX §404 / ISO-27002 §8.15 access
 * events that auditors want in the same trail (logins, exports, imports).
 *
 * @standard ISO-19011:2018 §6.4.6 audit-evidence
 * @security ISO-27002 §8.15 logging
 */
export type AuditOperation =
  | 'create'
  | 'update'
  | 'delete'
  | 'login'
  | 'logout'
  | 'export'
  | 'import'

/**
 * Severity scale — borrowed from RFC 5424 §6.2.1 with the lowest priorities
 * collapsed (debug + info as separate, then warn / error / critical for
 * routing into PagerDuty / OnCall via SIEM rules).
 *
 * @rfc 5424 §6.2.1 syslog-severity-levels
 */
export type AuditSeverity = 'debug' | 'info' | 'warn' | 'error' | 'critical'

/**
 * A single field-level change in an audit row. The `previousValue` /
 * `nextValue` pair is intentionally unknown — auditors care that the
 * change happened and what it was, not about the runtime type.
 */
export interface AuditChangeRecord {
  field: string
  previousValue: unknown
  nextValue: unknown
}

/**
 * Context the caller (hook / endpoint / job) supplies when emitting
 * an audit entry. The shape is shared by both the log-line and the
 * collection-row paths so a downstream tool can join them by `id`.
 */
export interface AuditTrailContext {
  /** Tenant the document belongs to. Required for multi-tenant scoping. */
  tenantId: string | number | null
  /** Acting user id. May be null for system / scheduled-job writes. */
  userId: string | number | null
  /**
   * Optional reason / source — e.g. `"close-job:2026-04"`,
   * `"admin-ui"`, `"sox-control:CR-0042"`. Free-text by design;
   * downstream tools can grep / filter.
   */
  source?: string
  /**
   * Optional correlation id — propagate from `req.headers['x-request-id']`
   * if your edge sets one, so the audit row joins to the access-log.
   *
   * @rfc 9110 §5.6 trace-context-correlation-id
   */
  requestId?: string
}

/**
 * The canonical audit-trail entry. One row per write event.
 *
 * Field naming mirrors ISO 19011's terminology where possible:
 *   - `auditee` ≈ the system being audited (here: `collection` slug).
 *   - `auditor` ≈ the actor effecting the change (here: `userId`).
 *   - `evidence` ≈ the diff (`changes` field) + linkable document.
 *
 * @audit ISO-19011:2018 §6.4.6 audit-evidence
 */
export interface AuditEntry {
  /** Stable unique id (UUID v4). Use `crypto.randomUUID()` or `uuid()`. */
  id: string
  /**
   * ISO 8601 timestamp the event occurred. Stored as ISO string for
   * log-aggregator interop; cast to Date at query time as needed.
   *
   * @standard ISO-8601-1:2019 date-time event-timestamp
   */
  timestamp: string
  /** The Payload collection slug (e.g. `'invoices'`, `'journal-entries'`). */
  collection: string
  /** The kind of write that produced this entry. */
  operation: AuditOperation
  /** The document id the write touched. */
  documentId: string | number | null
  /**
   * Tenant the document belongs to (denormalized into the row so
   * tenant-scoped queries don't have to join through `documents`).
   */
  tenantId: string | number | null
  /** Actor (user) id, or null for system/scheduled-job writes. */
  userId: string | number | null
  /** Optional structured diff. Empty array on `create` / `delete`. */
  changes?: AuditChangeRecord[]
  /** Optional status snapshot — common enough that it gets a top-level field. */
  previousStatus?: string | null
  nextStatus?: string | null
  /**
   * Optional domain event slug (e.g. `'invoice:activated'`,
   * `'subscription:cancelled'`). Carried alongside `collection` so the
   * auditor can filter by business event without parsing the diff.
   */
  eventType?: string
  /**
   * Compact field-level diff. Kept as a sparse `{ before: {...}, after: {...} }`
   * map rather than a full `AuditChangeRecord[]` when the consumer only
   * cares about the "what changed" picture. Either / or — `changes` and
   * `changeSummary` are not both populated by the canonical emitter.
   */
  changeSummary?: { before?: Record<string, unknown>; after?: Record<string, unknown> }
  /**
   * Per-field provenance — which cascade layer (env / tenant / collection /
   * default) supplied each value. Populated by `resolveRequestConfig`
   * downstream of the hook. Optional everywhere else.
   */
  sources?: Record<string, string>
  /** Severity bucket — defaults to 'info' for routine writes. */
  severity?: AuditSeverity
  /** Optional caller-supplied context. */
  source?: string
  /**
   * Correlation id — propagate from `req.headers['x-request-id']` if your
   * edge sets one. Joins this audit row to the access-log entry of the
   * same HTTP request.
   *
   * @rfc 9110 §5.6 trace-context-correlation-id
   */
  requestId?: string
}

/**
 * Convenience: the minimum the structured-log emitter needs to build an
 * `AuditEntry`. The emitter fills in `id` (uuid) and `timestamp` (now).
 */
export type AuditEntryInput = Omit<AuditEntry, 'id' | 'timestamp'>
