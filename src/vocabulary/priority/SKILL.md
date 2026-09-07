---
name: priority
description: "Use when assigning work urgency or escalation level — P1/P2/P3/P4, Blocker/Critical/High/Medium/Low, SLA breach risk. The relative weight field."
atomPath: "vocabulary/priority"
coordinate: "vocabulary/priority · 5/round · 2b814e1f"
contentUuid: "7ef5c857-180d-5d04-ba5b-7a430427100c"
diamondUuid: "597db6c8-0927-8d6f-9013-a94bd8bdad89"
uuid: "2b814e1f-e84b-81b1-8129-4cec818a4bab"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 18
standards: []
bindings: []
signatures:
  computationUuid: "e5f23837-603a-8adb-ab56-d0db699a3675"
  stages:
    - stage: path
      stageUuid: "17fc4bef-3c2a-8779-89a2-008b55da246e"
    - stage: trinity
      stageUuid: "1b8fb75c-6e62-8901-9d5a-6a684da6a30e"
    - stage: boundary
      stageUuid: "c0ee5401-aea6-8862-8908-785ed19e02b4"
    - stage: links
      stageUuid: "45bd5668-c438-89bf-8069-ca5b29c5d7ff"
    - stage: horo
      stageUuid: "d2c40497-3985-8683-ad94-f0e695b67164"
    - stage: seal
      stageUuid: "d42e3f66-fcb1-8a5f-af67-ce3c30af32be"
    - stage: uuid
      stageUuid: "604b6be7-c158-82f9-8f80-5640d4fe7a3d"
version: 2
---
# priority

Use when assigning work urgency or escalation level — P1/P2/P3/P4, Blocker/Critical/High/Medium/Low, SLA breach risk. The relative weight field.

Composes: [[workflow/definitions]] · [[sla]].

## Standards
- ITIL (priority matrix)
- incident management

**Law — [[law]]: priority is the relative-weight field that orders work by urgency and escalation level (P1–P4, Blocker→Low, SLA-breach risk) — a rank, not a state.**
