---
name: mcp
description: "Use when configuring the erpax agent gateway — it IS the official @payloadcms/plugin-mcp; every collection becomes find/create/update/delete tools at /api/mcp, computed from the barrel never hand-listed; Bearer API-key auth inherits the key owner's access and tenant scope; custom tools added via the plugin mcp config."
atomPath: mcp
coordinate: "mcp · 1/base · eada99ca"
contentUuid: "be63c7a5-cab0-5a62-a04e-74d16261f28a"
diamondUuid: "9134b8cf-88fb-8603-a4cf-19ab741489c7"
uuid: "eada99ca-dcb5-8cb5-bbac-599b87fc7d44"
horo: 1
typography:
  partition: mcp
  bondDegree: 111
standards:
  - "EU-1958"
  - "RFC-7231"
bindings: []
signatures:
  computationUuid: "d1337e72-2be5-8c0e-abc6-5933ac673088"
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
      stageUuid: "d82a6723-3b58-8347-bd82-79c6416be8cd"
    - stage: seal
      stageUuid: "79a4b82a-01f7-88bc-b79f-e1eedbe5b418"
    - stage: uuid
      stageUuid: "8c218830-f49a-87fc-8059-0a3b14c68bf0"
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
