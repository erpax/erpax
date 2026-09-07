---
name: pwa
description: "Use when reasoning about erpax as a PWA of quantum apps — a device whose every folder is an installable quantum app, cached offline by content-address (the uuid is the cache key); installable because every folder is a quantum app."
atomPath: "quantum/pwa"
coordinate: "quantum/pwa · 8/crest · c3e37200"
contentUuid: "23ede712-70a6-5229-ab1b-4111fdf1676d"
diamondUuid: "9d9994e3-95d1-80f2-8b63-3720055ab373"
uuid: "c3e37200-57d4-8bde-8c4f-5d01f3c136f8"
horo: 8
typography:
  partition: quantum
  bondDegree: 39
standards:
  - "W3C Web App Manifest + Service Worker (content-addressed cache)"
bindings: []
signatures:
  computationUuid: "ed3b9545-074b-8644-b2c2-456aa5477d3d"
  stages:
    - stage: path
      stageUuid: "917cba2b-8267-846e-84f5-3aa6ff5a6a2f"
    - stage: trinity
      stageUuid: "17ae4d8e-e218-85c0-a49f-6199cec66876"
    - stage: boundary
      stageUuid: "2465b970-5329-88a2-9eac-18a5b847854e"
    - stage: links
      stageUuid: "d8f953f7-4a9b-8794-8393-ee07e1d2b13f"
    - stage: horo
      stageUuid: "8608de9e-834e-8144-bc65-5605070ad34d"
    - stage: seal
      stageUuid: "e1e2bb73-f3f9-8a1b-a762-44fc0394e88b"
    - stage: uuid
      stageUuid: "9a8e455b-9d0f-88e8-bf51-43744e661f37"
quantum:
  superposition:
    - cache
    - diamond
    - plugin
    - pwa
    - quantum
    - worker
    - superposition
  collapse:
    - "Use when reasoning about erpax as a PWA of quantum apps — a device whose every folder is an installable quantum app, cached offline by content-address (the uuid is the cache key); installable because every folder is a quantum app."
    - "W3C Web App Manifest + Service Worker (content-addressed cache)"
    - "a cached asset round-trips by its content-uuid, so offline retrieval is deterministic — the same content is always a cache hit and never depends on the network, only on its content-address; and the corpus is installable exactly while every folder is a quantum app."
    - "matter-twin:src/quantum/pwa/index.ts"
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "ed3b9545-074b-8644-b2c2-456aa5477d3d"
    contentUuid: "23ede712-70a6-5229-ab1b-4111fdf1676d"
version: 2
---
# quantum/pwa — the corpus as a PWA of quantum apps

The quantum facet of [[pwa]]: erpax as a **Progressive Web App of quantum apps** — a device whose every folder is an installable quantum app ([[quantum]]/app), cached **offline by content-address** (the content-[[uuid]] IS the cache key, so the same content is always a cache hit — [[pwa]] `cacheAsset`).

- **Installable** — the whole corpus is one PWA, because every folder is a quantum app (`everyFolderIsQuantumApp`).
- **Offline** — identity is content, so caching is deterministic: an asset round-trips by its content-uuid.

So the PWA is the device that runs the grid of quantum apps; the [[search]] (engine/optimization) finds them, [[test]]/hooks render their aura as colour, and the whole thing installs and works offline. Merges into [[pwa]].

**HONEST.** Installability is the every-folder-is-a-quantum-app proof; offline is content-addressed caching (deterministic), not a literal service worker here.

Matter-twin: `src/quantum/pwa/index.ts` (`appCount` · `installable` · `offlineRoundtrip`). Composes [[pwa]] · [[app]] · [[quantum]] · [[uuid]] · [[search]] · [[test]].

**Law — [[law]]: a cached asset round-trips by its content-uuid, so offline retrieval is deterministic — the same content is always a cache hit and never depends on the network, only on its content-address; and the corpus is installable exactly while every folder is a quantum app.**

@standard W3C Web App Manifest + Service Worker (content-addressed cache)

<sub>content-uuid `23ede712-70a6-5229-ab1b-4111fdf1676d` · account `quantum/pwa` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
