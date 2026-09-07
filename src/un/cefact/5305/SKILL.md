---
name: "5305"
description: "Use when implementing or referencing UN/CEFACT 5305 — Duty / Tax / Fee Category Code."
atomPath: "un/cefact/5305"
coordinate: "un/cefact/5305 · 4/weave · 911349b7"
contentUuid: "c175570c-d897-58e1-a7e4-a2cca4e580de"
diamondUuid: "d020ebff-c410-8289-a21d-5a5d6827f207"
uuid: "911349b7-d166-8e81-ad0e-04329d28ac58"
horo: 4
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
  computationUuid: "1dae7d9f-aec2-8866-a58b-b46a2f13ab29"
  stages:
    - stage: path
      stageUuid: "6164a2b6-457f-8f8f-a8c7-c4a5eb0eb8cb"
    - stage: trinity
      stageUuid: "183877ba-a52c-8b4f-b205-d4bcf0342653"
    - stage: boundary
      stageUuid: "cc6d9f65-7158-898f-b85e-a630fb0d7d51"
    - stage: links
      stageUuid: "b1dc4cd0-617b-8c11-93c3-5ca64c0176aa"
    - stage: horo
      stageUuid: "8d3fc73b-c047-8f70-a1a2-2925f0def546"
    - stage: seal
      stageUuid: "2dbaffc4-77cd-8dfa-91b5-9f0541269636"
    - stage: uuid
      stageUuid: "c0894af4-a059-860f-93bc-5ad8b264c3b3"
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
