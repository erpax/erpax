---
name: deadlines
description: "Use when tracking filing, audit, certification, reporting, payment, or disclosure deadlines per legal entity and jurisdiction — due-date management, on-track/at-risk/overdue status, and compliance calendar oversight per ISO-37301. The compliance-deadline calendar collection."
atomPath: "legal/entities/compliance/deadlines"
coordinate: "legal/entities/compliance/deadlines · 4/weave · 511778c6"
contentUuid: "fcd494a5-577d-5d8b-8e3f-3235bc735bb1"
diamondUuid: "91fe7c74-5f3f-8819-b153-f0c0cf935620"
uuid: "511778c6-328e-85a5-ad9b-86c280073f00"
horo: 4
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
  computationUuid: "462d4ae9-cea0-8b2b-9d2d-70166f17da34"
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
      stageUuid: "8408b658-2f5b-8f81-9516-2f4149e97d3d"
    - stage: seal
      stageUuid: "3899d114-8c69-8f0f-9507-8244d1e06c34"
    - stage: uuid
      stageUuid: "45233ee8-1cc8-84cf-a130-14bbc3a99983"
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
