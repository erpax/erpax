---
name: hr
description: "Use when reasoning about hr — Use for the HR agent and its training corpus — owns the H2R hire-to-retire chain (employees, payroll, recruiting, leave, performance, time)."
atomPath: "agents/registered/hr"
coordinate: "agents/registered/hr · 7/descent · 0c7350db"
contentUuid: "a72e89dd-cb41-5b2a-94c8-4b081f3a52bd"
diamondUuid: "d1fd77c7-ceae-86c3-8ac0-14b31772454c"
uuid: "0c7350db-8940-8b49-82ac-6b2ae2607260"
horo: 7
typography:
  partition: agents
  bondDegree: 9
standards:
  - SFIA
bindings: []
signatures:
  computationUuid: "5a277035-2a1c-858f-8ad9-7589de366208"
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
      stageUuid: "7916fa41-3ee9-8aa4-a33b-06f4cfca0234"
    - stage: seal
      stageUuid: "3823bbb4-c8e0-8068-a993-d72d37d1161b"
    - stage: uuid
      stageUuid: "1c1fc292-0f74-83b6-bea7-142c972cabb5"
version: 2
---
# hr

The **H2R** (hire-to-retire) agent. `agent` owns the chain — employees, payroll, recruiting, leave, performance, time — and `training` is the corpus it is certified against, kept beside it because a load without its certification is an uncertified agent ([[train]]).

## Standards
- **ISO IAS-19** — employee benefits.
- **IAS-26** — retirement benefits.

Composes: [[train]] · [[law]].
