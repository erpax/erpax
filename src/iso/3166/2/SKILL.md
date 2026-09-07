---
name: "2"
description: "Use when implementing or referencing ISO 3166-2 — Country subdivisions."
atomPath: "iso/3166/2"
coordinate: "iso/3166/2 · 4/weave · 8b75e504"
contentUuid: "3c672883-b4ce-5d74-a3f2-895523a3e2ce"
diamondUuid: "43204e50-7410-8385-99a7-394bf2db8cf7"
uuid: "8b75e504-9c16-8731-80e3-c6e550b828b1"
horo: 4
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
  computationUuid: "feac25e6-9c95-8174-a362-f7ba0ea01ea2"
  stages:
    - stage: path
      stageUuid: "3b69ed7e-64f9-82ac-aa63-7f2229c25fad"
    - stage: trinity
      stageUuid: "539ae676-25f9-8879-aed9-b8a6fe0471c4"
    - stage: boundary
      stageUuid: "39081908-464b-8338-a676-2b3f1c69d1ad"
    - stage: links
      stageUuid: "2767e29c-cb39-84ff-9576-3af59ce7260e"
    - stage: horo
      stageUuid: "be7a09bb-a489-8bf3-877d-19cc2d883c6f"
    - stage: seal
      stageUuid: "f44b0c8e-b08a-814f-9462-9c6c2a571318"
    - stage: uuid
      stageUuid: "6bbb6f3d-fa4a-8944-92b2-6b2a2bed8981"
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
