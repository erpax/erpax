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

describe('pwa', () => {
  beforeEach(() => { __resetPwaForTests() })

  // ─── cacheAsset & getCachedAsset ─────────────────────────────────────
  it('cacheAsset returns an asset whose uuid is the cache key and round-trips via getCachedAsset', () => {
    const asset = cacheAsset({ url: '/app.js', kind: 'js', content: 'console.log(1)' })
    expect(asset.uuid).toMatch(/^[0-9a-f-]{36}$/)
    expect(asset.url).toBe('/app.js')
    expect(asset.kind).toBe('js')
    expect(asset.bytes).toBe('console.log(1)'.length)
    expect(getCachedAsset(asset.uuid)).toBe(asset)
  })

  it('cacheAsset is content-addressed: identical content produces the same uuid', () => {
    const a = cacheAsset({ url: '/x.css', kind: 'css', content: 'body{}' })
    const b = cacheAsset({ url: '/x.css', kind: 'css', content: 'body{}' })
    expect(a.uuid).toBe(b.uuid)
  })

  it('cacheAsset is content-addressed: different content produces a different uuid', () => {
    const a = cacheAsset({ url: '/x.css', kind: 'css', content: 'body{color:red}' })
    const b = cacheAsset({ url: '/x.css', kind: 'css', content: 'body{color:blue}' })
    expect(a.uuid).not.toBe(b.uuid)
  })

  it('bytes reflects ArrayBuffer.byteLength for binary content', () => {
    const buf = new ArrayBuffer(128)
    const asset = cacheAsset({ url: '/font.woff2', kind: 'font', content: buf })
    expect(asset.bytes).toBe(128)
  })

  it('getCachedAsset returns undefined for unknown uuid', () => {
    expect(getCachedAsset('00000000-0000-0000-0000-000000000000')).toBeUndefined()
  })

  it('listCachedAssets returns all inserted assets', () => {
    const a = cacheAsset({ url: '/a.js', kind: 'js', content: 'a' })
    const b = cacheAsset({ url: '/b.css', kind: 'css', content: 'b' })
    const list = listCachedAssets()
    expect(list).toHaveLength(2)
    expect(list.map((x) => x.uuid)).toContain(a.uuid)
    expect(list.map((x) => x.uuid)).toContain(b.uuid)
  })

  it('evictAsset removes the asset and returns true; false for unknown', () => {
    const asset = cacheAsset({ url: '/z.html', kind: 'html', content: '<h1>' })
    expect(evictAsset(asset.uuid)).toBe(true)
    expect(getCachedAsset(asset.uuid)).toBeUndefined()
    expect(evictAsset(asset.uuid)).toBe(false)
  })

  it('totalCachedBytes sums all asset byte counts', () => {
    cacheAsset({ url: '/a.js', kind: 'js', content: '12345' })   // 5 bytes
    cacheAsset({ url: '/b.css', kind: 'css', content: '1234567890' }) // 10 bytes
    expect(totalCachedBytes()).toBe(15)
  })

  // ─── enqueueMutation & hash-chain ────────────────────────────────────
  it('enqueueMutation first item has prevUuid === null', () => {
    const m = enqueueMutation({ tenantId: 't1', endpoint: 'POST /invoices', body: { x: 1 } })
    expect(m.prevUuid).toBeNull()
    expect(m.uuid).toMatch(/^[0-9a-f-]{36}$/)
    expect(m.tenantId).toBe('t1')
    expect(m.attempts).toBe(0)
  })

  it('enqueueMutation chains prevUuid correctly', () => {
    const m1 = enqueueMutation({ tenantId: 't1', endpoint: 'POST /a', body: {} })
    const m2 = enqueueMutation({ tenantId: 't1', endpoint: 'POST /b', body: {} })
    expect(m2.prevUuid).toBe(m1.uuid)
  })

  it('listQueuedMutations filters by tenantId', () => {
    enqueueMutation({ tenantId: 'alpha', endpoint: 'POST /x', body: {} })
    enqueueMutation({ tenantId: 'beta', endpoint: 'POST /y', body: {} })
    expect(listQueuedMutations('alpha')).toHaveLength(1)
    expect(listQueuedMutations('beta')).toHaveLength(1)
    expect(listQueuedMutations()).toHaveLength(2)
  })

  it('dequeueMutation removes by uuid and returns true; false for unknown', () => {
    const m = enqueueMutation({ tenantId: 't', endpoint: 'DELETE /z', body: null })
    expect(dequeueMutation(m.uuid)).toBe(true)
    expect(listQueuedMutations()).toHaveLength(0)
    expect(dequeueMutation(m.uuid)).toBe(false)
  })

  // ─── publishManifest & verifyManifest ───────────────────────────────
  it('publishManifest returns a deterministic uuid envelope', () => {
    const manifest = { name: 'Erpax', short_name: 'erpax', start_url: '/' }
    const env = publishManifest(manifest)
    expect(env.uuid).toMatch(/^[0-9a-f-]{36}$/)
    expect(env.manifest).toBe(manifest)
  })

  it('verifyManifest ok=true for an untampered envelope', () => {
    const env = publishManifest({ name: 'Erpax' })
    const result = verifyManifest(env)
    expect(result.ok).toBe(true)
    expect(result.expected).toBe(result.actual)
  })

  it('verifyManifest ok=false when envelope uuid is forged', () => {
    const env = publishManifest({ name: 'Erpax' })
    const forged = { ...env, uuid: '00000000-0000-0000-0000-000000000000' }
    const result = verifyManifest(forged)
    expect(result.ok).toBe(false)
    expect(result.expected).not.toBe(forged.uuid)
  })

  it('publishManifest is content-addressed: same manifest yields same uuid', () => {
    const m = { name: 'App', theme_color: '#fff' }
    expect(publishManifest(m).uuid).toBe(publishManifest(m).uuid)
  })

  // ─── preparePush & dedupPush ─────────────────────────────────────────
  it('dedupPush delivers the first occurrence and rejects the duplicate', () => {
    const n = preparePush({ title: 'Hello', body: 'World', tenantId: 'tenant1' })
    expect(dedupPush(n)).toEqual({ delivered: true })
    expect(dedupPush(n)).toEqual({ delivered: false, reason: 'duplicate' })
  })

  it('preparePush is content-addressed: same payload same uuid', () => {
    const a = preparePush({ title: 'T', body: 'B', tenantId: 'x' })
    const b = preparePush({ title: 'T', body: 'B', tenantId: 'x' })
    expect(a.uuid).toBe(b.uuid)
  })

  it('preparePush different tenant yields different uuid', () => {
    const a = preparePush({ title: 'T', body: 'B', tenantId: 'x' })
    const b = preparePush({ title: 'T', body: 'B', tenantId: 'y' })
    expect(a.uuid).not.toBe(b.uuid)
  })

  // ─── checkPwaUuidIntegrity ───────────────────────────────────────────
  it('checkPwaUuidIntegrity returns ok=true on an empty, clean state', () => {
    const r = checkPwaUuidIntegrity()
    expect(r.ok).toBe(true)
    expect(r.cachedAssets).toBe(0)
    expect(r.queuedMutations).toBe(0)
    expect(r.chainBroken).toHaveLength(0)
    expect(r.orphanCacheKeys).toHaveLength(0)
  })

  it('checkPwaUuidIntegrity ok=true after normal cache+queue operations', () => {
    cacheAsset({ url: '/main.js', kind: 'js', content: 'alert()' })
    enqueueMutation({ tenantId: 't', endpoint: 'POST /a', body: {} })
    enqueueMutation({ tenantId: 't', endpoint: 'POST /b', body: { v: 2 } })
    const r = checkPwaUuidIntegrity()
    expect(r.ok).toBe(true)
    expect(r.cachedAssets).toBe(1)
    expect(r.queuedMutations).toBe(2)
    expect(r.chainBroken).toHaveLength(0)
  })
})
