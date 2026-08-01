---
name: pwa
description: "Use when the offline web surface must stay trustworthy — service-worker cache keys, background-sync queue durability, manifest integrity, push dedup; every Progressive Web App pain point collapsed to a content-uuid problem."
atomPath: pwa
coordinate: "pwa · 7/descent · f06264c4"
contentUuid: "aa87c248-41da-5f8b-a50b-c382c42f52cd"
diamondUuid: "a5286074-706c-8dbf-b7d1-54bcd630816a"
uuid: "f06264c4-ce74-87f7-8bc6-7221afa99f01"
horo: 7
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
  - "r2_buckets/R2"
signatures:
  computationUuid: "6fe0b0ff-1ab0-8df6-be6f-4ef5ab375d64"
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
      stageUuid: "cf50c0e7-5996-8d2e-8a43-8bd6e332275c"
    - stage: seal
      stageUuid: "5bbab41d-c2cb-8eab-b456-5c2d964fe8c9"
    - stage: uuid
      stageUuid: "cbb0d6cd-5707-8de0-bb3c-d98d6716d385"
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
