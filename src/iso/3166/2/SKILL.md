---
name: "2"
description: "Use when implementing or referencing ISO 3166-2 — Country subdivisions."
atomPath: "iso/3166/2"
coordinate: "iso/3166/2 · 5/round · 11b9186f"
contentUuid: "333fe036-b17b-59f9-a591-30575b7f42a3"
diamondUuid: "83ec7e44-1107-8c47-ba4b-d24255b13813"
uuid: "11b9186f-edd0-881f-aa84-679e706b12fe"
horo: 5
typography:
  partition: iso
  bondDegree: 7
standards:
  - "ISO-3166-2"
  - "ISO-3166-2:2020 subdivision-codes"
  - "ISO-3166-2:2020 subdivision-codes`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "0a577fa0-259f-813d-b577-f91d40e69be1"
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
      stageUuid: "fcd538d4-4092-8b54-baa2-81a142880654"
    - stage: seal
      stageUuid: "f44b0c8e-b08a-814f-9462-9c6c2a571318"
    - stage: uuid
      stageUuid: "1f3b7544-6578-8c2a-8620-a3d073853c6d"
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
