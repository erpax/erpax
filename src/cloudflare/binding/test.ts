import { describe, it, expect } from 'vitest'
import { enforceAuthorized, reportAuditDrop } from './index'

describe('cloudflare/binding', () => {
  it('enforceAuthorized throws when no authorizer', async () => {
    const ctx = { tenantId: 'test', authorize: undefined }
    await expect(
      enforceAuthorized(ctx as any, { binding: 'KV', action: 'get', tenantId: 'test' })
    ).rejects.toThrow()
  })

  it('reportAuditDrop surfaces dropped receipts', () => {
    expect(() =>
      reportAuditDrop({ binding: 'KV', action: 'put', tenantId: 'test', reason: 'no-payload-sink' })
    ).not.toThrow()
  })
})
