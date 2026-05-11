# ERPax PWA Standards — Deep Reference

Slice NNNNNNNN + slice TTTTTTTT (2026-05-11). The PWA layer at `src/services/pwa/index.ts` collapses eight traditionally distinct Progressive Web App pain points into a single uuid problem. Conservation Law 52 governs it. The Trinity collapse (slice JJJJJJJJ) places it at **Law III (Closure)** — every cached asset / queued mutation / push / manifest stays inside the bounded resource envelope with cryptographic verifiability.

> **Cross-reference**: top-level index at [README.md](./README.md); MCP layer at [mcp.md](./mcp.md); UUID foundation at [integrity.md](./integrity.md); streams (queue hash-chain) at [streams.md](./streams.md).

---

## 1. The eight PWA pain points + their uuid solution

| Pain | UUID solution | ERPax surface |
|---|---|---|
| 1. Cache invalidation | Asset content-uuid IS the cache key — no manual cache-busting hash; uuid mismatch = update available | `cacheAsset({url, kind, content, etag?})` |
| 2. Sync conflicts on reconnect | Same uuid = same content (no conflict); different uuid = real divergence detected immediately | `enqueueMutation({tenantId, endpoint, body})` |
| 3. Update push reliability | SW checks manifest's content-uuid; mismatch triggers update; bitemporal anchor (NNNNNN) tracks evolution | `publishManifest(manifest)` / `verifyManifest(env)` |
| 4. Background sync queue durability | UUID-chained queue (Law 34 echo) preserves causal order + tamper detection across the offline window | `enqueueMutation` (each derives uuid from {tenantId, endpoint, body, prev}) |
| 5. Push notification dedup | UUID-keyed; same notification arriving twice (delivered + retry) → trivial dedup | `preparePush(args)` + `dedupPush(notification)` |
| 6. Web App Manifest integrity | Manifest tampered? Recompute uuid (Law 8 echo); verify | `publishManifest` wraps in content-uuid envelope; `verifyManifest` recomputes |
| 7. Storage quota management | UUID-based eviction keeps N most recent versions; storage independence (Law 35) means evicting locally doesn't lose data if also in IPFS / federation | `evictAsset(uuid)` + `totalCachedBytes()` |
| 8. Cross-device handoff | Start on desktop, continue on mobile — same uuid'd state lives on both via federation envelope (AAAAAA) | implicit; federated via `erpax.federation.publishSelf` |

## 2. W3C Web Platform stack

| Standard | What it specifies | ERPax module | MCP tool |
|---|---|---|---|
| **W3C Service Workers** | Cache + sync queue + push entry-point | `pwa/index.ts` (cache + queue + push surfaces) | every `erpax.pwa.*` |
| **W3C Web App Manifest** | PWA identity (name / short_name / start_url / display / icons) | `pwa/index.ts` (WebAppManifest type) | `erpax.pwa.{publishManifest, verifyManifest}` |
| **W3C Push API** | Server → SW push delivery | `pwa/index.ts` (preparePush, dedupPush) | `erpax.pwa.{preparePush, dedupPush}` |
| **W3C Notifications API** | UI display of pushed notifications | `pwa/index.ts` (PushNotification type) | `erpax.pwa.preparePush` |
| **W3C Cache API** | The asset cache uuid-keyed | `pwa/index.ts` (cacheAsset, listCachedAssets, evictAsset) | `erpax.pwa.{cacheAsset, listCachedAssets, evictAsset}` |
| **W3C IndexedDB 3.0** | Browser storage backend for queue durability | `pwa/index.ts` (logical model; production wraps with idb) | indirect |
| **W3C OPFS (Origin Private File System)** | High-throughput SW-only filesystem (alt backend) | `pwa/index.ts` (logical model) | indirect |

## 3. UUID / hash-chain stack

| Standard | What it specifies | ERPax module | MCP tool |
|---|---|---|---|
| **RFC 4122 §4.3 — UUIDv5** | Every asset / mutation / manifest / push keyed by content uuid | `pwa/index.ts` via `content-uuid.ts` | every `erpax.pwa.*` |
| **RFC 8785 — JCS** | Canonical bytes for stable uuid derivation across server + SW | `pwa/index.ts` via `content-uuid.ts` | indirect |
| **FIPS 180-4 — SHA-256** | Hash function | `pwa/index.ts` via `content-uuid.ts` | indirect |
| **Law 34 streamUuid hash-chain (slice SSSSSS)** | Mutation queue is itself a hash-chain | `pwa/index.ts` (enqueueMutation derives prevUuid → uuid) | `erpax.pwa.checkUuidIntegrity` |

## 4. Conservation laws

| Law # | Title | Verifies | Trinity |
|---|---|---|---|
| **52** | pwa uuid integrity | Cache map-key symmetry (every key matches its asset.uuid) + sync queue chain integrity (Law 34 echo) | **III** (Closure — stays in-system + verifiable) |

## 5. The four integrity properties at a glance

```ts
// Cache: keys are content uuids
for (const [k, a] of CACHE.entries()) assert(k === a.uuid)

// Queue: prevUuid forms a hash-chain
let prev: string | null = null
for (const m of QUEUE) {
  assert(m.prevUuid === prev)
  prev = m.uuid
}

// Manifest: envelope.uuid recomputable from manifest body
const expected = uuidv5(jcsCanonical(env.manifest), 'erpax-pwa-manifest')
assert(env.uuid === expected)

// Push: dedup by uuid set membership
assert(!SEEN_PUSH.has(notification.uuid) || alreadyDelivered)
```

All four properties are runtime-verifiable by anyone with read access; the SW can reject tampered state immediately.

## 6. MCP tools

| Tool | Purpose |
|---|---|
| `erpax.pwa.cacheAsset` | Cache asset keyed by content-uuid |
| `erpax.pwa.listCachedAssets` | Enumerate every cached asset |
| `erpax.pwa.evictAsset` | Evict by uuid |
| `erpax.pwa.totalCachedBytes` | Quota tracking |
| `erpax.pwa.enqueueMutation` | UUID-chained background sync enqueue |
| `erpax.pwa.listQueuedMutations` | Pending offline mutations (tenant-scoped per Law 9) |
| `erpax.pwa.dequeueMutation` | Dequeue after successful replay |
| `erpax.pwa.publishManifest` | Publish W3C Web App Manifest in content-uuid envelope |
| `erpax.pwa.verifyManifest` | Recompute envelope uuid → tamper-detect |
| `erpax.pwa.preparePush` | Prepare uuid-keyed W3C Push notification |
| `erpax.pwa.dedupPush` | SW dedup helper |
| `erpax.pwa.checkUuidIntegrity` | Conservation Law 52 verdict |

## 7. Coupling with other slices

- **Slice RRRRR (Law 8 content uuid)** — every cached asset / mutation / manifest carries a content uuid; recovery + tamper-detect inherit from Law 8.
- **Slice SSSSSS (Law 34 stream uuid chain)** — the sync queue IS a streamUuid hash-chain; tampering at any point breaks the chain downstream.
- **Slice TTTTTT (Law 35 storage independence)** — assets are storage-independent; SW cache is one of N backends (memory / IndexedDB / OPFS / IPFS).
- **Slice UUUUUU (Law 36 replication consensus)** — multi-tab + multi-device replicas verify by uuid; no master/replica coordination needed.
- **Slice AAAAAA (federation)** — cross-device handoff = federation envelope; receiving device proves identical state by uuid recompute.
- **Slice NNNNNN (Law 29 SEO vortex)** — manifest registers as `SeoVortexFace`; bitemporal anchor 301-redirects old uuid → canonical; search engines + AI crawlers see temporal evolution.

## 8. The architectural shift

Without uuid-keyed assets:
- Service workers need filename hashes baked at build time.
- Sync queue conflicts need server-side merge logic.
- Push delivery retries are awkward (no dedup primitive).
- Manifests are trust-on-first-use (TOFU); tamper detection requires HTTPS + cache-control.

With uuid-keyed assets (slice NNNNNNNN):
- Every cache key IS the content hash — automatic invalidation, automatic dedup, automatic cross-device replication.
- The SW can be deployed via federation envelope; recipient verifies by uuid recompute.
- Push notifications are first-class verifiable claims.

The PWA layer becomes **the browser face of the same uuid substrate that drives the rest of ERPax** (storage independence, federation, voting, audit).

## 9. Standards anchoring

@standard W3C Service Workers — cache + sync + push entry-point
@standard W3C Web App Manifest — PWA identity
@standard W3C Push API + W3C Notifications API — server push + UI display
@standard W3C Cache API — asset cache surface
@standard W3C IndexedDB 3.0 + W3C OPFS — storage backends
@standard RFC 4122 §4.3 + RFC 8785 + FIPS 180-4 — uuid composition
@standard ISO 19011:2018 §6.4.6 — PWA cache + queue audit-trailed

## 10. Cross-reference — alphabetized

FIPS 180-4, ISO 19011:2018 §6.4.6, RFC 4122 §4.3, RFC 8259, RFC 8785, W3C Cache API, W3C IndexedDB 3.0, W3C Notifications API, W3C OPFS, W3C Push API, W3C Service Workers, W3C Web App Manifest.
