---
name: standards
description: "Use when registering or querying GAAP/IFRS/SOX/Tax reporting frameworks per jurisdiction — standard name, code, type, effective date, and reference material. The per-jurisdiction reporting-standard catalogue node."
atomPath: "taxing/jurisdictions/reporting/standards"
coordinate: "taxing/jurisdictions/reporting/standards · 7/descent · 88f7b442"
contentUuid: "5bb28ff1-9125-5b03-82cb-25f839442e0b"
diamondUuid: "19aafaf1-8e5c-821f-87df-7fea12e6329d"
uuid: "88f7b442-5541-8f5f-a31b-6aef0da77bf9"
horo: 7
typography:
  partition: taxing
  bondDegree: 188
standards:
  - "ESRS EU-sustainability-reporting"
  - "EU-ESRS"
  - "IFRS reporting-framework"
  - "US-GAAP reporting-framework"
  - XBRL
bindings: []
signatures:
  computationUuid: "cd801109-ebac-81b7-8dd1-fc44612ffe2b"
  stages:
    - stage: path
      stageUuid: "4af287e0-188e-844c-8fa6-620d4d1f9c12"
    - stage: trinity
      stageUuid: "5d6234bf-42f3-8504-99d9-7035c17479bc"
    - stage: boundary
      stageUuid: "3285ec9f-42a8-86d7-b54f-9f3d2e94b840"
    - stage: links
      stageUuid: "0cac38e5-17dc-88ae-a5d5-2ae301f12ceb"
    - stage: horo
      stageUuid: "078122b9-d4ef-87fb-9b10-a64f2642238c"
    - stage: seal
      stageUuid: "7167b4d5-549b-8bc9-b2bc-0ff9312d6f51"
    - stage: uuid
      stageUuid: "aff30d4a-ab55-8274-8921-e257a9fa947d"
version: 2
---
# reporting-standards

ReportingStandards.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- IFRS reporting-framework
- US-GAAP reporting-framework
- ESRS EU-sustainability-reporting
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[taxing/jurisdictions/reporting/standards/reporting/mappings]].
