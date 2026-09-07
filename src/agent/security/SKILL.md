---
name: security
description: Use when reasoning about security — Parse allowlist and security monitor for agent inputs (fail closed).
atomPath: "agent/security"
coordinate: "agent/security · 1/base · f813ff88"
contentUuid: "d8d0778c-360f-5cbe-81ef-bd6c80ecc630"
diamondUuid: "fa1de264-e980-892b-ac6a-a2f6b1f59d32"
uuid: "f813ff88-4c40-8e2b-b9b3-6844210b0744"
horo: 1
typography:
  partition: agent
  bondDegree: 59
standards: []
bindings: []
signatures:
  computationUuid: "4ae2a1ab-878b-8629-9984-28aadaba20f1"
  stages:
    - stage: path
      stageUuid: "b451f573-069c-8e98-a447-9eb75365aabd"
    - stage: trinity
      stageUuid: "1b38ac94-c8aa-8058-bf8a-4c2bd4193fd5"
    - stage: boundary
      stageUuid: "54efe83f-cb54-833d-baba-d0f051657a33"
    - stage: links
      stageUuid: "e42bd87f-dde7-803e-a557-904d2bdcd0aa"
    - stage: horo
      stageUuid: "024701e4-1c59-8c60-80fb-bb02719a86bc"
    - stage: seal
      stageUuid: "b5ef4a51-a7d7-81ba-b8d5-fd5da92bcf01"
    - stage: uuid
      stageUuid: "b357702b-ae69-82f4-982e-409999d2d241"
version: 2
---
# agent/security

Allowlisted parse sources — see `./index.ts`.
