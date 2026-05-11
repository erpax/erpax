/**
 * ISO 19011:2018 — canonical AuditEntry type tests.
 *
 * The two consumers (the structured-log emitter and the AuditEvents
 * collection) share this type. If a field on either side drifts away
 * from the canonical shape, this spec catches it at the type level.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-19011:2018 §6.4.6 audit-evidence-collection
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §404 internal-controls
 */

import { describe, it, expect } from 'vitest'
import type {
  AuditEntry,
  AuditOperation,
  AuditSeverity,
} from '@/standards/iso-19011'

describe('ISO 19011 — AuditEntry canonical shape', () => {
  it('builds a minimal valid entry from required fields', () => {
    const entry: AuditEntry = {
      id: '11111111-1111-1111-1111-111111111111',
      timestamp: '2026-05-09T12:00:00.000Z',
      collection: 'invoices',
      operation: 'create',
      documentId: 'inv-1',
      tenantId: 'tenant-1',
      userId: 'user-1',
    }
    expect(entry.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    )
    expect(entry.collection).toBe('invoices')
    expect(entry.operation).toBe('create')
  })

  it('accepts the full set of canonical operations', () => {
    const ops: AuditOperation[] = [
      'create',
      'update',
      'delete',
      'login',
      'logout',
      'export',
      'import',
    ]
    expect(ops).toHaveLength(7)
  })

  it('accepts the canonical severity scale (RFC 5424-derived)', () => {
    const levels: AuditSeverity[] = ['debug', 'info', 'warn', 'error', 'critical']
    expect(levels).toHaveLength(5)
  })

  it('carries optional status snapshot for state-transition rows', () => {
    const entry: AuditEntry = {
      id: '22222222-2222-2222-2222-222222222222',
      timestamp: '2026-05-09T12:00:00.000Z',
      collection: 'invoices',
      operation: 'update',
      documentId: 'inv-1',
      tenantId: 'tenant-1',
      userId: 'user-1',
      previousStatus: 'draft',
      nextStatus: 'issued',
      eventType: 'invoice:activated',
      severity: 'info',
    }
    expect(entry.previousStatus).toBe('draft')
    expect(entry.nextStatus).toBe('issued')
    expect(entry.eventType).toBe('invoice:activated')
  })

  it('carries optional changeSummary for compact diffs', () => {
    const entry: AuditEntry = {
      id: '33333333-3333-3333-3333-333333333333',
      timestamp: '2026-05-09T12:00:00.000Z',
      collection: 'tenants',
      operation: 'update',
      documentId: 'tenant-1',
      tenantId: 'tenant-1',
      userId: 'user-1',
      changeSummary: {
        before: { name: 'Acme' },
        after: { name: 'Acme Corp' },
      },
    }
    expect(entry.changeSummary?.before?.name).toBe('Acme')
    expect(entry.changeSummary?.after?.name).toBe('Acme Corp')
  })

  it('carries optional requestId for cross-system trace correlation', () => {
    const entry: AuditEntry = {
      id: '44444444-4444-4444-4444-444444444444',
      timestamp: '2026-05-09T12:00:00.000Z',
      collection: 'journal-entries',
      operation: 'create',
      documentId: 'je-1',
      tenantId: 'tenant-1',
      userId: 'user-1',
      requestId: 'req-abc-123',
    }
    expect(entry.requestId).toBe('req-abc-123')
  })

  it('accepts null for system-driven writes (no actor / no tenant)', () => {
    const entry: AuditEntry = {
      id: '55555555-5555-5555-5555-555555555555',
      timestamp: '2026-05-09T12:00:00.000Z',
      collection: 'fiscal-periods',
      operation: 'update',
      documentId: 1,
      tenantId: null,
      userId: null,
      source: 'close-job:2026-04',
    }
    expect(entry.userId).toBeNull()
    expect(entry.tenantId).toBeNull()
    expect(entry.source).toBe('close-job:2026-04')
  })
})
