---
name: "2"
description: "Use when implementing or referencing ISO 3166-2 — Country subdivisions."
atomPath: "iso/3166/2"
coordinate: "iso/3166/2 · 1/base · a6eabdb7"
contentUuid: "e92c4809-83fa-5107-beea-6f5f7eb0f953"
diamondUuid: "71654958-85c3-80a2-97ad-2bf37b1fbd8c"
uuid: "a6eabdb7-b97a-8007-862f-836f8259ea76"
horo: 1
typography:
  partition: iso
  bondDegree: 1
standards:
  - "ISO-3166-2"
  - "ISO-3166-2:2020 subdivision-codes"
  - "ISO-3166-2:2020 subdivision-codes`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "3611a865-40f7-8725-90da-d70fc10527f5"
  stages:
    - stage: path
      stageUuid: "3b69ed7e-64f9-82ac-aa63-7f2229c25fad"
    - stage: trinity
      stageUuid: "539ae676-25f9-8879-aed9-b8a6fe0471c4"
    - stage: boundary
      stageUuid: "39081908-464b-8338-a676-2b3f1c69d1ad"
    - stage: links
      stageUuid: "f52dbee7-5431-8942-8261-ee9e9c2b483d"
    - stage: horo
      stageUuid: "0dfac2a8-e875-814d-b3ca-1a4763ede99b"
    - stage: seal
      stageUuid: "f44b0c8e-b08a-814f-9462-9c6c2a571318"
    - stage: uuid
      stageUuid: "50d1a7e3-19c0-89ab-bf9f-0398111ba9ee"
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

Composes: [[iso]] · [[standards]] · [[country]].
