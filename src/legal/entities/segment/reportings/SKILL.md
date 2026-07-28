---
name: reportings
description: "Use when preparing IFRS-8/ASC-280 operating-segment disclosures — revenue, operating profit, assets, liabilities, CapEx, major-customer dependency, intersegment transfer pricing, and reconciliation to consolidated totals per fiscal period per entity. The segment-reporting disclosure register."
atomPath: "legal/entities/segment/reportings"
coordinate: "legal/entities/segment/reportings · 7/descent · ff9cdae7"
contentUuid: "7b01bd59-9fb3-5114-a365-3073dafb91c6"
diamondUuid: "d7dce8a7-5a57-8f4d-9773-ac29b95fba44"
uuid: "ff9cdae7-f7e9-8741-9d87-107a9e3a3fd7"
horo: 7
bonds:
  in:
    - entities
    - segment
  out:
    - entities
    - segment
typography:
  partition: legal
  bondDegree: 6
  neighbors: []
standards:
  - "IFRS-8 operating-segments"
  - "US-GAAP ASC-280 segment-reporting"
bindings: []
neighbors:
  wikilink: []
  matrix:
    - entities
    - segment
  backlinks:
    - entities
    - segment
signatures:
  computationUuid: "bd822a11-3f54-8d4a-a949-a499bccdcc0b"
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
      stageUuid: "b8c6cd2a-048c-80e6-9e4e-605a79ae7029"
    - stage: seal
      stageUuid: "9dce83fe-7d28-801f-8c94-3042e5e4b8d9"
    - stage: uuid
      stageUuid: "29d7a0cc-7a23-86f7-9ad7-a1c95aca6a3f"
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
