---
name: "5305"
description: Use when implementing or referencing UN/CEFACT 5305 — Duty / Tax / Fee Category Code.
atomPath: un/cefact/5305
coordinate: un/cefact/5305 · 5/round · 8cd575d0
contentUuid: "fa6d0e85-a249-564e-a406-6e84a2f83a39"
diamondUuid: "a233281a-a902-8a99-a891-4866f39d57e6"
uuid: "8cd575d0-d3c0-8c2d-875f-874f2fc8ff67"
horo: 5
bonds:
  in:
    - law
  out:
    - law
typography:
  partition: un
  bondDegree: 3
  neighbors: []
standards:
  - "EN-16931:2017 BT-151 vat-category-code (subset that EN-16931 admits)"
  - "UN-CEFACT"
  - "UN/CEFACT Trade Data Element 5305 duty-tax-fee-category-code"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - law
  backlinks:
    - law
signatures:
  computationUuid: "edb15672-71a2-89d2-94d1-344c7bd8b181"
  stages:
    - stage: path
      stageUuid: "6164a2b6-457f-8f8f-a8c7-c4a5eb0eb8cb"
    - stage: trinity
      stageUuid: "183877ba-a52c-8b4f-b205-d4bcf0342653"
    - stage: boundary
      stageUuid: "cc6d9f65-7158-898f-b85e-a630fb0d7d51"
    - stage: links
      stageUuid: "d24d012a-7b53-8a4b-8f21-495d1a0f53b7"
    - stage: horo
      stageUuid: "433bea33-6c86-8263-b406-6e353e4f68d1"
    - stage: seal
      stageUuid: "2dbaffc4-77cd-8dfa-91b5-9f0541269636"
    - stage: uuid
      stageUuid: "8e5e1ae2-8015-8afc-9452-7ccdeea94622"
version: 2
---
# UN/CEFACT 5305 — Duty / Tax / Fee Category Code

Lifted out of `src/standards/en-16931/types.ts` since the same code list is referenced from multiple places (invoice lines, tax codes master, AI tax classifier, SAF-T tax table, tax calculations).

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
