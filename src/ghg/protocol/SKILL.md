---
name: protocol
description: Use when implementing or referencing GHG Protocol.
atomPath: "ghg/protocol"
coordinate: "ghg/protocol · 7/descent · 3ce83e6b"
contentUuid: "af7b1468-32a2-57a6-9b08-72da910d3695"
diamondUuid: "c0045657-c789-88bd-90d4-ac77996a5c9e"
uuid: "3ce83e6b-a8c9-8a74-b207-895d6ea13490"
horo: 7
typography:
  partition: ghg
  bondDegree: 3
standards:
  - "EU ESRS E1 §44-50 ghg-emissions-disclosure (companion)"
  - "EU-ESRS"
  - "EU-VAT-Implementing-Reg-282/2011"
  - GHG Protocol Corporate Standard (revised 2015)
  - GHG Protocol Scope 2 Guidance (2015)
  - GHG Protocol Scope 3 Standard (2011)
  - "GHG-Protocol"
  - "IFRS S2 §29-32 climate-related-metrics (companion)"
  - "IFRS S2 §29-32 climate-related-metrics (companion)`"
  - "IFRS-S2"
  - "ISO 14064-1:2018 organisation-level-ghg-quantification"
  - "ISO 14064-1:2018 organisation-level-ghg-quantification`"
  - "ISO-14064-1"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "ca2d9388-0013-8968-9b86-23e8caa65b13"
  stages:
    - stage: path
      stageUuid: "51418229-28d4-8f7d-86b9-e02843439ce5"
    - stage: trinity
      stageUuid: "68c0c9d7-8116-8a14-850b-4719e2026380"
    - stage: boundary
      stageUuid: "c5398119-940d-88ae-a24a-5edd3988e9de"
    - stage: links
      stageUuid: "65a987b0-a2e8-85eb-b09d-41fdefa6d607"
    - stage: horo
      stageUuid: "c50451b2-3e21-8d1a-b3d2-2a74e83749f8"
    - stage: seal
      stageUuid: "83431ce0-8794-8b40-b0d7-1b1e74168d7f"
    - stage: uuid
      stageUuid: "41d6f1bb-a753-873c-aca5-d90488fdba03"
version: 2
---
# GHG Protocol

Greenhouse Gas Protocol — Corporate Standard (revised 2015), Scope 2 Guidance (2015), and Scope 3 Standard (2011). Published jointly by WRI + WBCSD.

## Scope

The 4 + 3 + 15 = 22 sub-categories that make up Scope 1 + Scope 2 + Scope 3, plus methodology classes (activity-based vs spend-based per Scope 3 §7.3 hierarchy) and GWP horizons (100-year vs 20-year per IPCC AR6). Used by `carbon-emissions` for per-source posting and by `csrd-disclosures` (ESRS E1) for the disclosure roll-up.

## Out of scope

- Specific emission factors — those vary by source (DEFRA, EPA, IEA, supplier-specific) and live with the per-row data.
- Sector-specific guidance (Aviation Sector Guidance, Financial Sector Guidance) — reference separately when needed.
- Scope 4 (avoided emissions) — not yet a published GHG Protocol category.

## Citations

- GHG Protocol Corporate Standard (revised 2015) — WRI/WBCSD
- GHG Protocol Scope 2 Guidance (2015)
- GHG Protocol Corporate Value Chain (Scope 3) Standard (2011)
- ISO 14064-1:2018 (organisation-level GHG quantification)
- IPCC AR6 (GWP factors)
- EU ESRS E1 §44-50 (CSRD disclosure mapping)
- IFRS S2 (climate-related disclosures)

**Law — [[law]]: the GHG Protocol fixes the 4 + 3 + 15 = 22 sub-categories of Scope 1 + 2 + 3 plus the activity-vs-spend methodology hierarchy and GWP horizon — the canonical answer-path for per-source carbon posting and the ESRS E1 disclosure roll-up.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO 14064-1:2018 organisation-level-ghg-quantification`
- `@standard IFRS S2 §29-32 climate-related-metrics (companion)`
