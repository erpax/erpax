---
name: api
description: "Use when calling Payload data operations — Local API (payload.find/create/update/delete), REST endpoints, or GraphQL — or deciding which to use, passing depth/select/where/overrideAccess, or running ops inside hooks/server components."
atomPath: api
coordinate: api · 5/round · b2d03bcd
contentUuid: "cb7f95b9-7908-5876-8900-7febaf42a8e8"
diamondUuid: "f4a9e52c-8679-8b0a-b685-2c190506b3c2"
uuid: "b2d03bcd-4a60-8e7c-a819-eb838cb0bba1"
horo: 5
bonds:
  in:
    - access
    - calculate
    - client
    - descent
    - dev
    - dimension
    - endpoint
    - endpoints
    - fs
    - github
    - harden
    - integrity
    - law
    - mcp
    - path
    - payload
    - port
    - quantum
    - queries
    - redirects
    - reference
    - spec
    - url
    - uuid
    - web
    - workspace
  out:
    - access
    - calculate
    - client
    - descent
    - dev
    - dimension
    - endpoint
    - endpoints
    - fs
    - github
    - harden
    - integrity
    - law
    - mcp
    - path
    - payload
    - port
    - quantum
    - queries
    - redirects
    - reference
    - spec
    - url
    - uuid
    - web
    - workspace
typography:
  partition: api
  bondDegree: 0
  neighbors: []
standards:
  - "EU-2018/1673"
  - "EU-2018/1725"
  - "EU-2018/302"
  - "EU-2018/389-SCA-RTS"
  - "EU-2018/843"
  - "EU-2018/957"
  - "EU-Taxonomy-2020/852"
  - "ISO-19011"
bindings: []
neighbors:
  wikilink:
    - access
    - dimension
    - fs
    - github
    - harden
    - integrity
    - law
    - mcp
    - path
    - payload
    - quantum
    - queries
    - url
    - uuid
  matrix:
    - access
    - calculate
    - client
    - descent
    - dev
    - dimension
    - endpoint
    - endpoints
    - fs
    - github
    - harden
    - integrity
    - law
    - mcp
    - path
    - payload
    - port
    - quantum
    - queries
    - redirects
    - reference
    - spec
    - url
    - uuid
    - web
    - workspace
  backlinks:
    - access
    - calculate
    - client
    - descent
    - dev
    - dimension
    - endpoint
    - endpoints
    - fs
    - github
    - harden
    - integrity
    - law
    - mcp
    - path
    - payload
    - port
    - quantum
    - queries
    - redirects
    - reference
    - spec
    - url
    - uuid
    - web
    - workspace
signatures:
  computationUuid: "ed6de29e-3f1a-8332-a607-a0de06bd4c09"
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
      stageUuid: "199780bc-6b0a-8063-8c94-9a07b142f362"
    - stage: seal
      stageUuid: "f5055290-b736-883f-8c67-99adcd93f8b0"
    - stage: uuid
      stageUuid: "9e9588cd-9996-83da-a803-b0345b4713db"
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
