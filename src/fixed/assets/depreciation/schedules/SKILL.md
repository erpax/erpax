---
name: schedules
description: "Use when recording or reviewing the depreciation charge for each period — linking to the fixed-asset master, storing depreciationAmount, accumulatedAfter, and bookValueAfter per period; posting to GL via the depreciation hook; verifying period-lock before posting. The per-period IAS-16 depreciation evidence node."
atomPath: "fixed/assets/depreciation/schedules"
coordinate: "fixed/assets/depreciation/schedules · 5/round · e1ece442"
contentUuid: "c2f66571-3d8c-5ff0-8fde-b25008605f63"
diamondUuid: "7bb4c7c1-c756-88ca-8172-5c5178701a95"
uuid: "e1ece442-2c65-8385-aa07-c692c2de5f9b"
horo: 5
typography:
  partition: fixed
  bondDegree: 26
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
signatures:
  computationUuid: "a2779a18-8312-8483-8dca-fc9c0a7af74a"
  stages:
    - stage: path
      stageUuid: "dc1ae3b7-dc2e-8a8d-940b-9e57c4f92d39"
    - stage: trinity
      stageUuid: "fae976bc-8bac-8a78-929c-f0121592a127"
    - stage: boundary
      stageUuid: "732ef510-a666-8f47-adf6-b3fe9173fa75"
    - stage: links
      stageUuid: "a99ce833-ba58-88d1-b01c-b67a89d68f3a"
    - stage: horo
      stageUuid: "8b9d1774-d2fe-8b05-a913-6ef9cdfa2e74"
    - stage: seal
      stageUuid: "6dd2f3d3-a5af-80e6-8e22-11503fae091b"
    - stage: uuid
      stageUuid: "f51d6017-c4c5-822e-8bcf-da9a759502a7"
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
