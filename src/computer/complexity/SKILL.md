---
name: complexity
description: "Use when classifying algorithmic cost — big-O from loop-depth bindings under computer; executable not glossary."
atomPath: "computer/complexity"
coordinate: "computer/complexity · 2/share · b2219422"
contentUuid: "7b47f6d5-7a3a-519b-a06e-38aa5547d753"
diamondUuid: "de52b222-7e2b-8e37-b7c5-e425e1e30777"
uuid: "b2219422-8cf5-8e75-bc49-ba51e9c19fd1"
horo: 2
typography:
  partition: computer
  bondDegree: 10
standards:
  - "Knuth-style asymptotic notation"
bindings: []
signatures:
  computationUuid: "9af78288-be7b-83a0-b350-afb8f59e11e4"
  stages:
    - stage: path
      stageUuid: "5b41281c-84bc-8ea7-8b65-f270d40a44ce"
    - stage: trinity
      stageUuid: "5449d392-2657-874a-975e-e0698bb3f19c"
    - stage: boundary
      stageUuid: "b29019e0-7969-8705-8e10-95d79305033b"
    - stage: links
      stageUuid: "4c74cca0-7812-84d7-9e16-e75b85b2f58f"
    - stage: horo
      stageUuid: "0b5f8671-efb3-8025-aeb9-5945dd1b1e3a"
    - stage: seal
      stageUuid: "0d99f41f-44b5-879e-8927-b253b1eee507"
    - stage: uuid
      stageUuid: "8f15d2d4-df99-8b6e-82ed-ebf8bee8b86c"
version: 2
---
# computer/complexity — big-O classifier

`classifyComplexity` maps loop binding tables to standard complexity classes (`O(1)` … `O(2^n)`). Composes with [[computer/algorithm]] and [[computer/processor]].

**Law — [[law]]: complexity here is computed from bindings — not prose labels.**

@standard Knuth-style asymptotic notation
