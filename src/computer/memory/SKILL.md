---
name: memory
description: "Use when reasoning about memory as a part of computer — pivot to canonical @/memory/quantum; nested not duplicated."
atomPath: "computer/memory"
coordinate: "computer/memory · 5/round · 8d6c0da1"
contentUuid: "44924d01-c7c9-521e-a517-5f6303785c0b"
diamondUuid: "1ce23164-a992-8af8-a3cc-6b9e19a189e2"
uuid: "8d6c0da1-5198-8ac6-a8db-e829777f1c77"
horo: 5
typography:
  partition: computer
  bondDegree: 99
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "89f75df6-2b17-8464-a27e-688b1d75a397"
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
      stageUuid: "cde62be2-377b-8754-983b-b8417a1bf205"
    - stage: seal
      stageUuid: "5e53a1d1-cf42-8321-bb55-a014c99fa08b"
    - stage: uuid
      stageUuid: "ae5db019-6964-8b3b-819f-8479b6044773"
version: 2
---
# computer/memory — holds working state

The [[memory]] read from the [[computer]] decomposition. Re-exports `@/memory/quantum` (`dedupHolds` · `allocateMemory`) plus a bounded **address space** (`createAddressSpace` · `read` · `write` · `writeCostBits`).

**Law — [[law]]: computer/memory is executable working memory — quantum dedup plus bounded address cells, not glossary prose.**

@standard schema.org — the type vocabulary, collided to single words
