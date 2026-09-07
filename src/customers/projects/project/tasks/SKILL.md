---
name: tasks
description: "Use when decomposing a project into WBS elements — assigning tasks, posting time-entries and material costs against a specific task code, computing per-task cost-to-cost % complete that rolls up to project-level IFRS-15 §35 recognition. The hierarchical work-breakdown collection under a project."
atomPath: "customers/projects/project/tasks"
coordinate: "customers/projects/project/tasks · 2/share · df36167a"
contentUuid: "3f3ddeff-6445-5381-8e71-17ea8f74d238"
diamondUuid: "7a96dbea-f559-8e5c-b1c6-6a1956a05e44"
uuid: "df36167a-7a13-8c79-86e2-abf3d59ff8a6"
horo: 2
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
  computationUuid: "995c7eda-2f84-86d1-a856-04bb780e2f07"
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
      stageUuid: "6a600078-72fc-8b93-aefc-d610edfd6bab"
    - stage: seal
      stageUuid: "82274d5a-73a9-8296-8ea8-f10b74ff350a"
    - stage: uuid
      stageUuid: "cbb8e60a-7da0-8ec1-9fb6-355c481dcfdc"
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
