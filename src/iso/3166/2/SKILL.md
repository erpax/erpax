---
name: "2"
description: "Use when implementing or referencing ISO 3166-2 — Country subdivisions."
atomPath: iso/3166/2
coordinate: iso/3166/2 · 1/base · d9198d40
contentUuid: "af408197-0b58-547c-9182-9c0055ce656e"
diamondUuid: "35c37a57-a385-8b72-941e-8601adc840f8"
uuid: "d9198d40-e78b-8cfb-9e10-15b04fa80640"
horo: 1
bonds:
  in:
    - law
  out:
    - law
typography:
  partition: iso
  bondDegree: 3
  neighbors: []
standards:
  - "ISO-3166-2"
  - "ISO-3166-2:2020 subdivision-codes"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - law
  backlinks:
    - law
signatures:
  computationUuid: "7b993358-2574-8150-8e75-ab74ab540ce6"
  stages:
    - stage: path
      stageUuid: "3b69ed7e-64f9-82ac-aa63-7f2229c25fad"
    - stage: trinity
      stageUuid: "539ae676-25f9-8879-aed9-b8a6fe0471c4"
    - stage: boundary
      stageUuid: "39081908-464b-8338-a676-2b3f1c69d1ad"
    - stage: links
      stageUuid: "2f6034df-eb0b-83f5-8c40-b5ee2023374b"
    - stage: horo
      stageUuid: "a846d430-6df5-887a-97ad-c387cdd22cab"
    - stage: seal
      stageUuid: "f44b0c8e-b08a-814f-9462-9c6c2a571318"
    - stage: uuid
      stageUuid: "abadf29a-afee-8e85-9b1e-1302ca24edf7"
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
