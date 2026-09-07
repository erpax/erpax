---
name: queue
description: "Use when managing or routing work in order — support ticket queue, task backlog, processing sequence by priority/SLA/assignment. The ordered collection of pending work."
atomPath: "vocabulary/queue"
coordinate: "vocabulary/queue · 1/base · 7a58d309"
contentUuid: "d1f2181e-ce91-5dfa-828c-f6ecdf5a0345"
diamondUuid: "17620077-1f34-8418-9d99-089a16a0cc99"
uuid: "7a58d309-075b-8ddb-9d1b-3a2d6623deda"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "1c4be4f0-a7aa-8ce4-a43a-a6f799aed6bb"
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
      stageUuid: "bd3eca17-9e99-8086-8c2c-a54508da3e34"
    - stage: seal
      stageUuid: "a388a51e-1f2f-8afd-bfc1-c4927161d3ef"
    - stage: uuid
      stageUuid: "9b63a093-28a7-8333-9f5f-fc24e356d18b"
version: 2
---
# queue

Use when managing or routing work in order — support ticket queue, task backlog, processing sequence by priority/SLA/assignment. The ordered collection of pending work.

Composes: [[ticket]] · [[status]] · [[priority]] · [[Activities]] · [[Users]] · [[backlog]] · [[sla]] · [[assignment]].

**Law — [[law]]: a queue is the ordered collection of pending [[work]], routed in order by priority/SLA/assignment.**

## Standards
- ITIL queue state machine
- ISO-20000 queue management
