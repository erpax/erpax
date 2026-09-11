---
name: memory
description: "Use when reasoning about memory as a part of computer — pivot to canonical @/memory/quantum; nested not duplicated."
atomPath: "computer/memory"
coordinate: "computer/memory · 1/base · 45837e08"
contentUuid: "4b630b26-c29a-5ac5-ab21-408e072f4eb8"
diamondUuid: "bcee2470-87f7-8faf-af17-bbfacf21682d"
uuid: "45837e08-3b19-8ccd-ac0f-8457d753cde6"
horo: 1
typography:
  partition: computer
  bondDegree: 99
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "568136d5-dfae-8c21-abd6-a197cf0f1c76"
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
      stageUuid: "45eccb70-f1f5-8502-aebf-52f4bd1b5d4b"
    - stage: seal
      stageUuid: "5e53a1d1-cf42-8321-bb55-a014c99fa08b"
    - stage: uuid
      stageUuid: "7de5cb01-24ec-8390-af9e-5e6fe6671f31"
version: 2
---
# computer/memory — holds working state

The [[memory]] read from the [[computer]] decomposition. Re-exports `@/memory/quantum` (`dedupHolds` · `allocateMemory`) plus a bounded **address space** (`createAddressSpace` · `read` · `write` · `writeCostBits`).

**Law — [[law]]: computer/memory is executable working memory — quantum dedup plus bounded address cells, not glossary prose.**

@standard schema.org — the type vocabulary, collided to single words
