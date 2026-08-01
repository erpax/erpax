---
name: notifications
description: "Use when configuring or auditing deadline-reminder notifications — scheduled email, in-app, SMS, or calendar-event alerts to compliance officers and staff days before a compliance deadline is due per ISO-37301. The compliance-notification dispatch collection."
atomPath: "legal/entities/compliance/deadlines/compliance/notifications"
coordinate: "legal/entities/compliance/deadlines/compliance/notifications · 8/crest · 3b6d2a75"
contentUuid: "1b0b490e-b5c7-5198-8f83-3e719c846e34"
diamondUuid: "a79c4bbc-b9e4-83c6-88a3-73486fdb462c"
uuid: "3b6d2a75-0436-870d-9e36-b05f91724038"
horo: 8
typography:
  partition: legal
  bondDegree: 3
standards:
  - "ISO-37301"
  - "ISO-37301:2021 compliance-management"
  - "ISO-37301:2021 compliance-management`"
  - "ISO-8601-1:2019 notified-at"
  - "ISO-8601-1:2019 notified-at`"
  - "US-CTA-2021"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "6438248b-942c-89fc-a8f8-c88e89ea5622"
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
      stageUuid: "5bf33de8-1cde-865c-b060-99c397f66773"
    - stage: seal
      stageUuid: "7aae8859-8c2d-8722-a139-79b2309e5307"
    - stage: uuid
      stageUuid: "87c71b70-586c-8e62-b488-9a298a2f77a8"
version: 2
---
# compliance-notifications

ComplianceNotifications.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-37301:2021 compliance-management`
- `@standard ISO-8601-1:2019 notified-at`

- ISO-37301:2021 compliance-management
- ISO-8601-1:2019 notified-at
- ISO-27001 A.5.23 cloud-service-tenant-isolation
