/**
 * Audit Events — persistent ISO 19011 / SOX §404 evidence trail.
 *
 * The canonical type lives in `@/standards/iso-19011` (AuditEntry).
 * This collection's field set is the Payload projection of that type:
 *
 *   canonical.id              → doc.id (Payload-managed, UUID)
 *   canonical.timestamp       → doc.timestamp (ISO 8601 UTC)
 *   canonical.collection      → doc.collectionSlug
 *   canonical.operation       → doc.operation (create/update/delete/login/
 *                                logout/export/import)
 *   canonical.documentId      → doc.documentId
 *   canonical.tenantId        → doc.tenant (relationship)
 *   canonical.userId          → doc.user (relationship)
 *   canonical.previousStatus  → doc.previousStatus
 *   canonical.nextStatus      → doc.nextStatus
 *   canonical.eventType       → doc.eventType
 *   canonical.changeSummary   → doc.changeSummary
 *   canonical.sources         → doc.sources
 *   canonical.severity        → doc.severity
 *   canonical.requestId       → doc.requestId
 *   canonical.source          → doc.source (free-text actor context)
 *
 * Today's `auditTrailAfterChange` hook emits structured events to
 * `req.payload.logger.info` — fine for streaming aggregators (Loki /
 * Datadog / CloudWatch) but not queryable from the admin UI and not
 * SOX-evidence-preservation-grade unless that aggregator is itself
 * SOX-controlled. This collection is the durable, queryable target.
 *
 * Every canonical write (orders, invoices, payments, journal entries,
 * subscriptions, fiscal periods, …) writes one row here. The auditor's
 * console queries this collection by `(tenant, collection, operation,
 * userId, timestamp range)` for evidence — no log scraping required.
 *
 * Relations (the standards-required graph):
 *   tenant       → tenants
 *   user         → users          (actor)
 *   relatedDoc   → polymorphic ID (target document — slug + id pair)
 *   approval     → audit-events   (links a SoD-bypass attempt to its review)
 *
 * @standard ISO-19011:2018 §6.4.6 audit-evidence-collection
 * @standard ISO-19011:2018 §6.5 audit-conclusions
 * @standard ISO/IEC 27037:2012 evidence-preservation
 * @rfc 5424 §6.2.1 syslog-severity-levels
 * @compliance SOC-2 CC4.1 monitoring-and-evaluation
 * @compliance SOX §302 disclosure-controls
 * @compliance SOX §404 internal-controls evidence-preservation
 * @compliance GDPR Art.30 records-of-processing-activities
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §8.15 logging
 * @audit ISO-19011:2018 audit-trail
 * @see src/standards/iso-19011/types.ts AuditEntry
 * @see src/hooks/auditTrailAfterChange.ts
 * @see docs/STANDARDS.md §4.4
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/auto/populate/tenant'
import { scopedAccess, tenantAdmin, adminOnly } from '@/auth'

const AuditEvents: CollectionConfig = {
  slug: 'audit-events',
  labels: { singular: 'Audit Event', plural: 'Audit Events' },
  admin: {
    useAsTitle: 'eventType',
    defaultColumns: ['timestamp', 'collectionSlug', 'operation', 'documentId', 'user', 'tenant'],
    description: 'Persistent ISO 19011 / SOX §404 audit trail. Append-only — never edited or deleted.',
  },
  // Append-only: anyone can read their tenant's events; only admins can
  // create (via the canonical hook); nobody updates or deletes.
  access: {
    read: scopedAccess(),
    create: tenantAdmin,
    update: () => false, // append-only
    delete: adminOnly, // emergency only — should require a separate justification record
  },
  fields: [
    // Slice PPP: persist the canonical `eventId` (RFC 9562 UUID) carried
    // by every DomainEvent. Required by SOX §404 + ISO 19011 §6.4.6 for
    // event traceability — without it, two emissions of the same
    // (collection, documentId, operation, timestamp) can't be told apart
    // and the audit trail becomes ambiguous.
    //
    // @standard rfc-9562 uuid event-id
    // @audit ISO-19011:2018 §6.4.6 audit-evidence-collection unique-event-identifier
    // @compliance SOX §404 internal-controls evidence-preservation
    {
      name: 'eventId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description:
          'RFC 9562 UUID v4 — canonical event identifier. Carried in DomainEvent.eventId from the emitter; persisted here for SOX §404 / ISO 19011 §6.4.6 unique traceability.',
        readOnly: true,
      },
    },
    {
      name: 'timestamp',
      type: 'date',
      required: true,
      index: true,
      admin: {
        description: 'ISO 8601 UTC timestamp the event was recorded.',
        readOnly: true,
      },
    },
    {
      name: 'eventType',
      type: 'text',
      required: true,
      index: true,
      admin: {
        description:
          'Domain event slug (e.g. order:activated, subscription:cancelled, period:locked). Maps to canonical AuditEntry.eventType.',
        readOnly: true,
      },
    },
    {
      name: 'source',
      type: 'text',
      admin: {
        description:
          'Free-text actor / source context (e.g. "close-job:2026-04", "admin-ui", "sox-control:CR-0042"). Maps to canonical AuditEntry.source.',
      },
    },
    {
      name: 'collectionSlug',
      type: 'text',
      required: true,
      index: true,
      admin: {
        description:
          'Source collection slug. Maps to canonical AuditEntry.collection.',
        readOnly: true,
      },
    },
    {
      name: 'operation',
      type: 'select',
      required: true,
      options: [
        { label: 'Create', value: 'create' },
        { label: 'Update', value: 'update' },
        { label: 'Delete', value: 'delete' },
        { label: 'Login', value: 'login' },
        { label: 'Logout', value: 'logout' },
        { label: 'Export', value: 'export' },
        { label: 'Import', value: 'import' },
      ],
      admin: {
        description:
          'Maps to canonical AuditEntry.operation (AuditOperation enum).',
        readOnly: true,
      },
    },
    {
      name: 'documentId',
      type: 'text',
      required: true,
      index: true,
      admin: { description: 'ID of the affected document.', readOnly: true },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      admin: { description: 'Actor who performed the action.', readOnly: true },
    },
    {
      name: 'previousStatus',
      type: 'text',
      admin: {
        description:
          'Status before the change (for status transitions). Maps to canonical AuditEntry.previousStatus.',
        readOnly: true,
      },
    },
    {
      name: 'nextStatus',
      type: 'text',
      admin: {
        description:
          'Status after the change. Maps to canonical AuditEntry.nextStatus.',
        readOnly: true,
      },
    },
    {
      name: 'changes',
      type: 'array',
      admin: {
        description:
          'Per-field diff (each item: { field, previousValue, nextValue }). Maps to canonical AuditEntry.changes (AuditChangeRecord[]).',
        readOnly: true,
      },
      fields: [
        { name: 'field', type: 'text', required: true },
        { name: 'previousValue', type: 'json' },
        { name: 'nextValue', type: 'json' },
      ],
    },
    {
      name: 'changeSummary',
      type: 'json',
      admin: {
        description:
          'Field-level diff (sparse): {before:{…}, after:{…}}. Compact alternative to `changes[]` — emitter populates one or the other. Maps to canonical AuditEntry.changeSummary.',
        readOnly: true,
      },
    },
    {
      name: 'sources',
      type: 'json',
      admin: {
        description:
          'Per-field provenance from resolveRequestConfig.sources (which cascade layer supplied each value). Maps to canonical AuditEntry.sources.',
        readOnly: true,
      },
    },
    {
      name: 'requestId',
      type: 'text',
      index: true,
      admin: {
        description:
          'Correlation ID — links events that originated from the same HTTP request. Maps to canonical AuditEntry.requestId.',
        readOnly: true,
      },
    },
    {
      name: 'severity',
      type: 'select',
      defaultValue: 'info',
      options: [
        { label: 'Debug', value: 'debug' },
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warn' },
        { label: 'Error', value: 'error' },
        { label: 'Critical', value: 'critical' },
      ],
      admin: {
        description:
          'RFC 5424-derived severity. Maps to canonical AuditEntry.severity (AuditSeverity enum).',
        readOnly: true,
      },
    },
    // Slice QQQQ — Merkle hash chain for tamper-evidence over time.
    // Each row's `rowHash` = SHA-256 over canonical JSON (eventId, tenant,
    // timestamp, eventType, collectionSlug, documentId, user, previousHash).
    // `previousHash` is the rowHash of the IMMEDIATELY-PRIOR audit-events
    // row for the same tenant. An auditor can replay every row and verify
    // the chain is intact — any insert / delete / mutation in the
    // historical log breaks it.
    //
    // @standard NIST FIPS-180-4 sha-256
    // @standard ISO 27037:2012 evidence-preservation
    // @audit ISO-19011:2018 §6.4.6 audit-evidence-immutability
    // @compliance SOX §404 internal-controls audit-tamper-evidence
    { name: 'previousHash', type: 'text', index: true,
      admin: { readOnly: true, description: 'SHA-256 hex of the immediately prior audit-events row for this tenant. Empty for the first row. Drives Merkle integrity check at the architecture-invariant gate.' } },
    { name: 'rowHash', type: 'text', index: true,
      admin: { readOnly: true, description: 'SHA-256 hex of canonical JSON over (eventId, tenant, timestamp, eventType, collectionSlug, documentId, user, previousHash). Computed at write time; verified at the integrity-check gate.' } },
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    // Append-only: no afterChange (avoids recursion since this IS the audit log).
  },
  timestamps: true,
}

export default AuditEvents
