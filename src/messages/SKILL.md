---
name: messages
description: "Use when sending or querying internal addressed messages between users — subject/body, priority (high/normal/low), multi-recipient addressing, threaded replies via parentMessage, optional attachment to invoices/customers/vendors/orders, and read-at tracking. The internal user-to-user messaging collection."
atomPath: messages
coordinate: "messages · 4/weave · 9681d526"
contentUuid: "b8da8c7f-7b0a-5c22-a664-9fa2ffc88888"
diamondUuid: "3c5f650b-29ad-8704-ba0c-1eb3a0558833"
uuid: "9681d526-093e-8b60-9463-e24041390d72"
horo: 4
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
  computationUuid: "1f313fcc-6ab8-8db4-bb1c-7c5ddc251e1a"
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
      stageUuid: "0c597527-2396-820c-98e3-883735d89c5b"
    - stage: seal
      stageUuid: "e9039ea4-d0ed-8786-8fed-317fd0bf9e30"
    - stage: uuid
      stageUuid: "ba16df3c-d010-847c-ace9-f4b89c1cd505"
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
