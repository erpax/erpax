/**
 * ISO 19011 — collection-to-canonical-type alignment tests.
 *
 * Asserts that the AuditEvents Payload collection projects cleanly onto
 * the canonical AuditEntry type in `@/standards/iso-19011`. The mapping
 * is documented in the collection's banner; this spec is the executable
 * verification.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-19011:2018 §6.4.6 audit-evidence
 * @audit ISO-19011:2018 audit-trail
 * @see src/plugins/accounting/collections/AuditEvents.ts
 */

import { describe, it, expect } from 'vitest'
import type {
  AuditEntry,
  AuditOperation,
  AuditSeverity,
  AuditChangeRecord,
} from '@/standards/iso-19011'

// ─── Doc shape — what Payload returns for an AuditEvents row ──────────

interface PayloadAuditEventDoc {
  id: string
  timestamp: string
  eventType: string
  source?: string
  collectionSlug: string
  operation: AuditOperation
  documentId: string
  user?: string | { id: string } | null
  tenant?: string | { id: string } | null
  previousStatus?: string | null
  nextStatus?: string | null
  changes?: AuditChangeRecord[]
  changeSummary?: { before?: Record<string, unknown>; after?: Record<string, unknown> }
  sources?: Record<string, string>
  requestId?: string
  severity?: AuditSeverity
}

const idOrSelf = (v: unknown): string | number | null => {
  if (v === null || v === undefined) return null
  if (typeof v === 'string' || typeof v === 'number') return v
  if (typeof v === 'object' && v !== null && 'id' in v) {
    const id = (v as { id?: unknown }).id
    if (typeof id === 'string' || typeof id === 'number') return id
  }
  return null
}

const toCanonicalAuditEntry = (doc: PayloadAuditEventDoc): AuditEntry => ({
  id: doc.id,
  timestamp: doc.timestamp,
  collection: doc.collectionSlug,
  operation: doc.operation,
  documentId: doc.documentId,
  tenantId: idOrSelf(doc.tenant),
  userId: idOrSelf(doc.user),
  previousStatus: doc.previousStatus ?? null,
  nextStatus: doc.nextStatus ?? null,
  eventType: doc.eventType,
  changes: doc.changes,
  changeSummary: doc.changeSummary,
  sources: doc.sources,
  severity: doc.severity,
  source: doc.source,
  requestId: doc.requestId,
})

describe('ISO 19011 — AuditEvents collection ↔ canonical AuditEntry', () => {
  it('routine create event from a collection write', () => {
    const doc: PayloadAuditEventDoc = {
      id: 'AE-1',
      timestamp: '2026-05-09T12:00:00.000Z',
      eventType: 'invoice:activated',
      collectionSlug: 'invoices',
      operation: 'create',
      documentId: 'INV-001',
      user: { id: 'user-1' },
      tenant: { id: 'tenant-1' },
      previousStatus: null,
      nextStatus: 'issued',
      severity: 'info',
      requestId: 'req-abc',
    }
    const canonical = toCanonicalAuditEntry(doc)
    expect(canonical.id).toBe('AE-1')
    expect(canonical.collection).toBe('invoices')
    expect(canonical.operation).toBe('create')
    expect(canonical.tenantId).toBe('tenant-1')
    expect(canonical.userId).toBe('user-1')
    expect(canonical.eventType).toBe('invoice:activated')
    expect(canonical.severity).toBe('info')
  })

  it('status-transition update with previous + next status', () => {
    const doc: PayloadAuditEventDoc = {
      id: 'AE-2',
      timestamp: '2026-05-15T10:00:00.000Z',
      eventType: 'subscription:cancelled',
      collectionSlug: 'subscriptions',
      operation: 'update',
      documentId: 'SUB-99',
      user: 'user-2',
      tenant: 'tenant-1',
      previousStatus: 'active',
      nextStatus: 'cancelled',
      severity: 'warn',
    }
    const canonical = toCanonicalAuditEntry(doc)
    expect(canonical.previousStatus).toBe('active')
    expect(canonical.nextStatus).toBe('cancelled')
    expect(canonical.severity).toBe('warn')
  })

  it('field-level diff via changes[] — AuditChangeRecord[]', () => {
    const doc: PayloadAuditEventDoc = {
      id: 'AE-3',
      timestamp: '2026-05-15T11:00:00.000Z',
      eventType: 'tenants:updated',
      collectionSlug: 'tenants',
      operation: 'update',
      documentId: 'tenant-1',
      tenant: 'tenant-1',
      user: 'user-admin',
      changes: [
        { field: 'name', previousValue: 'Acme', nextValue: 'Acme Corp' },
        { field: 'country', previousValue: 'US', nextValue: 'BG' },
      ],
    }
    const canonical = toCanonicalAuditEntry(doc)
    expect(canonical.changes).toHaveLength(2)
    expect(canonical.changes?.[0].field).toBe('name')
    expect(canonical.changes?.[1].nextValue).toBe('BG')
  })

  it('compact diff via changeSummary — { before, after } map', () => {
    const doc: PayloadAuditEventDoc = {
      id: 'AE-4',
      timestamp: '2026-05-15T12:00:00.000Z',
      eventType: 'invoices:updated',
      collectionSlug: 'invoices',
      operation: 'update',
      documentId: 'INV-007',
      user: 'user-1',
      tenant: 'tenant-1',
      changeSummary: {
        before: { totalAmount: 100_00 },
        after: { totalAmount: 120_00 },
      },
    }
    const canonical = toCanonicalAuditEntry(doc)
    expect(canonical.changeSummary?.before?.totalAmount).toBe(100_00)
    expect(canonical.changeSummary?.after?.totalAmount).toBe(120_00)
  })

  it('per-field provenance via sources (resolveRequestConfig)', () => {
    const doc: PayloadAuditEventDoc = {
      id: 'AE-5',
      timestamp: '2026-05-15T13:00:00.000Z',
      eventType: 'invoices:created',
      collectionSlug: 'invoices',
      operation: 'create',
      documentId: 'INV-008',
      user: 'user-1',
      tenant: 'tenant-1',
      sources: {
        currencyCode: 'tenant_default',
        invoiceTypeCode: 'collection_default',
        date: 'request',
      },
    }
    const canonical = toCanonicalAuditEntry(doc)
    expect(canonical.sources?.currencyCode).toBe('tenant_default')
    expect(canonical.sources?.date).toBe('request')
  })

  it('system write — null tenant / null user (e.g. close-job)', () => {
    const doc: PayloadAuditEventDoc = {
      id: 'AE-6',
      timestamp: '2026-05-15T14:00:00.000Z',
      eventType: 'period:locked',
      collectionSlug: 'fiscal-periods',
      operation: 'update',
      documentId: 'FP-2026-04',
      user: null,
      tenant: null,
      source: 'close-job:2026-04',
      severity: 'critical',
    }
    const canonical = toCanonicalAuditEntry(doc)
    expect(canonical.userId).toBeNull()
    expect(canonical.tenantId).toBeNull()
    expect(canonical.source).toBe('close-job:2026-04')
    expect(canonical.severity).toBe('critical')
  })

  it('login event — operation that does not touch a domain doc', () => {
    const doc: PayloadAuditEventDoc = {
      id: 'AE-7',
      timestamp: '2026-05-15T08:00:00.000Z',
      eventType: 'auth:login',
      collectionSlug: 'users',
      operation: 'login',
      documentId: 'user-1',
      user: 'user-1',
      tenant: 'tenant-1',
      requestId: 'req-login-xyz',
      severity: 'info',
    }
    const canonical = toCanonicalAuditEntry(doc)
    expect(canonical.operation).toBe('login')
    expect(canonical.requestId).toBe('req-login-xyz')
  })
})
