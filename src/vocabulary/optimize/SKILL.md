---
name: optimize
description: "Use when building or reviewing Payload collections, fields, queries, or config for performance — slow admin/API, large generated schemas, heavy relationship population, duplicated block definitions, or oversized client bundles."
atomPath: "vocabulary/optimize"
coordinate: "vocabulary/optimize · 8/crest · 99791d4c"
contentUuid: "45f7ed9b-867c-5a5c-bfcd-18f4498e259f"
diamondUuid: "6ecd976a-c3fe-8ad3-8886-27460aa6ab59"
uuid: "99791d4c-1ec9-830c-ae1f-2850d608a99a"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 41
standards: []
bindings: []
signatures:
  computationUuid: "da1b2a77-49ec-8131-bf85-b573751fd934"
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
      stageUuid: "a49e7cdf-f1f3-8212-aa3b-33580d465f52"
    - stage: seal
      stageUuid: "27e6b1a3-83ee-8489-9735-ff8bffbc08df"
    - stage: uuid
      stageUuid: "3c471857-e65b-85f8-a650-37959c7e4528"
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
