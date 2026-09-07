---
name: standards
description: "Use when registering or querying GAAP/IFRS/SOX/Tax reporting frameworks per jurisdiction — standard name, code, type, effective date, and reference material. The per-jurisdiction reporting-standard catalogue node."
atomPath: "taxing/jurisdictions/reporting/standards"
coordinate: "taxing/jurisdictions/reporting/standards · 5/round · 63359da1"
contentUuid: "05629610-08c7-575d-a701-bf1f0eddd231"
diamondUuid: "555bca3b-d2d3-88d2-bd1d-7bf7e84bee89"
uuid: "63359da1-1625-8171-b7b8-3250dd17df9a"
horo: 5
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
  computationUuid: "cbb1a380-d06c-802b-9c5f-906175471d89"
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
      stageUuid: "01551abb-a691-8a0e-939e-4ea63032e380"
    - stage: seal
      stageUuid: "7167b4d5-549b-8bc9-b2bc-0ff9312d6f51"
    - stage: uuid
      stageUuid: "9389d405-6f7a-8f03-8f7e-c7b8900e7bd1"
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
