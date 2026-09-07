---
name: api
description: "Use when calling Payload data operations — Local API (payload.find/create/update/delete), REST endpoints, or GraphQL — or deciding which to use, passing depth/select/where/overrideAccess, or running ops inside hooks/server components."
atomPath: api
coordinate: "api · 7/descent · 2c4681ff"
contentUuid: "8aae01e0-c9cd-52d9-abbb-0e36a4dabb43"
diamondUuid: "9f186a1d-0d79-8ba9-adbe-96b379e65075"
uuid: "2c4681ff-0ce2-8bd0-9c41-856aa4940300"
horo: 7
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
  computationUuid: "dca69aad-de58-86e1-96d6-a00d88b59640"
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
      stageUuid: "3331c4b3-9b4b-812c-8228-f54063cc5ce7"
    - stage: seal
      stageUuid: "f00c0bed-597d-8b45-89ca-1743fd6d7298"
    - stage: uuid
      stageUuid: "5b8f799e-9850-825a-9004-2bd9dc77895e"
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
