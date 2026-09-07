---
name: tpg
description: Use when implementing or referencing OECD Transfer Pricing Guidelines.
atomPath: "oecd/tpg"
coordinate: "oecd/tpg · 8/crest · 958dfe2b"
contentUuid: "af97b13c-d564-5ae3-9cf6-a740a4b1ecbc"
diamondUuid: "b8b30b68-ed41-8126-8a09-3d3d55cdadc0"
uuid: "958dfe2b-5a08-8381-9c8b-c4f56326338a"
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
  computationUuid: "f7e2bf58-dc20-8992-a4f3-e1f0469000f3"
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
      stageUuid: "132f771c-5e63-800b-b6f5-368ef2dd95eb"
    - stage: seal
      stageUuid: "55d466bd-48ea-856f-9e92-8108ce05ecd3"
    - stage: uuid
      stageUuid: "46d4c491-e3fb-82ef-8fa9-c3c8b6d024c5"
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
