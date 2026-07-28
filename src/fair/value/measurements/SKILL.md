---
name: measurements
description: "Use when measuring or disclosing fair value of assets and liabilities — financial instruments, investment property, biological assets, share-based payments, PPA items — capturing IFRS 13 Level-1/2/3 hierarchy, valuation technique, unobservable inputs, and P&L / OCI recognition route. The IFRS 13 fair-value measurement register."
atomPath: "fair/value/measurements"
coordinate: "fair/value/measurements · 7/descent · ca5c5f59"
contentUuid: "b659ecc5-1bde-5bb2-9a18-93f59d4a14b5"
diamondUuid: "00a12ad0-9156-8839-9748-671512acc988"
uuid: "ca5c5f59-559b-8a45-8487-3426197b9b2d"
horo: 7
bonds:
  in:
    - accounting
    - assets
    - attestations
    - classifications
    - combinations
    - contracts
    - goodwill
    - hedge
    - law
    - party
    - properties
    - standard
    - transaction
    - value
  out:
    - accounting
    - assets
    - attestations
    - classifications
    - combinations
    - contracts
    - goodwill
    - hedge
    - law
    - party
    - properties
    - standard
    - transaction
typography:
  partition: fair
  bondDegree: 40
  neighbors: []
standards:
  - "IFRS IFRS-13 §72 fair-value-hierarchy-three-levels"
  - "IFRS IFRS-13 §72 fair-value-hierarchy-three-levels`"
  - "IFRS IFRS-13 §76 level-1-quoted-prices"
  - "IFRS IFRS-13 §76 level-1-quoted-prices`"
  - "IFRS IFRS-13 §81 level-2-observable-inputs"
  - "IFRS IFRS-13 §81 level-2-observable-inputs`"
  - "IFRS IFRS-13 §86 level-3-unobservable-inputs"
  - "IFRS IFRS-13 §86 level-3-unobservable-inputs`"
  - "IFRS IFRS-13 §9 fair-value-definition"
  - "IFRS IFRS-13 §9 fair-value-definition`"
  - "IFRS IFRS-13 §93 disclosure-requirements"
  - "IFRS IFRS-13 §93 disclosure-requirements`"
  - "IFRS-13"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time measurement-date"
  - "ISO-8601-1:2019 date-time measurement-date`"
  - "SOX §404 internal-controls TOM-FV-01 valuation-process"
  - "US-GAAP"
  - "US-GAAP ASC-820 fair-value-measurement"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - accounting
    - assets
    - attestations
    - law
    - party
    - standard
    - transaction
  matrix:
    - accounting
    - assets
    - attestations
    - classifications
    - combinations
    - contracts
    - goodwill
    - hedge
    - law
    - party
    - properties
    - standard
    - transaction
  backlinks:
    - accounting
    - assets
    - attestations
    - classifications
    - combinations
    - contracts
    - goodwill
    - hedge
    - law
    - party
    - properties
    - standard
    - transaction
signatures:
  computationUuid: "2a26e33a-c4a5-8ab6-88b9-27fce54441e2"
  stages:
    - stage: path
      stageUuid: "a61e8171-9ef5-85ac-96cd-0eae28125f3a"
    - stage: trinity
      stageUuid: "8aab79f2-9580-82a5-99a7-3cbf264bff5f"
    - stage: boundary
      stageUuid: "2a0d21d7-4866-876c-87bf-703f770b9a9a"
    - stage: links
      stageUuid: "60f2264b-4461-87a7-bd1c-8eee5d5a2c55"
    - stage: horo
      stageUuid: "c5fe52ae-6cff-8761-a5f0-6bee247a65cd"
    - stage: seal
      stageUuid: "e9b257be-591b-8407-ab7e-ea551aeebbce"
    - stage: uuid
      stageUuid: "f9c29eeb-8de5-8a72-91e4-8c44aec2bb95"
version: 2
---
# fair-value-measurements

Fair Value Measurements — IFRS 13 Level-1/2/3 hierarchy register.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard IFRS IFRS-13 §9 fair-value-definition`
- `@standard IFRS IFRS-13 §72 fair-value-hierarchy-three-levels`
- `@standard IFRS IFRS-13 §76 level-1-quoted-prices`
- `@standard IFRS IFRS-13 §81 level-2-observable-inputs`
- `@standard IFRS IFRS-13 §86 level-3-unobservable-inputs`
- `@standard IFRS IFRS-13 §93 disclosure-requirements`
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time measurement-date`

- IFRS IFRS-13 §9 fair-value-definition
- IFRS IFRS-13 §72 fair-value-hierarchy-three-levels
- IFRS IFRS-13 §76 level-1-quoted-prices
- IFRS IFRS-13 §81 level-2-observable-inputs
- IFRS IFRS-13 §86 level-3-unobservable-inputs
- IFRS IFRS-13 §93 disclosure-requirements
- US-GAAP ASC-820 fair-value-measurement
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time measurement-date
- ISO 19011:2018 §6.4.6 audit-evidence-fair-value
- SOX §404 internal-controls TOM-FV-01 valuation-process
- ISO 27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: each fair-value measurement is classified into exactly one IFRS 13 hierarchy level (Level-1 quoted · Level-2 observable · Level-3 unobservable) carrying its valuation technique, inputs, and P&L/OCI recognition route — the level governs the disclosure, so the input observability determines where it sits.**

Composes: [[biological/assets]] · [[evidence/attestations]] · [[accounting]] · [[transaction]] · [[party]] · [[standard]].
