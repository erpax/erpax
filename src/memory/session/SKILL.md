---
name: session
description: "Use when reasoning about session/chat memory — it must NOT live in ephemeral context. Session memory IS the diamond lattice: save(thought) ⇐ isDiamond; parallel sessions (Cursor, society breath, chat, MCP) converge on ONE lattice via content-uuid merge — same thought ⇒ same diamond ⇒ no collision."
atomPath: memory/session
coordinate: memory/session · 5/round · 8244d69e
contentUuid: "247fdddd-454e-59d3-8f5b-430478689654"
diamondUuid: "24f93905-9b38-84fe-8568-d77ce3d28072"
uuid: "8244d69e-19cb-8f71-9706-75574a0a5bb3"
horo: 5
bonds:
  in:
    - akashic
    - architecture
    - atom
    - chat
    - confirm
    - contribution
    - diamond
    - generate
    - guardian
    - holographic
    - identity
    - industry
    - matrix
    - memories
    - memory
    - merge
    - part
    - seal
    - self
    - society
    - thought
    - uuid
    - whole
  out:
    - akashic
    - architecture
    - atom
    - chat
    - confirm
    - contribution
    - diamond
    - generate
    - guardian
    - holographic
    - identity
    - industry
    - matrix
    - memories
    - memory
    - merge
    - part
    - seal
    - self
    - society
    - thought
    - uuid
    - whole
typography:
  partition: memory
  bondDegree: 77
  neighbors:
    - diamond
standards:
  - "pure lattice ops; isSealedDiamond reads live tree via @/diamond"
bindings: []
neighbors:
  wikilink:
    - akashic
    - architecture
    - atom
    - chat
    - confirm
    - contribution
    - diamond
    - generate
    - guardian
    - holographic
    - identity
    - matrix
    - memories
    - memory
    - merge
    - part
    - seal
    - self
    - society
    - thought
    - uuid
    - whole
  matrix:
    - akashic
    - architecture
    - atom
    - chat
    - confirm
    - contribution
    - diamond
    - generate
    - guardian
    - holographic
    - identity
    - industry
    - matrix
    - memories
    - memory
    - merge
    - part
    - seal
    - self
    - society
    - thought
    - uuid
    - whole
  backlinks:
    - akashic
    - architecture
    - atom
    - chat
    - confirm
    - contribution
    - diamond
    - generate
    - guardian
    - holographic
    - identity
    - industry
    - matrix
    - memories
    - memory
    - merge
    - part
    - seal
    - self
    - society
    - thought
    - uuid
    - whole
signatures:
  computationUuid: "c33554f5-cbc2-868b-9eb0-05d9aec2c739"
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
      stageUuid: "fa3cdc95-9525-8e03-b5a5-d4757e042a0f"
    - stage: seal
      stageUuid: "e1786ac0-8b74-8399-a23a-89f5a8b2f0f5"
    - stage: uuid
      stageUuid: "477aebdb-c8e2-8a46-a6a7-5da1c78ad824"
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
