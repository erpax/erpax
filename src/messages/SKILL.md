---
name: messages
description: "Use when sending or querying internal addressed messages between users — subject/body, priority (high/normal/low), multi-recipient addressing, threaded replies via parentMessage, optional attachment to invoices/customers/vendors/orders, and read-at tracking. The internal user-to-user messaging collection."
atomPath: messages
coordinate: messages · 5/round · 121d528a
contentUuid: "25ca015c-dd2d-5e06-be3d-718dd01c9ddd"
diamondUuid: "e3fa9c26-5337-8ac3-916d-5381447d5658"
uuid: "121d528a-971e-8d23-9fb6-2b7d671ff331"
horo: 5
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
  - "ISO-19011:2018 audit-trail message-provenance"
  - "ISO-27001 A.5.23 cloud-service-tenant-isolation"
  - "ISO-8601-1:2019 date-time sent-read-timestamps"
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
  computationUuid: "1e95b8d6-0e7f-8aa1-bba0-5e21f3036649"
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
      stageUuid: "63699bf8-1b97-8b65-b368-69c9d279799f"
    - stage: seal
      stageUuid: "a7edd62d-749a-895b-84d9-427a6d3410ad"
    - stage: uuid
      stageUuid: "281d9241-3c1a-8bd3-ab29-792935c12b15"
version: 2
---
# messages

Messages — internal user-to-user messaging with threading.

This is the single-folder collection node: `index.ts` (schema + standards banners), co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here. One folder per collection ⇒ no scatter ⇒ no drift.

## Composition

The collection schema composes [[auth]] (access control via role-based grants), [[access]] (who can read/write/delete), [[fields]] (subject/body/priority/recipients/parentMessage/relatedDocument/readAt/status/audit), [[hooks]] (collection lifecycle mutations and side effects), and [[collections]] (the Payload collection framework). The thread-chain pattern (`parentMessage` replacing Rails `ancestry`) and multi-recipient addressing (`recipients` with join) are implemented via [[fields]] relationship types; ISO 8601 timestamps and audit-trail fields via [[fields]] base helpers.

## Standards
- [[standard]] ISO-8601-1:2019 date-time sent-read-timestamps
- [[standard]] ISO-27001 A.5.23 cloud-service-tenant-isolation
- [[standard]] ISO-19011:2018 audit-trail message-provenance
- [[standard]] GDPR Art 5(1)(e) storage-limitation retention

**Law — [[law]]: a message is one internal addressed communication between users — subject/body with priority and multi-recipient addressing, threaded by `parentMessage` (not a separate thread table) and tracked by read-at, gated by [[access]] so only sender and recipients may read it.**
