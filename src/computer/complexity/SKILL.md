---
name: complexity
description: "Use when classifying algorithmic cost — big-O from loop-depth bindings under computer; executable not glossary."
atomPath: "computer/complexity"
coordinate: "computer/complexity · 2/share · 65f7c115"
contentUuid: "d9d0a0aa-30af-53bc-a6f2-7246b3df6908"
diamondUuid: "a022a4c7-5551-81e1-8258-65e59939d595"
uuid: "65f7c115-64f0-8e6c-abc1-61a2b34a0259"
horo: 2
typography:
  partition: computer
  bondDegree: 10
standards:
  - "Knuth-style asymptotic notation"
bindings: []
signatures:
  computationUuid: "6608e512-fb2a-8517-b132-d3ba9f795389"
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
      stageUuid: "9799b6ab-959b-89d1-81c6-75a3692dc273"
    - stage: seal
      stageUuid: "0d99f41f-44b5-879e-8927-b253b1eee507"
    - stage: uuid
      stageUuid: "0c431a02-4f67-80c5-80ae-3ea7d1bca47a"
version: 2
---
# computer/complexity — big-O classifier

`classifyComplexity` maps loop binding tables to standard complexity classes (`O(1)` … `O(2^n)`). Composes with [[computer/algorithm]] and [[computer/processor]].

**Law — [[law]]: complexity here is computed from bindings — not prose labels.**

@standard Knuth-style asymptotic notation
