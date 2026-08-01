---
name: standards
description: "Use when registering or querying GAAP/IFRS/SOX/Tax reporting frameworks per jurisdiction — standard name, code, type, effective date, and reference material. The per-jurisdiction reporting-standard catalogue node."
atomPath: "taxing/jurisdictions/reporting/standards"
coordinate: "taxing/jurisdictions/reporting/standards · 7/descent · 3ff7d31b"
contentUuid: "029b578f-b73f-5c63-9cd7-8008d7a8cdf0"
diamondUuid: "8f263020-8c05-852a-82a2-1a466d72f47b"
uuid: "3ff7d31b-b2a9-8d21-be58-21d5b414d481"
horo: 7
typography:
  partition: taxing
  bondDegree: 0
standards:
  - "ESRS EU-sustainability-reporting"
  - "EU-ESRS"
  - "IFRS reporting-framework"
  - "US-GAAP reporting-framework"
  - XBRL
bindings: []
signatures:
  computationUuid: "a8ef491f-b7ab-83ae-bb4d-01da2a2a7efb"
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
      stageUuid: "2632bd5d-b413-8c53-a681-c00cfb204af8"
    - stage: seal
      stageUuid: "7167b4d5-549b-8bc9-b2bc-0ff9312d6f51"
    - stage: uuid
      stageUuid: "3be405d0-0ef2-8ef0-b63b-6c1d9f2ea003"
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
