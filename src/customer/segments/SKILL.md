---
name: segments
description: "Use when grouping customers for differentiated pricing tiers, volume discounts, targeted campaigns, or IFRS-15 §4 portfolio-of-contracts disclosures — segment type, pricing tier, payment terms, credit limit, and priority rank. The CRM customer-segmentation collection."
atomPath: "customer/segments"
coordinate: "customer/segments · 7/descent · 6a0e997c"
contentUuid: "49137db6-2ebf-53f6-ad20-3f892e32c743"
diamondUuid: "a9d7340c-e0cd-8ff9-90a8-65d59ca0cd20"
uuid: "6a0e997c-60cd-862b-b899-fda5d4d9548d"
horo: 7
typography:
  partition: customer
  bondDegree: 30
standards:
  - "IFRS IFRS-15 §4 portfolio-practical-expedient"
  - "IFRS IFRS-8 §22 disclosure-of-segment-information"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "2d23ef00-777e-85b0-9763-27506e3d4fe0"
  stages:
    - stage: path
      stageUuid: "1c7ffcd0-9eb2-8460-8d19-ebb9cdc249ad"
    - stage: trinity
      stageUuid: "3656c1f1-8cce-8687-b2aa-bf641141bc02"
    - stage: boundary
      stageUuid: "62109d48-aa7e-8ccd-aa68-d90c8cb6b184"
    - stage: links
      stageUuid: "7b14057c-77af-855a-aa6d-281bcd969084"
    - stage: horo
      stageUuid: "62a30620-792b-8c1b-b5a8-e357b02531f1"
    - stage: seal
      stageUuid: "fb4a6019-5ed4-81ea-89af-a298d840e048"
    - stage: uuid
      stageUuid: "358c8955-bcef-86be-a02d-fe079d2b5c59"
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
