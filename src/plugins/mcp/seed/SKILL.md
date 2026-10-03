---
name: seed
description: "Use when shaping what the MCP gateway serves — the Worker-safe collection seed (gateway auth atoms, ERPAX_MCP_SEED/EXTRA/INCLUDE_CMS) and the erpax.<area>.<leg> families reached THROUGH the gateway rather than by importing its factory — the corpus tool families handed to @payloadcms/plugin-mcp's mcp.tools door, wire-named (dots to underscores, Anthropic's tool grammar), gated by mode (full carries them, the lean Worker seed opts in with ERPAX_MCP_TOOLS=1), collisions refused. The live /api/mcp served 844 CRUD tools and zero families until this; the liveness test had asked the factory."
atomPath: "plugins/mcp/seed"
coordinate: "plugins/mcp/seed · 8/crest · 3b44653f"
contentUuid: "3ad4ff56-bcf1-55a2-9047-8d261e99993d"
diamondUuid: "e4e0fbe8-5ee8-8605-a392-ca4d980ccc43"
uuid: "3b44653f-4c73-82ae-b63e-a7d0f1702f04"
horo: 8
typography:
  partition: plugins
  bondDegree: 121
standards: []
bindings: []
signatures:
  computationUuid: "5f7efd74-306f-80ad-ac43-00e3b385a584"
  stages:
    - stage: path
      stageUuid: "49528684-6204-8206-8231-b62213712c51"
    - stage: trinity
      stageUuid: "85f0b482-58ac-8cec-84a9-fcbf950427f3"
    - stage: boundary
      stageUuid: "93f2790b-5c7a-8a92-8df2-a5ac9d498213"
    - stage: links
      stageUuid: "9fbbde32-2118-808d-81c8-ce8e703615d1"
    - stage: horo
      stageUuid: "5582448e-667f-8b96-9bab-c1734cc96f01"
    - stage: seal
      stageUuid: "351aad37-9138-8acc-bd6c-fe92de5cfef1"
    - stage: uuid
      stageUuid: "c1bb9a92-335d-85b8-b48a-cacac4b4f015"
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
