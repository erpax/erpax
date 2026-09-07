---
name: queue
description: "Use when managing or routing work in order — support ticket queue, task backlog, processing sequence by priority/SLA/assignment. The ordered collection of pending work."
atomPath: "vocabulary/queue"
coordinate: "vocabulary/queue · 5/round · 838d9b2e"
contentUuid: "259f152a-f8cf-5bf7-b7e6-43ccc91c51ae"
diamondUuid: "6e50482f-e71b-8933-a818-38befc03122b"
uuid: "838d9b2e-8096-8c09-ab73-a39a76a5d5d0"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "17b3772b-1b42-86ba-a01c-953c631f7b1a"
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
      stageUuid: "40106353-6710-87c6-b4bf-3be7da734405"
    - stage: seal
      stageUuid: "a388a51e-1f2f-8afd-bfc1-c4927161d3ef"
    - stage: uuid
      stageUuid: "91ff7ed8-ebde-8645-9cc9-5bb1fc7dddf0"
version: 2
---
# queue

Use when managing or routing work in order — support ticket queue, task backlog, processing sequence by priority/SLA/assignment. The ordered collection of pending work.

Composes: [[ticket]] · [[status]] · [[priority]] · [[Activities]] · [[Users]] · [[backlog]] · [[sla]] · [[assignment]].

**Law — [[law]]: a queue is the ordered collection of pending [[work]], routed in order by priority/SLA/assignment.**

## Standards
- ITIL queue state machine
- ISO-20000 queue management
