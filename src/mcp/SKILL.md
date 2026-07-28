---
name: mcp
description: "Use when configuring the erpax agent gateway — it IS the official @payloadcms/plugin-mcp; every collection becomes find/create/update/delete tools at /api/mcp, computed from the barrel never hand-listed; Bearer API-key auth inherits the key owner's access and tenant scope; custom tools added via the plugin mcp config."
atomPath: mcp
coordinate: "mcp · 7/descent · 423f6d3f"
contentUuid: "71f85509-2d69-56ed-b13e-5d554f2b8f3b"
diamondUuid: "9d757e6e-6369-8c67-aabc-c88f69c5d273"
uuid: "423f6d3f-1d2c-83d3-a61f-cd275f2dd794"
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
  computationUuid: "d8e33945-36ab-8e2d-87e4-e20022823f65"
  stages:
    - stage: path
      stageUuid: "a22f54d4-d296-8ec5-8330-e970946345bf"
    - stage: trinity
      stageUuid: "47471cb5-d472-8481-85c8-1ea0020a165e"
    - stage: boundary
      stageUuid: "64e3dd51-2a98-81a4-bb1d-a7e68045b659"
    - stage: links
      stageUuid: "23aa2d1d-e9b8-84e6-9b50-9a580c826316"
    - stage: horo
      stageUuid: "ab1a902e-26c8-834e-8ef5-44e5c365fe09"
    - stage: seal
      stageUuid: "b37fed21-5b14-8bd2-9996-148049c0b53b"
    - stage: uuid
      stageUuid: "e9e05ecb-c0e9-85f5-b8e9-46edcf4b2a2f"
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
