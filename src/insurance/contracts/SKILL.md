---
name: contracts
description: "Use when recognising or measuring insurance contract groups under IFRS 17 — GMM (building blocks — future cash flows, risk adjustment, CSM), PAA (short coverage), or VFA (direct participation); annual cohort grouping, profitability tiers, reinsurance link, loss-component, and disclosure (§93). The insurance-contracts IFRS 17 register."
atomPath: "insurance/contracts"
coordinate: "insurance/contracts · 7/descent · c65023c0"
contentUuid: "c5b0573b-684a-5cbb-9e99-8e130811b82c"
diamondUuid: "6943afa4-7d53-8d3e-ac1d-17d725ce56fe"
uuid: "c65023c0-a421-8172-8e9c-a48b931309d7"
horo: 7
bonds:
  in:
    - amendment
    - amendments
    - assignment
    - auditright
    - clause
    - confidentiality
    - consent
    - contract
    - dataprotection
    - deferredrevenue
    - disputeresolution
    - forcemajeure
    - governinglaw
    - indemnity
    - insurance
    - jurisdiction
    - law
    - liability
    - license
    - obligations
    - orders
    - performances
    - remediation
    - restriction
    - revenue
    - signatures
    - termination
    - warranty
  out:
    - amendment
    - amendments
    - assignment
    - auditright
    - clause
    - confidentiality
    - consent
    - contract
    - dataprotection
    - deferredrevenue
    - disputeresolution
    - forcemajeure
    - governinglaw
    - indemnity
    - jurisdiction
    - law
    - liability
    - license
    - obligations
    - orders
    - performances
    - remediation
    - restriction
    - revenue
    - signatures
    - termination
    - warranty
typography:
  partition: insurance
  bondDegree: 97
  neighbors: []
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
  - "ILO-C100"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "SOX §404 internal-controls TOM-INS-01"
  - "Solvency II / IAIS ICS — actuarial reserving link"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - accounting
    - entry
    - measurements
    - proof
    - transaction
  matrix:
    - amendment
    - amendments
    - assignment
    - auditright
    - clause
    - confidentiality
    - consent
    - contract
    - dataprotection
    - deferredrevenue
    - disputeresolution
    - forcemajeure
    - governinglaw
    - indemnity
    - jurisdiction
    - law
    - liability
    - license
    - obligations
    - orders
    - performances
    - remediation
    - restriction
    - revenue
    - signatures
    - termination
    - warranty
  backlinks:
    - amendment
    - amendments
    - assignment
    - auditright
    - clause
    - confidentiality
    - consent
    - contract
    - dataprotection
    - deferredrevenue
    - disputeresolution
    - forcemajeure
    - governinglaw
    - indemnity
    - jurisdiction
    - law
    - liability
    - license
    - obligations
    - orders
    - performances
    - remediation
    - restriction
    - revenue
    - signatures
    - termination
    - warranty
signatures:
  computationUuid: "92f7084c-364f-85be-84f7-3cea6199dcb3"
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
      stageUuid: "babb7f2d-2dca-88a6-89ab-b26906b1249b"
    - stage: seal
      stageUuid: "9e4e4d15-01e5-8147-b28d-624f07c9aaec"
    - stage: uuid
      stageUuid: "faed50cb-375f-8b9d-a172-df8565f63c1b"
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
