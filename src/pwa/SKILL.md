---
name: pwa
description: "Use when the offline web surface must stay trustworthy — service-worker cache keys, background-sync queue durability, manifest integrity, push dedup; every Progressive Web App pain point collapsed to a content-uuid problem."
atomPath: pwa
coordinate: "pwa · 8/crest · 97a3c18e"
contentUuid: "faf7b192-adaf-543c-8580-c3285af85525"
diamondUuid: "d9a91a48-1928-81c5-b0ad-78bd1febc368"
uuid: "97a3c18e-faed-8e0e-a5af-f1f7cf3c5230"
horo: 8
typography:
  partition: pwa
  bondDegree: 65
standards:
  - RFC 9562 §5.8 + RFC 8785 (uuid composition)
  - "RFC 9562 §5.8 + RFC 8785 (uuid composition)`"
  - "RFC-8785"
  - W3C Cache API + W3C IndexedDB 3.0 + W3C OPFS
  - "W3C Cache API + W3C IndexedDB 3.0 + W3C OPFS`"
  - W3C Push API + W3C Notifications API
  - "W3C Push API + W3C Notifications API`"
  - "W3C Service Workers (W3C-SW)"
  - "W3C Service Workers (W3C-SW)`"
  - "W3C Web App Manifest (W3C-WAM)"
  - "W3C Web App Manifest (W3C-WAM)`"
  - "— the instrument reads SKILL.md) -->"
bindings:
  - "assets/ASSETS"
  - "browser/BROWSER"
  - "images/IMAGES"
  - "r2_buckets/NEXT_INC_CACHE_R2_BUCKET"
  - "r2_buckets/R2"
signatures:
  computationUuid: "226060dd-5587-89b2-9dba-f5ee045d50a9"
  stages:
    - stage: path
      stageUuid: "676397c4-de7a-80f0-a0ed-b7ebbf44bd01"
    - stage: trinity
      stageUuid: "12ef6088-f942-8b69-81cc-df23a6c75323"
    - stage: boundary
      stageUuid: "1c0228f1-27d0-88b8-b2ee-0e9f8208364c"
    - stage: links
      stageUuid: "3ebf72d4-ca43-84f7-bbf1-614f5dde77db"
    - stage: horo
      stageUuid: "159864cf-a4d4-8b41-953f-a538a800db0c"
    - stage: seal
      stageUuid: "5bbab41d-c2cb-8eab-b456-5c2d964fe8c9"
    - stage: uuid
      stageUuid: "6640c2b5-dfe7-875a-b7fc-8fd6411c4c94"
version: 2
---
# pwa — every offline pain point collapses to a content-uuid

FORM: **the Progressive Web App surface is made trustworthy by content-addressing, not by the network.** Cache invalidation, sync conflicts, update push, queue durability, push dedup, manifest tampering, quota eviction, cross-device handoff — each classic PWA pain is a [[uuid]] problem in disguise, and the content-uuid ([[identity]]) is the one solvent. Proven by test (`index.test.ts`).

- **cached asset, keyed by content** — every asset's content-uuid IS its [[cache]] key, so cache invalidation is native: change the bytes, change the key. `cacheAsset`, `getCachedAsset`, `listCachedAssets`, `evictAsset`, `totalCachedBytes`.
- **background sync, hash-chained** — offline mutations accumulate in a uuid-chained [[queue]] (`prevUuid` → causal order), replayed on reconnect; same content ⇒ same id ⇒ no conflict ([[merge]]), different id ⇒ real divergence caught at once. `enqueueMutation`, `listQueuedMutations`, `dequeueMutation`.
- **manifest integrity** — the Web App Manifest is content-addressed; recompute the uuid to verify it was not tampered ([[proof]]). `publishManifest`, `verifyManifest`.
- **push dedup** — a notification delivered twice (send + retry) collides on its content-uuid, so the duplicate never reaches the user. `preparePush`, `dedupPush`.

The conservation check `checkPwaUuidIntegrity` runs all three invariants at once — cache map-key equals `asset.uuid`, the queue chain is unbroken, the manifest recomputes — the same architectural impossibility the in-ledger checks enforce, now at the edge, one law at every scale ([[fractal]]). A tampered asset, a forged queue link, or an altered manifest is simply a different id, so forging the offline window costs as much as forging the ledger ([[tamper/cost]]).

The two sides are [[duality]]: the offline replica (the device cache + queue) and the canonical server, reconciled by content alone — the same uuid'd state lives on desktop and mobile, no coordination. This is the offline-edge organ of the society; the standards it cites are the W3C web platform incorporated by reference (see [[standard]]).

Sequence position: **5** (round — the offline excursion that returns and reconciles), on the ring 0·3·6·9·1·2·4·8·7·5 (see [[sequence]]).

**Law — [[law]]: the offline web surface is made trustworthy by content-addressing, not the network — every PWA pain (cache invalidation, sync conflict, push dedup, manifest tamper) is one [[uuid]] problem, so forging the offline window costs as much as forging the ledger ([[tamper/cost]]).**

## Deployment face — every [[diamond]] can surface offline
Alongside the uuid-driven offline layer, **pwa** is one of three deployment faces every sealed [[diamond]] projects ([[diamond]] · [[worker]] · [[plugin]]). The **PWA face** is the installable, offline-capable shell: service worker, Web App Manifest, content-addressed [[cache]] in `public/`. Example: [[public]] static assets as the PWA shell. `deploymentFaces` in `@/diamond` marks when this face materialises for a given `DiamondModel`.

**Law — [[law]]: the PWA deployment face is the offline installable shell of a [[diamond]] — service worker, manifest, and content-addressed cache that survives disconnect from the canonical server.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard W3C Service Workers (W3C-SW)`
- `@standard W3C Web App Manifest (W3C-WAM)`
- `@standard W3C Push API + W3C Notifications API`
- `@standard W3C Cache API + W3C IndexedDB 3.0 + W3C OPFS`
- `@standard RFC 9562 §5.8 + RFC 8785 (uuid composition)`


- **W3C Service Workers (W3C-SW)** — cache lifecycle; the content-uuid is the cache key.
- **W3C Web App Manifest (W3C-WAM)** — `verifyManifest` recomputes the manifest uuid for tamper-detection.
- **W3C Push API + Notifications API** — `dedupPush` makes redelivery idempotent by content-uuid.
- **W3C Cache API + IndexedDB 3.0 + OPFS** — uuid-based eviction keeps the N most recent versions, storage-backend independent.
- **RFC 9562 §5.8 + RFC 8785** — content-uuid composition (canonical JSON → sha → uuidv8).
- **ISO 19011:2018 §6.4.6** — the PWA cache and sync queue are audit-trailed.
