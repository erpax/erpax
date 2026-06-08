---
name: mappings
description: "Use when translating elements across reporting frameworks — account/line-item/disclosure/metric mappings between a source and target standard (XBRL-GL, IFRS-Taxonomy, SAF-T). The cross-standard element-mapping node."
atomPath: taxing/jurisdictions/reporting/standards/reporting/mappings
coordinate: taxing/jurisdictions/reporting/standards/reporting/mappings · 8/crest · 62411723
contentUuid: "6353d45c-e228-5bcc-b4ce-33fc5e3ed112"
diamondUuid: "f8743f8c-c694-8d3a-985e-e0d133d7a520"
uuid: "62411723-27a7-8789-9175-9bac0e76e22b"
horo: 8
bonds:
  in:
    - law
    - mapping
    - reporting
    - standards
  out:
    - law
    - mapping
    - standards
typography:
  partition: taxing
  bondDegree: 10
  neighbors: []
standards:
  - "IFRS-Taxonomy reporting-mapping"
  - "SAF-T OECD mapping"
  - XBRL
  - "XBRL-GL global-ledger-taxonomy"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - law
    - mapping
    - standards
  backlinks:
    - law
    - mapping
    - standards
signatures:
  computationUuid: "c9d83ae1-9613-8e0d-815f-1d65d455d1bc"
  stages:
    - stage: path
      stageUuid: "a13c53e0-51cd-816a-95c8-8c72d5657b95"
    - stage: trinity
      stageUuid: "476e9da6-9e55-8eac-9a1e-4c43adc97eef"
    - stage: boundary
      stageUuid: "2c4353e9-46a2-8ee3-91c8-0b415453524b"
    - stage: links
      stageUuid: "46a129b6-4883-81ca-a485-8fa957d58d31"
    - stage: horo
      stageUuid: "c39f165f-e73b-830b-af34-43be94589b95"
    - stage: seal
      stageUuid: "28fef98e-2137-8a3c-baf9-17ab842acad5"
    - stage: uuid
      stageUuid: "1bebefa6-6e97-8635-8db4-9c7c61fb0a17"
version: 2
---
# reporting-mappings

ReportingMappings.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

**Law — [[law]]: reporting-mappings is the cross-standard element-mapping node — each row binds one source element to its target (account · line-item · disclosure · metric) across reporting frameworks (XBRL-GL · IFRS-Taxonomy · SAF-T).**

## Standards
- XBRL-GL global-ledger-taxonomy
- IFRS-Taxonomy reporting-mapping
- SAF-T OECD mapping
- ISO-27001 A.5.23 cloud-service-tenant-isolation
