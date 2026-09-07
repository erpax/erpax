---
name: mcp
description: "Use when configuring the erpax agent gateway — it IS the official @payloadcms/plugin-mcp; every collection becomes find/create/update/delete tools at /api/mcp, computed from the barrel never hand-listed; Bearer API-key auth inherits the key owner's access and tenant scope; custom tools added via the plugin mcp config."
atomPath: mcp
coordinate: "mcp · 7/descent · 83b68bf7"
contentUuid: "2b4a65a0-87d7-5b9d-96e3-4b49dcab844c"
diamondUuid: "50ff8797-e4ad-85c1-bf3f-53fdf283b87c"
uuid: "83b68bf7-3f60-889c-aab3-14cf53527c65"
horo: 7
typography:
  partition: mcp
  bondDegree: 113
standards:
  - "EU-1958"
  - "RFC-7231"
bindings: []
signatures:
  computationUuid: "1680d2af-1166-8714-b6f3-43be99860231"
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
      stageUuid: "bffb7189-95c7-85af-8383-f129a5c78c84"
    - stage: seal
      stageUuid: "79a4b82a-01f7-88bc-b79f-e1eedbe5b418"
    - stage: uuid
      stageUuid: "a74fd906-3621-8b23-93bb-c34e37802b76"
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
