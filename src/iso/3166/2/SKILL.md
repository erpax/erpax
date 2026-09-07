---
name: "2"
description: "Use when implementing or referencing ISO 3166-2 — Country subdivisions."
atomPath: "iso/3166/2"
coordinate: "iso/3166/2 · 8/crest · 5fca7c4f"
contentUuid: "846fca5a-46b1-544a-8e99-f27fc73608a7"
diamondUuid: "996c0949-8112-8204-ae6f-eddc18ba7eb4"
uuid: "5fca7c4f-03f4-80e1-9d44-fabf49cad5f5"
horo: 8
typography:
  partition: iso
  bondDegree: 9
standards:
  - "ISO-3166-2"
  - "ISO-3166-2:2020 subdivision-codes"
  - "ISO-3166-2:2020 subdivision-codes`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "986584ad-80a7-82ca-9b00-a3d1678b2f4a"
  stages:
    - stage: path
      stageUuid: "3b69ed7e-64f9-82ac-aa63-7f2229c25fad"
    - stage: trinity
      stageUuid: "539ae676-25f9-8879-aed9-b8a6fe0471c4"
    - stage: boundary
      stageUuid: "39081908-464b-8338-a676-2b3f1c69d1ad"
    - stage: links
      stageUuid: "2ef02dc7-411b-8978-9dbd-c2de964350fd"
    - stage: horo
      stageUuid: "d37b146a-b601-8086-9053-18a1e68647cd"
    - stage: seal
      stageUuid: "f44b0c8e-b08a-814f-9462-9c6c2a571318"
    - stage: uuid
      stageUuid: "7555003d-087e-8173-9386-d48a15d2691a"
version: 2
---
# ISO 3166-2 — Country subdivisions

**Edition:** ISO 3166-2:2020.
**Publisher:** <https://www.iso.org/standard/72483.html>

## What's here

- `validate.ts` — `isIso3166_2(s)` regex for `<alpha-2>-<1..3 alphanum>`.

## Used by

Sub-national tax jurisdictions, region/state fields on addresses, customers,
vendors, and tax-jurisdiction master records.

**Law — [[law]]: a subdivision code is only valid as `<alpha-2>-<subdivision>` — a region is always named relative to its country, never standalone, so the parent country is inseparable from the subnational jurisdiction.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-3166-2:2020 subdivision-codes`

Composes: [[standards]].
