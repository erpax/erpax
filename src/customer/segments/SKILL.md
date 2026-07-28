---
name: segments
description: "Use when grouping customers for differentiated pricing tiers, volume discounts, targeted campaigns, or IFRS-15 §4 portfolio-of-contracts disclosures — segment type, pricing tier, payment terms, credit limit, and priority rank. The CRM customer-segmentation collection."
atomPath: "customer/segments"
coordinate: "customer/segments · 2/share · aa504b3f"
contentUuid: "b8a263f6-e295-52e6-8847-12824b8c19ce"
diamondUuid: "42b41bfd-85a4-8fc0-b732-591b8dad69ab"
uuid: "aa504b3f-64ce-8df1-baac-2d1a96918926"
horo: 2
bonds:
  in:
    - accounting
    - cohort
    - collections
    - customer
    - customers
    - fields
    - hooks
    - identity
    - opportunities
    - proof
    - standard
  out:
    - accounting
    - cohort
    - collections
    - customers
    - fields
    - hooks
    - identity
    - opportunities
    - proof
    - standard
typography:
  partition: customer
  bondDegree: 30
  neighbors: []
standards:
  - "IFRS IFRS-15 §4 portfolio-practical-expedient"
  - "IFRS IFRS-8 §22 disclosure-of-segment-information"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - accounting
    - collections
    - customers
    - fields
    - hooks
    - identity
    - proof
    - standard
  matrix:
    - accounting
    - cohort
    - collections
    - customers
    - fields
    - hooks
    - identity
    - opportunities
    - proof
    - standard
  backlinks:
    - accounting
    - cohort
    - collections
    - customers
    - fields
    - hooks
    - identity
    - opportunities
    - proof
    - standard
signatures:
  computationUuid: "0c748687-2041-8fb7-9a42-9824a1d300c7"
  stages:
    - stage: path
      stageUuid: "1c7ffcd0-9eb2-8460-8d19-ebb9cdc249ad"
    - stage: trinity
      stageUuid: "3656c1f1-8cce-8687-b2aa-bf641141bc02"
    - stage: boundary
      stageUuid: "62109d48-aa7e-8ccd-aa68-d90c8cb6b184"
    - stage: links
      stageUuid: "5ae3b2b7-877a-8c3d-a2f4-c495142a36ce"
    - stage: horo
      stageUuid: "89a926a7-57e9-8609-9dfc-b9c069e0708e"
    - stage: seal
      stageUuid: "fb4a6019-5ed4-81ea-89af-a298d840e048"
    - stage: uuid
      stageUuid: "22d04081-ff4b-814d-898c-889763fffa44"
version: 2
---
# customer-segments

Customer Segments — pricing / marketing buckets.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

Composes: [[collections]] · [[fields]] · [[hooks]] · [[accounting]] · [[standard]] · [[proof]] · [[identity]] · [[customers]].

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time`

- ISO-8601-1:2019 date-time
- IFRS IFRS-15 §4 portfolio-practical-expedient
- IFRS IFRS-8 §22 disclosure-of-segment-information
- ISO-19011:2018 audit-trail crm-segmentation
- ISO-27001 A.5.23 cloud-service-tenant-isolation
