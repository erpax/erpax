---
name: hr
description: "Use when reasoning about hr — Use for the HR agent and its training corpus — owns the H2R hire-to-retire chain (employees, payroll, recruiting, leave, performance, time)."
atomPath: "agents/registered/hr"
coordinate: "agents/registered/hr · 2/share · 3a4fc9ba"
contentUuid: "a5bac1f3-1640-57be-b3c1-c844aa368eac"
diamondUuid: "b8af2c94-fecd-89b5-98e1-8b4a237afdbd"
uuid: "3a4fc9ba-7855-8c3d-b977-3d2808391b7a"
horo: 2
typography:
  partition: agents
  bondDegree: 9
standards:
  - SFIA
bindings: []
signatures:
  computationUuid: "0683a4ad-895b-80b1-b18f-fa26a9c62192"
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
      stageUuid: "31ef04fc-93b4-807e-b246-9fce6f0d6568"
    - stage: seal
      stageUuid: "3823bbb4-c8e0-8068-a993-d72d37d1161b"
    - stage: uuid
      stageUuid: "3001f8c6-3707-85fd-8377-16abfa212d5a"
version: 2
---
# hr

The **H2R** (hire-to-retire) agent. `agent` owns the chain — employees, payroll, recruiting, leave, performance, time — and `training` is the corpus it is certified against, kept beside it because a load without its certification is an uncertified agent ([[train]]).

## Standards
- **ISO IAS-19** — employee benefits.
- **IAS-26** — retirement benefits.

Composes: [[train]] · [[law]].
