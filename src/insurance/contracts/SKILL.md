---
name: contracts
description: "Use when recognising or measuring insurance contract groups under IFRS 17 — GMM (building blocks — future cash flows, risk adjustment, CSM), PAA (short coverage), or VFA (direct participation); annual cohort grouping, profitability tiers, reinsurance link, loss-component, and disclosure (§93). The insurance-contracts IFRS 17 register."
atomPath: insurance/contracts
coordinate: insurance/contracts · 8/crest · 7c88a08e
contentUuid: "3fdf06d8-bdab-5b52-b7bb-ed7a60130bea"
diamondUuid: "8add3522-38e9-80f3-8802-ae693b903168"
uuid: "7c88a08e-9f20-860d-8402-7f909033e96a"
horo: 8
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
  bondDegree: 89
  neighbors: []
standards:
  - "IFRS IFRS-13 fair-value-input-hierarchy"
  - "IFRS IFRS-17 §3 scope"
  - "IFRS IFRS-17 §32 general-measurement-model-building-blocks"
  - "IFRS IFRS-17 §38 contractual-service-margin"
  - "IFRS IFRS-17 §53 premium-allocation-approach-simplified"
  - "IFRS IFRS-17 §93 disclosure-requirements"
  - "IFRS IFRS-17 §B100 variable-fee-approach"
  - "IFRS-13"
  - "IFRS-17"
  - "ILO-C100"
  - "ISO 19011:2018 §6.4.6 audit-evidence-insurance-contracts"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time"
  - "SOX §404 internal-controls TOM-INS-01"
  - Solvency II / IAIS ICS — actuarial reserving link
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
  computationUuid: "acbd09e1-ccbb-8c1c-8b82-8bdbe8e56aed"
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
      stageUuid: "242b8a41-4703-8b92-ac1b-e014677d2d23"
    - stage: seal
      stageUuid: "1fa6c377-1fe2-8593-bb3c-32df215aed13"
    - stage: uuid
      stageUuid: "ca81e97b-47de-8236-965d-6917f8f7ce2f"
version: 2
---
# insurance-contracts

Insurance Contracts — IFRS 17 GMM / PAA / VFA register.

Composes [[accounting]] · [[fair/value/measurements]] for insurance contract groups measured under IFRS 17 §32–§52 (General Measurement Model), §53–§59 (Premium Allocation Approach), or §B100–§B118 (Variable Fee Approach). Captures the §32 building blocks: future cash-flow estimate, [[entry]]-based risk adjustment, contractual service margin (CSM), discount rate. Reinsurance held links via `reinsuranceContract`; fair-value measurement via `fairValueMeasurement`. Status lifecycle: Recognised → In Coverage → Run-off → Derecognised. [[transaction]]-dual journalling via `journalEntry` (read-only, auto-linked by hook). Three profitability groups per cohort: Profitable, No Significant Possibility of Loss, Onerous (loss-recognition required per §16). See [[proof]] for audit-evidence chain (§6.4.6).

## Standards

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
