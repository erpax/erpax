---
name: rev2
description: Use when implementing or referencing NACE Rev. 2.
atomPath: "nace/rev2"
coordinate: "nace/rev2 · 2/share · 0b86f261"
contentUuid: "97e42397-f300-59e3-9bf0-55d6ab529b08"
diamondUuid: "4fb70e19-fe11-8081-982f-e748d611887f"
uuid: "0b86f261-c4ae-8737-aadf-9ad74e94ef2e"
horo: 2
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
  computationUuid: "8deb7d8e-82a5-84d0-a3e7-327b83a48cf6"
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
      stageUuid: "aba40a4f-7bc5-8ad6-a0c7-632586fcb41f"
    - stage: seal
      stageUuid: "1ea3438d-a34f-8350-9227-dd7d3e54e014"
    - stage: uuid
      stageUuid: "6d9670db-e14d-8ab3-b245-d829c52b950d"
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
