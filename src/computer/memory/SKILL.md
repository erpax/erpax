---
name: memory
description: "Use when reasoning about memory as a part of computer — pivot to canonical @/memory/quantum; nested not duplicated."
atomPath: "computer/memory"
coordinate: "computer/memory · 4/weave · 42b0f68f"
contentUuid: "4ef93fde-56bd-5442-90d0-adfebf50e6e0"
diamondUuid: "42b4ec55-b4e0-8808-9356-38467537eed5"
uuid: "42b0f68f-b3ca-81f3-a460-da34bbad9bf9"
horo: 4
typography:
  partition: computer
  bondDegree: 99
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "9551874f-a4cc-8264-8490-ebde4b273941"
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
      stageUuid: "8732cd85-1f53-86ce-af56-1508103db801"
    - stage: seal
      stageUuid: "5e53a1d1-cf42-8321-bb55-a014c99fa08b"
    - stage: uuid
      stageUuid: "6dffc8de-c00a-8d3e-b003-779461323906"
version: 2
---
# computer/memory — holds working state

The [[memory]] read from the [[computer]] decomposition. Re-exports `@/memory/quantum` (`dedupHolds` · `allocateMemory`) plus a bounded **address space** (`createAddressSpace` · `read` · `write` · `writeCostBits`).

**Law — [[law]]: computer/memory is executable working memory — quantum dedup plus bounded address cells, not glossary prose.**

@standard schema.org — the type vocabulary, collided to single words
