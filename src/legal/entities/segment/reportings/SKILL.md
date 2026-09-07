---
name: reportings
description: "Use when preparing IFRS-8/ASC-280 operating-segment disclosures — revenue, operating profit, assets, liabilities, CapEx, major-customer dependency, intersegment transfer pricing, and reconciliation to consolidated totals per fiscal period per entity. The segment-reporting disclosure register."
atomPath: "legal/entities/segment/reportings"
coordinate: "legal/entities/segment/reportings · 5/round · c53e89cb"
contentUuid: "e81ab212-e9b9-59da-9870-50d2f356ed44"
diamondUuid: "3050be69-fb75-8793-a13e-0a64f190ff1e"
uuid: "c53e89cb-4991-8435-94b2-c1f18ce20cbb"
horo: 5
typography:
  partition: legal
  bondDegree: 6
standards:
  - "IFRS-8 operating-segments"
  - "US-GAAP ASC-280 segment-reporting"
bindings: []
signatures:
  computationUuid: "fb3c8140-c2fd-8ae2-9f02-e0f13336e423"
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
      stageUuid: "df03dd09-4b87-895b-96c1-ad8fc147a82e"
    - stage: seal
      stageUuid: "9dce83fe-7d28-801f-8c94-3042e5e4b8d9"
    - stage: uuid
      stageUuid: "fc7b3a39-1c68-8874-afcc-71245d776e48"
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
