---
name: seed
description: "Use when shaping what the MCP gateway serves — the Worker-safe collection seed (gateway auth atoms, ERPAX_MCP_SEED/EXTRA/INCLUDE_CMS) and the erpax.<area>.<leg> families reached THROUGH the gateway rather than by importing its factory — the corpus tool families handed to @payloadcms/plugin-mcp's mcp.tools door, wire-named (dots to underscores, Anthropic's tool grammar), gated by mode (full carries them, the lean Worker seed opts in with ERPAX_MCP_TOOLS=1), collisions refused. The live /api/mcp served 844 CRUD tools and zero families until this; the liveness test had asked the factory."
atomPath: "plugins/mcp/seed"
coordinate: "plugins/mcp/tools · 7/descent · 1a1e34bb"
contentUuid: "6efab95a-64fa-57df-9d9a-24046c86aa80"
diamondUuid: "c9e02abb-6e6f-84a2-bc8e-f829c95fe7ac"
uuid: "1a1e34bb-8138-8308-bc9a-56fb8a521648"
horo: 7
typography:
  partition: plugins
  bondDegree: 15
standards:
  - "MCP 0.6 — tools/list and tools/call are the surface a client sees"
bindings: []
signatures:
  computationUuid: "3a22e723-88c3-8ad4-8311-ce14777b2f49"
  stages:
    - stage: path
      stageUuid: "d0acad02-8ec6-8a02-a12d-1acb1aa2805e"
    - stage: trinity
      stageUuid: "bcd8af3b-7b42-88c3-a781-738de7cdddea"
    - stage: boundary
      stageUuid: "1d0f1a9e-e3e7-80fe-8985-9b2799ea8c50"
    - stage: links
      stageUuid: "745c2538-16bf-8cce-8adb-dd300e7de5fa"
    - stage: horo
      stageUuid: "436f053a-470d-8831-80e8-a98568d6baaa"
    - stage: seal
      stageUuid: "eb79080b-6872-85ba-a981-335f411d4e8f"
    - stage: uuid
      stageUuid: "905955e6-6ca4-8cdb-8510-d120fc2400e0"
version: 2
---
# plugins/mcp/seed — the gateway surface, derived not listed: the collection seed and the families handed through the plugin door

The question that produced this atom was *why still bypassing MCP?* — and the measured answer was
that the MCP had nothing to bypass **to**. `tools/list` on the live gateway returned **844** tools,
every one a generated collection verb (`findAccountReconciliations`, `createUsers` …) and **not one**
`erpax.*` family. The trinities — `frontier` · `gate` · `family` · `outward` · `novelty` and the rest —
existed in `buildErpaxMcpTools`, were exercised by an in-process client, and were certified live by
`toolsLiveUnder`, which asked the **factory** whether it offered the name. A mirror ([[rules]]/mirror):
the test restated the builder and said nothing about the wire.

`@payloadcms/plugin-mcp` has a door for exactly this — `mcp.tools[]`, read per request by
`getMCPHandler` — and `payload.config.ts` never walked through it. So every agent that reached the
gateway was handed a surface the corpus does not describe, and every surface the corpus describes was
reachable only by importing it. Importing it is what the user called bypassing, and it was the only
route that existed.

## Three decisions, in the open

| decision | where | why |
| --- | --- | --- |
| `erpax.gate.coil` crosses as `erpax_gate_coil` | `wireName` | Anthropic's tool-name grammar is `[A-Za-z0-9_-]`; a dot is refused at the client. The dotted name stays the corpus's address and leads the description, so a caller can still cite the atom. |
| full mode carries the families, the lean seed does not | `customToolsEnabled` | the Worker seed exists because the isolate dies under the full surface ([[plugins]]/mcp/seed); the families ride there only by `ERPAX_MCP_TOOLS=1`, and `0` refuses anywhere |
| two addresses collapsing to one wire name are refused | `gatewayTools` | a shadowed tool is a decoy ([[rules]]/copy); the gateway may not hide it |

The tools are read **lazily** — `payload.config.ts` passes a getter, so `buildErpaxMcpTools` runs on
the first request and never at module load, where the import cycle it sits in leaves `I18N`
constants in their TDZ ([[rules]]/cycle; the same deferral `agent/mcp-surface` already carries).

**Honest boundary.** This proves the families are **registered** with the plugin and expressible on
the wire; the test that proves it reads the array the config hands over, which is the arbiter the
plugin itself reads — not a live HTTP round-trip, which a hermetic test cannot make. Prompts and
resources (`ERPAX_MCP_PROMPTS` · `ERPAX_MCP_RESOURCES`) are built and still not handed through the
plugin's `mcp.prompts` / `mcp.resources` doors; that is the next lead on this surface, named rather
than implied closed. And a tool reaching the wire says nothing about whether its handler is cheap
enough to answer there — the frontier scans are full-tree, and a gateway timeout is the honest
reading of that cost.

**Law — [[law]]: the surface the corpus describes is the surface a client sees. A tool family built
beside the gateway and certified by its own factory is a mirror; hand it through the plugin's door,
name it as the wire allows, and let the test read the array the gateway reads.**

## Standards

- **MCP 0.6** — `tools/list` and `tools/call` are the surface a client sees.

Composes: [[plugins]]/mcp/seed · [[mcp]] · [[family]] · [[rules]]/mirror · [[law]].
