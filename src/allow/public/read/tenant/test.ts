/**
 * Public-read tenant id cache tests — resolves the tenant ids flagged
 * `allowPublicRead = true`, caches them for the TTL window, and normalizes
 * row ids to finite numbers. Deterministic: a stub `payload.find`, no DB.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.15 access-control
 * @security ISO-27002 §8.3 information-access-restriction
 * @see docs/STANDARDS.md §4.4 §7
 */

import type { Payload } from 'payload'

import { describe, it, expect, beforeEach, vi } from 'vitest'

import {
  controlsApplied,
  getAllowPublicReadTenantIds,
  clearAllowPublicReadTenantIdsCache,
} from '@/allow/public/read/tenant'

type FindResult = { docs: { id: unknown }[] }

// Stub only `payload.find` — the single method the module calls.
function stubPayload(result: FindResult) {
  const find = vi.fn(async () => result)
  return { payload: { find } as unknown as Payload, find }
}

describe('allow/public/read/tenant', () => {
  beforeEach(() => {
    clearAllowPublicReadTenantIdsCache()
  })

  it('returns the ids of public-read tenants', async () => {
    const { payload } = stubPayload({ docs: [{ id: 1 }, { id: 2 }, { id: 3 }] })
    await expect(getAllowPublicReadTenantIds(payload)).resolves.toEqual([1, 2, 3])
  })

  it('queries tenants filtered by allowPublicRead equals true', async () => {
    const { payload, find } = stubPayload({ docs: [] })
    await getAllowPublicReadTenantIds(payload)
    expect(find).toHaveBeenCalledTimes(1)
    const calls = find.mock.calls as unknown as Array<[{ collection: string; where: unknown }]>
    expect(calls.length).toBeGreaterThan(0)
    const arg = calls[0][0]
    expect(arg.collection).toBe('tenants')
    expect(arg.where).toEqual({ allowPublicRead: { equals: true } })
  })

  it('normalizes string ids to numbers and drops non-finite ones', async () => {
    const { payload } = stubPayload({ docs: [{ id: '4' }, { id: 5 }, { id: 'nope' }] })
    await expect(getAllowPublicReadTenantIds(payload)).resolves.toEqual([4, 5])
  })

  it('caches within the TTL — second call does not re-query', async () => {
    const { payload, find } = stubPayload({ docs: [{ id: 9 }] })
    const first = await getAllowPublicReadTenantIds(payload)
    const second = await getAllowPublicReadTenantIds(payload)
    expect(first).toEqual([9])
    expect(second).toEqual([9])
    expect(find).toHaveBeenCalledTimes(1)
  })

  it('re-queries after the cache is cleared', async () => {
    const { payload, find } = stubPayload({ docs: [{ id: 1 }] })
    await getAllowPublicReadTenantIds(payload)
    clearAllowPublicReadTenantIdsCache()
    await getAllowPublicReadTenantIds(payload)
    expect(find).toHaveBeenCalledTimes(2)
  })

  it('declares access, tenant-isolation and access-restriction controls', () => {
    expect(controlsApplied).toEqual(['5.15', '5.23', '8.3'])
  })
})
