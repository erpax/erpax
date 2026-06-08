---
name: optimize
description: "Use when building or reviewing Payload collections, fields, queries, or config for performance — slow admin/API, large generated schemas, heavy relationship population, duplicated block definitions, or oversized client bundles."
atomPath: optimize
coordinate: optimize · 1/base · 1b060e00
contentUuid: "032af121-449c-5910-82fc-2388e7796b21"
diamondUuid: "9112ba49-86de-85fd-bd92-a146755b52a6"
uuid: "1b060e00-d87a-87a6-9d3d-311e5715cf28"
horo: 1
bonds:
  in:
    - admin
    - cache
    - collections
    - config
    - deploy
    - fields
    - harden
    - hooks
    - jobs
    - law
    - queries
    - types
  out:
    - admin
    - cache
    - collections
    - config
    - deploy
    - fields
    - harden
    - hooks
    - jobs
    - law
    - queries
    - types
typography:
  partition: optimize
  bondDegree: 41
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - collections
    - config
    - deploy
    - fields
    - harden
    - law
    - queries
    - types
  matrix:
    - admin
    - cache
    - collections
    - config
    - deploy
    - fields
    - harden
    - hooks
    - jobs
    - law
    - queries
    - types
  backlinks:
    - admin
    - cache
    - collections
    - config
    - deploy
    - fields
    - harden
    - hooks
    - jobs
    - law
    - queries
    - types
signatures:
  computationUuid: "d5e104a9-2f02-8ed5-a21e-88e05afbe558"
  stages:
    - stage: path
      stageUuid: "ed005157-9905-8d14-85fa-079e6a0d308e"
    - stage: trinity
      stageUuid: "dd886ebf-a1cf-868d-b7b7-e6096c34d729"
    - stage: boundary
      stageUuid: "b8795f48-7c2a-8a7b-9dab-3bce83cd8ef6"
    - stage: links
      stageUuid: "814b8663-d53d-826c-8358-abfff8bbb5f8"
    - stage: horo
      stageUuid: "f77212f1-d748-88f6-866a-8afd1d51a6e5"
    - stage: seal
      stageUuid: "7201d9d6-3f17-82f6-a08c-6f61dcf269f4"
    - stage: uuid
      stageUuid: "8b97d048-f5cc-85c3-84a7-756b9403db68"
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
