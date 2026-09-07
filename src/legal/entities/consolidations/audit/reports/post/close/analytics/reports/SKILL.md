---
name: reports
description: "Use when generating or reviewing immutable post-close analytics — variance analysis (budget vs. actual), financial ratio analysis, segment reporting (IFRS-8 business and geographic), and management KPI scorecards per IFRS IAS-1 / SOX §404. The post-close analytics report collection."
atomPath: "legal/entities/consolidations/audit/reports/post/close/analytics/reports"
coordinate: "legal/entities/consolidations/audit/reports/post/close/analytics/reports · 2/share · 0281c7c6"
contentUuid: "eff85905-fc88-5b61-b50e-016e93b17160"
diamondUuid: "2a59a5c8-f89b-82ca-a1c5-7ee2684c6174"
uuid: "0281c7c6-8a06-8db4-880f-ba0c4363eacb"
horo: 2
typography:
  partition: legal
  bondDegree: 28
standards:
  - "IFRS IAS-1 financial-statement-analysis"
  - "SOX §404 close-monitoring"
bindings: []
signatures:
  computationUuid: "78a3a859-ee3b-8acb-810f-797a85d7c39f"
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
      stageUuid: "8e94bcb2-f756-8105-a443-3e023ea7260f"
    - stage: seal
      stageUuid: "7b3634e1-d9cd-80b9-943e-cd778fbff54e"
    - stage: uuid
      stageUuid: "4844fee4-fc22-8ef8-ac28-466c5c41aff2"
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
