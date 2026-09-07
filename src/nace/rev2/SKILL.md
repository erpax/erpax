---
name: rev2
description: Use when implementing or referencing NACE Rev. 2.
atomPath: "nace/rev2"
coordinate: "nace/rev2 · 7/descent · 011247f4"
contentUuid: "a4a97271-d6e9-5043-a4a4-4331e6f08f19"
diamondUuid: "dd7294fd-37aa-8a5b-9d72-d2652f3214d0"
uuid: "011247f4-5daf-895a-ad32-265c2322146b"
horo: 7
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
  computationUuid: "10cc4d65-f941-8154-aef0-3f493951f692"
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
      stageUuid: "5b2f4e41-5abb-8882-aa3d-86612b6f944a"
    - stage: seal
      stageUuid: "1ea3438d-a34f-8350-9227-dd7d3e54e014"
    - stage: uuid
      stageUuid: "fbca378f-8227-876a-9913-e992fbf0707e"
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
