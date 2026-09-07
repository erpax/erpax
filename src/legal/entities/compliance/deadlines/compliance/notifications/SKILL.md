---
name: notifications
description: "Use when configuring or auditing deadline-reminder notifications — scheduled email, in-app, SMS, or calendar-event alerts to compliance officers and staff days before a compliance deadline is due per ISO-37301. The compliance-notification dispatch collection."
atomPath: "legal/entities/compliance/deadlines/compliance/notifications"
coordinate: "legal/entities/compliance/deadlines/compliance/notifications · 2/share · e3adf1a8"
contentUuid: "ff336def-8709-57f3-8f77-19c38e92182a"
diamondUuid: "8b464918-becb-8aff-9477-0f4c2147d8d3"
uuid: "e3adf1a8-79af-893f-a864-a09ff4e5d476"
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
  computationUuid: "0b8f5611-3033-8cad-9614-01c631423aa4"
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
      stageUuid: "3c6e915c-0e78-8585-9d92-ef6bfc30edce"
    - stage: seal
      stageUuid: "7aae8859-8c2d-8722-a139-79b2309e5307"
    - stage: uuid
      stageUuid: "b5eac00f-9a82-89f4-bd4e-1608c71ea849"
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
