---
name: schedules
description: "Use when recording or reviewing the depreciation charge for each period — linking to the fixed-asset master, storing depreciationAmount, accumulatedAfter, and bookValueAfter per period; posting to GL via the depreciation hook; verifying period-lock before posting. The per-period IAS-16 depreciation evidence node."
atomPath: "fixed/assets/depreciation/schedules"
coordinate: "fixed/assets/depreciation/schedules · 7/descent · 7ecb5631"
contentUuid: "fc1da108-afe9-5640-aa5f-2c9fcb1b95ea"
diamondUuid: "b1c9f66b-9887-87f2-8743-b5553a1bbe34"
uuid: "7ecb5631-33b7-82a3-941e-5a85f0439d3e"
horo: 7
bonds:
  in:
    - accounting
    - assets
    - balance
    - identity
    - intangible
    - proof
    - standard
    - transaction
  out:
    - accounting
    - assets
    - balance
    - identity
    - intangible
    - proof
    - standard
    - transaction
typography:
  partition: fixed
  bondDegree: 0
  neighbors: []
standards:
  - "IFRS IAS-16 property-plant-and-equipment depreciation"
  - "IFRS IAS-36 impairment-of-assets"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time period-end"
  - "ISO-8601-1:2019 date-time period-end`"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-360 property-plant-and-equipment"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - accounting
    - balance
    - identity
    - proof
    - standard
    - transaction
  matrix:
    - accounting
    - assets
    - balance
    - identity
    - intangible
    - proof
    - standard
    - transaction
  backlinks:
    - accounting
    - assets
    - balance
    - identity
    - intangible
    - proof
    - standard
    - transaction
signatures:
  computationUuid: "036526c8-1b8d-89d6-9196-1e35d25e89fd"
  stages:
    - stage: path
      stageUuid: "dc1ae3b7-dc2e-8a8d-940b-9e57c4f92d39"
    - stage: trinity
      stageUuid: "fae976bc-8bac-8a78-929c-f0121592a127"
    - stage: boundary
      stageUuid: "7549f41d-f01d-85eb-9c7a-41ca622883f7"
    - stage: links
      stageUuid: "a99ce833-ba58-88d1-b01c-b67a89d68f3a"
    - stage: horo
      stageUuid: "e1f7875a-901d-82c5-bec7-b659015a39af"
    - stage: seal
      stageUuid: "6dd2f3d3-a5af-80e6-8e22-11503fae091b"
    - stage: uuid
      stageUuid: "91f844f6-2733-8b55-8371-a9e0a8a08835"
version: 2
---
# depreciation-schedules

Depreciation Schedules — period-by-period IAS 16 depreciation detail.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time period-end`
- `@standard ISO-4217:2015 currency-codes`

- ISO-8601-1:2019 date-time period-end
- ISO-4217:2015 currency-codes
- IFRS IAS-16 property-plant-and-equipment depreciation
- IFRS IAS-36 impairment-of-assets
- US-GAAP ASC-360 property-plant-and-equipment
- ISO-19011:2018 audit-trail depreciation-evidence
- SOX §404 internal-controls

Composes: [[accounting]] · [[transaction]] · [[balance]] · [[proof]] · [[standard]] · [[identity]].
