---
name: architecture
description: "Use when operational memory must be understood as the architecture lattice itself — NOT a side store. The diamond graph, uuid/matrix bindings, typography partitions, folder SKILL statements, architecture-invariants, and sealed git tree ARE what the system remembers; session blobs sanitize to architecture content and verify against the live-tree facet."
atomPath: memory/architecture
coordinate: memory/architecture · 1/base · ef313357
contentUuid: "9f10cd39-09ae-5495-9ae0-2bea75f1400b"
diamondUuid: "2eb63e22-2e1c-84e3-aeae-1256267a18e9"
uuid: "ef313357-2dbe-87c8-8941-23a4e930c749"
horo: 1
bonds:
  in:
    - akashic
    - chat
    - diamond
    - horo
    - industry
    - integrity
    - invariant
    - law
    - matrix
    - memories
    - memory
    - merge
    - seal
    - self
    - session
    - thought
    - typography
  out:
    - akashic
    - chat
    - diamond
    - horo
    - industry
    - integrity
    - invariant
    - law
    - matrix
    - memories
    - memory
    - merge
    - seal
    - self
    - session
    - thought
    - typography
typography:
  partition: memory
  bondDegree: 62
  neighbors:
    - diamond
standards:
  - "pure projection; horo/measure from matrix, never hand decimals"
bindings: []
neighbors:
  wikilink:
    - akashic
    - chat
    - diamond
    - horo
    - integrity
    - invariant
    - law
    - matrix
    - memories
    - memory
    - merge
    - seal
    - self
    - session
    - thought
    - typography
  matrix:
    - akashic
    - chat
    - diamond
    - horo
    - industry
    - integrity
    - invariant
    - law
    - matrix
    - memories
    - memory
    - merge
    - seal
    - self
    - session
    - thought
    - typography
  backlinks:
    - akashic
    - chat
    - diamond
    - horo
    - industry
    - integrity
    - invariant
    - law
    - matrix
    - memories
    - memory
    - merge
    - seal
    - self
    - session
    - thought
    - typography
signatures:
  computationUuid: "bb361d53-8683-816a-936c-379564c35673"
  stages:
    - stage: path
      stageUuid: "8f069e56-fb54-8a40-a584-9f30450616f7"
    - stage: trinity
      stageUuid: "5e69b23e-a195-83f9-b828-975eb71e6241"
    - stage: boundary
      stageUuid: "911f406b-8770-85f8-b2a5-f1df7a084bae"
    - stage: links
      stageUuid: "cf7b6fb4-d006-8ba2-8b81-341646b1629a"
    - stage: horo
      stageUuid: "a8fc30aa-c385-85d8-973d-fb627412bd3d"
    - stage: seal
      stageUuid: "3cb95b8a-e236-8643-b7f5-3964cd094253"
    - stage: uuid
      stageUuid: "bcd59862-d9cb-865b-8aeb-1e9f0a23f343"
version: 2
---
# memory/architecture — operational memory IS the lattice

**Operational memory ≠ a separate store** (Memories rows, chat history, agent context, side tables). **Operational memory IS the architecture lattice**: the live [[diamond]] graph, [[matrix]] coordinate bindings, [[typography]] partitions, folder README/SKILL statements, [[architecture/invariant]] checks, and sealed git tree ([[akashic]] · [[seal]]) — the structure you walk IS what the system remembers. There is nothing to recall beside the lattice; agents derive by walking it ([[self]] · [[thought]]).

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
4. **Seal gate** — `save(thought) ⇐ isDiamond` ([[thought]] · [[memory/session]])

Horo digit + measure come from the generated matrix ([[horo]]) — never hand decimals ([[integrity]] impurity law).

## Sessions meet in architecture

Parallel sessions ([[memory/session]] · [[chat]] · [[memories]] · MCP caches) pass blobs through sanitize → verify against `operationalMemoryFacet`; substrates merge on `architectureMemoryDigest` / `diamondUuid` / `contentUuid` ([[merge]]). The chat thread is illusion; the lattice is real ([[akashic]]). `[[memories]]` rows are a Payload substrate projection INTO the same address space — not a second operational memory ([[quantum/memory]]: content-uuid IS the manager).

Matter-twin: `./index.ts` — `MEMORY_EPHEMERAL_FIELDS` · `ARCHITECTURE_CONTENT_FIELDS` · `sanitizeMemoryRecord` · `operationalMemoryFacet` · `architectureMemoryDigest` · `operationalMemoryIsArchitecture` · `projectMemoryToArchitecture`. Composes: [[integrity]] · [[diamond]] · [[matrix]] · [[memory/session]] · [[thought]] · [[seal]] · [[architecture/invariant]].

**Law — [[law]]: operational memory IS the architecture lattice — not a side store; `operationalMemoryIsArchitecture` holds when live-tree facet ≡ sanitized projection; `architectureMemoryDigest` stable ⇒ memory stable; ephemeral stripped, JCS architecture content only; sessions meet by content-uuid merge on the lattice ([[merge]] · [[akashic]] · [[diamond]]).**

@see [[memory]] · [[memory/session]] · [[diamond]] · [[akashic]] · [[thought]] · [[architecture/invariant]] · [[integrity]] · [[quantum/memory]] · [[memories]]
