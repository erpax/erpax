/**
 * Audit Events — persistent ISO 19011 / SOX §404 evidence trail.
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
 * @standard ISO-19011:2018 audit-trail change-event-emission
 * @standard ISO/IEC 27037:2012 evidence-preservation
 * @compliance SOC-2 CC4.1 monitoring-and-evaluation
 * @compliance SOX §302 disclosure-controls
 * @compliance SOX §404 internal-controls evidence-preservation
 * @compliance GDPR Art.30 records-of-processing-activities
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §8.15 logging
 * @audit ISO-19011:2018 audit-trail
 * @see src/hooks/auditTrailAfterChange.ts
 * @see docs/STANDARDS.md §4.4
 */

import type { CollectionConfig } from 'payload'
import { autoPopulateHost } from '@/hooks/autoPopulateHost'
import { scopedAccess, tenantAdmin, adminOnly } from '@/plugins/auth/access'
import { multiTenancyField } from '../fields/base-accounting-fields'

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
    multiTenancyField(),
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
        description: 'Domain event slug (e.g. order:activated, subscription:cancelled, period:locked).',
        readOnly: true,
      },
    },
    {
      name: 'collectionSlug',
      type: 'text',
      required: true,
      index: true,
      admin: { description: 'Source collection slug.', readOnly: true },
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
      admin: { readOnly: true },
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
      admin: { description: 'Status before the change (for status transitions).', readOnly: true },
    },
    {
      name: 'nextStatus',
      type: 'text',
      admin: { description: 'Status after the change.', readOnly: true },
    },
    {
      name: 'changeSummary',
      type: 'json',
      admin: { description: 'Field-level diff (sparse): {before:{…}, after:{…}}.', readOnly: true },
    },
    {
      name: 'sources',
      type: 'json',
      admin: {
        description:
          'Per-field provenance from resolveRequestConfig.sources (which cascade layer supplied each value).',
        readOnly: true,
      },
    },
    {
      name: 'requestId',
      type: 'text',
      index: true,
      admin: { description: 'Correlation ID — links events that originated from the same HTTP request.', readOnly: true },
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
      admin: { readOnly: true },
    },
  ],
  hooks: {
    beforeValidate: [autoPopulateHost],
    // Append-only: no afterChange (avoids recursion since this IS the audit log).
  },
  timestamps: true,
}

export default AuditEvents
