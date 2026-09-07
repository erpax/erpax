---
name: mappings
description: "Use when translating elements across reporting frameworks — account/line-item/disclosure/metric mappings between a source and target standard (XBRL-GL, IFRS-Taxonomy, SAF-T). The cross-standard element-mapping node."
atomPath: "taxing/jurisdictions/reporting/standards/reporting/mappings"
coordinate: "taxing/jurisdictions/reporting/standards/reporting/mappings · 2/share · 6269ce0e"
contentUuid: "78097ce0-c68a-5523-9868-f5f48392a0e2"
diamondUuid: "dc3c2dbb-e410-88c7-87ab-4cc6fd981b5c"
uuid: "6269ce0e-5ed1-830e-8442-b1e386a0ff55"
horo: 2
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
  computationUuid: "b0f3d12d-7f96-834d-afa6-bc6f8e2f5731"
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
      stageUuid: "ada7d065-44dc-802f-85bc-3bd069cc5c38"
    - stage: seal
      stageUuid: "28fef98e-2137-8a3c-baf9-17ab842acad5"
    - stage: uuid
      stageUuid: "dc803d44-45fc-8506-83fd-36f188949cb1"
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
