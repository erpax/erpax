---
name: contracts
description: "Use when recognising or measuring insurance contract groups under IFRS 17 — GMM (building blocks — future cash flows, risk adjustment, CSM), PAA (short coverage), or VFA (direct participation); annual cohort grouping, profitability tiers, reinsurance link, loss-component, and disclosure (§93). The insurance-contracts IFRS 17 register."
atomPath: "insurance/contracts"
coordinate: "insurance/contracts · 5/round · 5337e36c"
contentUuid: "e80e536d-341e-5cb0-bc5f-055274ca95f7"
diamondUuid: "3e8d6837-8348-804c-84f7-cf2c637e65d6"
uuid: "5337e36c-a782-86b8-b2c2-2bd109eb86ed"
horo: 5
typography:
  partition: insurance
  bondDegree: 97
standards:
  - "IFRS IFRS-13 fair-value-input-hierarchy"
  - "IFRS IFRS-13 fair-value-input-hierarchy`"
  - "IFRS IFRS-17 §3 scope"
  - "IFRS IFRS-17 §3 scope`"
  - "IFRS IFRS-17 §32 general-measurement-model-building-blocks"
  - "IFRS IFRS-17 §32 general-measurement-model-building-blocks`"
  - "IFRS IFRS-17 §38 contractual-service-margin"
  - "IFRS IFRS-17 §38 contractual-service-margin`"
  - "IFRS IFRS-17 §53 premium-allocation-approach-simplified"
  - "IFRS IFRS-17 §53 premium-allocation-approach-simplified`"
  - "IFRS IFRS-17 §93 disclosure-requirements"
  - "IFRS IFRS-17 §93 disclosure-requirements`"
  - "IFRS IFRS-17 §B100 variable-fee-approach"
  - "IFRS IFRS-17 §B100 variable-fee-approach`"
  - "IFRS-13"
  - "IFRS-17"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "SOX §404 internal-controls TOM-INS-01"
  - "Solvency II / IAIS ICS — actuarial reserving link"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "60fca608-a5c9-85e2-9141-c727065ddce8"
  stages:
    - stage: path
      stageUuid: "ce0a3bec-a16d-8df9-b3be-9ae3bf5945c6"
    - stage: trinity
      stageUuid: "0e5ea5b5-5db7-8bf9-84e2-24e13d85ac82"
    - stage: boundary
      stageUuid: "d056388d-2ff7-8fb7-aef2-5f032e08b989"
    - stage: links
      stageUuid: "a7e1e5d3-7bee-871e-93c2-ed4c81dc9699"
    - stage: horo
      stageUuid: "f87e6cec-6178-823f-93ad-bed91f253068"
    - stage: seal
      stageUuid: "9e4e4d15-01e5-8147-b28d-624f07c9aaec"
    - stage: uuid
      stageUuid: "7c49c44b-bfc4-831c-b996-1cabd6d042d9"
version: 2
---
# insurance-contracts

Insurance Contracts — IFRS 17 GMM / PAA / VFA register.

Composes [[accounting]] · [[fair/value/measurements]] for insurance contract groups measured under IFRS 17 §32–§52 (General Measurement Model), §53–§59 (Premium Allocation Approach), or §B100–§B118 (Variable Fee Approach). Captures the §32 building blocks: future cash-flow estimate, [[entry]]-based risk adjustment, contractual service margin (CSM), discount rate. Reinsurance held links via `reinsuranceContract`; fair-value measurement via `fairValueMeasurement`. Status lifecycle: Recognised → In Coverage → Run-off → Derecognised. [[transaction]]-dual journalling via `journalEntry` (read-only, auto-linked by hook). Three profitability groups per cohort: Profitable, No Significant Possibility of Loss, Onerous (loss-recognition required per §16). See [[proof]] for audit-evidence chain (§6.4.6).

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard IFRS IFRS-17 §3 scope`
- `@standard IFRS IFRS-17 §32 general-measurement-model-building-blocks`
- `@standard IFRS IFRS-17 §38 contractual-service-margin`
- `@standard IFRS IFRS-17 §53 premium-allocation-approach-simplified`
- `@standard IFRS IFRS-17 §B100 variable-fee-approach`
- `@standard IFRS IFRS-17 §93 disclosure-requirements`
- `@standard IFRS IFRS-13 fair-value-input-hierarchy`
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time`


- IFRS IFRS-17 §3 scope
- IFRS IFRS-17 §32 general-measurement-model-building-blocks
- IFRS IFRS-17 §38 contractual-service-margin
- IFRS IFRS-17 §53 premium-allocation-approach-simplified
- IFRS IFRS-17 §B100 variable-fee-approach
- IFRS IFRS-17 §93 disclosure-requirements
- IFRS IFRS-13 fair-value-input-hierarchy
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time
- ISO 19011:2018 §6.4.6 audit-evidence-insurance-contracts
- Solvency II / IAIS ICS — actuarial reserving link
- SOX §404 internal-controls TOM-INS-01
- ISO 27001 A.5.23 cloud-service-tenant-isolation
