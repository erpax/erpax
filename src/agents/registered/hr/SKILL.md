---
name: hr
description: "Use when reasoning about hr — Use for the HR agent and its training corpus — owns the H2R hire-to-retire chain (employees, payroll, recruiting, leave, performance, time)."
atomPath: "agents/registered/hr"
coordinate: "agents/registered/hr · 5/round · 5a284064"
contentUuid: "fcaeaaf9-c0ae-511c-af60-888b41c23901"
diamondUuid: "5b8665c8-e0a0-8f13-be8d-7e36e805d6c3"
uuid: "5a284064-fe9c-834f-be19-da6aa7cbbe62"
horo: 5
typography:
  partition: agents
  bondDegree: 9
standards:
  - SFIA
bindings: []
signatures:
  computationUuid: "fa806136-9c76-806a-87a7-33ac011f297b"
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
      stageUuid: "df510916-4d5a-8f8d-aabc-4084b293dd88"
    - stage: seal
      stageUuid: "3823bbb4-c8e0-8068-a993-d72d37d1161b"
    - stage: uuid
      stageUuid: "900c7362-6261-8b1b-a2d2-db65fb3a1d9f"
version: 2
---
# hr

The **H2R** (hire-to-retire) agent. `agent` owns the chain — employees, payroll, recruiting, leave, performance, time — and `training` is the corpus it is certified against, kept beside it because a load without its certification is an uncertified agent ([[train]]).

## Standards
- **ISO IAS-19** — employee benefits.
- **IAS-26** — retirement benefits.

Composes: [[train]] · [[law]].
