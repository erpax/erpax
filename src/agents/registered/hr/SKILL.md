---
name: hr
description: "Use when reasoning about hr — Use for the HR agent and its training corpus — owns the H2R hire-to-retire chain (employees, payroll, recruiting, leave, performance, time)."
atomPath: "agents/registered/hr"
coordinate: "agents/registered/hr · 5/round · d5405aab"
contentUuid: "8903bbd3-84ca-5acb-afcc-4ed07e4ca2a5"
diamondUuid: "4c75dcb1-2160-8fd6-8b5b-02b3ceb0a102"
uuid: "d5405aab-045d-852c-8590-625e883897af"
horo: 5
typography:
  partition: agents
  bondDegree: 9
standards:
  - SFIA
bindings: []
signatures:
  computationUuid: "cc1d2cb5-f23b-8ba4-9616-31bcf02c27bb"
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
      stageUuid: "1449053c-b6ee-84e8-943b-767f6858ef8b"
    - stage: seal
      stageUuid: "3823bbb4-c8e0-8068-a993-d72d37d1161b"
    - stage: uuid
      stageUuid: "67b0f58c-9470-8701-86c5-da208ce1af35"
version: 2
---
# hr

The **H2R** (hire-to-retire) agent. `agent` owns the chain — employees, payroll, recruiting, leave, performance, time — and `training` is the corpus it is certified against, kept beside it because a load without its certification is an uncertified agent ([[train]]).

## Standards
- **ISO IAS-19** — employee benefits.
- **IAS-26** — retirement benefits.

Composes: [[train]] · [[law]].
