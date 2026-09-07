---
name: tasks
description: "Use when decomposing a project into WBS elements — assigning tasks, posting time-entries and material costs against a specific task code, computing per-task cost-to-cost % complete that rolls up to project-level IFRS-15 §35 recognition. The hierarchical work-breakdown collection under a project."
atomPath: "customers/projects/project/tasks"
coordinate: "customers/projects/project/tasks · 1/base · c6cc3156"
contentUuid: "a8b68c4c-e77f-54ce-8080-faa20a5130c0"
diamondUuid: "3aec51c9-c8ee-805f-9621-f18e2b98915c"
uuid: "c6cc3156-9942-8858-8e21-4bbe2e89d5e6"
horo: 1
typography:
  partition: customers
  bondDegree: 20
standards:
  - "IFRS IFRS-15 §35 over-time-recognition"
  - "IFRS IFRS-15 §B18 cost-to-cost"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "50d81e83-b99e-88a9-b665-deaa0ec33792"
  stages:
    - stage: path
      stageUuid: "a57cdb53-1b7d-81af-a372-2690819ffcd8"
    - stage: trinity
      stageUuid: "2e98c837-899d-84da-8676-6b296b236c17"
    - stage: boundary
      stageUuid: "c09c932d-8b48-820d-aab6-b5961d11eb7c"
    - stage: links
      stageUuid: "124fb871-33df-8351-80fd-0dc1cc10c465"
    - stage: horo
      stageUuid: "e4c31c7f-f2cc-8b8d-9eaf-25ce62291eb8"
    - stage: seal
      stageUuid: "82274d5a-73a9-8296-8ea8-f10b74ff350a"
    - stage: uuid
      stageUuid: "7198969c-c56c-89b3-bf05-74d76e486623"
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
