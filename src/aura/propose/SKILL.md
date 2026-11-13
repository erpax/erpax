---
name: propose
description: "Use when computing weave proposals deterministically — for each orphan atom, the highest-mass atom whose text mentions it (a true co-occurrence, never invented), feeding the weave with no trained agent."
atomPath: "aura/propose"
coordinate: "aura/propose · 1/base · 35d8c2a4"
contentUuid: "a276fa7b-0be5-518c-838b-0e945073be52"
diamondUuid: "d435143a-ee7e-8c1c-b953-c951033e5540"
uuid: "35d8c2a4-7de1-83e0-bca4-d48ec08a22e2"
horo: 1
typography:
  partition: aura
  bondDegree: 0
standards: []
bindings: []
signatures:
  computationUuid: "f6d53c1a-1c50-8be2-ae11-a072228405ca"
  stages:
    - stage: path
      stageUuid: "4c46d1e0-95c8-836b-9de8-c7e4a9864988"
    - stage: trinity
      stageUuid: "6d6d8871-cb27-80df-b13a-8da43773bd5d"
    - stage: boundary
      stageUuid: "94a93521-9e70-8026-ab0b-59f036437427"
    - stage: links
      stageUuid: "e142f7fd-0398-8510-abf2-796b362e30eb"
    - stage: horo
      stageUuid: "7625b00a-8007-8712-84f0-0ca37839f0fd"
    - stage: seal
      stageUuid: "56c9720b-760c-82af-b9be-dbcb8188b705"
    - stage: uuid
      stageUuid: "2331480b-09ca-8358-afc7-e5541dc20aa0"
version: 2
---
# propose

The computable proposer for [[aura]] / weave: for each orphan (an atom nothing links to), the target is the highest-mass atom whose SKILL.md text actually mentions the orphan word — a true co-occurrence relation, never invented. So harmonising needs no trained agent and cannot hallucinate; an orphan no atom mentions stays orphan (honest, no computable truth). [[merge]] · [[generate]].

**Law — [[law]]: every weave proposal is a true co-occurrence the live tree witnesses (the highest-mass atom that actually mentions the orphan), never invented — an orphan no atom mentions stays orphan.**

@audit no link invented — every proposal is a co-occurrence the live tree witnesses
