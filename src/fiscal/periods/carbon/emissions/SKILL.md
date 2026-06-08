---
name: emissions
description: "Use when recording or auditing GHG emissions — Scope 1 direct, Scope 2 purchased energy, Scope 3 value-chain (15 sub-categories); computing tCO2e via activity-data × emission-factor; third-party ISAE 3410 verification; substantiating ESRS E1 §44-50 disclosure totals or EU CBAM filings. The GHG emission event register."
atomPath: fiscal/periods/carbon/emissions
coordinate: fiscal/periods/carbon/emissions · 7/descent · 702132f7
contentUuid: "ce16b94f-ef61-554c-ae4a-d7f11be2b6d9"
diamondUuid: "6700a2a6-9667-88ec-80ea-6d0afcc4b098"
uuid: "702132f7-97dd-8cad-9a7c-25de6ea5fe2b"
horo: 7
bonds:
  in:
    - accounting
    - attestations
    - carbon
    - co
    - disclosures
    - law
    - proof
    - standard
  out:
    - accounting
    - attestations
    - co
    - disclosures
    - law
    - proof
    - standard
typography:
  partition: fiscal
  bondDegree: 22
  neighbors: []
standards:
  - EU CBAM Carbon Border Adjustment Mechanism (when applicable)
  - "EU ESRS E1 AR-25 location-vs-market-based"
  - "EU ESRS E1 §44-50 ghg-emissions-disclosure"
  - "EU SFDR PAI 1 ghg-emissions"
  - "EU Taxonomy DNSH climate-mitigation"
  - "EU-2011/83"
  - "EU-2018/1673"
  - "EU-2018/1725"
  - "EU-2018/302"
  - "EU-2018/389-SCA-RTS"
  - "EU-2018/843"
  - "EU-2018/957"
  - "EU-ESRS"
  - "EU-VAT-Implementing-Reg-282/2011"
  - GHG Protocol Corporate Standard (revised 2015)
  - GHG Protocol Scope 2 Guidance (2015)
  - GHG Protocol Scope 3 Standard (2011)
  - "GHG-Protocol"
  - "IFRS S2 §29-32 climate-related-metrics"
  - "ISAE 3410 greenhouse-gas-statements"
  - "ISO 14064-1:2018 organisation-level-ghg-quantification"
  - "ISO 14067:2018 carbon-footprint-of-products"
  - "ISO-14064-1"
bindings: []
neighbors:
  wikilink:
    - accounting
    - attestations
    - disclosures
    - law
    - proof
    - standard
  matrix:
    - accounting
    - attestations
    - co
    - disclosures
    - law
    - proof
    - standard
  backlinks:
    - accounting
    - attestations
    - co
    - disclosures
    - law
    - proof
    - standard
signatures:
  computationUuid: "6f6b0805-6bb3-8a39-adba-5a3cae1eaa96"
  stages:
    - stage: path
      stageUuid: "e8de1031-e28a-8497-b72f-151bcf47c09f"
    - stage: trinity
      stageUuid: "bce9c441-79a3-87b0-8d0d-97ee30d23b8a"
    - stage: boundary
      stageUuid: "569b279c-4864-83ec-a38e-ed96f8cbeecc"
    - stage: links
      stageUuid: "6f9384b9-a559-8a9e-a724-12e3f24e1b79"
    - stage: horo
      stageUuid: "f0ea4141-7e7d-8546-894b-3afe37456b60"
    - stage: seal
      stageUuid: "296ad0d4-9eac-8303-adba-49660f568ace"
    - stage: uuid
      stageUuid: "9c4aebb4-e403-879e-9f55-6a83ba71e386"
version: 2
---
# carbon-emissions

Carbon Emissions — EU CSRD ESRS E1 + GHG Protocol Scope 1/2/3 register.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO 14064-1:2018 organisation-level-ghg-quantification
- ISO 14067:2018 carbon-footprint-of-products
- GHG Protocol Corporate Standard (revised 2015)
- GHG Protocol Scope 2 Guidance (2015)
- GHG Protocol Scope 3 Standard (2011)
- EU ESRS E1 §44-50 ghg-emissions-disclosure
- EU ESRS E1 AR-25 location-vs-market-based
- IFRS S2 §29-32 climate-related-metrics
- ISAE 3410 greenhouse-gas-statements
- EU SFDR PAI 1 ghg-emissions
- EU CBAM Carbon Border Adjustment Mechanism (when applicable)
- EU Taxonomy DNSH climate-mitigation
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[csrd/disclosures]] · [[evidence/attestations]] · [[accounting]] · [[standard]] · [[proof]].

**Law — [[law]]: every emission row computes tCO2e as activity-data × emission-factor and is classified into exactly one GHG scope (1 direct · 2 purchased energy · 3 value-chain) — the ESRS E1 disclosure total is the audited sum of these events, substantiated by ISAE 3410 verification, never a top-down figure.**
