---
name: segments
description: "Use when grouping customers for differentiated pricing tiers, volume discounts, targeted campaigns, or IFRS-15 §4 portfolio-of-contracts disclosures — segment type, pricing tier, payment terms, credit limit, and priority rank. The CRM customer-segmentation collection."
atomPath: "customer/segments"
coordinate: "customer/segments · 7/descent · 8f58eae2"
contentUuid: "4139a90a-a94f-5518-b591-5091c795dc23"
diamondUuid: "109a137c-f375-85a7-9028-d5b3033649f7"
uuid: "8f58eae2-0921-8889-b0d0-8bf90b8c47aa"
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
  computationUuid: "1eab25e1-85c1-8658-8172-2731abec7da3"
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
      stageUuid: "0f35d3a7-694c-832e-a5c7-75a56a163087"
    - stage: seal
      stageUuid: "fb4a6019-5ed4-81ea-89af-a298d840e048"
    - stage: uuid
      stageUuid: "140a951a-da62-81c4-b4ce-2f2ebf9c2f65"
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
