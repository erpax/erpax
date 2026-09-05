/**
 * Error-uuid tests — Conservation Law 64.
 *
 * Slice AAAAAAAAAA-cut1 (2026-05-11). Pins:
 *
 *   1. computeErrorUuid is stable for the same ErrorInfo + tenant.
 *   2. Different codes / messages / contexts → different uuids.
 *   3. Per-tenant namespace: same info in different tenants →
 *      distinct uuids.
 *   4. sealed:true adds SEALED capability; absence keeps only CHAINED.
 *   5. ErrorUuid decodes as slot=error with the right capability set.
 *   6. wrapError converts native Error / strings / arbitrary throws
 *      into a deterministic structured uuid.
 *   7. toErrorInfo lossily drops stack traces (replay-safe).
 *
 * @audit Conservation Law 64 errors-are-first-class-uuids
 */
import { describe, it, expect } from 'vitest'
import {
  computeErrorUuid, toErrorInfo, wrapError, type ErrorInfo,
} from '@/error/uuid'
import { decodeStructured } from '@/uuid/format'

const TENANT = 'tenant-1'

describe('computeErrorUuid — deterministic', () => {
  it('is stable for the same (info, tenantId) tuple', () => {
    const info: ErrorInfo = { code: 'TIMEOUT', message: 'upstream timeout', category: 'transient' }
    expect(computeErrorUuid({ info, tenantId: TENANT })).toBe(
      computeErrorUuid({ info, tenantId: TENANT }),
    )
  })

  it('differs across codes (same message)', () => {
    const a = computeErrorUuid({ info: { code: 'TIMEOUT', message: 'm' }, tenantId: TENANT })
    const b = computeErrorUuid({ info: { code: 'REFUSED', message: 'm' }, tenantId: TENANT })
    expect(a).not.toBe(b)
  })

  it('differs across messages (same code) — message is part of identity', () => {
    const a = computeErrorUuid({ info: { code: 'X', message: 'one' }, tenantId: TENANT })
    const b = computeErrorUuid({ info: { code: 'X', message: 'two' }, tenantId: TENANT })
    expect(a).not.toBe(b)
  })

  it('differs across tenants for the same info', () => {
    const info: ErrorInfo = { code: 'X', message: 'y' }
    expect(computeErrorUuid({ info, tenantId: 'tenant-1' }))
      .not.toBe(computeErrorUuid({ info, tenantId: 'tenant-2' }))
  })

  it('differs when contextUuid changes', () => {
    const base: ErrorInfo = { code: 'X', message: 'y' }
    const a = computeErrorUuid({ info: { ...base, contextUuid: '00000000-0000-5000-8000-000000000001' }, tenantId: TENANT })
    const b = computeErrorUuid({ info: { ...base, contextUuid: '00000000-0000-5000-8000-000000000002' }, tenantId: TENANT })
    expect(a).not.toBe(b)
  })
})

describe('ErrorUuid decodes as slot=error with the expected capability set', () => {
  it('default capability is CHAINED only', () => {
    const u = computeErrorUuid({ info: { code: 'X', message: 'y' }, tenantId: TENANT })
    const parts = decodeStructured(u)
    expect(parts.slotName).toBe('error')
    expect(parts.capabilityNames).toEqual(['CHAINED'])
  })

  it('sealed:true adds SEALED capability (critical errors at chain seal points)', () => {
    const u = computeErrorUuid({
      info: { code: 'DATA_LOSS', message: 'rollback failed', category: 'permanent' },
      tenantId: TENANT, sealed: true,
    })
    const parts = decodeStructured(u)
    expect(parts.slotName).toBe('error')
    expect([...parts.capabilityNames].sort()).toEqual(['CHAINED', 'SEALED'])
  })

  it('uuidv8 format (version nibble = 8)', () => {
    const u = computeErrorUuid({ info: { code: 'X', message: 'y' }, tenantId: TENANT })
    expect(u).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-/)
  })
})

describe('toErrorInfo — lossy + replay-safe', () => {
  it('extracts name + message from a native Error', () => {
    class MyError extends Error { constructor(m: string) { super(m); this.name = 'MyError' } }
    const info = toErrorInfo({ err: new MyError('oops') })
    expect(info.code).toBe('MyError')
    expect(info.message).toBe('oops')
  })

  it('falls back to UNKNOWN for vanilla Error with default name', () => {
    const info = toErrorInfo({ err: new Error('boom') })
    expect(info.code).toBe('UNKNOWN')
    expect(info.message).toBe('boom')
  })

  it('honours explicit code over inferred', () => {
    const info = toErrorInfo({ err: new Error('whatever'), code: 'CUSTOM' })
    expect(info.code).toBe('CUSTOM')
  })

  it('handles string throws + arbitrary values', () => {
    expect(toErrorInfo({ err: 'just a string' }).message).toBe('just a string')
    expect(toErrorInfo({ err: 42 }).message).toBe('42')
    expect(toErrorInfo({ err: { foo: 'bar' } }).message).toBe('[object Object]')
  })

  it('does NOT include stack traces in the info (replay-safe)', () => {
    const err = new Error('with stack')
    const info = toErrorInfo({ err }) as ErrorInfo & { stack?: string }
    expect(info.stack).toBeUndefined()
  })
})

describe('wrapError — high-level conversion + structured uuid', () => {
  it('produces deterministic uuid + info from a native Error', () => {
    const err = new Error('upstream timeout')
    err.name = 'TimeoutError'
    const a = wrapError({ err, tenantId: TENANT })
    const b = wrapError({ err, tenantId: TENANT })
    expect(a.errorUuid).toBe(b.errorUuid)
    expect(a.info.code).toBe('TimeoutError')
    expect(a.info.message).toBe('upstream timeout')
  })

  it('threads contextUuid + sealed:true into the uuid', () => {
    const result = wrapError({
      err: new Error('failed'),
      tenantId: TENANT,
      code: 'BILLING_FAIL',
      contextUuid: '00000000-0000-5000-8000-context01',
      sealed: true,
    })
    const parts = decodeStructured(result.errorUuid)
    expect([...parts.capabilityNames].sort()).toEqual(['CHAINED', 'SEALED'])
  })
})
