---
name: reports
description: "Use when generating or reviewing immutable post-close analytics — variance analysis (budget vs. actual), financial ratio analysis, segment reporting (IFRS-8 business and geographic), and management KPI scorecards per IFRS IAS-1 / SOX §404. The post-close analytics report collection."
atomPath: "legal/entities/consolidations/audit/reports/post/close/analytics/reports"
coordinate: "legal/entities/consolidations/audit/reports/post/close/analytics/reports · 4/weave · a367fdb6"
contentUuid: "bbc12435-a791-55bd-abc7-e6549e314ef9"
diamondUuid: "20b7e89a-83d2-86af-b45a-dd7fd458d8db"
uuid: "a367fdb6-8b44-8e99-b937-1b7b571ce9c5"
horo: 4
typography:
  partition: legal
  bondDegree: 28
standards:
  - "IFRS IAS-1 financial-statement-analysis"
  - "SOX §404 close-monitoring"
bindings: []
signatures:
  computationUuid: "32df7d2e-d709-86da-8020-b7fe6d77ced2"
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
      stageUuid: "31c6be07-1b56-85d7-91af-c0fa85c51edc"
    - stage: seal
      stageUuid: "7b3634e1-d9cd-80b9-943e-cd778fbff54e"
    - stage: uuid
      stageUuid: "0e8cde9d-6580-8c26-af89-e49691f63bf0"
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
