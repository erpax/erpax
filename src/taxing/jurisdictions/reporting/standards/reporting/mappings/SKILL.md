---
name: mappings
description: "Use when translating elements across reporting frameworks — account/line-item/disclosure/metric mappings between a source and target standard (XBRL-GL, IFRS-Taxonomy, SAF-T). The cross-standard element-mapping node."
atomPath: "taxing/jurisdictions/reporting/standards/reporting/mappings"
coordinate: "taxing/jurisdictions/reporting/standards/reporting/mappings · 7/descent · 744fa54d"
contentUuid: "30f00f57-56e6-5a20-8124-a0e7e4d82cf2"
diamondUuid: "3eb443d7-5e34-860c-9d05-40518a5d238e"
uuid: "744fa54d-8ded-8ff8-a1bc-7a4eec25826c"
horo: 7
typography:
  partition: taxing
  bondDegree: 10
standards:
  - "IFRS-Taxonomy reporting-mapping"
  - "IFRS-Taxonomy reporting-mapping`"
  - "SAF-T OECD mapping"
  - XBRL
  - "XBRL-GL global-ledger-taxonomy"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "73aab2eb-6da3-81d6-9eca-438ad91a600f"
  stages:
    - stage: path
      stageUuid: "a13c53e0-51cd-816a-95c8-8c72d5657b95"
    - stage: trinity
      stageUuid: "476e9da6-9e55-8eac-9a1e-4c43adc97eef"
    - stage: boundary
      stageUuid: "2c4353e9-46a2-8ee3-91c8-0b415453524b"
    - stage: links
      stageUuid: "c53e8a54-bf8e-806c-9890-47e9b67c6b1b"
    - stage: horo
      stageUuid: "d799c763-b094-80b4-b760-23042a285b3b"
    - stage: seal
      stageUuid: "28fef98e-2137-8a3c-baf9-17ab842acad5"
    - stage: uuid
      stageUuid: "beba6c75-f785-89bf-9005-891a774caa72"
version: 2
---
# reporting-mappings

ReportingMappings.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

**Law — [[law]]: reporting-mappings is the cross-standard element-mapping node — each row binds one source element to its target (account · line-item · disclosure · metric) across reporting frameworks (XBRL-GL · IFRS-Taxonomy · SAF-T).**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard IFRS-Taxonomy reporting-mapping`

- XBRL-GL global-ledger-taxonomy
- IFRS-Taxonomy reporting-mapping
- SAF-T OECD mapping
- ISO-27001 A.5.23 cloud-service-tenant-isolation
