---
name: complexity
description: "Use when classifying algorithmic cost — big-O from loop-depth bindings under computer; executable not glossary."
atomPath: "computer/complexity"
coordinate: "computer/complexity · 8/crest · e0ebe374"
contentUuid: "25b33659-c1dc-520c-9dd5-f2dda3de2d5a"
diamondUuid: "79ae28e3-d4c8-8219-92ce-164cf260d5d4"
uuid: "e0ebe374-92f2-8f6d-911d-5de74bdcc9d5"
horo: 8
typography:
  partition: computer
  bondDegree: 10
standards:
  - "Knuth-style asymptotic notation"
bindings: []
signatures:
  computationUuid: "683aaa60-ec9a-8e80-9f79-26ecd52e6b40"
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
      stageUuid: "d8997a42-6dfa-807b-b685-cb308dfb0f9f"
    - stage: seal
      stageUuid: "0d99f41f-44b5-879e-8927-b253b1eee507"
    - stage: uuid
      stageUuid: "7d159e69-18ed-87f6-907c-a7508a439ed0"
version: 2
---
# computer/complexity — big-O classifier

`classifyComplexity` maps loop binding tables to standard complexity classes (`O(1)` … `O(2^n)`). Composes with [[computer/algorithm]] and [[computer/processor]].

**Law — [[law]]: complexity here is computed from bindings — not prose labels.**

@standard Knuth-style asymptotic notation
