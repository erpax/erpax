/**
 * quantum/pwa — the corpus as a PWA of QUANTUM APPS: a device whose every folder is an installable
 * quantum app ([[quantum]]/app), cached OFFLINE by content-address (the uuid IS the cache key, so
 * the same content is always a cache hit — [[pwa]] `cacheAsset`). Installable because every folder
 * is a quantum app; offline because identity is content. Merges into [[pwa]].
 *
 * HONEST: installability is the every-folder-is-a-quantum-app proof; offline is content-addressed
 * caching (deterministic), not a literal service worker here.
 *
 *   tsx src/quantum/pwa/index.ts
 *
 * @standard W3C Web App Manifest + Service Worker (content-addressed cache)
 * @see ../app -- ../../pwa -- ./SKILL.md
 */
import { everyFolderIsQuantumApp, quantumApps } from '@/quantum/app'
import { cacheAsset, getCachedAsset } from '@/pwa'

/** How many quantum apps the PWA bundles (the whole corpus). */
export const appCount = (): number => quantumApps()

/** Installable: the whole corpus is one PWA — every folder is a quantum app. */
export const installable = (): boolean => everyFolderIsQuantumApp()

/** Offline by content-address: cache an asset, then retrieve it by its content-uuid (a cache hit). */
export const offlineRoundtrip = (url: string, content: string): boolean => {
  const a = cacheAsset({ url, kind: 'json', content })
  return getCachedAsset(a.uuid) !== undefined
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('quantum/pwa — corpus as a PWA of ' + appCount() + ' quantum apps · installable=' + installable() + ' · offline-roundtrip=' + offlineRoundtrip('/x.json', '{"a":1}'))
}
