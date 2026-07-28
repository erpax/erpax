---
name: reports
description: "Use when generating or reviewing immutable post-close analytics — variance analysis (budget vs. actual), financial ratio analysis, segment reporting (IFRS-8 business and geographic), and management KPI scorecards per IFRS IAS-1 / SOX §404. The post-close analytics report collection."
atomPath: "legal/entities/consolidations/audit/reports/post/close/analytics/reports"
coordinate: "legal/entities/consolidations/audit/reports/post/close/analytics/reports · 1/base · 432c75cc"
contentUuid: "e6d1c57a-b635-51c7-8427-8efb91101aa4"
diamondUuid: "d58bdb7a-e756-8762-8946-ecb706815a5c"
uuid: "432c75cc-a375-8423-bffe-0cd493b2d631"
horo: 1
bonds:
  in:
    - accounting
    - analytics
    - balance
    - debit
    - law
    - path
  out:
    - accounting
    - balance
    - debit
    - law
    - path
typography:
  partition: legal
  bondDegree: 28
  neighbors: []
standards:
  - "IFRS IAS-1 financial-statement-analysis"
  - "SOX §404 close-monitoring"
bindings: []
neighbors:
  wikilink:
    - reports
  matrix:
    - accounting
    - balance
    - debit
    - law
    - path
  backlinks:
    - accounting
    - balance
    - debit
    - law
    - path
signatures:
  computationUuid: "795efe15-bfe2-8837-a7a7-ce599b9e0812"
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
      stageUuid: "ba95d626-b71e-811a-abe2-2ce1a88ae02e"
    - stage: seal
      stageUuid: "7b3634e1-d9cd-80b9-943e-cd778fbff54e"
    - stage: uuid
      stageUuid: "0b9387d6-16a6-838a-8560-45c8b735e7ef"
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
