---
name: queue
description: "Use when managing or routing work in order — support ticket queue, task backlog, processing sequence by priority/SLA/assignment. The ordered collection of pending work."
atomPath: "vocabulary/queue"
coordinate: "vocabulary/queue · 4/weave · 56946fdc"
contentUuid: "e5926401-36f5-5ca2-b4cb-688c1fa71f15"
diamondUuid: "585f3838-90cb-8ba7-8f1a-a57b9882b317"
uuid: "56946fdc-e8a0-8ffa-97c2-d3f791cc62ea"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 28
standards: []
bindings: []
signatures:
  computationUuid: "359628b3-adbd-88f6-a2ac-e1bb7fc7b705"
  stages:
    - stage: path
      stageUuid: "617b2890-9808-89ee-8e98-346153860479"
    - stage: trinity
      stageUuid: "3e902255-8cf2-8c42-a9c3-d0eb17a67672"
    - stage: boundary
      stageUuid: "66c1b989-a934-8e9b-9145-84a7e7b3d5c5"
    - stage: links
      stageUuid: "5bfe1698-017e-82de-84e1-a07caea47901"
    - stage: horo
      stageUuid: "8d718f03-8a6e-8b07-a6d1-011021b1aced"
    - stage: seal
      stageUuid: "a388a51e-1f2f-8afd-bfc1-c4927161d3ef"
    - stage: uuid
      stageUuid: "6c5aefc2-404a-8ee2-b093-25a85a5d268f"
version: 2
---
# queue

Use when managing or routing work in order — support ticket queue, task backlog, processing sequence by priority/SLA/assignment. The ordered collection of pending work.

Composes: ticket · [[status]] · [[priority]] · [[Activities]] · [[Users]] · [[backlog]] · sla · [[assignment]].

**Law — [[law]]: a queue is the ordered collection of pending [[work]], routed in order by priority/SLA/assignment.**

## Standards
- ITIL queue state machine
- ISO-20000 queue management
