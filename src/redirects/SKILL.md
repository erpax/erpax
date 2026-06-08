---
name: redirects
description: "Use when a moved/renamed URL must resolve to its new target (301/302) — the official @payloadcms/plugin-redirects `redirects` collection + the SSR PayloadRedirects resolver. Read before wiring URL redirection, or when a `'redirects'` slug is \\\"not assignable to CollectionSlug\\\" (the plugin isn't registered)."
atomPath: redirects
coordinate: redirects · 4/weave · 1cb57197
contentUuid: "c839d566-70f7-510d-af80-0129ae21ed7d"
diamondUuid: "187a4279-3b65-89b9-b961-1e1b2d87c635"
uuid: "1cb57197-9490-8174-b278-c4af32b50e2e"
horo: 4
bonds:
  in:
    - api
    - cache
    - config
    - identity
    - plugins
    - queries
    - redirect
    - search
  out:
    - api
    - cache
    - config
    - identity
    - plugins
    - queries
    - redirect
    - search
typography:
  partition: redirects
  bondDegree: 25
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - api
    - cache
    - config
    - identity
    - plugins
    - queries
    - search
  matrix:
    - api
    - cache
    - config
    - identity
    - plugins
    - queries
    - redirect
    - search
  backlinks:
    - api
    - cache
    - config
    - identity
    - plugins
    - queries
    - redirect
    - search
signatures:
  computationUuid: "95762a94-28ca-8cc3-a74c-6847ee6b4a32"
  stages:
    - stage: path
      stageUuid: "41fe6026-a957-8ec8-b7a4-7b7b75dbe1a0"
    - stage: trinity
      stageUuid: "b92bd708-00f9-8947-a47c-3be771179003"
    - stage: boundary
      stageUuid: "bf4e4a91-cd7c-8f13-a23d-97465852ceac"
    - stage: links
      stageUuid: "cce13a6c-4d1b-85c3-a569-61ff3bf9b0e5"
    - stage: horo
      stageUuid: "ec4e438c-a340-89c9-908c-026be10dab24"
    - stage: seal
      stageUuid: "53a6ccfe-d822-8611-b86b-e10fb31be4ee"
    - stage: uuid
      stageUuid: "47b8bc40-005c-89f7-9851-b7cb72f832b9"
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
