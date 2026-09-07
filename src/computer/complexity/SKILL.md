---
name: complexity
description: "Use when classifying algorithmic cost — big-O from loop-depth bindings under computer; executable not glossary."
atomPath: "computer/complexity"
coordinate: "computer/complexity · 2/share · 9c4ad768"
contentUuid: "afa505d2-8e5a-5b16-a0a6-c755cee98146"
diamondUuid: "34e9de68-0944-8d7f-bde1-9b36da3742fc"
uuid: "9c4ad768-db2f-8e94-aa99-df1421eb9bd9"
horo: 2
typography:
  partition: computer
  bondDegree: 10
standards:
  - "Knuth-style asymptotic notation"
bindings: []
signatures:
  computationUuid: "be887aeb-9bf8-82d9-9ff8-f833cfbfcb30"
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
      stageUuid: "5ec5d323-2567-8ad6-a7b2-951c7f42b466"
    - stage: seal
      stageUuid: "0d99f41f-44b5-879e-8927-b253b1eee507"
    - stage: uuid
      stageUuid: "36b0dc1b-7817-8449-a11d-378934d2168d"
version: 2
---
# computer/complexity — big-O classifier

`classifyComplexity` maps loop binding tables to standard complexity classes (`O(1)` … `O(2^n)`). Composes with [[computer/algorithm]] and [[computer/processor]].

**Law — [[law]]: complexity here is computed from bindings — not prose labels.**

@standard Knuth-style asymptotic notation
