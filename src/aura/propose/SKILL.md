---
name: propose
description: "Use when computing weave proposals deterministically — for each orphan atom, the highest-mass atom whose text mentions it (a true co-occurrence, never invented), feeding the weave with no trained agent."
atomPath: "aura/propose"
coordinate: "aura/propose · 7/descent · 67f4fbd8"
contentUuid: "7727231b-5afd-58ec-8d54-c8c92f9611d3"
diamondUuid: "b7a2b888-8e7c-8592-b856-17711dba5af8"
uuid: "67f4fbd8-9612-8491-94b3-409bdfd4b3ab"
horo: 7
typography:
  partition: aura
  bondDegree: 0
standards: []
bindings: []
signatures:
  computationUuid: "2d58d71b-b95f-8911-9606-b1f114e82b97"
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
      stageUuid: "607e550f-6028-8353-a25c-6ba2ee0ea353"
    - stage: seal
      stageUuid: "56c9720b-760c-82af-b9be-dbcb8188b705"
    - stage: uuid
      stageUuid: "f7cee1b8-1226-8f58-8c0c-842c9870e918"
version: 2
---
# propose

The computable proposer for [[aura]] / [[weave]]: for each orphan (an atom nothing links to), the target is the highest-[[mass]] atom whose SKILL.md text actually mentions the orphan word — a true co-occurrence relation, never invented. So harmonising needs no trained agent and cannot hallucinate; an orphan no atom mentions stays orphan (honest, no computable truth). [[merge]] · [[generate]].

**Law — [[law]]: every weave proposal is a true co-occurrence the live tree witnesses (the highest-[[mass]] atom that actually mentions the orphan), never invented — an orphan no atom mentions stays orphan.**

@audit no link invented — every proposal is a co-occurrence the live tree witnesses
