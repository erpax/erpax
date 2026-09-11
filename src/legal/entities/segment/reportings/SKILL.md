---
name: reportings
description: "Use when preparing IFRS-8/ASC-280 operating-segment disclosures — revenue, operating profit, assets, liabilities, CapEx, major-customer dependency, intersegment transfer pricing, and reconciliation to consolidated totals per fiscal period per entity. The segment-reporting disclosure register."
atomPath: "legal/entities/segment/reportings"
coordinate: "legal/entities/segment/reportings · 1/base · 2b5ae2e7"
contentUuid: "0eae3c39-a4ed-5d05-ac08-a330f5ce2d5a"
diamondUuid: "4caa28d0-26cb-8169-8a17-308b994de320"
uuid: "2b5ae2e7-5bf0-8772-a75b-7d74afae663a"
horo: 1
typography:
  partition: legal
  bondDegree: 6
standards:
  - "IFRS-8 operating-segments"
  - "US-GAAP ASC-280 segment-reporting"
bindings: []
signatures:
  computationUuid: "d59a76ea-b208-899a-a9a8-3c2961ae7d30"
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
      stageUuid: "db85d165-d733-885e-88f7-a542c1fe9f8c"
    - stage: seal
      stageUuid: "9dce83fe-7d28-801f-8c94-3042e5e4b8d9"
    - stage: uuid
      stageUuid: "5645c2c7-c862-8b4e-a3f2-29415fa10e45"
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
