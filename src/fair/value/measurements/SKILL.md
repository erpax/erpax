---
name: measurements
description: "Use when measuring or disclosing fair value of assets and liabilities — financial instruments, investment property, biological assets, share-based payments, PPA items — capturing IFRS 13 Level-1/2/3 hierarchy, valuation technique, unobservable inputs, and P&L / OCI recognition route. The IFRS 13 fair-value measurement register."
atomPath: "fair/value/measurements"
coordinate: "fair/value/measurements · 4/weave · ef039537"
contentUuid: "08bf5343-030e-53b5-b0db-87046af771bd"
diamondUuid: "2e97aa4c-45de-8c8d-9d1f-77bd600a5ba8"
uuid: "ef039537-5b4f-843e-93f5-1a6d69c5f235"
horo: 4
typography:
  partition: fair
  bondDegree: 40
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
signatures:
  computationUuid: "3d8d49e8-771d-82e5-b04d-7a68e0839982"
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
      stageUuid: "073dfa56-c2be-894b-8f10-88eaf88c3c90"
    - stage: seal
      stageUuid: "e9b257be-591b-8407-ab7e-ea551aeebbce"
    - stage: uuid
      stageUuid: "93a53d1e-2c23-8c9e-a7ab-0c1e0f50982e"
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
