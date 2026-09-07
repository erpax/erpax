---
name: mcp
description: "Use when configuring the erpax agent gateway — it IS the official @payloadcms/plugin-mcp; every collection becomes find/create/update/delete tools at /api/mcp, computed from the barrel never hand-listed; Bearer API-key auth inherits the key owner's access and tenant scope; custom tools added via the plugin mcp config."
atomPath: mcp
coordinate: "mcp · 4/weave · f5c6371c"
contentUuid: "7e394277-55eb-50c8-8cc2-1e9880e16cb8"
diamondUuid: "27433930-5fbf-8054-82e7-790a53a96377"
uuid: "f5c6371c-5068-811f-944f-b431ef6c61d4"
horo: 4
typography:
  partition: mcp
  bondDegree: 113
standards:
  - "EU-1958"
  - "RFC-7231"
bindings: []
signatures:
  computationUuid: "c0179f4f-f651-8c35-91f7-bfd7bedcec35"
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
      stageUuid: "6fe7e5cf-4874-8069-8141-7d729fc733de"
    - stage: seal
      stageUuid: "79a4b82a-01f7-88bc-b79f-e1eedbe5b418"
    - stage: uuid
      stageUuid: "86e2dbc1-ecba-8f01-b2d9-38b1f96601b6"
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
