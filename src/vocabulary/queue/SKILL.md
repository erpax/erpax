---
name: queue
description: "Use when managing or routing work in order — support ticket queue, task backlog, processing sequence by priority/SLA/assignment. The ordered collection of pending work."
atomPath: "vocabulary/queue"
coordinate: "vocabulary/queue · 5/round · e6a9d8f0"
contentUuid: "942b035b-7541-5e61-af57-6ecbc2d3012d"
diamondUuid: "b7998d1c-e46c-8810-98c3-3fe4bc4eb916"
uuid: "e6a9d8f0-b639-84c3-a90a-569b519b9040"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "5c59c8cc-e02f-82c8-977c-b52b3090a8b3"
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
      stageUuid: "c282b2d5-9ece-8b76-b447-b2ec86d427cf"
    - stage: seal
      stageUuid: "a388a51e-1f2f-8afd-bfc1-c4927161d3ef"
    - stage: uuid
      stageUuid: "b6f50934-7150-8947-9dd6-4eb828e36f75"
version: 2
---
# queue

Use when managing or routing work in order — support ticket queue, task backlog, processing sequence by priority/SLA/assignment. The ordered collection of pending work.

Composes: [[ticket]] · [[status]] · [[priority]] · [[Activities]] · [[Users]] · [[backlog]] · [[sla]] · [[assignment]].

**Law — [[law]]: a queue is the ordered collection of pending [[work]], routed in order by priority/SLA/assignment.**

## Standards
- ITIL queue state machine
- ISO-20000 queue management
