---
name: deadlines
description: "Use when tracking filing, audit, certification, reporting, payment, or disclosure deadlines per legal entity and jurisdiction — due-date management, on-track/at-risk/overdue status, and compliance calendar oversight per ISO-37301. The compliance-deadline calendar collection."
atomPath: "legal/entities/compliance/deadlines"
coordinate: "legal/entities/compliance/deadlines · 2/share · 2bc5f812"
contentUuid: "11cd4e25-7f74-548d-8fce-be6e8fd00f69"
diamondUuid: "bc53cdb5-1968-888f-b56f-8f72cb2f40cc"
uuid: "2bc5f812-e342-87bf-aa31-be401a16c6c5"
horo: 2
typography:
  partition: legal
  bondDegree: 9
standards:
  - "ISO-37301"
  - "ISO-37301:2021 compliance-management-systems"
  - "ISO-37301:2021 compliance-management-systems`"
  - "ISO-8601-1:2019 due-date"
  - "ISO-8601-1:2019 due-date`"
  - "US-CTA-2021"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "ee2d7abb-063b-8a0b-ab38-3a835cf0dc6e"
  stages:
    - stage: path
      stageUuid: "f22d93d6-7327-8c6d-9c07-15621935a2e4"
    - stage: trinity
      stageUuid: "4a44b9cf-1daa-811d-b20b-9d901c5dc25e"
    - stage: boundary
      stageUuid: "6884d5d5-1efa-83bf-8891-3adb398705b3"
    - stage: links
      stageUuid: "f408201f-2111-832f-9872-0d3fca93373c"
    - stage: horo
      stageUuid: "6eb04d2d-e491-8dde-b38d-83f1ae5c0b52"
    - stage: seal
      stageUuid: "3899d114-8c69-8f0f-9507-8244d1e06c34"
    - stage: uuid
      stageUuid: "facd2c5c-6601-8b9c-befd-75c67766c1fc"
version: 2
---
# compliance-deadlines

ComplianceDeadlines.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-37301:2021 compliance-management-systems`
- `@standard ISO-8601-1:2019 due-date`

- ISO-37301:2021 compliance-management-systems
- ISO-8601-1:2019 due-date
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[legal/entities/compliance/deadlines/compliance/notifications]].

**Law — [[law]]: every compliance obligation carries a due date with a derived on-track/at-risk/overdue status per entity and jurisdiction — so the compliance calendar makes lateness a computed state, never an unobserved miss.**
