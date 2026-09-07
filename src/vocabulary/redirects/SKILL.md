---
name: redirects
description: "Use when a moved/renamed URL must resolve to its new target (301/302) — the official @payloadcms/plugin-redirects `redirects` collection + the SSR PayloadRedirects resolver. Read before wiring URL redirection, or when a `'redirects'` slug is \"not assignable to CollectionSlug\" (the plugin isn't registered)."
atomPath: "vocabulary/redirects"
coordinate: "vocabulary/redirects · 1/base · 06496996"
contentUuid: "59ac99c5-6aa6-5f97-b1b5-6d4dcef8de4d"
diamondUuid: "3481d765-be33-8b50-b564-a95a59fd22bf"
uuid: "06496996-6eb3-8956-9954-6664a2d25de6"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "ca643b2d-264a-8aaa-9956-a7cd246c0a63"
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
      stageUuid: "613103de-1c41-8159-a2fe-07859e36d5e5"
    - stage: seal
      stageUuid: "0a573e6d-fa8f-8aae-b5dd-942754df3206"
    - stage: uuid
      stageUuid: "fad1d635-8cc3-8eaf-ac77-e5057ab9fdfc"
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
