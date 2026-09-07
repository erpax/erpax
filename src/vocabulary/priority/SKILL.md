---
name: priority
description: "Use when assigning work urgency or escalation level — P1/P2/P3/P4, Blocker/Critical/High/Medium/Low, SLA breach risk. The relative weight field."
atomPath: "vocabulary/priority"
coordinate: "vocabulary/priority · 5/round · 4a021b9c"
contentUuid: "b06d8468-327e-57f4-ad42-69866375a6bb"
diamondUuid: "58a1f71f-e5eb-8d0f-8afb-0e40d7a2238a"
uuid: "4a021b9c-f0b5-8b04-ae88-e00e053cb2b9"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 18
standards: []
bindings: []
signatures:
  computationUuid: "f09d9632-5f0f-85f6-999a-b53946173e1c"
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
      stageUuid: "59cf9425-130a-8cdb-9888-f66ccacd613e"
    - stage: seal
      stageUuid: "d42e3f66-fcb1-8a5f-af67-ce3c30af32be"
    - stage: uuid
      stageUuid: "0af4051f-f746-872a-932c-00c1f767adb6"
version: 2
---
# priority

Use when assigning work urgency or escalation level — P1/P2/P3/P4, Blocker/Critical/High/Medium/Low, SLA breach risk. The relative weight field.

Composes: [[workflow/definitions]] · [[sla]].

## Standards
- ITIL (priority matrix)
- incident management

**Law — [[law]]: priority is the relative-weight field that orders work by urgency and escalation level (P1–P4, Blocker→Low, SLA-breach risk) — a rank, not a state.**
