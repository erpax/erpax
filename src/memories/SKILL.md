---
name: memories
description: "Use when persisting MCP tool results or agent state across restarts — a Payload substrate that projects rows INTO the architecture lattice by content-uuid (Law 8), NOT operational memory itself. Operational memory IS the lattice (memory/architecture); this collection is durable working-set spill keyed by (ownerType, ownerId, kind, key)."
atomPath: memories
coordinate: "memories · 1/base · dca71cc3"
contentUuid: "d97b12fc-e096-5f12-bd82-8b66d5247de6"
diamondUuid: "c5bc2404-ad6d-8bac-b95e-97125e333562"
uuid: "dca71cc3-0892-872d-94d3-264e0593aba6"
horo: 1
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
  computationUuid: "13b6c31f-db56-8a15-9443-23bb0d71d187"
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
      stageUuid: "cb019fe9-861a-8274-872b-f481f6839b86"
    - stage: seal
      stageUuid: "9ec5b0d7-ac80-8380-a02d-223420724341"
    - stage: uuid
      stageUuid: "e9c8a802-d37d-8362-b137-c3481b78673e"
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
