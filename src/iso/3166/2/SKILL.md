---
name: "2"
description: "Use when implementing or referencing ISO 3166-2 — Country subdivisions."
atomPath: "iso/3166/2"
coordinate: "iso/3166/2 · 8/crest · 08fef969"
contentUuid: "05200962-7bae-5e8b-914c-53b8a70a6c6c"
diamondUuid: "9659a9ed-ff0a-8131-976d-2803305048e4"
uuid: "08fef969-3eb9-8db2-a0ce-4eafd57de781"
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
  computationUuid: "932ecf55-8c24-8834-853d-fedb89042ac5"
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
      stageUuid: "46ff37d4-00f4-8953-b241-cd8a32afe151"
    - stage: seal
      stageUuid: "f44b0c8e-b08a-814f-9462-9c6c2a571318"
    - stage: uuid
      stageUuid: "0951e316-dfb9-8714-8a01-f3b9253e337f"
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
