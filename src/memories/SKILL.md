---
name: memories
description: "Use when persisting MCP tool results or agent state across restarts — a Payload substrate that projects rows INTO the architecture lattice by content-uuid (Law 8), NOT operational memory itself. Operational memory IS the lattice ([[memory/architecture]]); this collection is durable working-set spill keyed by (ownerType, ownerId, kind, key)."
atomPath: memories
coordinate: memories · 2/share · cc93254f
contentUuid: "7966fd5f-d250-5e7e-82e3-1299f72be303"
diamondUuid: "6f6d229d-d74f-879e-a3c7-957e8867b867"
uuid: "cc93254f-87b1-8e69-b924-d49108e86188"
horo: 2
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
  - "Conservation Law 10 referential-harmony (relatedTo graph)"
  - "Conservation Law 8 content-uuid (per-memory contentUuid)"
  - "ISO 19011:2018 §6.4.6 audit-evidence (memory history audit-trailed)"
  - "ISO-19011:2018"
  - "ISO/IEC 25010:2023 §5.7 modifiability — persistent memory layer"
  - "ISO/IEC-25010:2023"
  - "RFC-4122"
  - "W3C-JSON-LD-1.1"
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
  computationUuid: "6c0b735d-d844-80a9-8a48-f8d02f9b4076"
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
      stageUuid: "48c637fe-f2c2-8fe0-98ef-f031b07b4677"
    - stage: seal
      stageUuid: "92a8fec1-b465-8bf7-aa44-83178e15c45a"
    - stage: uuid
      stageUuid: "58361058-f46e-899e-96f0-5d4d253cc102"
version: 2
---
# memories

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Not operational memory — substrate projection

**Operational memory IS the architecture lattice** ([[memory/architecture]] · [[diamond]] · [[akashic]]) — the diamond graph, matrix bindings, sealed git tree. The `memories` collection is **not** a second truth: it is a Payload substrate where MCP tools and agents spill durable rows that **merge by `contentUuid`** into the same address space as git and chat ([[memory/session]] · [[merge]]). Rows without a sealed lattice facet are working set until sanitized and verified (`operationalMemoryIsArchitecture`).

## Standards
- ISO/IEC 25010:2023 §5.7 modifiability — persistent substrate layer
- ISO 19011:2018 §6.4.6 audit-evidence (row history audit-trailed)
- Conservation Law 8 content-uuid (per-memory contentUuid)
- Conservation Law 10 referential-harmony (relatedTo graph)

Composes: [[accounting]] · [[fields]] · [[transaction]] · [[uuid]] · [[proof]] · [[standard]] · [[memory/architecture]] · [[memory/session]].

**Law — [[law]]: memories persist agent substrate rows across restarts keyed by (ownerType, ownerId, kind, key), each content-[[uuid]]'d for federation and joined by relatedTo graph edges — a Payload projection INTO the lattice, not operational memory itself ([[memory/architecture]]).**
