/**
 * Structured audit-trail logger for `afterChange`.
 *
 * Emits a single structured `req.payload.logger.info` entry per write event,
 * shaped for downstream log-aggregator (Loki/Datadog/CloudWatch) ingestion.
 * Satisfies the audit-trail obligations declared by ISO-19011 and SOX §404
 * on financial collections that do not (yet) ship a dedicated `audit-logs`
 * Payload collection.
 *
 * @audit ISO-19011:2018 audit-trail change-event-emission
 * @compliance SOC-2 CC4.1 monitoring-and-evaluation
 * @compliance SOX §404 internal-controls evidence-preservation
 * @see docs/STANDARDS.md §4.4
 */

import type { CollectionAfterChangeHook } from 'payload'

export function auditTrailAfterChange(collectionSlug: string): CollectionAfterChangeHook {
  return async ({ doc, previousDoc, operation, req }) => {
    req.payload.logger.info(
      {
        audit: true,
        collection: collectionSlug,
        operation,
        documentId: doc?.id,
        userId: req.user?.id ?? null,
        tenantId: (doc as { tenant?: unknown })?.tenant ?? null,
        previousStatus: (previousDoc as { status?: unknown })?.status ?? null,
        nextStatus: (doc as { status?: unknown })?.status ?? null,
        timestamp: new Date().toISOString(),
      },
      `audit ${collectionSlug} ${operation}`,
    )
    return doc
  }
}
