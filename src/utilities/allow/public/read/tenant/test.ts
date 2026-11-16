/**
 * Public-read tenant id cache tests — resolves the tenant ids flagged
 * `allowPublicRead = true`, caches them for the TTL window, and keeps each id
 * as the uuid string it is. Deterministic: a stub `payload.find`, no DB.
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
} from '@/utilities/allow/public/read/tenant'

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
    const { payload } = stubPayload({ docs: [{ id: '0f8e9d4a-6b1c-4e2f-9a3b-4c5d6e7f8091' }, { id: '1f8e9d4a-6b1c-4e2f-9a3b-4c5d6e7f8091' }] })
    await expect(getAllowPublicReadTenantIds(payload)).resolves.toEqual(['0f8e9d4a-6b1c-4e2f-9a3b-4c5d6e7f8091', '1f8e9d4a-6b1c-4e2f-9a3b-4c5d6e7f8091'])
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

  it('keeps uuid ids as strings (a number cast made every one NaN), and drops a row with no id', async () => {
    const { payload } = stubPayload({ docs: [{ id: 'a-uuid' }, { id: 5 }, { id: null }] })
    await expect(getAllowPublicReadTenantIds(payload)).resolves.toEqual(['a-uuid', '5'])
  })

  it('caches within the TTL — second call does not re-query', async () => {
    const { payload, find } = stubPayload({ docs: [{ id: 't9' }] })
    const first = await getAllowPublicReadTenantIds(payload)
    const second = await getAllowPublicReadTenantIds(payload)
    expect(first).toEqual(['t9'])
    expect(second).toEqual(['t9'])
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
