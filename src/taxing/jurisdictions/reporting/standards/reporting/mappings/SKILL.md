---
name: mappings
description: "Use when translating elements across reporting frameworks — account/line-item/disclosure/metric mappings between a source and target standard (XBRL-GL, IFRS-Taxonomy, SAF-T). The cross-standard element-mapping node."
atomPath: "taxing/jurisdictions/reporting/standards/reporting/mappings"
coordinate: "taxing/jurisdictions/reporting/standards/reporting/mappings · 8/crest · bb993494"
contentUuid: "97c44a9d-8e7e-56f7-a9c0-1862c5738dea"
diamondUuid: "5edf7ca2-0a0c-8c99-a39e-9d6f4b0cab82"
uuid: "bb993494-7c35-8325-b82e-89064ec4756a"
horo: 8
typography:
  partition: taxing
  bondDegree: 8
standards:
  - "IFRS-Taxonomy reporting-mapping"
  - "IFRS-Taxonomy reporting-mapping`"
  - "SAF-T OECD mapping"
  - XBRL
  - "XBRL-GL global-ledger-taxonomy"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "10baf63e-3c46-8862-9a3d-6e0ddeca7e55"
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
      stageUuid: "2f13674d-16ad-85a8-a220-5c21c51da38f"
    - stage: seal
      stageUuid: "28fef98e-2137-8a3c-baf9-17ab842acad5"
    - stage: uuid
      stageUuid: "62679e54-2a90-87d2-ad57-cab925ec9071"
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
