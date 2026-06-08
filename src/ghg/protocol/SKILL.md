---
name: protocol
description: Use when implementing or referencing GHG Protocol.
atomPath: ghg/protocol
coordinate: ghg/protocol · 5/round · 2793fe9b
contentUuid: "347beafd-60d6-5be2-a09e-0efad5c3f957"
diamondUuid: "28dff076-0d83-8ac4-8f31-d6108dbb9c87"
uuid: "2793fe9b-40d2-80af-b6bb-644a33fafdd0"
horo: 5
bonds:
  in:
    - law
  out:
    - law
typography:
  partition: ghg
  bondDegree: 3
  neighbors: []
standards:
  - "EU ESRS E1 §44-50 ghg-emissions-disclosure (companion)"
  - "EU-2011/83"
  - "EU-2018/1673"
  - "EU-2018/1725"
  - "EU-2018/302"
  - "EU-2018/389-SCA-RTS"
  - "EU-2018/843"
  - "EU-2018/957"
  - "EU-ESRS"
  - "EU-VAT-Implementing-Reg-282/2011"
  - GHG Protocol Corporate Standard (revised 2015)
  - GHG Protocol Scope 2 Guidance (2015)
  - GHG Protocol Scope 3 Standard (2011)
  - "GHG-Protocol"
  - "IFRS S2 §29-32 climate-related-metrics (companion)"
  - "ISO 14064-1:2018 organisation-level-ghg-quantification"
  - "ISO-14064-1"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - law
  backlinks:
    - law
signatures:
  computationUuid: "0af7e573-4a32-8f34-91d2-7258d4573bb2"
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
      stageUuid: "060f1446-4c4b-827d-af93-7ca15d2eeae7"
    - stage: seal
      stageUuid: "83431ce0-8794-8b40-b0d7-1b1e74168d7f"
    - stage: uuid
      stageUuid: "a85c5dca-ee29-8bc5-8899-47acf78f8f71"
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
