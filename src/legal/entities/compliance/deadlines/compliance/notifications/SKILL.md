---
name: notifications
description: "Use when configuring or auditing deadline-reminder notifications — scheduled email, in-app, SMS, or calendar-event alerts to compliance officers and staff days before a compliance deadline is due per ISO-37301. The compliance-notification dispatch collection."
atomPath: legal/entities/compliance/deadlines/compliance/notifications
coordinate: legal/entities/compliance/deadlines/compliance/notifications · 8/crest · 02ad448d
contentUuid: "f063f14a-a799-5398-8e89-f596e83fd5ff"
diamondUuid: "bb673377-ba31-8c23-9db2-564ade6ca5b1"
uuid: "02ad448d-5a36-8d3e-a4b7-345386250bde"
horo: 8
bonds:
  in:
    - deadlines
  out:
    - deadlines
typography:
  partition: legal
  bondDegree: 3
  neighbors: []
standards:
  - "ISO-37301"
  - "ISO-37301:2021 compliance-management"
  - "ISO-8601-1:2019 notified-at"
  - "US-CTA-2021"
bindings: []
neighbors:
  wikilink: []
  matrix:
    - deadlines
  backlinks:
    - deadlines
signatures:
  computationUuid: "d765e84e-7324-894d-874b-6bdd0715a196"
  stages:
    - stage: path
      stageUuid: "32a71354-b624-8b99-873b-bd8553e6f18b"
    - stage: trinity
      stageUuid: "6a472a40-9144-8043-ad28-012e91d23b9c"
    - stage: boundary
      stageUuid: "792c026d-182b-880c-9feb-72c1cec1c737"
    - stage: links
      stageUuid: "c979f220-3234-8ef1-88e3-61d42a8d8932"
    - stage: horo
      stageUuid: "24cc3240-e664-861c-a70a-db546380d1ff"
    - stage: seal
      stageUuid: "7aae8859-8c2d-8722-a139-79b2309e5307"
    - stage: uuid
      stageUuid: "dd8e0a99-bbdd-8380-9061-979263e615a5"
version: 2
---
# compliance-notifications

ComplianceNotifications.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-37301:2021 compliance-management
- ISO-8601-1:2019 notified-at
- ISO-27001 A.5.23 cloud-service-tenant-isolation
