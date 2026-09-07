---
name: notifications
description: "Use when configuring or auditing deadline-reminder notifications — scheduled email, in-app, SMS, or calendar-event alerts to compliance officers and staff days before a compliance deadline is due per ISO-37301. The compliance-notification dispatch collection."
atomPath: "legal/entities/compliance/deadlines/compliance/notifications"
coordinate: "legal/entities/compliance/deadlines/compliance/notifications · 2/share · a1376a82"
contentUuid: "6ff6d7ab-f510-575e-b8fe-56dd4639acb1"
diamondUuid: "1f6c469b-c20e-8159-831c-6b221ee95c95"
uuid: "a1376a82-0523-8d41-af77-de5f6dd4670e"
horo: 2
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
  computationUuid: "70a4b47e-91f4-8636-a8b3-64d95b6dc0b4"
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
      stageUuid: "e6d933cc-5e16-8b97-84f7-9c9f8fed41c3"
    - stage: seal
      stageUuid: "7aae8859-8c2d-8722-a139-79b2309e5307"
    - stage: uuid
      stageUuid: "2e7433f0-dfe9-80e3-851e-0ac5f4a598e6"
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
