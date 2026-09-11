---
name: pwa
description: "Use when reasoning about erpax as a PWA of quantum apps — a device whose every folder is an installable quantum app, cached offline by content-address (the uuid is the cache key); installable because every folder is a quantum app."
atomPath: "quantum/pwa"
coordinate: "quantum/pwa · 1/base · 010d9ec5"
contentUuid: "59fa6add-52f7-51a6-9b8b-a014bac2f05a"
diamondUuid: "82a3b0d4-d1ca-857f-9cea-74489b870868"
uuid: "010d9ec5-fc50-833e-8e81-7bfdc78fe182"
horo: 1
typography:
  partition: quantum
  bondDegree: 65
standards:
  - "W3C Web App Manifest + Service Worker (content-addressed cache)"
bindings: []
signatures:
  computationUuid: "13de8cd1-b6ce-8ce7-a102-ec7601eac9d0"
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
      stageUuid: "91c37983-cd17-8486-8d94-d5520e3ff810"
    - stage: seal
      stageUuid: "e1e2bb73-f3f9-8a1b-a762-44fc0394e88b"
    - stage: uuid
      stageUuid: "bcaa78c5-a26a-8f0f-84d0-83898baa1f96"
quantum:
  superposition:
    - cache
    - cost
    - diamond
    - duality
    - fractal
    - identity
    - law
    - merge
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
    computationUuid: "13de8cd1-b6ce-8ce7-a102-ec7601eac9d0"
    contentUuid: "59fa6add-52f7-51a6-9b8b-a014bac2f05a"
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

<sub>content-uuid `59fa6add-52f7-51a6-9b8b-a014bac2f05a` · account `quantum/pwa` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
