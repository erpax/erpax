---
name: esr
description: "Use when implementing or referencing EU CSRD / ESRS."
atomPath: "eu/csrd/esr"
coordinate: "eu/csrd/esr · 5/round · b51fabb1"
contentUuid: "d8cd787a-9c81-5501-9481-439cd6b42381"
diamondUuid: "b7ef0a57-d614-880e-9b07-555b144868bc"
uuid: "b51fabb1-5f0b-831f-8dbf-98db268af0f8"
horo: 5
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
  computationUuid: "8fc06a97-d237-8e4f-a77b-362072afc57e"
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
      stageUuid: "fb8379f1-c41c-8963-9562-5661889c89e4"
    - stage: seal
      stageUuid: "210aa53f-c755-8108-87c5-bc1bec2afc4c"
    - stage: uuid
      stageUuid: "f5efafe4-d69d-82bd-900f-1bf0d666c5da"
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
