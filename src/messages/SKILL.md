---
name: messages
description: "Use when sending or querying internal addressed messages between users — subject/body, priority (high/normal/low), multi-recipient addressing, threaded replies via parentMessage, optional attachment to invoices/customers/vendors/orders, and read-at tracking. The internal user-to-user messaging collection."
atomPath: messages
coordinate: "messages · 7/descent · 11ca70f5"
contentUuid: "f29e08b8-abf4-5a97-ab71-3d008657c9be"
diamondUuid: "6757209a-c798-852f-bd86-30660a20d668"
uuid: "11ca70f5-918c-80ef-82a1-fb28703315aa"
horo: 7
typography:
  partition: messages
  bondDegree: 24
standards:
  - "GDPR Art 5(1)(e) storage-limitation retention"
  - "ISO-27001 A.5.23 cloud-service-tenant-isolation"
  - "ISO-27001 A.5.23 cloud-service-tenant-isolation`"
  - "ISO-8601-1:2019 date-time sent-read-timestamps"
  - "ISO-8601-1:2019 date-time sent-read-timestamps`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "a2adc4fa-1e58-8002-b0db-e3592401f722"
  stages:
    - stage: path
      stageUuid: "7dcb5e4e-8eba-8ae3-be38-2ff774a0d95d"
    - stage: trinity
      stageUuid: "17a03318-991f-8391-b3fd-2e00e6e19423"
    - stage: boundary
      stageUuid: "9e3ed5ec-7cfd-8953-8195-a05667a1041b"
    - stage: links
      stageUuid: "4e80a849-7615-806b-a10a-9292af7364bb"
    - stage: horo
      stageUuid: "ed205282-268d-8e1c-89c1-4367fcc72327"
    - stage: seal
      stageUuid: "e9039ea4-d0ed-8786-8fed-317fd0bf9e30"
    - stage: uuid
      stageUuid: "50f1d1e2-748b-8251-bbab-54635cf1aa97"
version: 2
---
# messages

Messages — internal user-to-user messaging with threading.

This is the single-folder collection node: `index.ts` (schema + standards banners), co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here. One folder per collection ⇒ no scatter ⇒ no drift.

## Composition

The collection schema composes [[auth]] (access control via role-based grants), [[access]] (who can read/write/delete), [[field]] (subject/body/priority/recipients/parentMessage/relatedDocument/readAt/status/audit), [[hooks]] (collection lifecycle mutations and side effects), and [[collections]] (the Payload collection framework). The thread-chain pattern (`parentMessage` replacing Rails `ancestry`) and multi-recipient addressing (`recipients` with join) are implemented via [[field]] relationship types; ISO 8601 timestamps and audit-trail fields via [[field]] base helpers.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time sent-read-timestamps`
- `@standard ISO-27001 A.5.23 cloud-service-tenant-isolation`

- [[standard]] ISO-8601-1:2019 date-time sent-read-timestamps
- [[standard]] ISO-27001 A.5.23 cloud-service-tenant-isolation
- [[standard]] ISO-19011:2018 audit-trail message-provenance
- [[standard]] GDPR Art 5(1)(e) storage-limitation retention

**Law — [[law]]: a message is one internal addressed communication between users — subject/body with priority and multi-recipient addressing, threaded by `parentMessage` (not a separate thread table) and tracked by read-at, gated by [[access]] so only sender and recipients may read it.**
