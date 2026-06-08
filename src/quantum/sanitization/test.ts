/**
 * quantum/sanitization — input·redact·purge boundaries + audited receipts.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import {
  sanitizeInput,
  redactProjection,
  purgeByKeyDestroy,
  scrubContentUuid,
  scrubReceipt,
  scrubInput,
} from '@/quantum/sanitization'

describe('quantum/sanitization — input boundary', () => {
  it('sanitizeInput strips ephemeral fields', () => {
    const out = sanitizeInput({
      atomPath: 'merge',
      kind: 'fact',
      sessionId: 'ephemeral',
      createdAt: '2026-06-08',
    })
    expect(out).toEqual({ atomPath: 'merge', kind: 'fact' })
  })

  it('scrubInput emits deterministic receipt + contentUuid', () => {
    const args = {
      raw: { atomPath: 'merge', kind: 'fact' },
      actor: 'agent:test',
      head: null,
      timestampIso: '2026-06-08T00:00:00.000Z',
    }
    const a = scrubInput(args)
    const b = scrubInput(args)
    expect(a.contentUuid).toBe(b.contentUuid)
    expect(a.receipt.leafUuid).toBe(b.receipt.leafUuid)
  })
})

describe('quantum/sanitization — redact boundary', () => {
  it('redactProjection voids denied fields without mutating structure', () => {
    const view = redactProjection({ name: 'Ada', email: 'a@b.c', nested: { token: 'secret', ok: 1 } })
    expect(view.email).toBeNull()
    expect(view.name).toBe('Ada')
    expect((view.nested as Record<string, unknown>).token).toBeNull()
    expect((view.nested as Record<string, unknown>).ok).toBe(1)
  })
})

describe('quantum/sanitization — purge boundary', () => {
  it('purgeByKeyDestroy preserves chain when uuid is over envelope', () => {
    const outcome = purgeByKeyDestroy(true)
    expect(outcome.rowDeleted).toBe(false)
    expect(outcome.keyDestroyed).toBe(true)
    expect(outcome.chainIntact).toBe(true)
    expect(outcome.recoverable).toBe(false)
  })

  it('purge refuses when uuid is over plaintext (would break chain)', () => {
    expect(() => purgeByKeyDestroy(false)).toThrow(/CipherEnvelope/)
  })
})

describe('quantum/sanitization — audited receipts', () => {
  it('scrubContentUuid is boundary-sensitive', () => {
    const s = { x: 1 }
    expect(scrubContentUuid('input', s)).not.toBe(scrubContentUuid('redact', s))
  })

  it('scrubReceipt chains with explicit timestamp', () => {
    const r = scrubReceipt({
      boundary: 'redact',
      sanitized: { atomPath: 'merge' },
      actor: 'agent:audit',
      head: null,
      timestampIso: '2026-06-08T00:00:00.000Z',
    })
    expect(r.leafUuid).toMatch(/^[0-9a-f]{64}$/)
    expect(r.seq).toBe(0)
  })
})
