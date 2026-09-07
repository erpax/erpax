---
name: security
description: Use when reasoning about security — Parse allowlist and security monitor for agent inputs (fail closed).
atomPath: "agent/security"
coordinate: "agent/security · 8/crest · cf23e171"
contentUuid: "d6f68290-d766-5936-85de-40b24bdb8deb"
diamondUuid: "3092c730-a5f0-8238-a5f9-810b4643a0bd"
uuid: "cf23e171-a528-8e06-8ebb-1697b5ed41cb"
horo: 8
typography:
  partition: agent
  bondDegree: 59
standards: []
bindings: []
signatures:
  computationUuid: "5b33e822-b1fc-8c5c-9d54-b434ac6ff055"
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
      stageUuid: "203e0833-e2dc-8473-8e6e-704d0f66a388"
    - stage: seal
      stageUuid: "b5ef4a51-a7d7-81ba-b8d5-fd5da92bcf01"
    - stage: uuid
      stageUuid: "f4e066c8-a504-8654-90bf-67930a4b0b1b"
version: 2
---
# agent/security

Allowlisted parse sources — see `./index.ts`.
