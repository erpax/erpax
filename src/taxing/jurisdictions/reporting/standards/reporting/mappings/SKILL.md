---
name: mappings
description: "Use when translating elements across reporting frameworks — account/line-item/disclosure/metric mappings between a source and target standard (XBRL-GL, IFRS-Taxonomy, SAF-T). The cross-standard element-mapping node."
atomPath: "taxing/jurisdictions/reporting/standards/reporting/mappings"
coordinate: "taxing/jurisdictions/reporting/standards/reporting/mappings · 1/base · be2e14d0"
contentUuid: "4df6ade8-e614-5939-b155-dedee4b0f8b2"
diamondUuid: "7b3ba005-f540-8cf0-b82c-2f766b16a464"
uuid: "be2e14d0-8afd-8fbc-b4c5-b637eef292ca"
horo: 1
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
  computationUuid: "ff347528-7427-86a5-8460-0fed134e0d74"
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
      stageUuid: "2a94e06c-7ac1-812c-89e7-5eff7e964ec6"
    - stage: seal
      stageUuid: "28fef98e-2137-8a3c-baf9-17ab842acad5"
    - stage: uuid
      stageUuid: "5729e7d5-ea1d-8ce0-9a83-d5d7dd4a405d"
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
