---
name: rev2
description: Use when implementing or referencing NACE Rev. 2.
atomPath: "nace/rev2"
coordinate: "nace/rev2 · 8/crest · 5ad9ed20"
contentUuid: "a0ba36d0-c53c-5cc2-8ffd-17196a238a1a"
diamondUuid: "12469394-cb91-8cfd-8375-539ef886459d"
uuid: "5ad9ed20-018d-8c84-9cd9-ba85329580e8"
horo: 8
typography:
  partition: nace
  bondDegree: 3
standards:
  - "EU CSRD ESRS 2 §80(b) sector-classification"
  - "EU Regulation (EC) No 1893/2006 NACE Rev.2"
  - NACE
  - "NAICS 2022 (US/CA/MX companion)"
  - UN ISIC Rev.4 (companion)
bindings: []
signatures:
  computationUuid: "64f63b61-ee39-8965-aa99-610809c599b4"
  stages:
    - stage: path
      stageUuid: "01a4cab2-4276-8308-8d09-5b0d1a3ec733"
    - stage: trinity
      stageUuid: "9ec81e1c-cc4f-823c-a476-a265d4b2fdb3"
    - stage: boundary
      stageUuid: "1c0de0f0-25bd-8c99-900b-c6852edd7932"
    - stage: links
      stageUuid: "dac0f865-0bb2-82db-be5c-65ca3ceff7e1"
    - stage: horo
      stageUuid: "70228df4-55bf-8ab7-875f-bcdb67caca81"
    - stage: seal
      stageUuid: "1ea3438d-a34f-8350-9227-dd7d3e54e014"
    - stage: uuid
      stageUuid: "5824e3eb-6226-86ae-bb02-88a2ab480187"
version: 2
---
# NACE Rev. 2

EU statistical classification of economic activities — Regulation (EC) No 1893/2006. Hierarchical: Section (letter A-U) → Division (2-digit) → Group (3-digit) → Class (4-digit).

## Scope

- 21 sections with descriptive titles + Payload select options (covers ~90% of UI use cases).
- `isValidNaceCodeStructure(code)` shape validator for class-level codes (e.g. `62.01`).
- `sectionForNaceCode(code)` reverse lookup — division-to-section map.

## Out of scope

- Full per-class dictionary (~615 classes) — too large for in-repo. Use Eurostat RAMON service when full descriptions needed.
- ISIC Rev.4 + NAICS reciprocal lookups — store per-row when needed.
- NACE Rev.3 (planned 2025+) — add when published.

## Citations

- EU Regulation (EC) No 1893/2006 — NACE Rev.2
- UN ISIC Rev.4 (companion classification)
- US/CA/MX NAICS 2022 (companion)
- EU CSRD ESRS 2 §80(b) sector-classification disclosure

**Law — [[law]]: NACE Rev. 2 classifies an economic activity through one strict hierarchy — Section (A–U) → Division (2-digit) → Group (3-digit) → Class (4-digit) — per Regulation (EC) No 1893/2006.**
