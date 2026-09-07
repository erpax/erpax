---
name: schedule
description: "Use when assigning work to calendar slots — resource schedules, shift rosters, project timelines, appointment booking. The time-coordinate commitment."
atomPath: schedule
coordinate: "schedule · 7/descent · bdc15eea"
contentUuid: "ef137a36-8c90-5812-aafe-9701facccb6c"
diamondUuid: "faa845b5-0ec9-855d-a599-b1c949ef9708"
uuid: "bdc15eea-3406-8d36-94a9-a419bfdbabd2"
horo: 7
typography:
  partition: schedule
  bondDegree: 79
standards: []
bindings: []
signatures:
  computationUuid: "1efa16eb-f55c-8b8c-a57c-f20c8c7a3d62"
  stages:
    - stage: path
      stageUuid: "259af7f0-2e78-856a-89aa-7896763108ce"
    - stage: trinity
      stageUuid: "975c12cb-53aa-8685-9f30-1f0eae2f3ef1"
    - stage: boundary
      stageUuid: "365be3c3-d1f4-8ff5-b4c9-8557c1f6ef40"
    - stage: links
      stageUuid: "413a0365-ee02-8e3d-b919-72b871054848"
    - stage: horo
      stageUuid: "04275ba6-97be-89cf-a921-696c2c29eb9a"
    - stage: seal
      stageUuid: "1bb48b25-5485-8342-8157-3ee8c8db0514"
    - stage: uuid
      stageUuid: "73b1764c-6182-88f9-b2c0-ab901b4921bd"
version: 2
---
# schedule

Use when assigning work to calendar slots — resource schedules, shift rosters, project timelines, appointment booking. The time-coordinate commitment.

Composes: [[bookable/resources]] · [[Bookings]] · [[work/shifts|WorkShifts]] · [[horo]] · [[begin]].

## Standards
- iCalendar (RFC 5545)
- BPMN timing

**Law — [[law]]: a schedule is the commitment of work to a time-coordinate — a resource, shift, project task or appointment bound to a calendar slot on the [[horo]] time ring.**
