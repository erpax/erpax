---
name: propose
description: "Use when computing weave proposals deterministically — for each orphan atom, the highest-mass atom whose text mentions it (a true co-occurrence, never invented), feeding the weave with no trained agent."
atomPath: "aura/propose"
coordinate: "aura/propose · 5/round · c4b82ee0"
contentUuid: "1e3f9c05-c1b4-5903-8fb8-9cf3a811708e"
diamondUuid: "e8b22125-cdf1-84f6-8869-9686e623c819"
uuid: "c4b82ee0-b77b-8210-8c9d-c33819972580"
horo: 5
typography:
  partition: aura
  bondDegree: 0
standards: []
bindings: []
signatures:
  computationUuid: "120d82e0-386e-8189-982a-edbffde2af81"
  stages:
    - stage: path
      stageUuid: "4c46d1e0-95c8-836b-9de8-c7e4a9864988"
    - stage: trinity
      stageUuid: "6d6d8871-cb27-80df-b13a-8da43773bd5d"
    - stage: boundary
      stageUuid: "94a93521-9e70-8026-ab0b-59f036437427"
    - stage: links
      stageUuid: "793f4f14-df7a-805b-9ba9-d18df7a85797"
    - stage: horo
      stageUuid: "c552da25-d5f6-86df-b48a-4ee0c9a26852"
    - stage: seal
      stageUuid: "56c9720b-760c-82af-b9be-dbcb8188b705"
    - stage: uuid
      stageUuid: "0936aef6-f0b8-8071-9aae-0df28bdd9697"
version: 2
---
# propose

The computable proposer for [[aura]] / [[weave]]: for each orphan (an atom nothing links to), the target is the highest-[[mass]] atom whose SKILL.md text actually mentions the orphan word — a true co-occurrence relation, never invented. So harmonising needs no trained agent and cannot hallucinate; an orphan no atom mentions stays orphan (honest, no computable truth). [[merge]] · [[generate]].

**Law — [[law]]: every weave proposal is a true co-occurrence the live tree witnesses (the highest-[[mass]] atom that actually mentions the orphan), never invented — an orphan no atom mentions stays orphan.**

@audit no link invented — every proposal is a co-occurrence the live tree witnesses
