---
name: deadlines
description: "Use when tracking filing, audit, certification, reporting, payment, or disclosure deadlines per legal entity and jurisdiction — due-date management, on-track/at-risk/overdue status, and compliance calendar oversight per ISO-37301. The compliance-deadline calendar collection."
atomPath: "legal/entities/compliance/deadlines"
coordinate: "legal/entities/compliance/deadlines · 2/share · daf47da2"
contentUuid: "a67cf27c-9463-5d31-990e-0ba4d2d4292e"
diamondUuid: "5d9269b7-b214-85e2-b984-a3015aa2a2b2"
uuid: "daf47da2-eda4-8b71-b925-196965a46e38"
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
  computationUuid: "df402519-7d24-8758-9fb0-9a4fea823eda"
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
      stageUuid: "485a3e6d-7a04-8230-be80-d3d78ac50bdc"
    - stage: seal
      stageUuid: "3899d114-8c69-8f0f-9507-8244d1e06c34"
    - stage: uuid
      stageUuid: "2382d175-953f-8dbb-87a8-ab8c9234b170"
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
