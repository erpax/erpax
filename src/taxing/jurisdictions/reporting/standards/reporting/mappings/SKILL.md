---
name: mappings
description: "Use when translating elements across reporting frameworks — account/line-item/disclosure/metric mappings between a source and target standard (XBRL-GL, IFRS-Taxonomy, SAF-T). The cross-standard element-mapping node."
atomPath: "taxing/jurisdictions/reporting/standards/reporting/mappings"
coordinate: "taxing/jurisdictions/reporting/standards/reporting/mappings · 5/round · 94499806"
contentUuid: "d1b43020-be76-5d68-9f12-324294aeb5b3"
diamondUuid: "86014317-fda6-87fa-a063-1d96d417eea9"
uuid: "94499806-5665-8040-900d-dddbe4a62816"
horo: 5
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
  computationUuid: "76976066-f544-881f-9aca-27d67663b52d"
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
      stageUuid: "a69a9b1a-d67e-88a1-b9a2-2713531c5dd5"
    - stage: seal
      stageUuid: "28fef98e-2137-8a3c-baf9-17ab842acad5"
    - stage: uuid
      stageUuid: "7ef160bd-ebc6-825a-ab93-add9a3640eeb"
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
