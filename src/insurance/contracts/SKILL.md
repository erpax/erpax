---
name: contracts
description: "Use when recognising or measuring insurance contract groups under IFRS 17 — GMM (building blocks — future cash flows, risk adjustment, CSM), PAA (short coverage), or VFA (direct participation); annual cohort grouping, profitability tiers, reinsurance link, loss-component, and disclosure (§93). The insurance-contracts IFRS 17 register."
atomPath: "insurance/contracts"
coordinate: "insurance/contracts · 7/descent · 15ebe18a"
contentUuid: "5c8ef2c9-e5dc-563d-b69a-ec775728ebfa"
diamondUuid: "b0b8fbbe-1d51-8d53-9d5b-8eb1deb0cb1a"
uuid: "15ebe18a-6b9f-8597-ac26-631a3e6dcfd8"
horo: 7
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
  computationUuid: "c59b501a-2e22-8dad-b504-fda7c25dd256"
  stages:
    - stage: path
      stageUuid: "ce0a3bec-a16d-8df9-b3be-9ae3bf5945c6"
    - stage: trinity
      stageUuid: "0e5ea5b5-5db7-8bf9-84e2-24e13d85ac82"
    - stage: boundary
      stageUuid: "d056388d-2ff7-8fb7-aef2-5f032e08b989"
    - stage: links
      stageUuid: "7b2adee9-5a49-891a-9737-1b0ee14ec3be"
    - stage: horo
      stageUuid: "7679bc18-ac4b-841a-90a0-0cf1af9d9ca7"
    - stage: seal
      stageUuid: "9e4e4d15-01e5-8147-b28d-624f07c9aaec"
    - stage: uuid
      stageUuid: "d421b99c-e467-8501-90ae-757ebbc5f8fc"
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
