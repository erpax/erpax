---
name: hr
description: "Use when reasoning about hr — Use for the HR agent and its training corpus — owns the H2R hire-to-retire chain (employees, payroll, recruiting, leave, performance, time)."
atomPath: "agents/registered/hr"
coordinate: "agents/registered/hr · 1/base · bdf4ff71"
contentUuid: "4e6f8b86-9f73-5e7a-9587-092b08d65a2a"
diamondUuid: "f3c4091c-de06-8a43-b4f6-12191a118945"
uuid: "bdf4ff71-81c1-8476-9a91-7869c1f72dd2"
horo: 1
typography:
  partition: agents
  bondDegree: 9
standards:
  - SFIA
bindings: []
signatures:
  computationUuid: "0386ffc9-0be4-8644-9be8-007c12942cf0"
  stages:
    - stage: path
      stageUuid: "485d8855-e467-8085-8e37-a364541605b4"
    - stage: trinity
      stageUuid: "2c4de3d5-e278-8fd7-9005-6eb1bbcd4739"
    - stage: boundary
      stageUuid: "b2659f94-1ea0-87b5-9996-fb6815b2b8cb"
    - stage: links
      stageUuid: "41a1b851-c5e6-8bf3-ad91-84fb23a88de9"
    - stage: horo
      stageUuid: "22c8b549-5e04-8bc0-9f62-e0ad53805310"
    - stage: seal
      stageUuid: "3823bbb4-c8e0-8068-a993-d72d37d1161b"
    - stage: uuid
      stageUuid: "11e172d0-128c-8199-a2fb-43b41d8fae92"
version: 2
---
# hr

The **H2R** (hire-to-retire) agent. `agent` owns the chain — employees, payroll, recruiting, leave, performance, time — and `training` is the corpus it is certified against, kept beside it because a load without its certification is an uncertified agent ([[train]]).

## Standards
- **ISO IAS-19** — employee benefits.
- **IAS-26** — retirement benefits.

Composes: [[train]] · [[law]].
