---
name: mcp
description: "Use when configuring the erpax agent gateway — it IS the official @payloadcms/plugin-mcp; every collection becomes find/create/update/delete tools at /api/mcp, computed from the barrel never hand-listed; Bearer API-key auth inherits the key owner's access and tenant scope; custom tools added via the plugin mcp config."
atomPath: mcp
coordinate: mcp · 7/descent · e87afa66
contentUuid: "3cba8de5-4419-5f4c-aa6d-5b4d29118eaf"
diamondUuid: "c60e5e6a-f176-8b7e-9c5d-c1f02a0d5ef0"
uuid: "e87afa66-9fb0-81c6-8861-99511f4f922b"
horo: 7
bonds:
  in:
    - access
    - agent
    - api
    - atom
    - collections
    - cost
    - dimension
    - fs
    - generate
    - github
    - mcp
    - path
    - payload
    - reference
    - research
    - scopes
    - society
    - tool
    - trust
    - uuid
  out:
    - access
    - agent
    - api
    - atom
    - collections
    - cost
    - dimension
    - fs
    - generate
    - github
    - mcp
    - path
    - payload
    - reference
    - research
    - scopes
    - society
    - tool
    - trust
    - uuid
typography:
  partition: mcp
  bondDegree: 0
  neighbors: []
standards:
  - "EU-1958"
  - "RFC-7231"
bindings: []
neighbors:
  wikilink:
    - access
    - agent
    - api
    - atom
    - collections
    - dimension
    - fs
    - generate
    - github
    - mcp
    - path
    - payload
    - trust
    - uuid
  matrix:
    - access
    - agent
    - api
    - atom
    - collections
    - cost
    - dimension
    - fs
    - generate
    - github
    - mcp
    - path
    - payload
    - reference
    - research
    - scopes
    - society
    - tool
    - trust
    - uuid
  backlinks:
    - access
    - agent
    - api
    - atom
    - collections
    - cost
    - dimension
    - fs
    - generate
    - github
    - mcp
    - path
    - payload
    - reference
    - research
    - scopes
    - society
    - tool
    - trust
    - uuid
signatures:
  computationUuid: "5c8cce2d-45f3-8a56-9db1-f68073cb379e"
  stages:
    - stage: path
      stageUuid: "a22f54d4-d296-8ec5-8330-e970946345bf"
    - stage: trinity
      stageUuid: "be8c5236-e72b-8566-a704-db8142f396a9"
    - stage: boundary
      stageUuid: "754ee6d8-4356-8ae7-91fb-31f8abdd0437"
    - stage: links
      stageUuid: "23aa2d1d-e9b8-84e6-9b50-9a580c826316"
    - stage: horo
      stageUuid: "a53b4216-3a08-81c2-805f-8018b63a83f4"
    - stage: seal
      stageUuid: "b37fed21-5b14-8bd2-9996-148049c0b53b"
    - stage: uuid
      stageUuid: "4aaad578-463c-8f08-ac84-b7dc91c32b06"
version: 2
---
# mcp — the agent gateway (configure it computed)

The MCP gateway is **the official `@payloadcms/plugin-mcp`**, wired in [[payload]] config — never a hand-rolled server. It exposes every collection as find/create/update/delete tools at `/api/mcp`.

## Configure — computed, not hand-listed

Feed it the barrel, not a list:

```ts
mcpPlugin({
  collections: Object.fromEntries(
    Object.values(allCollections).map((c) => [c.slug, { enabled: true }]),
  ),
})
```

It is the same `@/collections` barrel [[payload]] already registers, so a new [[atom]] auto-appears as tools — zero drift ([[generate]]). Custom tools (GW fusion, [[trust]]) are added via the plugin's mcp config; the per-key `scopes` field narrows a given key (the [[access]] cross collapsed to a compact capability set — see `@/plugins/mcp/scopes`).

## Auth — inherit, never widen

Bearer API-key auth runs each call in the key owner's `PayloadRequest`, so it **inherits the owner's [[access]] + multi-tenant scope** — the door never opens wider than the human behind the key. Every collection is added (the actor-merge — agent = human power) precisely because the [[access]] gate, not the tool list, is what keeps it safe.

MCP tool and resource URIs (`erpax://…`, `mcp://…/resources/…`) follow the computed path in [[path]] — they merge with [[fs]], [[github]], and [[api]] at one canonical atom path and entangle with erpax in all [[dimension]]s (content-[[uuid]] sealed).

@see [[path]] · [[payload]] · [[access]] · [[agent]] · [[api]] · [[collections]] · [[trust]] · [[quantum/mcp]] · [[fs]] · [[github]] · [[dimension]]
