/**
 * quantum/request — idempotent content-uuid compression.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import {
  requestUuid,
  idempotentReplay,
  compressedPayload,
  requestGated,
  cacheDedupKey,
} from '@/quantum/request'

describe('quantum/request — content-uuid idempotency', () => {
  it('requestUuid is deterministic idempotency key', () => {
    const body = { q: 'hs8471' }
    expect(requestUuid(body)).toBe(requestUuid(body))
    expect(idempotentReplay(body, body)).toBe(true)
    expect(idempotentReplay(body, { q: 'other' })).toBe(false)
  })

  it('compressedPayload sends hash when cached', () => {
    const body = { n: 1 }
    expect(compressedPayload(true, body)).toBe(requestUuid(body))
    expect(compressedPayload(false, body)).toBe(JSON.stringify(body))
  })

  it('requestGated still required when compressed', () => {
    expect(requestGated({ access: true, broker: true, receipt: true })).toBe(true)
    expect(requestGated({ access: true, broker: true, receipt: false })).toBe(false)
  })

  it('cacheDedupKey addresses cache by content', () => {
    expect(cacheDedupKey('x')).toMatch(/^[0-9a-f-]{36}$/)
  })
})
