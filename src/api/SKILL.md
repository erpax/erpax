---
name: api
description: "Use when calling Payload data operations — Local API (payload.find/create/update/delete), REST endpoints, or GraphQL — or deciding which to use, passing depth/select/where/overrideAccess, or running ops inside hooks/server components."
atomPath: api
coordinate: "api · 1/base · b2977548"
contentUuid: "96f9fc05-6bad-59cd-b025-b3cd818127b5"
diamondUuid: "ff0cc43e-5dac-871a-b254-ace9f6204bc3"
uuid: "b2977548-a8cb-843f-9e73-47f84c770ac3"
horo: 1
typography:
  partition: api
  bondDegree: 102
standards:
  - "EU-Taxonomy-2020/852"
  - "ISO-19011"
  - "RFC-6749"
  - "RFC-9110"
bindings: []
signatures:
  computationUuid: "4bdf98d0-de4b-8b3b-acae-1298886d6119"
  stages:
    - stage: path
      stageUuid: "6ab3d6d5-bcae-8dbf-b4ce-e6a3e6f05d97"
    - stage: trinity
      stageUuid: "2d3dbdfb-1e04-8ee3-93fc-646195b0c2a8"
    - stage: boundary
      stageUuid: "d27d2a6b-11b5-88bb-bb83-dbeaf6f48aa4"
    - stage: links
      stageUuid: "d9cd4e19-c697-8184-af0b-847ae0b1ade0"
    - stage: horo
      stageUuid: "98deeb9d-22c9-80eb-9f13-1deebdc379eb"
    - stage: seal
      stageUuid: "f00c0bed-597d-8b45-89ca-1743fd6d7298"
    - stage: uuid
      stageUuid: "c6c4de88-46d9-8ace-b3d6-02ccc9fc074b"
version: 2
---
# api — Local / REST / GraphQL (position 7 of the material cycle)

Three interfaces, **one query syntax** (see [[queries]]). Same operations everywhere.

## Local API (fastest — no HTTP; use in server components, hooks, jobs)
```ts
const payload = await getPayload({ config })   // cached instance (see [[optimize]])
await payload.find({ collection, where, depth, select, limit, sort, locale, overrideAccess, req })
await payload.findByID({ collection, id })
await payload.create({ collection, data })
await payload.update({ collection, id|where, data })
await payload.delete({ collection, id|where })
await payload.count({ collection, where })
await payload.auth({ headers })                 // resolve req.user
payload.db.*                                    // bypass hooks/validation (see [[optimize]])
```
**Access is skipped by default in Local API** — pass `overrideAccess: false` (+ `user`/`req`) to enforce (see [[access]]).

## REST
Base `/api/<collection>`: `GET` (list/where), `GET /:id`, `POST`, `PATCH /:id`, `DELETE`. Query params: `where[...][operator]`, `depth`, `select`, `sort`, `limit`, `page`, `locale`. Custom routes via `config.endpoints` / collection `endpoints`.

## GraphQL
At `/api/graphql` (+ playground). Mirrors collections as queries/mutations. Cap cost with `graphQL.maxComplexity`, disable via `graphQL.disable` (see [[harden]]).

## Common mistakes
- Forgetting `overrideAccess: false` in Local API when you DO want access enforced.
- Re-instantiating Payload instead of cached `getPayload()`.
- Heavy populate via REST/GraphQL `depth` instead of `select`/`depth:0`.

**Law — [[law]]: three interfaces (Local/REST/GraphQL), one query syntax and one set of operations — the only divergence is that Local API skips access by default, so `overrideAccess: false` is what makes the three behave as one.**

All external APIs follow THE path — REST (`/api/…`), GraphQL, Local API, and [[mcp]] gateway routes normalize through `toAtomPath` in [[path]] and merge with [[fs]], [[github]], and docs [[url]] at one canonical atom path in every [[dimension]] (content-[[uuid]] entanglement; gates fail closed).

@see [[path]] · [[fs]] · [[mcp]] · [[github]] · [[payload]] · [[queries]] · [[access]] · [[dimension]] · [[integrity]] · [[quantum]]
