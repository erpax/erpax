---
name: propose
description: "Use when computing weave proposals deterministically — for each orphan atom, the highest-mass atom whose text mentions it (a true co-occurrence, never invented), feeding the weave with no trained agent."
atomPath: "aura/propose"
coordinate: "aura/propose · 8/crest · 36bae86c"
contentUuid: "a53ceea9-45c4-58e7-b347-ae6bc326c482"
diamondUuid: "f5583088-57b4-82b2-ae1b-c4d97daacc4c"
uuid: "36bae86c-cd7a-8733-9b17-e3acab2b84f3"
horo: 8
typography:
  partition: aura
  bondDegree: 0
standards: []
bindings: []
signatures:
  computationUuid: "8131b7db-00b7-8fb0-ba0d-ce8abb98cfd5"
  stages:
    - stage: path
      stageUuid: "4c46d1e0-95c8-836b-9de8-c7e4a9864988"
    - stage: trinity
      stageUuid: "6d6d8871-cb27-80df-b13a-8da43773bd5d"
    - stage: boundary
      stageUuid: "94a93521-9e70-8026-ab0b-59f036437427"
    - stage: links
      stageUuid: "82b64103-8be7-8095-bad8-859dc2ac5d90"
    - stage: horo
      stageUuid: "2f86af82-6303-8dd7-b09e-082649a4b534"
    - stage: seal
      stageUuid: "56c9720b-760c-82af-b9be-dbcb8188b705"
    - stage: uuid
      stageUuid: "e4398d33-8d98-8777-93a3-dcbafcda5dd9"
version: 2
---
# propose

The computable proposer for [[aura]] / weave: for each orphan (an atom nothing links to), the target is the highest-mass atom whose SKILL.md text actually mentions the orphan word — a true co-occurrence relation, never invented. So harmonising needs no trained agent and cannot hallucinate; an orphan no atom mentions stays orphan (honest, no computable truth). [[merge]] · [[generate]].

**Law — [[law]]: every weave proposal is a true co-occurrence the live tree witnesses (the highest-mass atom that actually mentions the orphan), never invented — an orphan no atom mentions stays orphan.**

@audit no link invented — every proposal is a co-occurrence the live tree witnesses
