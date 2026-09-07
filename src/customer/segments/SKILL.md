---
name: segments
description: "Use when grouping customers for differentiated pricing tiers, volume discounts, targeted campaigns, or IFRS-15 §4 portfolio-of-contracts disclosures — segment type, pricing tier, payment terms, credit limit, and priority rank. The CRM customer-segmentation collection."
atomPath: "customer/segments"
coordinate: "customer/segments · 8/crest · 15915a4b"
contentUuid: "92a35f60-8316-58c8-a5bc-820c771c5971"
diamondUuid: "18253960-f266-813c-a4cf-d7b4a8d53675"
uuid: "15915a4b-24ef-87de-8ba4-a76a36418392"
horo: 8
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
  computationUuid: "e12379cb-4282-85a8-918b-27a2f7646778"
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
      stageUuid: "9095c8c4-4a6d-8dd0-81c4-02dd16deca70"
    - stage: seal
      stageUuid: "fb4a6019-5ed4-81ea-89af-a298d840e048"
    - stage: uuid
      stageUuid: "2dcbb99b-f1f3-8b13-89d4-c1cc4543574c"
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
