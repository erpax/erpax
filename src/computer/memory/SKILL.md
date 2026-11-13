---
name: memory
description: "Use when reasoning about memory as a part of computer — pivot to canonical @/memory/quantum; nested not duplicated."
atomPath: "computer/memory"
coordinate: "computer/memory · 1/base · 20b65a06"
contentUuid: "13e36a9a-ce7a-5f0f-b00c-4a742fbf30bb"
diamondUuid: "bb6df7af-4249-84af-899c-9d90162febd3"
uuid: "20b65a06-0384-8947-b306-085d2d7b3156"
horo: 1
typography:
  partition: computer
  bondDegree: 90
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "37f59e5c-c61a-8306-94d3-60b270d91550"
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
      stageUuid: "dfae5700-43aa-84fd-954e-18f40d8b1950"
    - stage: seal
      stageUuid: "5e53a1d1-cf42-8321-bb55-a014c99fa08b"
    - stage: uuid
      stageUuid: "22f23565-7e44-8631-bf4a-51cfc3a83048"
version: 2
---
# computer/memory — holds working state

The [[memory]] read from the [[computer]] decomposition. Re-exports `@/memory/quantum` (`dedupHolds` · `allocateMemory`) plus a bounded **address space** (`createAddressSpace` · `read` · `write` · `writeCostBits`).

**Law — [[law]]: computer/memory is executable working memory — quantum dedup plus bounded address cells, not glossary prose.**

@standard schema.org — the type vocabulary, collided to single words
