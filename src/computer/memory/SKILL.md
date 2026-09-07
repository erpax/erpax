---
name: memory
description: "Use when reasoning about memory as a part of [[computer]] — pivot to canonical @/memory/quantum; nested not duplicated."
atomPath: "computer/memory"
coordinate: "computer/memory · 5/round · 24c8f550"
contentUuid: "db10d846-c1f7-590c-b09b-0a0a1508158f"
diamondUuid: "d7949edc-7781-84c1-9eb0-543bffeaea54"
uuid: "24c8f550-7d85-8c74-9af6-ee32098b060e"
horo: 5
typography:
  partition: computer
  bondDegree: 97
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "727053b3-2802-8755-a462-afafc81a3c67"
  stages:
    - stage: path
      stageUuid: "3285e7a3-7afc-883c-b040-91e6202537e8"
    - stage: trinity
      stageUuid: "b612d11c-4e30-8308-8aa2-3d9eedb6a639"
    - stage: boundary
      stageUuid: "9fdffe4d-a2ab-8aac-9e46-42e902e29ac4"
    - stage: links
      stageUuid: "3419648d-e303-86ef-be3f-717fa2ebcb62"
    - stage: horo
      stageUuid: "eb6aa99c-dbf2-8b1e-8ef9-f6adbb7cb949"
    - stage: seal
      stageUuid: "5e53a1d1-cf42-8321-bb55-a014c99fa08b"
    - stage: uuid
      stageUuid: "673de726-b4a4-82e3-ba21-4ce1bfa059c4"
version: 2
---
# computer/memory — holds working state

The [[memory]] read from the [[computer]] decomposition. Re-exports `@/memory/quantum` (`dedupHolds` · `allocateMemory`) plus a bounded **address space** (`createAddressSpace` · `read` · `write` · `writeCostBits`).

**Law — [[law]]: computer/memory is executable working memory — quantum dedup plus bounded address cells, not glossary prose.**

@standard schema.org — the type vocabulary, collided to single words
