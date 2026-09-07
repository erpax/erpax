---
name: memories
description: "Use when persisting MCP tool results or agent state across restarts — a Payload substrate that projects rows INTO the architecture lattice by content-uuid (Law 8), NOT operational memory itself. Operational memory IS the lattice (memory/architecture); this collection is durable working-set spill keyed by (ownerType, ownerId, kind, key)."
atomPath: memories
coordinate: "memories · 2/share · 40df23be"
contentUuid: "2256bc9b-708b-508d-8d8d-5530b94843c5"
diamondUuid: "7c433fb1-71b0-860b-a457-e80ac5c0dee8"
uuid: "40df23be-0212-8048-8a0c-9bcfed0229af"
horo: 2
typography:
  partition: memories
  bondDegree: 43
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
signatures:
  computationUuid: "e7a6ac34-23f6-86bb-a773-52dd06ce6a02"
  stages:
    - stage: path
      stageUuid: "3b11dd23-97ee-8f8a-8b73-84908b45483f"
    - stage: trinity
      stageUuid: "38353191-1edc-80d3-aaed-7428695d94df"
    - stage: boundary
      stageUuid: "fb7d16c9-c3ff-830a-81e5-680fb2333e17"
    - stage: links
      stageUuid: "55282a62-3bd3-883c-beb7-66b3cb2fb893"
    - stage: horo
      stageUuid: "72042216-daa9-8848-a7a1-2d0927739381"
    - stage: seal
      stageUuid: "9ec5b0d7-ac80-8380-a02d-223420724341"
    - stage: uuid
      stageUuid: "08165c34-f86c-8e61-924b-089013ccb85b"
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

Composes: [[accounting]] · [[field]] · [[transaction]] · [[uuid]] · [[proof]] · [[standard]] · [[memory/architecture]] · [[memory/session]].

**Law — [[law]]: memories persist agent substrate rows across restarts keyed by (ownerType, ownerId, kind, key), each content-[[uuid]]'d for federation and joined by relatedTo graph edges — a Payload projection INTO the lattice, not operational memory itself ([[memory/architecture]]).**
