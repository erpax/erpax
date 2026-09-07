---
name: reportings
description: "Use when preparing IFRS-8/ASC-280 operating-segment disclosures — revenue, operating profit, assets, liabilities, CapEx, major-customer dependency, intersegment transfer pricing, and reconciliation to consolidated totals per fiscal period per entity. The segment-reporting disclosure register."
atomPath: "legal/entities/segment/reportings"
coordinate: "legal/entities/segment/reportings · 8/crest · ee5f0aa2"
contentUuid: "136eb1cb-10b7-546f-aeaa-04ec278d6d8a"
diamondUuid: "5fa98dc5-5a9d-80ab-85bc-0542f70337c4"
uuid: "ee5f0aa2-f5b8-8ee3-87bf-e0279ba8ad81"
horo: 8
typography:
  partition: legal
  bondDegree: 6
standards:
  - "IFRS-8 operating-segments"
  - "US-GAAP ASC-280 segment-reporting"
bindings: []
signatures:
  computationUuid: "ac3298cf-de61-80cf-a41c-6bd6ec7cc1d4"
  stages:
    - stage: path
      stageUuid: "9e3e4c3f-d281-8c2d-95d6-be1460d9ad57"
    - stage: trinity
      stageUuid: "2c8482e4-5e35-86cd-8cd0-4643688f69d5"
    - stage: boundary
      stageUuid: "44a269fd-d94c-8915-a982-e2f34eb34a45"
    - stage: links
      stageUuid: "b837a06d-3bc7-8fb5-8d2f-ab3725a76a30"
    - stage: horo
      stageUuid: "c5e13d31-7732-8b7a-922b-552437646109"
    - stage: seal
      stageUuid: "9dce83fe-7d28-801f-8c94-3042e5e4b8d9"
    - stage: uuid
      stageUuid: "f1184b2f-b535-8ba9-b286-f4fb9211db66"
version: 2
---
# segment-reporting

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- IFRS-8 operating-segments
- US-GAAP ASC-280 segment-reporting
- ISO-27001 A.5.23 cloud-service-tenant-isolation
