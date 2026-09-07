---
name: esr
description: "Use when implementing or referencing EU CSRD / ESRS."
atomPath: "eu/csrd/esr"
coordinate: "eu/csrd/esr · 8/crest · 07867860"
contentUuid: "d04d07ab-017c-5736-93c3-b6d0d3da7d7d"
diamondUuid: "a2c7727e-b3bd-8327-ac40-0c0ea943a7b6"
uuid: "07867860-235e-825c-b54c-e057e339a0a1"
horo: 8
typography:
  partition: eu
  bondDegree: 3
standards:
  - "EU CSRD Directive 2022/2464"
  - "EU EFRAG ESRS-XBRL taxonomy"
  - EU ESRS 1 General Requirements
  - EU ESRS 2 General Disclosures
  - EU ESRS E1 Climate Change (companion to GHG Protocol)
  - "EU-CSRD"
  - "EU-ESRS"
  - "GHG-Protocol"
  - IFRS S1 General Sustainability Disclosures
  - "IFRS S1 General Sustainability Disclosures`"
  - "IFRS S2 Climate-Related Disclosures"
  - "IFRS S2 Climate-Related Disclosures`"
  - "IFRS-S1"
  - "IFRS-S2"
  - XBRL
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "177c59d3-9eb8-85f0-8b74-b0b33e81c2fc"
  stages:
    - stage: path
      stageUuid: "e6056358-8cad-8193-8493-c825482cccd1"
    - stage: trinity
      stageUuid: "1f114b80-8813-8a2a-902d-a3ecf3e1a730"
    - stage: boundary
      stageUuid: "af6b254d-87a4-8d97-b8e8-201f9564730a"
    - stage: links
      stageUuid: "4267e412-ff7f-8754-9245-dd613a80f621"
    - stage: horo
      stageUuid: "3e2db346-dfd4-8352-bfd9-5f58ecc50f7d"
    - stage: seal
      stageUuid: "210aa53f-c755-8108-87c5-bc1bec2afc4c"
    - stage: uuid
      stageUuid: "3571af50-bfa5-8210-a4e3-78ed564de9d5"
version: 2
---
# EU CSRD / ESRS

Corporate Sustainability Reporting Directive (EU) 2022/2464 + European Sustainability Reporting Standards (ESRS 1, ESRS 2, ESRS E1–E5, ESRS S1–S4, ESRS G1).

## Scope

Topic taxonomy + category taxonomy + double-materiality scale (ESRS 1 §3) + assurance-level scale (CSRD Art.34a). Used by `csrd-disclosures` collection for topic tagging and by `carbon-emissions` for ESRS E1 roll-up.

## Out of scope

- Per-datapoint ESRS XBRL identifiers — stored as free-text `datapointId` on each row (e.g. `ESRS-E1-6-1`).
- Per-company double-materiality assessment process (separate methodology, captured in narrative).
- Sector-specific ESRS (drafts in development by EFRAG).

**Law — [[law]]: the CSRD/ESRS topic + double-materiality + assurance-level taxonomy consumed for disclosure tagging and ESRS E1 emissions roll-up — the standard's scales, not the per-company materiality assessment.**

## Citations

- EU CSRD Directive 2022/2464 (Official Journal L 322, 16 December 2022)
- EU ESRS 1 + ESRS 2 (Commission Delegated Regulation (EU) 2023/2772)
- EU ESRS E1-E5 + S1-S4 + G1 (same delegated regulation, Annexes)
- EFRAG ESRS-XBRL taxonomy
- IFRS S1 + S2 (companion standards)
- ISAE 3000 (assurance methodology for non-financial reports)

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard IFRS S1 General Sustainability Disclosures`
- `@standard IFRS S2 Climate-Related Disclosures`
