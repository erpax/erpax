---
name: tpg
description: Use when implementing or referencing OECD Transfer Pricing Guidelines.
atomPath: oecd/tpg
coordinate: oecd/tpg · 2/share · 6c89fb9f
contentUuid: "7752e023-f792-5b49-a805-afa1684b305d"
diamondUuid: "199fb25b-3aad-83fc-86c2-64b0c5bc5c82"
uuid: "6c89fb9f-0617-83d1-9c5d-d299f519cff6"
horo: 2
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
  computationUuid: "622e241d-bbf9-8487-a4dc-b8b0aef8f947"
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
      stageUuid: "7b8c3646-319d-87f6-9625-399465926ba6"
    - stage: seal
      stageUuid: "55d466bd-48ea-856f-9e92-8108ce05ecd3"
    - stage: uuid
      stageUuid: "a988c22f-ec97-8f17-9cd9-e6c08303f196"
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
