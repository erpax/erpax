---
name: esr
description: "Use when implementing or referencing EU CSRD / ESRS."
atomPath: "eu/csrd/esr"
coordinate: "eu/csrd/esr · 7/descent · 7e01c79e"
contentUuid: "1be783ec-d015-540d-a62d-f7be20218ca4"
diamondUuid: "2618f2f5-ffe1-85a2-b6dc-f7fc01861749"
uuid: "7e01c79e-49d9-8490-bd0c-008bbb64a6ab"
horo: 7
bonds:
  in:
    - law
  out:
    - law
typography:
  partition: eu
  bondDegree: 3
  neighbors: []
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
  - XBRL
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - law
  backlinks:
    - law
signatures:
  computationUuid: "7c131e15-13d4-8a14-8718-27a536603781"
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
      stageUuid: "80141e70-1ad4-8c5e-9d24-17053c237ba6"
    - stage: seal
      stageUuid: "210aa53f-c755-8108-87c5-bc1bec2afc4c"
    - stage: uuid
      stageUuid: "6bd241a9-f92b-80b8-8a0f-f29c2668598d"
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
