---
name: memory
description: "Use when reasoning about memory as a part of computer — pivot to canonical @/memory/quantum; nested not duplicated."
atomPath: "computer/memory"
coordinate: "computer/memory · 5/round · 24c8f550"
contentUuid: "54dd1837-1f61-5d35-90dc-8e7be5ff4140"
diamondUuid: "6bd6dac8-17a3-8198-b1c2-dd19d5e19962"
uuid: "24c8f550-7d85-8c74-9af6-ee32098b060e"
horo: 5
typography:
  partition: computer
  bondDegree: 97
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "2f4d1d5d-2913-83ee-9d63-cba395977684"
  stages:
    - stage: path
      stageUuid: "3285e7a3-7afc-883c-b040-91e6202537e8"
    - stage: trinity
      stageUuid: "b612d11c-4e30-8308-8aa2-3d9eedb6a639"
    - stage: boundary
      stageUuid: "9fdffe4d-a2ab-8aac-9e46-42e902e29ac4"
    - stage: links
      stageUuid: "83dc96d8-59ad-8fc4-9255-7a24db022e3a"
    - stage: horo
      stageUuid: "eb6aa99c-dbf2-8b1e-8ef9-f6adbb7cb949"
    - stage: seal
      stageUuid: "5e53a1d1-cf42-8321-bb55-a014c99fa08b"
    - stage: uuid
      stageUuid: "15ba7a4b-ee51-869e-a935-9681ca8e7abf"
version: 2
---
# computer/memory — holds working state

The [[memory]] read from the [[computer]] decomposition. Re-exports `@/memory/quantum` (`dedupHolds` · `allocateMemory`) plus a bounded **address space** (`createAddressSpace` · `read` · `write` · `writeCostBits`).

**Law — [[law]]: computer/memory is executable working memory — quantum dedup plus bounded address cells, not glossary prose.**

@standard schema.org — the type vocabulary, collided to single words
