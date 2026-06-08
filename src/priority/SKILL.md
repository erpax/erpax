---
name: priority
description: "Use when assigning work urgency or escalation level — P1/P2/P3/P4, Blocker/Critical/High/Medium/Low, SLA breach risk. The relative weight field."
atomPath: priority
coordinate: priority · 1/base · 9741efc7
contentUuid: "7da601a0-5e7b-5c74-a108-9506cbabd1a9"
diamondUuid: "a31e40a8-bc5a-8f3a-a66f-9456ffc45011"
uuid: "9741efc7-2f3b-8ee1-9fdd-b6cfd9e095d6"
horo: 1
bonds:
  in:
    - backlog
    - definitions
    - law
    - passenger
    - queue
    - sla
  out:
    - backlog
    - definitions
    - law
    - passenger
    - queue
    - sla
typography:
  partition: priority
  bondDegree: 18
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - definitions
    - law
    - sla
  matrix:
    - backlog
    - definitions
    - law
    - passenger
    - queue
    - sla
  backlinks:
    - backlog
    - definitions
    - law
    - passenger
    - queue
    - sla
signatures:
  computationUuid: "44d1a138-33fd-8c63-ab66-0c664a9a22c1"
  stages:
    - stage: path
      stageUuid: "fb802e09-01ef-85b3-ab98-6c12d5a229db"
    - stage: trinity
      stageUuid: "0935edf1-f503-8c0e-bc2f-72d10e687006"
    - stage: boundary
      stageUuid: "740d20a9-f104-8b75-8df5-49fb91287be0"
    - stage: links
      stageUuid: "6d2843e6-f640-8630-b6b2-729ea3d89c30"
    - stage: horo
      stageUuid: "05ab34b2-f078-843e-86ed-d5196bb19751"
    - stage: seal
      stageUuid: "90d797a9-9802-8e4c-a91c-4f0ff407af81"
    - stage: uuid
      stageUuid: "a5ae465b-73db-8b5c-9733-5f437ee1b964"
version: 2
---
# priority

Use when assigning work urgency or escalation level — P1/P2/P3/P4, Blocker/Critical/High/Medium/Low, SLA breach risk. The relative weight field.

Composes: [[workflow/definitions]] · [[sla]].

## Standards
- ITIL (priority matrix)
- incident management

**Law — [[law]]: priority is the relative-weight field that orders work by urgency and escalation level (P1–P4, Blocker→Low, SLA-breach risk) — a rank, not a state.**
