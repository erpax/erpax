---
name: tasks
description: "Use when decomposing a project into WBS elements — assigning tasks, posting time-entries and material costs against a specific task code, computing per-task cost-to-cost % complete that rolls up to project-level IFRS-15 §35 recognition. The hierarchical work-breakdown collection under a project."
atomPath: "customers/projects/project/tasks"
coordinate: "customers/projects/project/tasks · 4/weave · 1e8ceca1"
contentUuid: "19254efb-c9e3-5a47-8d44-8eec9ae3ac56"
diamondUuid: "3774516d-1906-8b9a-98f3-6b969cef8a96"
uuid: "1e8ceca1-f3ca-86fc-bcf2-109718952115"
horo: 4
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
  computationUuid: "a31e35f9-92cd-8960-978e-2f7891a700ff"
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
      stageUuid: "46146a32-9f78-8919-ac45-14a77f5b8a40"
    - stage: seal
      stageUuid: "82274d5a-73a9-8296-8ea8-f10b74ff350a"
    - stage: uuid
      stageUuid: "b5652be8-702d-8e8d-9bf7-4e8d44ebfd03"
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
