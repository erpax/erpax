---
name: queue
description: "Use when managing or routing work in order — support ticket queue, task backlog, processing sequence by priority/SLA/assignment. The ordered collection of pending work."
atomPath: "vocabulary/queue"
coordinate: "vocabulary/queue · 1/base · dd9b3880"
contentUuid: "f239a62a-778b-5ca8-a8e6-43ea2f1bea51"
diamondUuid: "09106f2a-d5da-8d29-ab05-6e03340ce2d8"
uuid: "dd9b3880-4b92-8171-b3d2-0e9bfacc39f8"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 31
standards: []
bindings: []
signatures:
  computationUuid: "70c9cc8e-e44b-8b28-b45a-bedab4b80b56"
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
      stageUuid: "39afb588-95e9-800a-b702-43717251481e"
    - stage: seal
      stageUuid: "a388a51e-1f2f-8afd-bfc1-c4927161d3ef"
    - stage: uuid
      stageUuid: "6d282bc1-4dfa-8c82-aff5-b6573f4421f9"
version: 2
---
# queue

Use when managing or routing work in order — support ticket queue, task backlog, processing sequence by priority/SLA/assignment. The ordered collection of pending work.

Composes: [[ticket]] · [[status]] · [[priority]] · [[Activities]] · [[Users]] · [[backlog]] · [[sla]] · [[assignment]].

**Law — [[law]]: a queue is the ordered collection of pending [[work]], routed in order by priority/SLA/assignment.**

## Standards
- ITIL queue state machine
- ISO-20000 queue management
