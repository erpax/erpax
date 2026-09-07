---
name: notifications
description: "Use when configuring or auditing deadline-reminder notifications — scheduled email, in-app, SMS, or calendar-event alerts to compliance officers and staff days before a compliance deadline is due per ISO-37301. The compliance-notification dispatch collection."
atomPath: "legal/entities/compliance/deadlines/compliance/notifications"
coordinate: "legal/entities/compliance/deadlines/compliance/notifications · 7/descent · f764d0c6"
contentUuid: "deebb75a-96df-5467-b179-67bf0f195810"
diamondUuid: "4ccfb7bd-4907-87f4-b71c-a0a28a2a73e1"
uuid: "f764d0c6-eb87-8e22-9252-b7631d4462ac"
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
  computationUuid: "ba7693bd-2c89-8923-ab81-a18712758021"
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
      stageUuid: "f10661c0-de0b-8280-94dc-7d013e1f1f41"
    - stage: seal
      stageUuid: "7aae8859-8c2d-8722-a139-79b2309e5307"
    - stage: uuid
      stageUuid: "ce9b3015-e760-8017-8fdf-d7d0eb502869"
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
