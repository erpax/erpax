---
name: reports
description: "Use when generating or reviewing immutable post-close analytics — variance analysis (budget vs. actual), financial ratio analysis, segment reporting (IFRS-8 business and geographic), and management KPI scorecards per IFRS IAS-1 / SOX §404. The post-close analytics report collection."
atomPath: legal/entities/consolidations/audit/reports/post/close/analytics/reports
coordinate: legal/entities/consolidations/audit/reports/post/close/analytics/reports · 5/round · 6697b2e9
contentUuid: "116c2732-a592-5df6-9007-cb05867f8b87"
diamondUuid: "bb7aa894-6eee-883c-bfa4-7998fda87cc3"
uuid: "6697b2e9-a102-81b8-aa3c-c33969f192e1"
horo: 5
bonds:
  in:
    - accounting
    - analytics
    - employees
    - identity
    - law
    - projects
    - proof
    - standard
    - transaction
  out:
    - accounting
    - employees
    - identity
    - law
    - projects
    - proof
    - standard
    - transaction
typography:
  partition: legal
  bondDegree: 29
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
    - employees
    - identity
    - law
    - projects
    - proof
    - standard
    - transaction
  backlinks:
    - accounting
    - employees
    - identity
    - law
    - projects
    - proof
    - standard
    - transaction
signatures:
  computationUuid: "59924d65-6f82-83a4-937a-f64259d23376"
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
      stageUuid: "6ab19940-d2e1-8e10-a9fc-83942c0e5816"
    - stage: seal
      stageUuid: "7b3634e1-d9cd-80b9-943e-cd778fbff54e"
    - stage: uuid
      stageUuid: "75807939-7033-838b-aff9-01c50ee8aa79"
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
