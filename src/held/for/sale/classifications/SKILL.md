---
name: classifications
description: "Use when classifying a non-current asset, disposal group, or discontinued operation as held-for-sale under IFRS 5 §6 — triggers §15 remeasurement to lower of carrying amount and fair-value-less-costs-to-sell, depreciation suspended, separate balance-sheet presentation, gain/loss on disposal. The held-for-sale-classifications IFRS 5 event collection."
atomPath: "held/for/sale/classifications"
coordinate: "held/for/sale/classifications · 2/share · e808b9b4"
contentUuid: "1b78a464-3a72-5110-86ac-f2a0920f14a6"
diamondUuid: "52356ba9-ac82-8204-9931-224905ac0c12"
uuid: "e808b9b4-0925-8adf-8812-7b61320ed302"
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
  - "IFRS IFRS-13 fair-value-input-hierarchy`"
  - "IFRS IFRS-5 §15 measurement-lower-of-cv-and-fv-less-cts"
  - "IFRS IFRS-5 §15 measurement-lower-of-cv-and-fv-less-cts`"
  - "IFRS IFRS-5 §25 depreciation-suspended"
  - "IFRS IFRS-5 §25 depreciation-suspended`"
  - "IFRS IFRS-5 §31-§40 discontinued-operations-presentation"
  - "IFRS IFRS-5 §31-§40 discontinued-operations-presentation`"
  - "IFRS IFRS-5 §6-§9 classification-criteria"
  - "IFRS IFRS-5 §6-§9 classification-criteria`"
  - "IFRS-13"
  - "IFRS-5"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time classification-date"
  - "ISO-8601-1:2019 date-time classification-date`"
  - "SOX §404 internal-controls"
  - "US-GAAP"
  - "US-GAAP ASC-205-20 discontinued-operations"
  - "US-GAAP ASC-360-10 long-lived-assets-held-for-sale"
  - "— the instrument reads SKILL.md) -->"
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
  computationUuid: "e0c8021d-f0d6-8b7f-bc2a-eed9c269ac96"
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
      stageUuid: "2eebb82d-4ae5-83d0-8bef-bb2fda7d9c93"
    - stage: seal
      stageUuid: "45323345-85b7-8528-84de-71bb6249f3d5"
    - stage: uuid
      stageUuid: "fad59aee-9aa2-8a7f-9785-fea0ddcd2d78"
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

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard IFRS IFRS-5 §6-§9 classification-criteria`
- `@standard IFRS IFRS-5 §15 measurement-lower-of-cv-and-fv-less-cts`
- `@standard IFRS IFRS-5 §25 depreciation-suspended`
- `@standard IFRS IFRS-5 §31-§40 discontinued-operations-presentation`
- `@standard IFRS IFRS-13 fair-value-input-hierarchy`
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time classification-date`

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
