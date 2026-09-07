---
name: redirects
description: "Use when a moved/renamed URL must resolve to its new target (301/302) — the official @payloadcms/plugin-redirects `redirects` collection + the SSR PayloadRedirects resolver. Read before wiring URL redirection, or when a `'redirects'` slug is \"not assignable to CollectionSlug\" (the plugin isn't registered)."
atomPath: "vocabulary/redirects"
coordinate: "vocabulary/redirects · 7/descent · 732811c0"
contentUuid: "8d27c201-0752-599d-a4e0-190afd5bef52"
diamondUuid: "f3ac9379-5426-8a45-9bc5-e376077a8ecf"
uuid: "732811c0-d46c-839f-9b1a-a3224f841a47"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "23765e1a-af8a-8ae2-a8f9-02a4a3cad26c"
  stages:
    - stage: path
      stageUuid: "09dff122-1b3e-8a44-8ca0-5926ea8b5edb"
    - stage: trinity
      stageUuid: "baa58977-58bf-83e4-8371-c5acfe601238"
    - stage: boundary
      stageUuid: "eee34137-9835-824d-a54a-dd787ce6f411"
    - stage: links
      stageUuid: "7bd96612-10ca-8583-986d-17d1356696c3"
    - stage: horo
      stageUuid: "e3bdd34a-9537-823c-9e9c-3e6f88a64739"
    - stage: seal
      stageUuid: "0a573e6d-fa8f-8aae-b5dd-942754df3206"
    - stage: uuid
      stageUuid: "3b04ceb6-0125-8ac6-9ca8-7213d3b2c892"
version: 2
---
# redirects — URL moved-permanently/found (RFC 9110 §15.4), an official plugin

`redirects` is the **official `@payloadcms/plugin-redirects`** — never hand-rolled. The plugin appends ONE `redirects` collection: `{ from: text, to: { type: '301'|'302', url?, reference?: relationship([..content slugs..]) } }`. It is the matter-twin of RFC 9110 §15.4 redirection-3xx (§15.4.2 301 moved-permanently, §15.4.3 302 found). Registering it is what makes `'redirects'` a real `CollectionSlug` in the generated `payload-types.ts` — a `'redirects' is not assignable to CollectionSlug` error means the plugin is **not yet in `config.plugins`** (see [[plugins]] · [[config]]), not that the consumer is wrong.

## Wiring (config in → config out)
```ts
redirectsPlugin({
  collections: ['pages', 'posts'],          // the content whose URLs can move
  overrides: { fields: ({ defaultFields }) => defaultFields },
})
```
Place it among the content-surface plugins, **before** `taggablePlugin()`/`uuidPlugin()` so the injected `redirects` collection is covered by them too (contentUuid runs LAST — see [[identity]]). It does NOT need multi-tenant scoping by default (site-wide redirects).

## The resolver (SSR, position 7 — [[api]])
`PayloadRedirects` (a React Server Component) reads the collection cached, matches `from === url`, then calls `next/navigation` `redirect()` / `notFound()`:
- `getCachedRedirects()` → `getCachedPayloadCollectionAll('redirects')` ([[queries]] cached read, RFC 9110 §13 caching).
- A `to.reference` resolves via `getCachedDocument(collection, id)` — **the `reference.relationTo` is a loose `string`** on the cached doc shape, so narrow/cast it to the document fetcher's `CollectionSlug` at the call site; the plugin's stored value is already a valid slug.

## Common mistakes
- Hand-rolling a redirects collection instead of registering the official plugin (a **multiverse collision** — see [[plugins]]; collapse to the one canonical plugin).
- Reading `'redirects'` slug before the plugin is registered — wire the plugin + regenerate types, don't cast the slug away.
- Passing a raw `string` `relationTo` into a `CollectionSlug`-typed fetcher without narrowing.

Composes: [[plugins]] (official, config in→out) · [[config]] (registration + order) · [[queries]] (cached lookup) · [[api]] (SSR redirect) · [[search]] (its sibling content-surface official plugin) · [[identity]] · [[cache]].
