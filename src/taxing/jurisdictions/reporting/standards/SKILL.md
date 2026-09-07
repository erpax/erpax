---
name: standards
description: "Use when registering or querying GAAP/IFRS/SOX/Tax reporting frameworks per jurisdiction — standard name, code, type, effective date, and reference material. The per-jurisdiction reporting-standard catalogue node."
atomPath: "taxing/jurisdictions/reporting/standards"
coordinate: "taxing/jurisdictions/reporting/standards · 4/weave · ebf9a26f"
contentUuid: "47184321-a815-5cac-9b0d-6296968ae79e"
diamondUuid: "399ba305-b70d-82f3-9fdc-e6a20caab9f8"
uuid: "ebf9a26f-be6d-8fab-a9c8-b34ce93168e2"
horo: 4
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
  computationUuid: "278b7ba6-8e6e-806e-b0b6-ae2e8b7e28e0"
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
      stageUuid: "c80a2fe4-01c7-8496-b0a9-488ff8377118"
    - stage: seal
      stageUuid: "7167b4d5-549b-8bc9-b2bc-0ff9312d6f51"
    - stage: uuid
      stageUuid: "bc1b8a73-5f3f-8009-97e2-a6808a68bc5c"
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
