---
name: reportings
description: "Use when preparing IFRS-8/ASC-280 operating-segment disclosures — revenue, operating profit, assets, liabilities, CapEx, major-customer dependency, intersegment transfer pricing, and reconciliation to consolidated totals per fiscal period per entity. The segment-reporting disclosure register."
atomPath: "legal/entities/segment/reportings"
coordinate: "legal/entities/segment/reportings · 1/base · 46fbac87"
contentUuid: "05d198b5-395f-5601-9681-a37f1f999f68"
diamondUuid: "ab5733fc-4d4a-89f8-b5d3-960f7a1515a5"
uuid: "46fbac87-0f7f-80f1-9075-f8c93b0f9e37"
horo: 1
typography:
  partition: legal
  bondDegree: 6
standards:
  - "IFRS-8 operating-segments"
  - "US-GAAP ASC-280 segment-reporting"
bindings: []
signatures:
  computationUuid: "cb616f2b-9590-84d7-83e0-c0918f6f85bb"
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
      stageUuid: "8754df9f-5ce0-8dff-b4ea-6b56bcf0c2ad"
    - stage: seal
      stageUuid: "9dce83fe-7d28-801f-8c94-3042e5e4b8d9"
    - stage: uuid
      stageUuid: "5760259e-d6a4-883f-a62f-23dd9755f671"
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
