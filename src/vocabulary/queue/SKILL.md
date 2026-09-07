---
name: queue
description: "Use when managing or routing work in order — support ticket queue, task backlog, processing sequence by priority/SLA/assignment. The ordered collection of pending work."
atomPath: "vocabulary/queue"
coordinate: "vocabulary/queue · 8/crest · e33f07bb"
contentUuid: "4cf50758-dbd1-589d-9029-e184dae1c266"
diamondUuid: "13f07148-81be-8a5f-84ad-9bb3bb33a87c"
uuid: "e33f07bb-17be-84e1-ab45-23a8637c226d"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "03bf5503-cd2c-87cd-aa30-566c730f51aa"
  stages:
    - stage: path
      stageUuid: "617b2890-9808-89ee-8e98-346153860479"
    - stage: trinity
      stageUuid: "3e902255-8cf2-8c42-a9c3-d0eb17a67672"
    - stage: boundary
      stageUuid: "1743a8b0-b841-8438-bd8d-402a88a13896"
    - stage: links
      stageUuid: "dc06b6b8-ee9b-8f36-9106-16a4f77fee25"
    - stage: horo
      stageUuid: "9f53e516-65ba-8903-a63f-b830f85f6c84"
    - stage: seal
      stageUuid: "a388a51e-1f2f-8afd-bfc1-c4927161d3ef"
    - stage: uuid
      stageUuid: "5555f810-4b0e-87e1-a049-590662b4ec4b"
version: 2
---
# queue

Use when managing or routing work in order — support ticket queue, task backlog, processing sequence by priority/SLA/assignment. The ordered collection of pending work.

Composes: [[ticket]] · [[status]] · [[priority]] · [[Activities]] · [[Users]] · [[backlog]] · [[sla]] · [[assignment]].

**Law — [[law]]: a queue is the ordered collection of pending [[work]], routed in order by priority/SLA/assignment.**

## Standards
- ITIL queue state machine
- ISO-20000 queue management
