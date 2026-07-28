---
name: messages
description: "Use when sending or querying internal addressed messages between users — subject/body, priority (high/normal/low), multi-recipient addressing, threaded replies via parentMessage, optional attachment to invoices/customers/vendors/orders, and read-at tracking. The internal user-to-user messaging collection."
atomPath: messages
coordinate: "messages · 1/base · fed6a730"
contentUuid: "9ed893f9-e5ed-5f48-b4dd-c1a2db79ac0e"
diamondUuid: "44c19a7a-ba07-83f4-b7c6-4142db80b0cf"
uuid: "fed6a730-c75e-8054-942a-e5ff63da423b"
horo: 1
bonds:
  in:
    - access
    - auth
    - collections
    - comment
    - fields
    - hooks
    - law
    - standard
  out:
    - access
    - auth
    - collections
    - comment
    - fields
    - hooks
    - law
    - standard
typography:
  partition: messages
  bondDegree: 24
  neighbors: []
standards:
  - "GDPR Art 5(1)(e) storage-limitation retention"
  - "ISO-27001 A.5.23 cloud-service-tenant-isolation"
  - "ISO-27001 A.5.23 cloud-service-tenant-isolation`"
  - "ISO-8601-1:2019 date-time sent-read-timestamps"
  - "ISO-8601-1:2019 date-time sent-read-timestamps`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - access
    - auth
    - collections
    - fields
    - hooks
    - law
    - standard
  matrix:
    - access
    - auth
    - collections
    - comment
    - fields
    - hooks
    - law
    - standard
  backlinks:
    - access
    - auth
    - collections
    - comment
    - fields
    - hooks
    - law
    - standard
signatures:
  computationUuid: "4e1c659b-3541-8d9d-bc86-13041f6b53dc"
  stages:
    - stage: path
      stageUuid: "7dcb5e4e-8eba-8ae3-be38-2ff774a0d95d"
    - stage: trinity
      stageUuid: "17a03318-991f-8391-b3fd-2e00e6e19423"
    - stage: boundary
      stageUuid: "9e3ed5ec-7cfd-8953-8195-a05667a1041b"
    - stage: links
      stageUuid: "2e6a97ae-c8df-8c6a-8368-8c85161d1a96"
    - stage: horo
      stageUuid: "a4f5cc92-9fa5-8a04-8d05-82d637e2f296"
    - stage: seal
      stageUuid: "e9039ea4-d0ed-8786-8fed-317fd0bf9e30"
    - stage: uuid
      stageUuid: "9dddc34d-0e77-8132-beab-6062fa0a0e2c"
version: 2
---
# messages

Messages — internal user-to-user messaging with threading.

This is the single-folder collection node: `index.ts` (schema + standards banners), co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here. One folder per collection ⇒ no scatter ⇒ no drift.

## Composition

The collection schema composes [[auth]] (access control via role-based grants), [[access]] (who can read/write/delete), [[fields]] (subject/body/priority/recipients/parentMessage/relatedDocument/readAt/status/audit), [[hooks]] (collection lifecycle mutations and side effects), and [[collections]] (the Payload collection framework). The thread-chain pattern (`parentMessage` replacing Rails `ancestry`) and multi-recipient addressing (`recipients` with join) are implemented via [[fields]] relationship types; ISO 8601 timestamps and audit-trail fields via [[fields]] base helpers.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time sent-read-timestamps`
- `@standard ISO-27001 A.5.23 cloud-service-tenant-isolation`

- [[standard]] ISO-8601-1:2019 date-time sent-read-timestamps
- [[standard]] ISO-27001 A.5.23 cloud-service-tenant-isolation
- [[standard]] ISO-19011:2018 audit-trail message-provenance
- [[standard]] GDPR Art 5(1)(e) storage-limitation retention

**Law — [[law]]: a message is one internal addressed communication between users — subject/body with priority and multi-recipient addressing, threaded by `parentMessage` (not a separate thread table) and tracked by read-at, gated by [[access]] so only sender and recipients may read it.**
