---
name: rev2
description: Use when implementing or referencing NACE Rev. 2.
atomPath: "nace/rev2"
coordinate: "nace/rev2 · 7/descent · e05c10fd"
contentUuid: "39b84f77-eb52-5800-9481-fb6e60626e02"
diamondUuid: "0ff4e1f4-5258-8c71-8f92-4af765e70c85"
uuid: "e05c10fd-a1ce-8276-b765-4bf98512f346"
horo: 7
bonds:
  in:
    - law
  out:
    - law
typography:
  partition: nace
  bondDegree: 3
  neighbors: []
standards:
  - "EU CSRD ESRS 2 §80(b) sector-classification"
  - "EU Regulation (EC) No 1893/2006 NACE Rev.2"
  - "EU-2006/43"
  - NACE
  - "NAICS 2022 (US/CA/MX companion)"
  - UN ISIC Rev.4 (companion)
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - law
  backlinks:
    - law
signatures:
  computationUuid: "2a99b457-7e0f-8863-9362-87088186fd47"
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
      stageUuid: "c31020d5-c894-8e41-8901-62b64eea35a8"
    - stage: seal
      stageUuid: "1ea3438d-a34f-8350-9227-dd7d3e54e014"
    - stage: uuid
      stageUuid: "ea8b2513-fa5c-886c-8249-d1291bbeb20f"
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
