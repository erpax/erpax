---
name: "5305"
description: "Use when implementing or referencing UN/CEFACT 5305 — Duty / Tax / Fee Category Code."
atomPath: "un/cefact/5305"
coordinate: "un/cefact/5305 · 7/descent · 866e492f"
contentUuid: "79b354e8-b05a-5b3e-8f1d-909e4633a090"
diamondUuid: "3d637f57-3fc4-8984-b6c5-54d5c36a1d58"
uuid: "866e492f-10ca-81b6-80ba-262ea978a0f4"
horo: 7
typography:
  partition: un
  bondDegree: 6
standards:
  - "EN-16931:2017 BT-151 vat-category-code (subset that EN-16931 admits)"
  - "EN-16931:2017 BT-151 vat-category-code (subset that EN-16931 admits)`"
  - "UN-CEFACT"
  - "UN/CEFACT Trade Data Element 5305 duty-tax-fee-category-code"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "882da3c3-4050-82cd-9356-f5e1e2b88d4e"
  stages:
    - stage: path
      stageUuid: "6164a2b6-457f-8f8f-a8c7-c4a5eb0eb8cb"
    - stage: trinity
      stageUuid: "183877ba-a52c-8b4f-b205-d4bcf0342653"
    - stage: boundary
      stageUuid: "cc6d9f65-7158-898f-b85e-a630fb0d7d51"
    - stage: links
      stageUuid: "fa109c91-aa7f-86ef-8df7-58dd65ee0f53"
    - stage: horo
      stageUuid: "d40b11c8-3184-8a1b-9c87-4d6742ea1bed"
    - stage: seal
      stageUuid: "2dbaffc4-77cd-8dfa-91b5-9f0541269636"
    - stage: uuid
      stageUuid: "d2896aee-6169-82ef-bedf-32f1e9dc687d"
version: 2
---
# UN/CEFACT 5305 — Duty / Tax / Fee Category Code

Lifted out of `src/en/16931/types/index.ts` since the same code list is referenced from multiple places (invoice lines, tax codes master, AI tax classifier, SAF-T tax table, tax calculations).

## Scope

The 9 codes EN-16931 admits in the EU VAT context (`S`, `Z`, `E`, `AE`, `K`, `G`, `O`, `L`, `M`) + label registry + Payload select options + `requiresVatRate(code)` + `requiresExemptionReason(code)` predicates that drive conditional field validation.

## Out of scope

- Non-EU jurisdictions' tax category codes — store under their own standards module if/when added.
- Per-rate VAT amounts — those vary by jurisdiction and live in the tax-jurisdictions / tax-codes master.

## Citations

- UN/CEFACT Trade Data Element 5305 — Duty / Tax / Fee Category Code
- EN-16931:2017 BT-151 (subset that EN-16931 admits)
- EU VAT Directive 2006/112/EC (Articles 138, 146 referenced by codes K, G)

**Law — [[law]]: exactly the nine codes EN-16931 admits are valid, and the chosen category code determines whether a VAT rate and an exemption reason are required.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard EN-16931:2017 BT-151 vat-category-code (subset that EN-16931 admits)`

Composes: [[standards]].
