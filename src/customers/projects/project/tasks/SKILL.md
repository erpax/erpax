---
name: tasks
description: "Use when decomposing a project into WBS elements — assigning tasks, posting time-entries and material costs against a specific task code, computing per-task cost-to-cost % complete that rolls up to project-level IFRS-15 §35 recognition. The hierarchical work-breakdown collection under a project."
atomPath: "customers/projects/project/tasks"
coordinate: "customers/projects/project/tasks · 7/descent · 8349d98c"
contentUuid: "d9ba7d04-0990-587a-84b2-45d73ff155fa"
diamondUuid: "525bf3a3-4701-8059-9fc0-d92024c11b5b"
uuid: "8349d98c-8ab4-8e04-9972-8e90afb27f64"
horo: 7
typography:
  partition: customers
  bondDegree: 30
standards:
  - "IFRS IFRS-15 §35 over-time-recognition"
  - "IFRS IFRS-15 §B18 cost-to-cost"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "a6b9f990-fa58-8c8c-b391-98386a3ac78e"
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
      stageUuid: "636a4df0-9678-816a-a409-fb40d161994c"
    - stage: seal
      stageUuid: "82274d5a-73a9-8296-8ea8-f10b74ff350a"
    - stage: uuid
      stageUuid: "b1699ebf-595c-82b0-aa0c-8d8764b5bd6b"
version: 2
---
# project-tasks

[[standard]] (ISO-8601-1:2019 date-time), [[accounting]] (IFRS-15 §35 over-time recognition, §B18 cost-to-cost), [[transaction]] (time-entries + purchase-orders posting to WBS elements), [[identity]] (assignee, user audit trail per ISO-19011:2018 wbs-evidence), and [[proof]] (cloud-service-tenant-isolation per ISO-27001 A.5.23) compose this collection. See `index.ts` for schema + sibling `seed.ts` (opening data) and `index.test.ts` (invariant checks).

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time`

- ISO-8601-1:2019 date-time
- IFRS IFRS-15 §35 over-time-recognition
- IFRS IFRS-15 §B18 cost-to-cost
- ISO-19011:2018 audit-trail wbs-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: every cost posts to a WBS task code, and per-task cost-to-cost percentages roll up to the project's over-time recognition.**
