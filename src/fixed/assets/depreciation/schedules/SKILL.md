---
name: schedules
description: "Use when recording or reviewing the depreciation charge for each period — linking to the fixed-asset master, storing depreciationAmount, accumulatedAfter, and bookValueAfter per period; posting to GL via the depreciation hook; verifying period-lock before posting. The per-period IAS-16 depreciation evidence node."
atomPath: fixed/assets/depreciation/schedules
coordinate: fixed/assets/depreciation/schedules · 7/descent · dab1b731
contentUuid: "44fcf070-bf40-5de9-89fd-77937efccb6a"
diamondUuid: "2b770529-64bc-8b19-92e3-99bfac04dd56"
uuid: "dab1b731-0ea9-8759-ba04-97bb568437b9"
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
  - "ISO-19011:2018 audit-trail depreciation-evidence"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time period-end"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-360 property-plant-and-equipment"
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
  computationUuid: "96f334ab-c042-8173-8250-10e828f25283"
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
      stageUuid: "54b32344-cb42-88db-9e50-e4b518be854c"
    - stage: seal
      stageUuid: "6dd2f3d3-a5af-80e6-8e22-11503fae091b"
    - stage: uuid
      stageUuid: "c1833970-1186-832d-845c-0d50d9c130ad"
version: 2
---
# depreciation-schedules

Depreciation Schedules — period-by-period IAS 16 depreciation detail.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time period-end
- ISO-4217:2015 currency-codes
- IFRS IAS-16 property-plant-and-equipment depreciation
- IFRS IAS-36 impairment-of-assets
- US-GAAP ASC-360 property-plant-and-equipment
- ISO-19011:2018 audit-trail depreciation-evidence
- SOX §404 internal-controls

Composes: [[accounting]] · [[transaction]] · [[balance]] · [[proof]] · [[standard]] · [[identity]].
