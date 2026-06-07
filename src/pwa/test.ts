import { describe, it, expect, beforeEach } from 'vitest'
import {
  cacheAsset,
  getCachedAsset,
  listCachedAssets,
  evictAsset,
  totalCachedBytes,
  enqueueMutation,
  listQueuedMutations,
  dequeueMutation,
  publishManifest,
  verifyManifest,
  preparePush,
  dedupPush,
  checkPwaUuidIntegrity,
  __resetPwaForTests,
} from '@/pwa'
import type { WebAppManifest, ManifestEnvelope } from '@/pwa'

// PWA layer (Slice NNNNNNNN): every PWA pain point collapses to a uuid problem.
// Proven against the REAL module: content-uuid is the cache key, the queue is
// uuid-chained (Law 34), the manifest re-verifies (Law 8), pushes dedup by uuid,
// and Conservation Law 52 holds.

beforeEach(() => {
  __resetPwaForTests()
})

describe('pwa — cached assets keyed by content-uuid', () => {
  it('the cache key IS the asset uuid; same content gives same uuid', () => {
    const a = cacheAsset({ url: '/app.js', kind: 'js', content: 'console.log(1)' })
    expect(getCachedAsset(a.uuid)).toEqual(a)
    __resetPwaForTests()
    const b = cacheAsset({ url: '/app.js', kind: 'js', content: 'console.log(1)' })
    expect(b.uuid).toBe(a.uuid) // content-addressed: deterministic
  })

  it('tracks bytes and supports listing + eviction', () => {
    cacheAsset({ url: '/a.css', kind: 'css', content: 'abc' })
    const a = cacheAsset({ url: '/b.css', kind: 'css', content: 'de' })
    expect(totalCachedBytes()).toBe(5)
    expect(listCachedAssets()).toHaveLength(2)
    expect(evictAsset(a.uuid)).toBe(true)
    expect(getCachedAsset(a.uuid)).toBeUndefined()
    expect(totalCachedBytes()).toBe(3)
    expect(evictAsset('not-there')).toBe(false)
  })
})

describe('pwa — uuid-chained background sync queue (Law 34)', () => {
  it('first mutation has a null prevUuid; subsequent ones chain to the prior uuid', () => {
    const m1 = enqueueMutation({ tenantId: 't1', endpoint: 'POST /api/invoices', body: { n: 1 } })
    const m2 = enqueueMutation({ tenantId: 't1', endpoint: 'POST /api/invoices', body: { n: 2 } })
    expect(m1.prevUuid).toBeNull()
    expect(m2.prevUuid).toBe(m1.uuid)
  })

  it('filters the queue by tenant and dequeues by uuid', () => {
    const a = enqueueMutation({ tenantId: 't1', endpoint: 'e', body: {} })
    enqueueMutation({ tenantId: 't2', endpoint: 'e', body: {} })
    expect(listQueuedMutations('t1')).toHaveLength(1)
    expect(listQueuedMutations()).toHaveLength(2)
    expect(dequeueMutation(a.uuid)).toBe(true)
    expect(listQueuedMutations('t1')).toHaveLength(0)
    expect(dequeueMutation(a.uuid)).toBe(false)
  })
})

describe('pwa — Web App Manifest integrity (Law 8 echo)', () => {
  const manifest: WebAppManifest = { name: 'ERPax', short_name: 'ERPax', display: 'standalone' }

  it('a freshly published manifest verifies', () => {
    const env = publishManifest(manifest)
    const v = verifyManifest(env)
    expect(v.ok).toBe(true)
    expect(v.expected).toBe(v.actual)
  })

  it('a tampered manifest fails verification', () => {
    const env = publishManifest(manifest)
    const tampered: ManifestEnvelope = { ...env, manifest: { ...manifest, name: 'Evil' } }
    expect(verifyManifest(tampered).ok).toBe(false)
  })
})

describe('pwa — push dedup by uuid', () => {
  it('delivers once, dedups the retry', () => {
    const n = preparePush({ tenantId: 't1', title: 'Hi', body: 'There' })
    expect(dedupPush(n).delivered).toBe(true)
    const retry = preparePush({ tenantId: 't1', title: 'Hi', body: 'There' })
    expect(retry.uuid).toBe(n.uuid)
    const second = dedupPush(retry)
    expect(second.delivered).toBe(false)
    expect(second.reason).toBe('duplicate')
  })
})

describe('pwa — Conservation Law 52', () => {
  it('holds for a well-formed cache + chained queue', () => {
    cacheAsset({ url: '/x.js', kind: 'js', content: 'x' })
    enqueueMutation({ tenantId: 't1', endpoint: 'e', body: {} })
    enqueueMutation({ tenantId: 't1', endpoint: 'e', body: { y: 2 } })
    const r = checkPwaUuidIntegrity()
    expect(r.ok).toBe(true)
    expect(r.cachedAssets).toBe(1)
    expect(r.queuedMutations).toBe(2)
    expect(r.chainBroken).toHaveLength(0)
    expect(r.orphanCacheKeys).toHaveLength(0)
  })

  it('reports a clean state as ok when empty', () => {
    const r = checkPwaUuidIntegrity()
    expect(r.ok).toBe(true)
    expect(r.cachedAssets).toBe(0)
    expect(r.queuedMutations).toBe(0)
  })
})
