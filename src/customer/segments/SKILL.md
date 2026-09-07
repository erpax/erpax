---
name: segments
description: "Use when grouping customers for differentiated pricing tiers, volume discounts, targeted campaigns, or IFRS-15 §4 portfolio-of-contracts disclosures — segment type, pricing tier, payment terms, credit limit, and priority rank. The CRM customer-segmentation collection."
atomPath: "customer/segments"
coordinate: "customer/segments · 2/share · 559c4c25"
contentUuid: "009e68ca-8bf5-574f-9bee-88ecab99ba39"
diamondUuid: "da1a7999-e25e-8394-9bda-702d4caffa1c"
uuid: "559c4c25-9a6c-8283-a762-171d7868669b"
horo: 2
typography:
  partition: customer
  bondDegree: 14
standards:
  - "IFRS IFRS-15 §4 portfolio-practical-expedient"
  - "IFRS IFRS-8 §22 disclosure-of-segment-information"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "72c1fecd-8224-84a7-8d62-731802f99649"
  stages:
    - stage: path
      stageUuid: "1c7ffcd0-9eb2-8460-8d19-ebb9cdc249ad"
    - stage: trinity
      stageUuid: "3656c1f1-8cce-8687-b2aa-bf641141bc02"
    - stage: boundary
      stageUuid: "62109d48-aa7e-8ccd-aa68-d90c8cb6b184"
    - stage: links
      stageUuid: "ed1130a3-2130-8e0f-8233-8fb0fb5d7dee"
    - stage: horo
      stageUuid: "94a3912c-e396-8d8e-95a7-d9d9ba1d122a"
    - stage: seal
      stageUuid: "fb4a6019-5ed4-81ea-89af-a298d840e048"
    - stage: uuid
      stageUuid: "a5aeb5a1-2475-8339-9b47-201f16642f75"
version: 2
---
# customer-segments

Customer Segments — pricing / marketing buckets.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

Composes: [[collections]] · [[field]] · [[hooks]] · [[accounting]] · [[standard]] · [[proof]] · [[identity]] · [[customers]].

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time`

- ISO-8601-1:2019 date-time
- IFRS IFRS-15 §4 portfolio-practical-expedient
- IFRS IFRS-8 §22 disclosure-of-segment-information
- ISO-19011:2018 audit-trail crm-segmentation
- ISO-27001 A.5.23 cloud-service-tenant-isolation
