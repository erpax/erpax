---
name: tpg
description: Use when implementing or referencing OECD Transfer Pricing Guidelines.
atomPath: "oecd/tpg"
coordinate: "oecd/tpg · 8/crest · 254b723b"
contentUuid: "274161be-7614-5329-a7a2-05a928713f80"
diamondUuid: "bf133e3e-05a0-8ebd-b739-1c8d19cc8586"
uuid: "254b723b-b88b-8932-98f2-f1de7a64852a"
horo: 8
typography:
  partition: oecd
  bondDegree: 3
standards:
  - BEPS
  - "EU DAC-4 country-by-country-reporting"
  - "OECD BEPS Action 13 master-file-local-file-cbcr"
  - OECD Pillar Two GloBE 15% global minimum tax (companion)
  - "OECD TPG 2022 transfer-pricing-guidelines"
  - "OECD-Pillar-Two"
  - "OECD-Transfer-Pricing"
bindings: []
signatures:
  computationUuid: "d4b06192-8e6d-8c68-92eb-6b1b78df62fa"
  stages:
    - stage: path
      stageUuid: "ac365bb4-d44e-8f5a-9e8e-4cab428c22a7"
    - stage: trinity
      stageUuid: "a6ac7dff-f4e7-8bda-b88f-216b6dd3e24e"
    - stage: boundary
      stageUuid: "0d86226e-ff7c-8261-ad77-c450df647a3b"
    - stage: links
      stageUuid: "5fcf0b7e-0f65-86a2-8013-7443eace41c0"
    - stage: horo
      stageUuid: "172b64fc-6bd4-8420-a22c-4ebbecb87c02"
    - stage: seal
      stageUuid: "55d466bd-48ea-856f-9e92-8108ce05ecd3"
    - stage: uuid
      stageUuid: "6510339c-d0cc-8b64-a031-b16f74512d09"
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

Composes: [[standards]].
