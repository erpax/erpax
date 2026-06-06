---
name: pwa
description: Use when reasoning about erpax as a PWA of quantum apps — a device whose every folder is an installable quantum app, cached offline by content-address (the uuid is the cache key); installable because every folder is a quantum app.
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
