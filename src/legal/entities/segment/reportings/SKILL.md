---
name: reportings
description: "Use when preparing IFRS-8/ASC-280 operating-segment disclosures — revenue, operating profit, assets, liabilities, CapEx, major-customer dependency, intersegment transfer pricing, and reconciliation to consolidated totals per fiscal period per entity. The segment-reporting disclosure register."
atomPath: legal/entities/segment/reportings
coordinate: legal/entities/segment/reportings · 7/descent · fbe06508
contentUuid: "c97019d8-aca1-579c-9e84-4d5e50a5595b"
diamondUuid: "b3ba0e7e-36e4-8c04-ae98-f242326b4786"
uuid: "fbe06508-fd7c-89e6-a4ae-1db2e84b3ea2"
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
  computationUuid: "0b6314f2-5efa-8c9d-8e38-340bebaf8031"
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
      stageUuid: "25dfee30-3e18-8080-b09e-d22a64df27c2"
    - stage: seal
      stageUuid: "9dce83fe-7d28-801f-8c94-3042e5e4b8d9"
    - stage: uuid
      stageUuid: "260f1614-58ef-8ebe-ba13-b3fb9d06453d"
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
