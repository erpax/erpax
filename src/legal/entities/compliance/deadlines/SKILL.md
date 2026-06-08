---
name: deadlines
description: "Use when tracking filing, audit, certification, reporting, payment, or disclosure deadlines per legal entity and jurisdiction — due-date management, on-track/at-risk/overdue status, and compliance calendar oversight per ISO-37301. The compliance-deadline calendar collection."
atomPath: legal/entities/compliance/deadlines
coordinate: legal/entities/compliance/deadlines · 5/round · 26a44c55
contentUuid: "5b2fd9bd-98a3-5129-8d01-7183761e8c24"
diamondUuid: "8b77986e-e051-83ff-a7c1-099e35940ed9"
uuid: "26a44c55-2557-8d6b-88b7-4281fc879f16"
horo: 5
bonds:
  in:
    - entities
    - law
    - notifications
  out:
    - entities
    - law
    - notifications
typography:
  partition: legal
  bondDegree: 0
  neighbors: []
standards:
  - "ISO-37301"
  - "ISO-37301:2021 compliance-management-systems"
  - "ISO-8601-1:2019 due-date"
  - "US-CTA-2021"
bindings: []
neighbors:
  wikilink:
    - law
    - notifications
  matrix:
    - entities
    - law
    - notifications
  backlinks:
    - entities
    - law
    - notifications
signatures:
  computationUuid: "eb6449ca-1d60-8019-9f2c-473637eafa36"
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
      stageUuid: "61bf2c7c-85a2-8eca-9b5a-f65b0fcdeaba"
    - stage: seal
      stageUuid: "3899d114-8c69-8f0f-9507-8244d1e06c34"
    - stage: uuid
      stageUuid: "ad0505db-4854-8f86-959c-14ff8ab3cb0e"
version: 2
---
# compliance-deadlines

ComplianceDeadlines.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-37301:2021 compliance-management-systems
- ISO-8601-1:2019 due-date
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[legal/entities/compliance/deadlines/compliance/notifications]].

**Law — [[law]]: every compliance obligation carries a due date with a derived on-track/at-risk/overdue status per entity and jurisdiction — so the compliance calendar makes lateness a computed state, never an unobserved miss.**
