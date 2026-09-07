---
name: optimize
description: "Use when building or reviewing Payload collections, fields, queries, or config for performance — slow admin/API, large generated schemas, heavy relationship population, duplicated block definitions, or oversized client bundles."
atomPath: "vocabulary/optimize"
coordinate: "vocabulary/optimize · 7/descent · 75427ec7"
contentUuid: "d8a90be0-83fd-5b84-a580-b7fb82e582f2"
diamondUuid: "a86fc9d3-7b04-8101-95b0-2a9835175f29"
uuid: "75427ec7-4a94-8eb8-be1a-6be4ed740cd2"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 41
standards: []
bindings: []
signatures:
  computationUuid: "d75c21c3-074c-877c-9003-a14b81ca2b60"
  stages:
    - stage: path
      stageUuid: "5948bcf6-e83a-8f46-a793-9ed3976d88a3"
    - stage: trinity
      stageUuid: "63eeec8a-06ef-8921-9bfe-49b83b91863b"
    - stage: boundary
      stageUuid: "63a6884d-0804-84c5-901f-9abbf384a87c"
    - stage: links
      stageUuid: "97669959-65bd-8161-8c95-2df31fdf0b67"
    - stage: horo
      stageUuid: "027b6b02-4ebf-8e6a-9ef1-3290e8e66a10"
    - stage: seal
      stageUuid: "27e6b1a3-83ee-8489-9735-ff8bffbc08df"
    - stage: uuid
      stageUuid: "240f92c5-1a76-8a98-9f68-df25a6907006"
version: 2
---
# optimize — Payload performance & schema-size best practices

Source: payloadcms.com/docs/performance + /docs/fields/blocks#block-references. Apply these as rules when authoring/reviewing config.

## Query & data shape
| Knob | Rule |
|---|---|
| `index: true` | Add to every field used in `where` filters or `sort` (avoids full scans). |
| `depth` / `maxDepth` | Use `depth: 0` (or a low number) when you don't need populated relationships; cap with top-level `maxDepth` (default 10). |
| `select` | Fetch only the fields you use to shrink responses. |
| `limit` + pagination | Never process whole datasets; paginate. |
| `defaultPopulate` | On a collection, populate only the relationships actually needed by default. |
| `returning: false` | On `update` when you don't need the result back. |
| `payload.db.*` | Bypass hooks/validation for safe, simple internal ops. |
| `getPayload()` | Reuse the cached instance; don't re-instantiate. |

## DRY blocks = smaller schema (block references)
Define each block ONCE at the top-level config `blocks: [...]`, then reference by slug instead of inlining (avoids duplicating block schemas across collections → smaller types, less client/server work):
```ts
buildConfig({
  blocks: [{ slug: 'TextBlock', fields: [{ name: 'text', type: 'text' }] }],
  // ...in a field:
})
// field:
{ name: 'content', type: 'blocks', blockReferences: ['TextBlock'], blocks: [] } // blocks MUST be empty
```
Constraint: a referenced block is identical everywhere — cannot be modified per-collection.

## Build/bundle
- Import specific UI parts: `@payloadcms/ui/elements/X`, never the whole package in frontend code.
- Dev: add `--turbo`; set `devBundleServerPackages: false` in `withPayload`.
- Host the DB in the same region as the server.

Composes: [[collections]] · [[field]] · [[queries]] · [[config]] · [[types]] · [[harden]] · [[deploy]].

**Law — [[law]]: optimize Payload by shape, not by force — index every filtered/sorted [[field|field]], cap [[queries|query]] depth/select/limit, and define each block ONCE and reference it by slug so the generated [[types]] and [[config]] stay small.**

## Common mistakes
- Un-indexed fields used for sort/filter (silent slow scans).
- Inlining the same block in many collections instead of `blockReferences` (bloats generated `payload-types.ts` and payloads).
- Importing the whole `@payloadcms/ui` into client bundles.
