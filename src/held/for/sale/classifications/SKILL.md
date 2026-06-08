---
name: classifications
description: "Use when classifying a non-current asset, disposal group, or discontinued operation as held-for-sale under IFRS 5 §6 — triggers §15 remeasurement to lower of carrying amount and fair-value-less-costs-to-sell, depreciation suspended, separate balance-sheet presentation, gain/loss on disposal. The held-for-sale-classifications IFRS 5 event collection."
atomPath: held/for/sale/classifications
coordinate: held/for/sale/classifications · 2/share · e5fdd131
contentUuid: "44614683-182e-51a5-852a-522ef3fefe37"
diamondUuid: "93fad0f0-7f1e-88c6-b489-a9bc0f43c3b9"
uuid: "e5fdd131-f7fd-80eb-aec9-8e1236ec23f4"
horo: 2
bonds:
  in:
    - accounting
    - assets
    - balance
    - classification
    - close
    - combinations
    - entries
    - entry
    - horo
    - law
    - measurements
    - properties
    - sale
    - standard
  out:
    - accounting
    - assets
    - balance
    - classification
    - close
    - combinations
    - entries
    - entry
    - horo
    - law
    - measurements
    - properties
    - standard
typography:
  partition: held
  bondDegree: 40
  neighbors: []
standards:
  - "IFRS IFRS-13 fair-value-input-hierarchy"
  - "IFRS IFRS-5 §15 measurement-lower-of-cv-and-fv-less-cts"
  - "IFRS IFRS-5 §25 depreciation-suspended"
  - "IFRS IFRS-5 §31-§40 discontinued-operations-presentation"
  - "IFRS IFRS-5 §6-§9 classification-criteria"
  - "IFRS-13"
  - "IFRS-5"
  - "ISO 19011:2018 §6.4.6 audit-evidence-disposal-classification"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time classification-date"
  - "SOX §404 internal-controls"
  - "US-GAAP"
  - "US-GAAP ASC-205-20 discontinued-operations"
  - "US-GAAP ASC-360-10 long-lived-assets-held-for-sale"
bindings: []
neighbors:
  wikilink:
    - accounting
    - assets
    - balance
    - close
    - combinations
    - entries
    - entry
    - horo
    - law
    - measurements
    - properties
    - standard
  matrix:
    - accounting
    - assets
    - balance
    - classification
    - close
    - combinations
    - entries
    - entry
    - horo
    - law
    - measurements
    - properties
    - standard
  backlinks:
    - accounting
    - assets
    - balance
    - classification
    - close
    - combinations
    - entries
    - entry
    - horo
    - law
    - measurements
    - properties
    - standard
signatures:
  computationUuid: "eda4d6d1-72bc-8740-8cce-0e82f4b6b6e5"
  stages:
    - stage: path
      stageUuid: "1b0570b4-f274-852d-9e14-b7abf8d5f56f"
    - stage: trinity
      stageUuid: "49a31f08-1b54-8b5a-b881-27904e936b35"
    - stage: boundary
      stageUuid: "f89db9ae-d689-890e-843e-ba290e74b5c3"
    - stage: links
      stageUuid: "e6ab29a7-a182-8e86-a98f-293006aebcfe"
    - stage: horo
      stageUuid: "c0929cb8-0a9a-806a-99b1-e5a25dc37fea"
    - stage: seal
      stageUuid: "45323345-85b7-8528-84de-71bb6249f3d5"
    - stage: uuid
      stageUuid: "c2e647f4-a4a4-8334-b6e2-2c1b79115f4c"
version: 2
---
# held-for-sale-classifications

Held-for-Sale Classifications — IFRS 5 non-current assets / disposal.

A classification event: a source asset ([[fixed/assets]] · [[properties/investment/properties]] ·
[[legal/entities/business/combinations]], reached polymorphically) meets IFRS 5 §6 criteria — sale
highly probable within 12 months (§8) at fair value less costs to sell. That triggers
§15 remeasurement to the lower of carrying amount and FV − CTS (the FV read from a
[[fair/value/measurements]] hierarchy), depreciation suspended (§25), and presentation as
a separate balance-sheet line (§38); a discontinued operation (§32) is a separate major
line of business or geography. The impairment / disposal gain-loss posts a [[journal/entries]]
[[entry]] that keeps the [[accounting]] [[balance]]; the lifecycle (classified → remeasured →
sale_pending → sold → reclassified) is a [[horo]] ring whose disposal terminus [[close]]s the
asset. Standards (IFRS 5, IFRS 13, ASC 205-20 / 360-10) and tenant-isolation posture are the
[[standard]] banners in `index.ts`, fused below.

**Law — [[law]]: classifying an asset held-for-sale (IFRS 5 §6, sale highly-probable within 12 months) triggers §15 remeasurement to the lower of carrying amount and FV−CTS, suspends depreciation, and posts a [[journal/entries]] [[entry]] that keeps the [[accounting]] [[balance]] across a [[horo]] disposal ring.**

## Standards
- IFRS IFRS-5 §6-§9 classification-criteria
- IFRS IFRS-5 §15 measurement-lower-of-cv-and-fv-less-cts
- IFRS IFRS-5 §25 depreciation-suspended
- IFRS IFRS-5 §31-§40 discontinued-operations-presentation
- IFRS IFRS-13 fair-value-input-hierarchy
- US-GAAP ASC-205-20 discontinued-operations
- US-GAAP ASC-360-10 long-lived-assets-held-for-sale
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time classification-date
- ISO 19011:2018 §6.4.6 audit-evidence-disposal-classification
- SOX §404 internal-controls
- ISO 27001 A.5.23 cloud-service-tenant-isolation
