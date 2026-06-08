---
name: standards
description: "Use when registering or querying GAAP/IFRS/SOX/Tax reporting frameworks per jurisdiction — standard name, code, type, effective date, and reference material. The per-jurisdiction reporting-standard catalogue node."
atomPath: taxing/jurisdictions/reporting/standards
coordinate: taxing/jurisdictions/reporting/standards · 4/weave · e7e3a4cf
contentUuid: "ba6b4608-3117-5ac7-b8e5-346a070f88cc"
diamondUuid: "85561254-332c-84e8-87dd-eed529df4424"
uuid: "e7e3a4cf-4f9a-8964-ba75-b0ddabbc2ff9"
horo: 4
bonds:
  in:
    - accounting
    - agriculture
    - analytics
    - api
    - certification
    - factory
    - folder
    - grade
    - identity
    - law
    - organic
    - proof
    - reference
    - reporting
    - skills
    - sourced
    - standard
    - topography
    - truth
    - vocabulary
  out:
    - accounting
    - agriculture
    - analytics
    - api
    - certification
    - factory
    - folder
    - grade
    - identity
    - law
    - organic
    - proof
    - reference
    - skills
    - sourced
    - standard
    - topography
    - truth
    - vocabulary
typography:
  partition: taxing
  bondDegree: 0
  neighbors: []
standards:
  - "ESRS EU-sustainability-reporting"
  - "EU-ESRS"
  - "IFRS reporting-framework"
  - "US-GAAP reporting-framework"
  - XBRL
bindings: []
neighbors:
  wikilink:
    - mappings
  matrix:
    - accounting
    - agriculture
    - analytics
    - api
    - certification
    - factory
    - folder
    - grade
    - identity
    - law
    - organic
    - proof
    - reference
    - skills
    - sourced
    - standard
    - topography
    - truth
    - vocabulary
  backlinks:
    - accounting
    - agriculture
    - analytics
    - api
    - certification
    - factory
    - folder
    - grade
    - identity
    - law
    - organic
    - proof
    - reference
    - skills
    - sourced
    - standard
    - topography
    - truth
    - vocabulary
signatures:
  computationUuid: "57a2e131-6b25-8b0b-a5b0-6b9735f6c84e"
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
      stageUuid: "72e2b075-3939-836a-9182-c3577e7754a6"
    - stage: seal
      stageUuid: "7167b4d5-549b-8bc9-b2bc-0ff9312d6f51"
    - stage: uuid
      stageUuid: "0a06214e-10be-83cb-b8d2-1c0775e7e1aa"
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
