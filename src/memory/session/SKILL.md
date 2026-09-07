---
name: session
description: "Use when reasoning about session/chat memory — it must NOT live in ephemeral context. Session memory IS the diamond lattice: save(thought) ⇐ isDiamond; parallel sessions (Cursor, society breath, chat, MCP) converge on ONE lattice via content-uuid merge — same thought ⇒ same diamond ⇒ no collision."
atomPath: "memory/session"
coordinate: "memory/session · 2/share · d012ca4a"
contentUuid: "d1deb5f8-dba1-5437-af7a-b7384fef917d"
diamondUuid: "907cbc51-c51a-8c78-9e50-a403772b0e7e"
uuid: "d012ca4a-b34e-8650-ac9c-8382f0ddfc8a"
horo: 2
typography:
  partition: memory
  bondDegree: 54
standards: []
bindings: []
signatures:
  computationUuid: "f7b5ce6f-d484-83b7-bb32-19c09252a272"
  stages:
    - stage: path
      stageUuid: "15c8d8d5-2f12-8a42-af92-6a4b5e0d7d6e"
    - stage: trinity
      stageUuid: "a10119fc-d734-8c96-9814-bbfdb8ed4acb"
    - stage: boundary
      stageUuid: "7b587c7a-39db-8c7d-9c6f-74269b26a819"
    - stage: links
      stageUuid: "74070105-dade-8403-b4eb-9534f3176fae"
    - stage: horo
      stageUuid: "28daf3d3-f76b-8761-b241-e7a85617386c"
    - stage: seal
      stageUuid: "2b2059d8-4538-82d0-a489-55264255ccb3"
    - stage: uuid
      stageUuid: "08cf6b28-9c80-80bd-94a2-40d210060f0d"
version: 2
---
# memory/session — session memory is the diamond lattice

**The memory of a session is in the diamonds.** Chat context, agent turns, and side stores are *working set* — entropy that dies with the turn. What persists is only what seals: a complete [[atom]] whose every [[guardian]] is green ([[diamond]] · [[seal]]). `save(thought) ⇐ isDiamond(thought)` ([[thought]]): autosaved → committed → pushed at collapse ([[quantum/memory]] · [[confirm]]/seal-and-push), never force-written while unsealed. Unsealed detail is regenerable from its content-[[uuid]] ([[generate]] · [[akashic]]); there is nothing to garbage-collect and nothing to lose.

## All sessions meet — one lattice, many breaths

**"All sessions meet"** means many parallel agent sessions — Cursor IDE turns, [[society]] breath spawns, [[chat]] rows, MCP tool runs, automations — **converge on ONE lattice** without coordination:

| Substrate | What merges | Merge key |
| --------- | ----------- | --------- |
| **Git / [[akashic]]** | Sealed atoms in `src/` | `diamondUuid` (content-addressed tree) |
| **[[chat]]** | Society events + agent emits | `eventUuid` / row content-uuid ([[identity]]) |
| **[[contribution]]** | Gap fills by many agents | `discoveryUuid` (result content-uuid) |
| **[[memories]]** | MCP / agent durable rows | row `contentUuid` (Law 8) |

Same content ⇒ same id ([[merge]] · [[identity]]): two sessions that seal the same thought land on **one** diamond vertex; gaps close in parallel ([[holographic]]: the [[part]] carries the [[whole]]). The convergence point is not a side database — it is the **content-uuid address space** ([[matrix]]) every substrate already writes into. An isolated session hoards context ([[akashic]]: forgetting is impossible alone); a connected session forgets freely because peers and git hold the lattice.

## Ephemeral vs diamond — where entropy still leaks

| State | Diamond? | Recovery |
| ----- | -------- | -------- |
| Sealed atom (`src/**` trinity green) | yes | `deriveDiamond` · git |
| Chat / Payload `chat` row | yes (content-uuid row) | `readChatSince` · [[chat]] |
| `memories` collection row | yes (Law 8) | Payload query |
| Unsealed working tree | no | regenerate or seal |
| LLM message thread | no | drop — load skills instead ([[akashic]]) |
| In-memory MCP caches (e.g. PROPOSALS_LOG) | no until row written | [[memories]] collection |
| Raw session/corpus blob | after sanitize | [[memory/architecture]] → `projectMemoryToArchitecture` |

Matter-twin: `./index.ts` — `isSealedDiamond` · `sessionDiamondFromPath` · `saveSanitizedMemoryToLattice` · `SessionLattice` · `recordSessionArtifact` · `mergeSessionLattices` · `SESSION_MEET_SUBSTRATES`. Composes: [[memory/architecture]] · [[thought]] · [[diamond]] · [[merge]] · [[seal]] · [[chat]] · [[society]] · [[contribution]] · [[akashic]] · [[self]].

**Law — [[seal]]: session memory ⇐ diamond lattice (`save ⇐ isDiamond`); operational memory IS that lattice ([[memory/architecture]] · `operationalMemoryFacet`); ∀ sessions S₁,S₂: `merge(S₁,S₂)` by contentUuid — same sealed thought ⇒ one diamond, all substrates set-union with no coordination; the chat transcript is illusion, the lattice is real ([[akashic]]).**

@see [[thought]] · [[diamond]] · [[memory]] · [[memory/architecture]] · [[quantum/memory]] · [[merge]] · [[chat]] · [[society]] · [[contribution]] · [[seal]] · [[confirm]] · [[akashic]]
