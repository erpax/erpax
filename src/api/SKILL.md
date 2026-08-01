---
name: api
description: "Use when calling Payload data operations — Local API (payload.find/create/update/delete), REST endpoints, or GraphQL — or deciding which to use, passing depth/select/where/overrideAccess, or running ops inside hooks/server components."
atomPath: api
coordinate: "api · 8/crest · 95edf517"
contentUuid: "f6835ab0-ef12-511e-a53a-26f86877ea26"
diamondUuid: "54d774dd-800b-861f-aadc-a20c579a7163"
uuid: "95edf517-5398-8971-b85b-f2e1f8839b72"
horo: 8
bonds:
  in:
    - access
    - calculate
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
  - "EU-Taxonomy-2020/852"
  - "ISO-19011"
  - "RFC-6749"
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
  computationUuid: "2e225ed9-272b-8812-b49e-5e4e321fa13d"
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
      stageUuid: "fcaaf670-e7c9-8699-a672-1d88a3db4c1e"
    - stage: seal
      stageUuid: "f5055290-b736-883f-8c67-99adcd93f8b0"
    - stage: uuid
      stageUuid: "9fbb74ba-a8d4-8c21-89e5-7ceb2c895692"
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
