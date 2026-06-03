---
name: mcp
description: "Use when reasoning about erpax's agent gateway — it IS the official @payloadcms/plugin-mcp (collapse sink #1, never hand-roll an MCP server): every enabled collection becomes find/create/update/delete tools at /api/mcp, custom tools (GW fusion, trust) are added via the plugin's mcp config, Bearer API-key auth inherits the key owner's access + multi-tenant scope. erpax makes it TRUST-NATIVE — every tool call passes sandbox (capability + credential-broker + allowlist) and emits a receipt (uuid-chained audit), the dual of an external trust wrapper done from the inside."
---

# mcp — erpax's agent gateway is the official Payload MCP, made trust-native

FORM: **erpax does not build an MCP server — it adopts `@payloadcms/plugin-mcp`** ([[collapse]] sink #1: the official plugin IS the canonical form; [[plugins]]). The plugin exposes every *enabled* collection as `find/create/update/delete` MCP tools (globals: `find/update`) at the `/api/mcp` HTTP endpoint, named by slug (`findInvoices`…). Auth is Bearer API-key with two-step authorization — enable the collection in config, grant the capability per key — and every handler runs in a `PayloadRequest` that **inherits the key owner's [[access]]** (RBAC + multi-tenant), so the gateway can never exceed the actor's rights. Custom tools (the [[google-workspace]] fusion verbs, the society's own actions) are added through the plugin's `mcp` config object (`name`·`description`·`handler`·`schema`); `select`/`overrideResponse` trim tokens ([[cost]]).

**Trust-native, not trust-wrapped.** Where an external trust layer (ZeroPoint's `zp-mcp-server` / `@zeropoint/trace`) WRAPS an MCP harness from outside — emitting signed receipts and a governance gate around each call — erpax encodes the same guarantees NATIVELY: a tool call passes [[sandbox]] (capability-scope + credential-broker + endpoint allowlist) and emits a [[receipt]] (the uuid-chained audit, "no receipt, no proof"). Same trust, one layer in: erpax's MCP server is governed and provenance-bearing by construction, content-addressed, depending on nothing external ([[self]]). The same gateway the agent society convenes through ([[chat]] / [[society]]) and the same one a human or external harness connects to — one door, [[identity]]-scoped, receipted.

Matter-twin: `src/services/agents/mcp/` (`tool-defs`·`in-process-client`·`auto-generated`·`i18n`) over `@payloadcms/plugin-mcp` (registered in `payload.config`), composing `services/sandbox` + `services/receipt`. Composes: [[collapse]] · [[plugins]] · [[access]] · [[sandbox]] · [[receipt]] · [[google-workspace]] · [[cost]] · [[identity]] · [[chat]] · [[society]] · [[self]] · [[Memories]].

## Becoming a Claude connector (the gap, named)
The gateway *exists and works* (Bearer API-key, all collections enabled) — but it is not yet a one-click **Claude connector** "like the many others" (HubSpot · Linear · Notion…). Three matter-level gaps separate a working MCP endpoint from a directory connector — the [[limit]] audit, named honestly:
1. **OAuth, not Bearer.** The directory connectors authenticate by **OAuth 2.1** — the user clicks *Connect* and authorizes; the server publishes `/.well-known/oauth-authorization-server` + `oauth-protected-resource` metadata and supports dynamic client registration (the MCP auth spec). `plugin-mcp` is **Bearer-API-key only** (paste a token). So erpax can be **added manually today** in a developer harness (`claude mcp add --transport http <url>/api/mcp --header "Authorization: Bearer <key>"`, the key minted per [[domain]] ownership) but cannot yet do the one-click OAuth flow. Closing it is a Payload-native build: an OAuth authorization-server endpoint + the `.well-known` metadata, bridging Payload [[auth]] and minting a scoped key — a higher-security link than a long-lived pasted token.
2. **Deploy.** A connector needs a stable public HTTPS endpoint; the gateway runs at `localhost:3000/api/mcp` in dev. erpax is deployable to Cloudflare ([[bindings]] · [[deploy]], `wrangler.jsonc`) — the public URL is the tenant's [[domain]].
3. **Register.** The directory lists submitted servers; a custom MCP server is not auto-discovered (a registry is the discovery layer).

The capability is built; the connector is **deploy + OAuth + register** away. Scored ([[angel]]): OAuth raises security (no long-lived secret) and reach (one-click), deploy raises reach, register raises discoverability — all atop the existing trust-native receipts.

## Common mistakes
- Hand-rolling an MCP server or transport — adopt `@payloadcms/plugin-mcp`; only ADD custom tools via its `mcp` config ([[collapse]]).
- A tool that bypasses the key owner's access — every handler runs in the actor's `PayloadRequest`; never `overrideAccess` to widen scope at the gateway.
- Calling a tool without sandboxing/receipting it — wrap trust-boundary tools with [[sandbox]] `permits` + a [[receipt]]; an un-receipted call has no proof it was permitted.
