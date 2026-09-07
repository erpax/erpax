---
name: emissions
description: "Use when recording or auditing GHG emissions — Scope 1 direct, Scope 2 purchased energy, Scope 3 value-chain (15 sub-categories); computing tCO2e via activity-data × emission-factor; third-party ISAE 3410 verification; substantiating ESRS E1 §44-50 disclosure totals or EU CBAM filings. The GHG emission event register."
atomPath: "fiscal/periods/carbon/emissions"
coordinate: "fiscal/periods/carbon/emissions · 7/descent · 952b2974"
contentUuid: "b16a0f2e-bb5c-58c5-bbfc-5fce8e82f32a"
diamondUuid: "bd17a097-79f9-88ba-aaaf-e9be5428c33f"
uuid: "952b2974-dc44-8881-9b3d-46b7c3ebe8b3"
horo: 7
typography:
  partition: fiscal
  bondDegree: 22
standards:
  - EU CBAM Carbon Border Adjustment Mechanism (when applicable)
  - "EU ESRS E1 AR-25 location-vs-market-based"
  - "EU ESRS E1 §44-50 ghg-emissions-disclosure"
  - "EU SFDR PAI 1 ghg-emissions"
  - "EU Taxonomy DNSH climate-mitigation"
  - "EU-ESRS"
  - "EU-VAT-Implementing-Reg-282/2011"
  - GHG Protocol Corporate Standard (revised 2015)
  - GHG Protocol Scope 2 Guidance (2015)
  - GHG Protocol Scope 3 Standard (2011)
  - "GHG-Protocol"
  - "IFRS S2 §29-32 climate-related-metrics"
  - "ISO 14064-1:2018 organisation-level-ghg-quantification"
  - "ISO 14064-1:2018 organisation-level-ghg-quantification`"
  - "ISO 14067:2018 carbon-footprint-of-products"
  - "ISO 14067:2018 carbon-footprint-of-products`"
  - "ISO-14064-1"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "c0f0c97c-de48-838b-b385-c1a16f9efdba"
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
      stageUuid: "89668f3d-ca34-84c9-87cf-98e6b4222542"
    - stage: seal
      stageUuid: "296ad0d4-9eac-8303-adba-49660f568ace"
    - stage: uuid
      stageUuid: "9fc9e50f-5bc5-8a68-b497-6a6f7e2b5236"
version: 2
---
# carbon-emissions

Carbon Emissions — EU CSRD ESRS E1 + GHG Protocol Scope 1/2/3 register.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO 14064-1:2018 organisation-level-ghg-quantification`
- `@standard ISO 14067:2018 carbon-footprint-of-products`

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
