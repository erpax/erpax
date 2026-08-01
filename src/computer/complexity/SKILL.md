---
name: complexity
description: "Use when classifying algorithmic cost — big-O from loop-depth bindings under [[computer]]; executable not glossary."
atomPath: "computer/complexity"
coordinate: "computer/complexity · 2/share · 68a8fa40"
contentUuid: "e7f905f4-2b2c-510c-87f2-95fdfadb9d7c"
diamondUuid: "9a7da077-bc25-8a95-8663-7877a03cabfd"
uuid: "68a8fa40-0766-85cf-9ac3-a535faf390b4"
horo: 2
typography:
  partition: computer
  bondDegree: 12
standards:
  - "Knuth-style asymptotic notation"
bindings: []
signatures:
  computationUuid: "9ea57e31-ae02-8c0a-946e-940cf6f37acd"
  stages:
    - stage: path
      stageUuid: "5b41281c-84bc-8ea7-8b65-f270d40a44ce"
    - stage: trinity
      stageUuid: "5449d392-2657-874a-975e-e0698bb3f19c"
    - stage: boundary
      stageUuid: "b29019e0-7969-8705-8e10-95d79305033b"
    - stage: links
      stageUuid: "31822e3d-b26c-8380-8575-5e7ad42783d0"
    - stage: horo
      stageUuid: "b34bbc68-6137-8e17-a5a3-f4fddc3a7415"
    - stage: seal
      stageUuid: "0d99f41f-44b5-879e-8927-b253b1eee507"
    - stage: uuid
      stageUuid: "d93762ba-5618-8483-ba50-276d15712378"
version: 2
---
# computer/complexity — big-O classifier

`classifyComplexity` maps loop binding tables to standard complexity classes (`O(1)` … `O(2^n)`). Composes with [[computer/algorithm]] and [[computer/processor]].

**Law — [[law]]: complexity here is computed from bindings — not prose labels.**

@standard Knuth-style asymptotic notation
