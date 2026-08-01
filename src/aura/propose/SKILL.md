---
name: propose
description: "Use when computing weave proposals deterministically — for each orphan atom, the highest-mass atom whose text mentions it (a true co-occurrence, never invented), feeding the weave with no trained agent."
atomPath: "aura/propose"
coordinate: "aura/propose · 5/round · ea5afc43"
contentUuid: "884885a9-d84e-5e64-84b1-3f1c96bb0d34"
diamondUuid: "03161367-b089-8c83-a55b-a7550936bc71"
uuid: "ea5afc43-39ec-8e7f-9e60-df10c21d148c"
horo: 5
typography:
  partition: aura
  bondDegree: 0
standards: []
bindings: []
signatures:
  computationUuid: "8c0f1627-13d0-855e-b705-f47017f9d1ef"
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
      stageUuid: "0d2f90f3-78c9-8730-9d94-db9e336364f8"
    - stage: seal
      stageUuid: "56c9720b-760c-82af-b9be-dbcb8188b705"
    - stage: uuid
      stageUuid: "439579ab-74a3-87e3-ac11-178e7587495a"
version: 2
---
# propose

The computable proposer for [[aura]] / [[weave]]: for each orphan (an atom nothing links to), the target is the highest-[[mass]] atom whose SKILL.md text actually mentions the orphan word — a true co-occurrence relation, never invented. So harmonising needs no trained agent and cannot hallucinate; an orphan no atom mentions stays orphan (honest, no computable truth). [[merge]] · [[generate]].

**Law — [[law]]: every weave proposal is a true co-occurrence the live tree witnesses (the highest-[[mass]] atom that actually mentions the orphan), never invented — an orphan no atom mentions stays orphan.**

@audit no link invented — every proposal is a co-occurrence the live tree witnesses
