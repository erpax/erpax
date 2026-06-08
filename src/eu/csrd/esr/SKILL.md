---
name: esr
description: Use when implementing or referencing EU CSRD / ESRS.
atomPath: eu/csrd/esr
coordinate: eu/csrd/esr · 5/round · bca075d1
contentUuid: "31379da7-9c8f-5025-a7d7-8fe540e58439"
diamondUuid: "c1aeb228-ab4c-8c67-acc7-ff61941b7bfe"
uuid: "bca075d1-29eb-8005-84e8-f3cecbdb9f36"
horo: 5
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
  - EU CSRD Directive 2022/2464
  - "EU EFRAG ESRS-XBRL taxonomy"
  - EU ESRS 1 General Requirements
  - EU ESRS 2 General Disclosures
  - EU ESRS E1 Climate Change (companion to GHG Protocol)
  - "EU-2022/1925"
  - "EU-2022/2065"
  - "EU-2022/2554"
  - "EU-2022/2555"
  - "EU-2022/868"
  - "EU-CSRD"
  - "EU-ESRS"
  - "GHG-Protocol"
  - IFRS S1 General Sustainability Disclosures
  - "IFRS S2 Climate-Related Disclosures"
  - XBRL
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - law
  backlinks:
    - law
signatures:
  computationUuid: "5a482325-decb-8346-a3de-a5451046eb18"
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
      stageUuid: "37006c18-32ce-8860-b1d3-813b791e9e48"
    - stage: seal
      stageUuid: "210aa53f-c755-8108-87c5-bc1bec2afc4c"
    - stage: uuid
      stageUuid: "ad72b3dc-8f34-8252-ba80-5d51abc7ea6f"
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
