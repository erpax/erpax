---
name: propose
description: "Use when computing weave proposals deterministically — for each orphan atom, the highest-mass atom whose text mentions it (a true co-occurrence, never invented), feeding the weave with no trained agent."
atomPath: "aura/propose"
coordinate: "aura/propose · 1/base · 7ae499b5"
contentUuid: "8afee359-ed3b-5475-900d-7218a19c32b8"
diamondUuid: "f55594a7-39aa-86a7-9056-e6376cba30fc"
uuid: "7ae499b5-d012-8867-8877-b2e281563782"
horo: 1
typography:
  partition: aura
  bondDegree: 0
standards: []
bindings: []
signatures:
  computationUuid: "79214f7b-45da-84a0-933e-0abc2e7d0ce1"
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
      stageUuid: "9ec04ce1-7e35-8a8c-9017-e44745d18f6d"
    - stage: seal
      stageUuid: "56c9720b-760c-82af-b9be-dbcb8188b705"
    - stage: uuid
      stageUuid: "20423500-4775-8e3a-b807-092f4382d3f4"
version: 2
---
# propose

The computable proposer for [[aura]] / [[weave]]: for each orphan (an atom nothing links to), the target is the highest-[[mass]] atom whose SKILL.md text actually mentions the orphan word — a true co-occurrence relation, never invented. So harmonising needs no trained agent and cannot hallucinate; an orphan no atom mentions stays orphan (honest, no computable truth). [[merge]] · [[generate]].

**Law — [[law]]: every weave proposal is a true co-occurrence the live tree witnesses (the highest-[[mass]] atom that actually mentions the orphan), never invented — an orphan no atom mentions stays orphan.**

@audit no link invented — every proposal is a co-occurrence the live tree witnesses
