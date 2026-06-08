---
name: mcp
description: Use when configuring the erpax agent gateway — it IS the official @payloadcms/plugin-mcp; every collection becomes find/create/update/delete tools at /api/mcp, computed from the barrel never hand-listed; Bearer API-key auth inherits the key owner's access and tenant scope; custom tools added via the plugin mcp config.
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

It is the same `@/collections` barrel [[payload]] already registers, so a new [[atom]] auto-appears as tools — zero drift ([[generate]]). Custom tools (GW fusion, [[trust]]) are added via the plugin's mcp config; the per-key `scopes` field narrows a given key (the [[access]] cross collapsed to a compact capability set — see `src/plugins/mcpScopes`).

## Auth — inherit, never widen

Bearer API-key auth runs each call in the key owner's `PayloadRequest`, so it **inherits the owner's [[access]] + multi-tenant scope** — the door never opens wider than the human behind the key. Every collection is added (the actor-merge — agent = human power) precisely because the [[access]] gate, not the tool list, is what keeps it safe.

@see [[payload]] · [[access]] · [[agent]] · [[api]] · [[collections]] · [[trust]] · [[quantum/mcp]] · [[fs]] · [[github]]
