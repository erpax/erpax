---
name: tpg
description: Use when implementing or referencing OECD Transfer Pricing Guidelines.
atomPath: "oecd/tpg"
coordinate: "oecd/tpg · 8/crest · e0934f47"
contentUuid: "7a6f4cab-9534-5708-9184-a381e9f80e20"
diamondUuid: "0c772989-1ff4-81db-be54-b5dadda65b84"
uuid: "e0934f47-52e8-8b73-9984-f8c0114dc33c"
horo: 8
bonds:
  in:
    - readme
  out: []
typography:
  partition: oecd
  bondDegree: 0
  neighbors: []
standards:
  - BEPS
  - "EU DAC-4 country-by-country-reporting"
  - "OECD BEPS Action 13 master-file-local-file-cbcr"
  - OECD Pillar Two GloBE 15% global minimum tax (companion)
  - "OECD TPG 2022 transfer-pricing-guidelines"
  - "OECD-Pillar-Two"
  - "OECD-Transfer-Pricing"
bindings: []
neighbors:
  wikilink: []
  matrix: []
  backlinks: []
signatures:
  computationUuid: "d6c71e0f-1117-818e-b0ae-6579c02b999d"
  stages:
    - stage: path
      stageUuid: "ac365bb4-d44e-8f5a-9e8e-4cab428c22a7"
    - stage: trinity
      stageUuid: "a6ac7dff-f4e7-8bda-b88f-216b6dd3e24e"
    - stage: boundary
      stageUuid: "0d86226e-ff7c-8261-ad77-c450df647a3b"
    - stage: links
      stageUuid: "64326337-c75c-8b6c-8af2-4d38c242f385"
    - stage: horo
      stageUuid: "a1fcd6bc-282a-8f20-bc7b-a81fe1bea484"
    - stage: seal
      stageUuid: "55d466bd-48ea-856f-9e92-8108ce05ecd3"
    - stage: uuid
      stageUuid: "7c0c54e4-edf1-8574-8254-406e0ebd90f9"
version: 2
---
# OECD Transfer Pricing Guidelines

OECD TPG 2022 (Chapter II — methods, Annex I — Master File, Annex II — Local File) + BEPS Action 13 (Master File / Local File / CbCR three-tier documentation) + EU DAC-4 + OECD Pillar Two GloBE.

## Scope

Method enumeration (CUP / Resale Price / Cost Plus / TNMM / Profit Split / Other) + BEPS file-type enumeration + the €750M revenue threshold constants (CbCR + Pillar Two).

## Out of scope

- Per-jurisdiction TP documentation deadlines and penalty regimes — these vary by country and live with the per-`transfer-pricing-files` row.
- Comparable benchmarking data (commercial databases like Amadeus, RoyaltyStat) — operator-supplied per row.
- Pillar One (digital tax reallocation) — not yet in force.

## Citations

- OECD Transfer Pricing Guidelines for Multinational Enterprises and Tax Administrations (2022)
- OECD BEPS Action 13 — Transfer Pricing Documentation and Country-by-Country Reporting (2015 + 2017 update)
- EU DAC-4 — Council Directive (EU) 2016/881 (administrative cooperation in tax — CbCR)
- OECD Pillar Two GloBE Rules (Model Rules 2021)
