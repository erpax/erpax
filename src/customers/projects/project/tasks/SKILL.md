---
name: tasks
description: "Use when decomposing a project into WBS elements — assigning tasks, posting time-entries and material costs against a specific task code, computing per-task cost-to-cost % complete that rolls up to project-level IFRS-15 §35 recognition. The hierarchical work-breakdown collection under a project."
atomPath: customers/projects/project/tasks
coordinate: customers/projects/project/tasks · 5/round · f02c94ec
contentUuid: "855c5ca7-afb1-5540-b94b-5867c2b8568e"
diamondUuid: "d6709a03-c760-8771-942d-f7a0dceaf9d9"
uuid: "f02c94ec-4379-84a0-bbe3-930c567daf7c"
horo: 5
bonds:
  in:
    - accounting
    - backlog
    - identity
    - law
    - project
    - projects
    - proof
    - roadmap
    - standard
    - task
    - transaction
  out:
    - accounting
    - backlog
    - identity
    - law
    - projects
    - proof
    - roadmap
    - standard
    - task
    - transaction
typography:
  partition: customers
  bondDegree: 30
  neighbors: []
standards:
  - "IFRS IFRS-15 §35 over-time-recognition"
  - "IFRS IFRS-15 §B18 cost-to-cost"
  - "ISO-19011:2018 audit-trail wbs-evidence"
  - "ISO-8601-1:2019 date-time"
bindings: []
neighbors:
  wikilink:
    - accounting
    - identity
    - law
    - proof
    - standard
    - transaction
  matrix:
    - accounting
    - backlog
    - identity
    - law
    - projects
    - proof
    - roadmap
    - standard
    - task
    - transaction
  backlinks:
    - accounting
    - backlog
    - identity
    - law
    - projects
    - proof
    - roadmap
    - standard
    - task
    - transaction
signatures:
  computationUuid: "88f18bd6-9a44-8c65-8ce6-d21bc91b7689"
  stages:
    - stage: path
      stageUuid: "a57cdb53-1b7d-81af-a372-2690819ffcd8"
    - stage: trinity
      stageUuid: "2e98c837-899d-84da-8676-6b296b236c17"
    - stage: boundary
      stageUuid: "c09c932d-8b48-820d-aab6-b5961d11eb7c"
    - stage: links
      stageUuid: "25ec2227-8b1f-81cb-a63a-1f308f0cb1a0"
    - stage: horo
      stageUuid: "2e6dda2a-e059-8c5c-95a7-76ce5eb6ee88"
    - stage: seal
      stageUuid: "82274d5a-73a9-8296-8ea8-f10b74ff350a"
    - stage: uuid
      stageUuid: "3e245fdf-bdcc-8c8f-8281-c348e068efe3"
version: 2
---
# project-tasks

[[standard]] (ISO-8601-1:2019 date-time), [[accounting]] (IFRS-15 §35 over-time recognition, §B18 cost-to-cost), [[transaction]] (time-entries + purchase-orders posting to WBS elements), [[identity]] (assignee, user audit trail per ISO-19011:2018 wbs-evidence), and [[proof]] (cloud-service-tenant-isolation per ISO-27001 A.5.23) compose this collection. See `index.ts` for schema + sibling `seed.ts` (opening data) and `index.test.ts` (invariant checks).

## Standards
- ISO-8601-1:2019 date-time
- IFRS IFRS-15 §35 over-time-recognition
- IFRS IFRS-15 §B18 cost-to-cost
- ISO-19011:2018 audit-trail wbs-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: every cost posts to a WBS task code, and per-task cost-to-cost percentages roll up to the project's over-time recognition.**
