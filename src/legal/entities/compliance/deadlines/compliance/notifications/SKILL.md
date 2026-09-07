---
name: notifications
description: "Use when configuring or auditing deadline-reminder notifications — scheduled email, in-app, SMS, or calendar-event alerts to compliance officers and staff days before a compliance deadline is due per ISO-37301. The compliance-notification dispatch collection."
atomPath: "legal/entities/compliance/deadlines/compliance/notifications"
coordinate: "legal/entities/compliance/deadlines/compliance/notifications · 7/descent · 8b93f4ff"
contentUuid: "f53eec84-5c7f-5d1d-ae77-bda4a28473f1"
diamondUuid: "c449a98e-1036-87b7-8ff0-969d35aceaac"
uuid: "8b93f4ff-c7d3-8edb-b342-9f645b419416"
horo: 7
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
  computationUuid: "a95a412c-2c8a-8f83-9d38-d71371db3ee0"
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
      stageUuid: "983286bc-190d-8150-85db-b1fd9f5160fe"
    - stage: seal
      stageUuid: "7aae8859-8c2d-8722-a139-79b2309e5307"
    - stage: uuid
      stageUuid: "7596bd55-38d7-8ac9-98d6-16542e7f2d8a"
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
