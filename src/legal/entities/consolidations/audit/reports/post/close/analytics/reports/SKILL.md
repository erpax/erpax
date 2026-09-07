---
name: reports
description: "Use when generating or reviewing immutable post-close analytics — variance analysis (budget vs. actual), financial ratio analysis, segment reporting (IFRS-8 business and geographic), and management KPI scorecards per IFRS IAS-1 / SOX §404. The post-close analytics report collection."
atomPath: "legal/entities/consolidations/audit/reports/post/close/analytics/reports"
coordinate: "legal/entities/consolidations/audit/reports/post/close/analytics/reports · 7/descent · 03a88152"
contentUuid: "12118cf8-72b0-545e-bd17-bbdd16296ab1"
diamondUuid: "887e254c-4448-8513-8bcb-b683dc0955d9"
uuid: "03a88152-752d-8d84-b1a3-3beedc0d9b88"
horo: 7
typography:
  partition: legal
  bondDegree: 28
standards:
  - "IFRS IAS-1 financial-statement-analysis"
  - "SOX §404 close-monitoring"
bindings: []
signatures:
  computationUuid: "e4ab3c11-1c76-8226-ab8c-eaa0a6fc3fe4"
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
      stageUuid: "6ad4d559-61e4-8725-be18-186f2fb6164b"
    - stage: seal
      stageUuid: "7b3634e1-d9cd-80b9-943e-cd778fbff54e"
    - stage: uuid
      stageUuid: "3cee9f92-30a2-8c28-9a06-3c63c36d85e5"
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
