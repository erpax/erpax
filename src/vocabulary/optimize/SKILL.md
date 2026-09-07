---
name: optimize
description: "Use when building or reviewing Payload collections, fields, queries, or config for performance — slow admin/API, large generated schemas, heavy relationship population, duplicated block definitions, or oversized client bundles."
atomPath: "vocabulary/optimize"
coordinate: "vocabulary/optimize · 4/weave · 35bb9324"
contentUuid: "6f3a0110-be93-50a9-9039-10e52104b386"
diamondUuid: "1c488d47-9077-850f-a748-94880ec39c8d"
uuid: "35bb9324-dd3e-88f8-805e-1f1d2281dba8"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 41
standards: []
bindings: []
signatures:
  computationUuid: "1526ba65-e5e4-8f5d-918e-1104edabbc6c"
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
      stageUuid: "3098b1fe-92cf-8dd0-a940-8270876185c3"
    - stage: seal
      stageUuid: "27e6b1a3-83ee-8489-9735-ff8bffbc08df"
    - stage: uuid
      stageUuid: "22df1dad-9503-8228-8b7a-3eaf0d635769"
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
