---
name: optimize
description: "Use when building or reviewing Payload collections, fields, queries, or config for performance — slow admin/API, large generated schemas, heavy relationship population, duplicated block definitions, or oversized client bundles."
atomPath: "vocabulary/optimize"
coordinate: "vocabulary/optimize · 4/weave · 69ef340d"
contentUuid: "03fb08d2-bf57-529f-b254-d82e34d4344b"
diamondUuid: "7d6c4ad9-8704-81c7-abf6-9a763ee526c2"
uuid: "69ef340d-5f65-8b91-b48c-80b6456773fe"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 41
standards: []
bindings: []
signatures:
  computationUuid: "00b173ba-e49e-8b6a-9c0a-ced6dc0607e3"
  stages:
    - stage: path
      stageUuid: "5948bcf6-e83a-8f46-a793-9ed3976d88a3"
    - stage: trinity
      stageUuid: "63eeec8a-06ef-8921-9bfe-49b83b91863b"
    - stage: boundary
      stageUuid: "910a9a9a-8f77-8057-b226-603d331681ee"
    - stage: links
      stageUuid: "0ff27d57-66c4-82fc-8d97-bf2564231e49"
    - stage: horo
      stageUuid: "5e2a26c4-dac2-8780-8733-9f6237460666"
    - stage: seal
      stageUuid: "6bd7cb9a-1893-8113-9bb9-67eeaafeb68b"
    - stage: uuid
      stageUuid: "160681f4-e48b-8d2f-900a-c034fb378b16"
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

Composes: [[collections]] · [[fields]] · [[queries]] · [[config]] · [[types]] · [[harden]] · [[deploy]].

**Law — [[law]]: optimize Payload by shape, not by force — index every filtered/sorted [[fields|field]], cap [[queries|query]] depth/select/limit, and define each block ONCE and reference it by slug so the generated [[types]] and [[config]] stay small.**

## Common mistakes
- Un-indexed fields used for sort/filter (silent slow scans).
- Inlining the same block in many collections instead of `blockReferences` (bloats generated `payload-types.ts` and payloads).
- Importing the whole `@payloadcms/ui` into client bundles.
