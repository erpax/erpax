---
name: measurements
description: "Use when measuring or disclosing fair value of assets and liabilities — financial instruments, investment property, biological assets, share-based payments, PPA items — capturing IFRS 13 Level-1/2/3 hierarchy, valuation technique, unobservable inputs, and P&L / OCI recognition route. The IFRS 13 fair-value measurement register."
atomPath: fair/value/measurements
coordinate: fair/value/measurements · 5/round · 0ac2fc80
contentUuid: "6d4ce0c4-619b-579c-bd4f-471c9e7a02d4"
diamondUuid: "e253a418-7b76-8009-b8bf-078c06e3a915"
uuid: "0ac2fc80-78e6-89da-865e-8f15510a01f2"
horo: 5
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
  - "IFRS IFRS-13 §76 level-1-quoted-prices"
  - "IFRS IFRS-13 §81 level-2-observable-inputs"
  - "IFRS IFRS-13 §86 level-3-unobservable-inputs"
  - "IFRS IFRS-13 §9 fair-value-definition"
  - "IFRS IFRS-13 §93 disclosure-requirements"
  - "IFRS-13"
  - "ISO 19011:2018 §6.4.6 audit-evidence-fair-value"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time measurement-date"
  - "SOX §404 internal-controls TOM-FV-01 valuation-process"
  - "US-GAAP"
  - "US-GAAP ASC-820 fair-value-measurement"
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
  computationUuid: "ecec54ec-d965-835e-b90c-3081509c7cea"
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
      stageUuid: "16d3887a-bfca-8bd9-9747-09874ea33233"
    - stage: seal
      stageUuid: "e9b257be-591b-8407-ab7e-ea551aeebbce"
    - stage: uuid
      stageUuid: "a440909c-b7e2-86f5-84a0-b98188f65573"
version: 2
---
# fair-value-measurements

Fair Value Measurements — IFRS 13 Level-1/2/3 hierarchy register.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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
