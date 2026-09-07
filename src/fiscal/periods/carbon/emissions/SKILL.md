---
name: emissions
description: "Use when recording or auditing GHG emissions — Scope 1 direct, Scope 2 purchased energy, Scope 3 value-chain (15 sub-categories); computing tCO2e via activity-data × emission-factor; third-party ISAE 3410 verification; substantiating ESRS E1 §44-50 disclosure totals or EU CBAM filings. The GHG emission event register."
atomPath: "fiscal/periods/carbon/emissions"
coordinate: "fiscal/periods/carbon/emissions · 5/round · b60e2451"
contentUuid: "bce20bbf-09d4-5d7e-975b-2fb1efe60925"
diamondUuid: "da964de8-6974-8b97-9f21-06453e49ca0b"
uuid: "b60e2451-b206-8271-ad44-b9e055ee3cb6"
horo: 5
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
  computationUuid: "ffc6cb44-45ce-8d37-af8b-14b4f2a289d4"
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
      stageUuid: "25d9c9e6-dbfe-84bc-b269-bfd3818c3d96"
    - stage: seal
      stageUuid: "296ad0d4-9eac-8303-adba-49660f568ace"
    - stage: uuid
      stageUuid: "11392021-4a16-8627-8169-3846823ab70d"
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
