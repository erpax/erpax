---
name: deadlines
description: "Use when tracking filing, audit, certification, reporting, payment, or disclosure deadlines per legal entity and jurisdiction — due-date management, on-track/at-risk/overdue status, and compliance calendar oversight per ISO-37301. The compliance-deadline calendar collection."
atomPath: "legal/entities/compliance/deadlines"
coordinate: "legal/entities/compliance/deadlines · 2/share · 0d886cfa"
contentUuid: "e95aff43-e342-5e4e-a61a-6c3dfe811337"
diamondUuid: "03c3f86b-6da1-84c8-8ef7-90d1b7224196"
uuid: "0d886cfa-fec2-8392-989c-642a630df32e"
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
  computationUuid: "525c5970-e8e3-8034-8ae2-8292d9253b03"
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
      stageUuid: "36288f78-1c05-8ede-88cd-4cfe7facd7d7"
    - stage: seal
      stageUuid: "3899d114-8c69-8f0f-9507-8244d1e06c34"
    - stage: uuid
      stageUuid: "b6273bbb-547f-8068-8d1d-5cb4bc195410"
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
