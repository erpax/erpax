---
name: propose
description: "Use when computing weave proposals deterministically — for each orphan atom, the highest-mass atom whose text mentions it (a true co-occurrence, never invented), feeding the weave with no trained agent."
atomPath: "aura/propose"
coordinate: "aura/propose · 1/base · e7f57390"
contentUuid: "fc23e36c-fc8b-5a41-8534-e815ce4e1d5f"
diamondUuid: "6626b678-a533-8df2-ac8c-55c834062fd1"
uuid: "e7f57390-f23f-8ca3-a42e-b87bb29f3dc4"
horo: 1
typography:
  partition: aura
  bondDegree: 0
standards: []
bindings: []
signatures:
  computationUuid: "5a8318ee-653c-8b9d-b6f7-dcd72183138c"
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
      stageUuid: "1e12b32e-7fbd-8243-aac6-2e1fd9e435e2"
    - stage: seal
      stageUuid: "56c9720b-760c-82af-b9be-dbcb8188b705"
    - stage: uuid
      stageUuid: "783a5a95-edea-8f48-bbca-24c901d0e93a"
version: 2
---
# propose

The computable proposer for [[aura]] / [[weave]]: for each orphan (an atom nothing links to), the target is the highest-[[mass]] atom whose SKILL.md text actually mentions the orphan word — a true co-occurrence relation, never invented. So harmonising needs no trained agent and cannot hallucinate; an orphan no atom mentions stays orphan (honest, no computable truth). [[merge]] · [[generate]].

**Law — [[law]]: every weave proposal is a true co-occurrence the live tree witnesses (the highest-[[mass]] atom that actually mentions the orphan), never invented — an orphan no atom mentions stays orphan.**

@audit no link invented — every proposal is a co-occurrence the live tree witnesses
