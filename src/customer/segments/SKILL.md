---
name: segments
description: "Use when grouping customers for differentiated pricing tiers, volume discounts, targeted campaigns, or IFRS-15 §4 portfolio-of-contracts disclosures — segment type, pricing tier, payment terms, credit limit, and priority rank. The CRM customer-segmentation collection."
atomPath: customer/segments
coordinate: customer/segments · 7/descent · cff6eb42
contentUuid: "41a6ac63-f2ba-52f4-bf6f-988fb49894bc"
diamondUuid: "fdfcc0ea-a1e7-8800-8802-7da1a51ba836"
uuid: "cff6eb42-bb0c-8b96-a9a2-de833d63521a"
horo: 7
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
  - "ISO-19011:2018 audit-trail crm-segmentation"
  - "ISO-8601-1:2019 date-time"
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
  computationUuid: "7493e079-d8e0-886b-b1ed-2928c269ef88"
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
      stageUuid: "97d43d5f-d2de-8751-93a9-284022014993"
    - stage: seal
      stageUuid: "1bcec909-4134-8230-ae6d-527605104f7f"
    - stage: uuid
      stageUuid: "1a78211b-a7ac-8750-9959-3863da398052"
version: 2
---
# customer-segments

Customer Segments — pricing / marketing buckets.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

Composes: [[collections]] · [[fields]] · [[hooks]] · [[accounting]] · [[standard]] · [[proof]] · [[identity]] · [[customers]].

## Standards
- ISO-8601-1:2019 date-time
- IFRS IFRS-15 §4 portfolio-practical-expedient
- IFRS IFRS-8 §22 disclosure-of-segment-information
- ISO-19011:2018 audit-trail crm-segmentation
- ISO-27001 A.5.23 cloud-service-tenant-isolation
