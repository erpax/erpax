---
name: memories
description: "Use when persisting MCP tool results or agent state across restarts — a Payload substrate that projects rows INTO the architecture lattice by content-uuid (Law 8), NOT operational memory itself. Operational memory IS the lattice ([[memory/architecture]]); this collection is durable working-set spill keyed by (ownerType, ownerId, kind, key)."
atomPath: memories
coordinate: "memories · 7/descent · a995f451"
contentUuid: "b954ebf7-06d1-5df6-9f4d-93a66a38a4b0"
diamondUuid: "8d8d0f09-1206-8473-88b7-f48b889d9a64"
uuid: "a995f451-e3f0-8c02-a718-56642569c6bd"
horo: 7
bonds:
  in:
    - accounting
    - akashic
    - architecture
    - diamond
    - fields
    - law
    - mcp
    - merge
    - proof
    - session
    - standard
    - transaction
    - uuid
  out:
    - accounting
    - akashic
    - architecture
    - diamond
    - fields
    - law
    - mcp
    - merge
    - proof
    - session
    - standard
    - transaction
    - uuid
typography:
  partition: memories
  bondDegree: 43
  neighbors:
    - diamond
standards:
  - "ISO 19011:2018 §6.4.6 audit-evidence (memory history audit-trailed)"
  - "ISO 19011:2018 §6.4.6 audit-evidence (memory history audit-trailed)`"
  - "ISO-19011:2018"
  - "ISO/IEC 25010:2023 §5.7 modifiability — persistent memory layer"
  - "ISO/IEC 25010:2023 §5.7 modifiability — persistent memory layer`"
  - "ISO/IEC-25010:2023"
  - "RFC-4122"
  - "W3C-JSON-LD-1.1"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - accounting
    - akashic
    - architecture
    - diamond
    - fields
    - law
    - merge
    - proof
    - session
    - standard
    - transaction
    - uuid
  matrix:
    - accounting
    - akashic
    - architecture
    - diamond
    - fields
    - law
    - mcp
    - merge
    - proof
    - session
    - standard
    - transaction
    - uuid
  backlinks:
    - accounting
    - akashic
    - architecture
    - diamond
    - fields
    - law
    - mcp
    - merge
    - proof
    - session
    - standard
    - transaction
    - uuid
signatures:
  computationUuid: "5b8abe14-3580-8c6d-8e11-b86f283350c2"
  stages:
    - stage: path
      stageUuid: "3b11dd23-97ee-8f8a-8b73-84908b45483f"
    - stage: trinity
      stageUuid: "38353191-1edc-80d3-aaed-7428695d94df"
    - stage: boundary
      stageUuid: "fb7d16c9-c3ff-830a-81e5-680fb2333e17"
    - stage: links
      stageUuid: "1a06d511-99a4-8314-bb6b-3e4c50b2a7a6"
    - stage: horo
      stageUuid: "612d61c5-9bbc-891c-8e9f-fea1c67d3295"
    - stage: seal
      stageUuid: "9ec5b0d7-ac80-8380-a02d-223420724341"
    - stage: uuid
      stageUuid: "8f64a805-aa6b-8d80-bf0c-463d6cae5348"
version: 2
---
# memories

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Not operational memory — substrate projection

**Operational memory IS the architecture lattice** ([[memory/architecture]] · [[diamond]] · [[akashic]]) — the diamond graph, matrix bindings, sealed git tree. The `memories` collection is **not** a second truth: it is a Payload substrate where MCP tools and agents spill durable rows that **merge by `contentUuid`** into the same address space as git and chat ([[memory/session]] · [[merge]]). Rows without a sealed lattice facet are working set until sanitized and verified (`operationalMemoryIsArchitecture`).

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO/IEC 25010:2023 §5.7 modifiability — persistent memory layer`
- `@standard ISO 19011:2018 §6.4.6 audit-evidence (memory history audit-trailed)`

- ISO/IEC 25010:2023 §5.7 modifiability — persistent substrate layer
- ISO 19011:2018 §6.4.6 audit-evidence (row history audit-trailed)
- Conservation Law 8 content-uuid (per-memory contentUuid)
- Conservation Law 10 referential-harmony (relatedTo graph)

Composes: [[accounting]] · [[fields]] · [[transaction]] · [[uuid]] · [[proof]] · [[standard]] · [[memory/architecture]] · [[memory/session]].

**Law — [[law]]: memories persist agent substrate rows across restarts keyed by (ownerType, ownerId, kind, key), each content-[[uuid]]'d for federation and joined by relatedTo graph edges — a Payload projection INTO the lattice, not operational memory itself ([[memory/architecture]]).**
