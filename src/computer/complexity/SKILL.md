---
name: complexity
description: "Use when classifying algorithmic cost — big-O from loop-depth bindings under computer; executable not glossary."
atomPath: "computer/complexity"
coordinate: "computer/complexity · 5/round · 2159d340"
contentUuid: "0dc5b7d8-bcbe-53f8-9eb7-ee76d7f1b4b4"
diamondUuid: "9a07b135-d482-844f-87a4-51bb37fd3036"
uuid: "2159d340-a64d-8dd9-9686-d0d7957c2ff8"
horo: 5
typography:
  partition: computer
  bondDegree: 10
standards:
  - "Knuth-style asymptotic notation"
bindings: []
signatures:
  computationUuid: "bd9aca88-4b2f-8351-97f8-dec5ab2121ff"
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
      stageUuid: "daca357f-af1b-89c5-911e-d86a734517e6"
    - stage: seal
      stageUuid: "0d99f41f-44b5-879e-8927-b253b1eee507"
    - stage: uuid
      stageUuid: "89adccb3-770b-8589-9c6a-f71ddf92a5b0"
version: 2
---
# computer/complexity — big-O classifier

`classifyComplexity` maps loop binding tables to standard complexity classes (`O(1)` … `O(2^n)`). Composes with [[computer/algorithm]] and [[computer/processor]].

**Law — [[law]]: complexity here is computed from bindings — not prose labels.**

@standard Knuth-style asymptotic notation
