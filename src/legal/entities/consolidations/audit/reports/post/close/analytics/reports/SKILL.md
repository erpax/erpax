---
name: reports
description: "Use when generating or reviewing immutable post-close analytics — variance analysis (budget vs. actual), financial ratio analysis, segment reporting (IFRS-8 business and geographic), and management KPI scorecards per IFRS IAS-1 / SOX §404. The post-close analytics report collection."
atomPath: "legal/entities/consolidations/audit/reports/post/close/analytics/reports"
coordinate: "legal/entities/consolidations/audit/reports/post/close/analytics/reports · 1/base · 8bfe9cbf"
contentUuid: "1df6610b-d92d-5522-b4cf-e5d127d1e79d"
diamondUuid: "214560ed-eb23-83f9-aadb-a392c389c43e"
uuid: "8bfe9cbf-e583-899e-b081-2df3990ed72a"
horo: 1
typography:
  partition: legal
  bondDegree: 28
standards:
  - "IFRS IAS-1 financial-statement-analysis"
  - "SOX §404 close-monitoring"
bindings: []
signatures:
  computationUuid: "6c42bc74-a18d-8f9e-9d86-9829f731d7d3"
  stages:
    - stage: path
      stageUuid: "5f617b0f-c167-8b80-81fe-ec0de8724eea"
    - stage: trinity
      stageUuid: "2c7850be-9244-8114-a316-96642a0884c5"
    - stage: boundary
      stageUuid: "33767615-1833-83ca-a91f-7572ec408e4b"
    - stage: links
      stageUuid: "72a7c3b9-b682-8af9-88af-d6f79a2fe7c6"
    - stage: horo
      stageUuid: "9c99e78f-2365-865d-b29a-82c159d2bd24"
    - stage: seal
      stageUuid: "7b3634e1-d9cd-80b9-943e-cd778fbff54e"
    - stage: uuid
      stageUuid: "da58304d-2567-8b9e-b919-79ea081f77b1"
version: 2
---
# post-close-analytics-reports

PostCloseAnalyticsReports Collection.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- IFRS IAS-1 financial-statement-analysis
- SOX §404 close-monitoring

Composes: [[legal/entities/consolidations/audit/reports]].
