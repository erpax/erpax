---
name: architecture
description: "Use when operational memory must be understood as the architecture lattice itself — NOT a side store. The diamond graph, uuid/matrix bindings, typography partitions, folder SKILL statements, architecture-invariants, and sealed git tree ARE what the system remembers; session blobs sanitize to architecture content and verify against the live-tree facet."
atomPath: "memory/architecture"
coordinate: "memory/architecture · 8/crest · ea0d0863"
contentUuid: "d8013c09-3a19-59d3-b84d-b623e6ad04ea"
diamondUuid: "929f805f-541a-820d-bb9a-4fa5dd5b1814"
uuid: "ea0d0863-686e-83f3-a251-e5b2993c6337"
horo: 8
typography:
  partition: memory
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "5c0b1fdd-5133-8bf2-a133-0d4b198cf8c6"
  stages:
    - stage: path
      stageUuid: "8f069e56-fb54-8a40-a584-9f30450616f7"
    - stage: trinity
      stageUuid: "5e69b23e-a195-83f9-b828-975eb71e6241"
    - stage: boundary
      stageUuid: "911f406b-8770-85f8-b2a5-f1df7a084bae"
    - stage: links
      stageUuid: "43d5a0b6-70db-8a82-82ff-e945361df19b"
    - stage: horo
      stageUuid: "e4574cfb-6ba7-8aa4-be30-8c96e96e1cc8"
    - stage: seal
      stageUuid: "7ae51871-f487-88a2-aeef-aeb807f81130"
    - stage: uuid
      stageUuid: "726afc34-8eb8-8ed4-99f0-8834e174e5ef"
version: 2
---
# memory/architecture — operational memory IS the lattice

**Operational memory ≠ a separate store** (Memories rows, chat history, agent context, side tables). **Operational memory IS the architecture lattice**: the live [[diamond]] graph, [[matrix]] coordinate bindings, [[typography]] partitions, folder README/SKILL statements, [[architecture/invariant]] checks, and sealed git tree ([[akashic]] · [[seal]]) — the structure you walk IS what the system remembers. There is nothing to recall beside the lattice; agents derive by walking it ([[self]] · thought).

## Sanitize — ephemeral is not memory

Session/corpus substrates carry working-set debris that must never be mistaken for memory:

| Stripped (not memory) | Kept (architecture content) |
| --------------------- | --------------------------- |
| `uuid` · `id` · `createdAt` · `updatedAt` | `atomPath` · `kind` · `title` · `payload` |
| `sessionId` · `threadId` · `messages` · `transcript` | Lexical `body` · `links` · `standards` |
| `__securitybot_metadata__` · `ownerId` · `tenantId` | Fields in `ARCHITECTURE_CONTENT_FIELDS` |

`sanitizedMemoryUuid` = `uuid(jcs(sanitized))` — merge key for raw blobs before lattice verification. `architectureMemoryDigest` = `uuid(jcs({ atomPath, diamondUuid, matrixUuid, sealed }))` — **stable digest ⇒ stable operational memory**.

## Project — walk the lattice

Given an `atomPath` (or `atom` / `path`):

1. **Live facet** — `operationalMemoryFacet(atomPath)` reads the sealed tree NOW ([[diamond]] · [[matrix]])
2. **Blob projection** — `projectMemoryToArchitecture(input)` sanitizes then derives the same facets
3. **Identity** — `operationalMemoryIsArchitecture(input)` ⇔ live facet ≡ projected facet (ephemeral debris irrelevant)
4. **Seal gate** — `save(thought) ⇐ isDiamond` (thought · [[memory/session]])

Horo digit + measure come from the generated matrix ([[horo]]) — never hand decimals ([[integrity]] impurity law).

## Sessions meet in architecture

Parallel sessions ([[memory/session]] · [[chat]] · [[memories]] · MCP caches) pass blobs through sanitize → verify against `operationalMemoryFacet`; substrates merge on `architectureMemoryDigest` / `diamondUuid` / `contentUuid` ([[merge]]). The chat thread is illusion; the lattice is real ([[akashic]]). `[[memories]]` rows are a Payload substrate projection INTO the same address space — not a second operational memory ([[quantum/memory]]: content-uuid IS the manager).

Matter-twin: `./index.ts` — `MEMORY_EPHEMERAL_FIELDS` · `ARCHITECTURE_CONTENT_FIELDS` · `sanitizeMemoryRecord` · `operationalMemoryFacet` · `architectureMemoryDigest` · `operationalMemoryIsArchitecture` · `projectMemoryToArchitecture`. Composes: [[integrity]] · [[diamond]] · [[matrix]] · [[memory/session]] · thought · [[seal]] · [[architecture/invariant]].

**Law — [[law]]: operational memory IS the architecture lattice — not a side store; `operationalMemoryIsArchitecture` holds when live-tree facet ≡ sanitized projection; `architectureMemoryDigest` stable ⇒ memory stable; ephemeral stripped, JCS architecture content only; sessions meet by content-uuid merge on the lattice ([[merge]] · [[akashic]] · [[diamond]]).**

@see [[memory]] · [[memory/session]] · [[diamond]] · [[akashic]] · thought · [[architecture/invariant]] · [[integrity]] · [[quantum/memory]] · [[memories]]
