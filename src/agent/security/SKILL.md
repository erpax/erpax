---
name: security
description: Use when reasoning about security — Parse allowlist and security monitor for agent inputs (fail closed).
atomPath: "agent/security"
coordinate: "agent/security · 5/round · 5ab3006b"
contentUuid: "fdddd8ec-8d49-5666-93d9-69d89dd162bf"
diamondUuid: "4fb8f5e6-1da4-8559-ba83-5f3dc1c825f3"
uuid: "5ab3006b-8e36-8b63-accd-f3f8bb32d5bb"
horo: 5
typography:
  partition: agent
  bondDegree: 40
standards: []
bindings: []
signatures:
  computationUuid: "9b9bbbd2-43cf-8020-a911-6d553d52e1ad"
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
      stageUuid: "7efa0d31-0978-88c0-8cd2-4113ebcafa32"
    - stage: seal
      stageUuid: "b5ef4a51-a7d7-81ba-b8d5-fd5da92bcf01"
    - stage: uuid
      stageUuid: "675b3033-3cd7-8c1c-8405-98c135b535bd"
version: 2
---
# agent/security

Allowlisted parse sources — see `./index.ts`.
