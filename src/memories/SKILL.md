---
name: memories
description: "Use when persisting MCP tool results or agent state across restarts — a Payload substrate that projects rows INTO the architecture lattice by content-uuid (Law 8), NOT operational memory itself. Operational memory IS the lattice (memory/architecture); this collection is durable working-set spill keyed by (ownerType, ownerId, kind, key)."
atomPath: memories
coordinate: "memories · 2/share · 02ae2217"
contentUuid: "cf5ed5ce-cacf-5cb9-9516-351e1623df0c"
diamondUuid: "0d8d2bae-a374-808e-952d-a3adde6cc340"
uuid: "02ae2217-10c1-8e43-afbb-ae522a4f7227"
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
  computationUuid: "94dc20e6-c7ef-830f-be3f-40c633e5e7b0"
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
      stageUuid: "e59af1db-38f6-88b2-a58a-aa3f6354d8ba"
    - stage: seal
      stageUuid: "9ec5b0d7-ac80-8380-a02d-223420724341"
    - stage: uuid
      stageUuid: "74e3916c-330a-86d8-aa5e-793e0857aa89"
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
