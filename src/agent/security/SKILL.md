---
name: security
description: Use when reasoning about security — Parse allowlist and security monitor for agent inputs (fail closed).
atomPath: "agent/security"
coordinate: "agent/security · 2/share · a23d8b53"
contentUuid: "6644d54c-3265-5067-b983-3c649598a0fe"
diamondUuid: "33a5666e-a640-8e28-8571-d23e3e16c0fe"
uuid: "a23d8b53-5f51-8944-89b4-40c8193dae5c"
horo: 2
bonds:
  in:
    - access
    - agent
    - biometric
    - clearance
    - collapse
    - engineering
    - law
    - merge
    - publish
    - requirement
    - research
    - screening
    - security
    - sti
    - testing
  out:
    - access
    - biometric
    - clearance
    - collapse
    - engineering
    - law
    - merge
    - publish
    - requirement
    - research
    - screening
    - security
    - sti
    - testing
typography:
  partition: agent
  bondDegree: 59
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink: []
  matrix:
    - access
    - biometric
    - clearance
    - collapse
    - engineering
    - law
    - merge
    - publish
    - requirement
    - research
    - screening
    - security
    - sti
    - testing
  backlinks:
    - access
    - biometric
    - clearance
    - collapse
    - engineering
    - law
    - merge
    - publish
    - requirement
    - research
    - screening
    - security
    - sti
    - testing
signatures:
  computationUuid: "9da87e46-1c99-88e2-990a-597c2384f87d"
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
      stageUuid: "eb4c34f1-5a8d-8df0-a2b9-69d9eb0deaab"
    - stage: seal
      stageUuid: "7401598c-fc67-8a0d-bc9c-0b2a5a38cd9a"
    - stage: uuid
      stageUuid: "c3433013-b0d8-8c62-8186-ebe238a63a74"
version: 2
---
# agent/security

Allowlisted parse sources — see `./index.ts`.
