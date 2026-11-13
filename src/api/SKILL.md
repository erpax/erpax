---
name: api
description: "Use when calling Payload data operations — Local API (payload.find/create/update/delete), REST endpoints, or GraphQL — or deciding which to use, passing depth/select/where/overrideAccess, or running ops inside hooks/server components."
atomPath: api
coordinate: "api · 2/share · d3bf7e0a"
contentUuid: "24c33553-ae60-581c-af80-b986a2ba2254"
diamondUuid: "29b21ee6-4225-831f-9666-7e049a04c962"
uuid: "d3bf7e0a-3901-80a7-8b5e-83aa7b9e22eb"
horo: 2
typography:
  partition: api
  bondDegree: 66
standards:
  - "EU-Taxonomy-2020/852"
  - "ISO-19011"
  - "RFC-6749"
  - "RFC-9110"
bindings: []
signatures:
  computationUuid: "c34e3866-9403-8f42-b869-bf09359ef71e"
  stages:
    - stage: path
      stageUuid: "6ab3d6d5-bcae-8dbf-b4ce-e6a3e6f05d97"
    - stage: trinity
      stageUuid: "2d3dbdfb-1e04-8ee3-93fc-646195b0c2a8"
    - stage: boundary
      stageUuid: "404085f0-22d4-877c-ab6a-a1f1abc8abd0"
    - stage: links
      stageUuid: "3c2dba01-fb34-8a7c-8f96-abc0bafec2af"
    - stage: horo
      stageUuid: "e37f3651-9eb0-85c8-a68b-91059072fe0e"
    - stage: seal
      stageUuid: "f00c0bed-597d-8b45-89ca-1743fd6d7298"
    - stage: uuid
      stageUuid: "c5c19e05-62f5-8558-9265-afc7d5d932b2"
version: 2
---
# api — Local / REST / GraphQL (position 7 of the material cycle)

Three interfaces, **one query syntax** (see queries). Same operations everywhere.

## Local API (fastest — no HTTP; use in server components, hooks, jobs)
```ts
const payload = await getPayload({ config })   // cached instance (see optimize)
await payload.find({ collection, where, depth, select, limit, sort, locale, overrideAccess, req })
await payload.findByID({ collection, id })
await payload.create({ collection, data })
await payload.update({ collection, id|where, data })
await payload.delete({ collection, id|where })
await payload.count({ collection, where })
await payload.auth({ headers })                 // resolve req.user
payload.db.*                                    // bypass hooks/validation (see optimize)
```
**Access is skipped by default in Local API** — pass `overrideAccess: false` (+ `user`/`req`) to enforce (see [[access]]).

## REST
Base `/api/<collection>`: `GET` (list/where), `GET /:id`, `POST`, `PATCH /:id`, `DELETE`. Query params: `where[...][operator]`, `depth`, `select`, `sort`, `limit`, `page`, `locale`. Custom routes via `config.endpoints` / collection `endpoints`.

## GraphQL
At `/api/graphql` (+ playground). Mirrors collections as queries/mutations. Cap cost with `graphQL.maxComplexity`, disable via `graphQL.disable` (see harden).

## Common mistakes
- Forgetting `overrideAccess: false` in Local API when you DO want access enforced.
- Re-instantiating Payload instead of cached `getPayload()`.
- Heavy populate via REST/GraphQL `depth` instead of `select`/`depth:0`.

**Law — [[law]]: three interfaces (Local/REST/GraphQL), one query syntax and one set of operations — the only divergence is that Local API skips access by default, so `overrideAccess: false` is what makes the three behave as one.**

All external APIs follow THE path — REST (`/api/…`), GraphQL, Local API, and mcp gateway routes normalize through `toAtomPath` in [[path]] and merge with [[fs]], github, and docs url at one canonical atom path in every [[dimension]] (content-[[uuid]] entanglement; gates fail closed).

@see [[path]] · [[fs]] · mcp · github · [[payload]] · queries · [[access]] · [[dimension]] · [[integrity]] · [[quantum]]
