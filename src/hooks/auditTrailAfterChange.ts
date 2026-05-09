/**
 * Structured audit-trail logger for `afterChange`.
 *
 * Builds a canonical {@link AuditEntry} (per ISO 19011:2018 §6.4.6) from
 * the Payload `afterChange` arguments and emits it as a single structured
 * `req.payload.logger.info` line. The same shape is persisted by the
 * `audit-events` collection — log aggregator and DB rows match field-by-
 * field so auditors can join across them.
 *
 * @audit ISO-19011:2018 §6.4.6 audit-evidence-collection
 * @compliance SOC-2 CC4.1 monitoring-and-evaluation
 * @compliance SOX §404 internal-controls evidence-preservation
 * @see src/standards/iso-19011/types.ts
 * @see docs/STANDARDS.md §4.4
 */

import type { CollectionAfterChangeHook } from 'payload'
import { v4 as uuid } from 'uuid'
import type { AuditEntry, AuditOperation } from '@/standards/iso-19011'

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
    const entry: AuditEntry = {
      id: uuid(),
      timestamp: new Date().toISOString(),
      collection: collectionSlug,
      operation: operation as AuditOperation,
      documentId: (doc?.id as string | number | null) ?? null,
      tenantId: tenantOf(doc),
      userId: (req.user?.id as string | number | null) ?? null,
      previousStatus: statusOf(previousDoc),
      nextStatus: statusOf(doc),
    }

    req.payload.logger.info(
      { audit: true, ...entry },
      `audit ${entry.collection} ${entry.operation}`,
    )
    return doc
  }
}
