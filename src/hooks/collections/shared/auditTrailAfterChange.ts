/**
 * Structured audit-trail logger for `afterChange`.
 *
 * Builds a canonical {@link AuditEntry} (per ISO 19011:2018 §6.4.6) from
 * the Payload `afterChange` arguments. Two-channel emission:
 *   1. `req.payload.logger.info` — for streaming aggregators
 *      (Loki / Datadog / CloudWatch).
 *   2. `req.payload.create({ collection: 'audit-events', ... })` — for
 *      durable, queryable, SOX-evidence-preservation-grade rows.
 *
 * Slice PPP (2026-05-10): channel #2 added so the `audit-events`
 * collection actually receives writes; previously declared but no caller
 * persisted rows. The canonical `eventId` (RFC 9562 UUID v4) is now
 * threaded into the row for SOX §404 unique-event-id traceability.
 *
 * Self-recursion guard: this hook is not wired onto the `audit-events`
 * collection itself (its `afterChange` array is empty by design — see
 * `AuditEvents.ts` JSDoc). The collection is append-only with
 * `update: () => false`.
 *
 * @standard rfc-9562 uuid event-id
 * @audit ISO-19011:2018 §6.4.6 audit-evidence-collection
 * @compliance SOC-2 CC4.1 monitoring-and-evaluation
 * @compliance SOX §404 internal-controls evidence-preservation
 * @see src/utilities/iso/19011/types/index.ts
 * @see src/plugins/accounting/collections/AuditEvents.ts
 * @see docs/STANDARDS.md §4.4
 */

import type { CollectionAfterChangeHook } from 'payload'
import { appendAuditRow } from '@/utilities/audit/trail'
import { randomUuid } from '@/utilities/crypto'
import type { AuditEntry, AuditOperation } from '@/utilities/iso/19011'

/**
 * SHA-256 hex digest — Slice QQQQ Merkle chain.
 * Uses Web Crypto API (available in Workers + Node ≥18); pure-JS
 * fallback omitted because both deploy targets ship Web Crypto.
 *
 * @standard NIST FIPS-180-4 sha-256
 */

const tenantOf = (doc: unknown): string | number | null => {
  if (!doc || typeof doc !== 'object') return null
  const t = (doc as { tenant?: unknown }).tenant
  if (t === null || t === undefined) return null
  if (typeof t === 'string' || typeof t === 'number') return t
  if (typeof t === 'object' && t !== null && 'id' in t) {
    const id = (t as { id?: unknown }).id
    if (typeof id === 'string' || typeof id === 'number') return id
  }
  return null
}

const statusOf = (doc: unknown): string | null => {
  if (!doc || typeof doc !== 'object') return null
  const s = (doc as { status?: unknown }).status
  return typeof s === 'string' ? s : null
}

export function auditTrailAfterChange(
  collectionSlug: string,
): CollectionAfterChangeHook {
  return async ({ doc, previousDoc, operation, req }) => {
    const eventId = randomUuid()
    const entry: AuditEntry = {
      id: eventId,
      timestamp: new Date().toISOString(),
      collection: collectionSlug,
      operation: operation as AuditOperation,
      documentId: (doc?.id as string | number | null) ?? null,
      tenantId: tenantOf(doc),
      userId: (req.user?.id as string | number | null) ?? null,
      previousStatus: statusOf(previousDoc),
      nextStatus: statusOf(doc),
    }

    // Channel 1 — streaming log aggregator.
    req.payload.logger.info(
      { audit: true, ...entry },
      `audit ${entry.collection} ${entry.operation}`,
    )

    // Channel 2 — durable, queryable audit row (Slice PPP).
    // The audit-events collection itself doesn't fire this hook (it has
    // no afterChange + `update: () => false`), so no recursion. We
    // override access because the SOX-controlled hook runs in system
    // context — the user that triggered the source write may not have
    // create access to audit-events directly.
    if (entry.tenantId !== null && entry.documentId !== null) {
      try {
        // The tenant's hash chain, appended through the one writer of audit-events rows.
        await appendAuditRow(req.payload, {
          tenant: String(entry.tenantId),
          eventType: `${entry.collection}:${entry.operation}`,
          collectionSlug: entry.collection,
          operation: entry.operation,
          documentId: String(entry.documentId),
          user: entry.userId == null ? undefined : String(entry.userId),
          previousStatus: entry.previousStatus ?? undefined,
          nextStatus: entry.nextStatus ?? undefined,
          timestamp: entry.timestamp,
        })
      } catch (error) {
        // Don't let an audit-row write failure block the source write —
        // log loudly so the gap is visible in monitoring.
        req.payload.logger.error(
          { err: error, eventId, audit: true },
          `audit-events row write failed for ${entry.collection}:${entry.operation}`,
        )
      }
    }
    return doc
  }
}
