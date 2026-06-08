---
name: queue
description: "Use when managing or routing work in order — support ticket queue, task backlog, processing sequence by priority/SLA/assignment. The ordered collection of pending work."
atomPath: queue
coordinate: queue · 8/crest · fd11e09d
contentUuid: "e5f1335c-c065-5689-99e8-715aa7827f23"
diamondUuid: "ebca97fc-e226-8c7d-8e7e-9c2395bbca6c"
uuid: "fd11e09d-09ae-8d1f-bed4-6d55b5447d07"
horo: 8
bonds:
  in:
    - activities
    - assignment
    - backlog
    - bindings
    - law
    - priority
    - pwa
    - request
    - sla
    - status
    - ticket
    - users
    - work
  out:
    - activities
    - assignment
    - backlog
    - bindings
    - law
    - priority
    - pwa
    - request
    - sla
    - status
    - ticket
    - users
    - work
typography:
  partition: queue
  bondDegree: 40
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - activities
    - assignment
    - backlog
    - law
    - priority
    - sla
    - status
    - ticket
    - users
    - work
  matrix:
    - activities
    - assignment
    - backlog
    - bindings
    - law
    - priority
    - pwa
    - request
    - sla
    - status
    - ticket
    - users
    - work
  backlinks:
    - activities
    - assignment
    - backlog
    - bindings
    - law
    - priority
    - pwa
    - request
    - sla
    - status
    - ticket
    - users
    - work
signatures:
  computationUuid: "b7352dbd-18f4-8c22-ba50-0dd921b77580"
  stages:
    - stage: path
      stageUuid: "09cc79b6-dae0-82e1-b72d-d049c5b693dc"
    - stage: trinity
      stageUuid: "42804998-6d0e-82c6-adf6-d2cc0d024564"
    - stage: boundary
      stageUuid: "1609175f-d5d9-8c9d-b48d-cbdee548eed8"
    - stage: links
      stageUuid: "9d6a41f7-5d32-8548-a641-11267d8a97b3"
    - stage: horo
      stageUuid: "797585de-02b0-8d73-8442-a631cc4522d0"
    - stage: seal
      stageUuid: "cdfd7864-416a-874d-988e-63b2d9329fa3"
    - stage: uuid
      stageUuid: "d1b8023e-279d-8998-b8db-9959fcb0eeb5"
version: 2
---
# queue

Use when managing or routing work in order — support ticket queue, task backlog, processing sequence by priority/SLA/assignment. The ordered collection of pending work.

Composes: [[ticket]] · [[status]] · [[priority]] · [[Activities]] · [[Users]] · [[backlog]] · [[sla]] · [[assignment]].

**Law — [[law]]: a queue is the ordered collection of pending [[work]], routed in order by priority/SLA/assignment.**

## Standards
- ITIL queue state machine
- ISO-20000 queue management
