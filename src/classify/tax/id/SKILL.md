---
name: id
description: "Use when a tax-ID needs a normalised type-label stamped onto the document — a beforeChange hook that matches the raw number against the per-country regex registry so downstream code branches on a label, not a free-form match."
atomPath: "classify/tax/id"
coordinate: "classify/tax/id · 5/round · bbf97f4a"
contentUuid: "b69a82aa-efe9-534d-9a31-c8c8eeecbc82"
diamondUuid: "d9e9447b-d4b7-8304-8a0f-359eb31d2e50"
uuid: "bbf97f4a-2470-8476-9daa-0795ee29af5b"
horo: 5
typography:
  partition: classify
  bondDegree: 56
standards:
  - "EU-Taxonomy-2020/852"
  - "ISO-3166-1"
  - "ISO-3166-1:2020 country-codes alpha-2"
  - "ISO-3166-1:2020 country-codes alpha-2`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "968d18ab-ac01-8189-a78e-44596709143c"
  stages:
    - stage: path
      stageUuid: "24c533f5-84e8-8f9d-83c9-1063160e5331"
    - stage: trinity
      stageUuid: "b5b291f2-cec9-818a-819d-2ecd5dd4d90d"
    - stage: boundary
      stageUuid: "80190f96-e732-82c1-8fda-1375b75ddd6e"
    - stage: links
      stageUuid: "a7357f92-ac0c-8599-bea1-6afe719f58c4"
    - stage: horo
      stageUuid: "fe1cfc8c-84c9-8a7f-bca4-ee1aa55dca42"
    - stage: seal
      stageUuid: "265c4b61-2379-844c-9b22-925e14afcb7c"
    - stage: uuid
      stageUuid: "439b5fee-fdb9-8e5a-969b-fba1fbb0f0c6"
version: 2
---
# classify/tax/id — stamp the tax-ID's type-label

A beforeChange hook-factory that reads a document's tax-ID and [[country]] (by dotted path, defaulting to the canonical top-level layout, or nested `tax.vatNumber` for Customers/Vendors) and writes back a normalised type-label — `"EIK / Bulstat"`, `"VAT (BG)"`, `"EIN"`, `"GSTIN"` — drawn from the per-country format registry. The point: downstream code branches on a stable label instead of re-running country regexes. No match (or non-string input) is a clean no-op — the document passes through untouched and unlabelled.

Matter-twin: `src/classify/tax/id/index.ts` (`classifyTaxId` hook-factory over `country-specifics`' `classifyTaxId(country, value)`). Composes [[tax]] · [[id]] · [[country]].

**Law — [[law]]: the type-label is derived once, at write time, from the [[country]] registry — so downstream branches on a normalised label, never a free-form regex; an unrecognised id leaves the document untouched (no false label).**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-3166-1:2020 country-codes alpha-2`
