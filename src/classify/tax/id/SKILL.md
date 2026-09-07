---
name: id
description: "Use when a tax-ID needs a normalised type-label stamped onto the document — a beforeChange hook that matches the raw number against the per-country regex registry so downstream code branches on a label, not a free-form match."
atomPath: "classify/tax/id"
coordinate: "classify/tax/id · 1/base · 22a233f0"
contentUuid: "e4a97c31-2db8-5cb8-ba8e-7068818c9aaa"
diamondUuid: "5a6302f3-2f6b-87d0-ab48-28d2ba7157d2"
uuid: "22a233f0-e946-8e2d-bba2-75ee38845871"
horo: 1
typography:
  partition: classify
  bondDegree: 58
standards:
  - "EU-Taxonomy-2020/852"
  - "ISO-3166-1"
  - "ISO-3166-1:2020 country-codes alpha-2"
  - "ISO-3166-1:2020 country-codes alpha-2`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "a804db0c-491e-87da-9e43-f3cd31cb165a"
  stages:
    - stage: path
      stageUuid: "24c533f5-84e8-8f9d-83c9-1063160e5331"
    - stage: trinity
      stageUuid: "b5b291f2-cec9-818a-819d-2ecd5dd4d90d"
    - stage: boundary
      stageUuid: "80190f96-e732-82c1-8fda-1375b75ddd6e"
    - stage: links
      stageUuid: "eab96a84-5895-8ffe-8c99-ba2efb002bf7"
    - stage: horo
      stageUuid: "b8f2ce6d-542a-860b-8bf5-663e2383dacf"
    - stage: seal
      stageUuid: "265c4b61-2379-844c-9b22-925e14afcb7c"
    - stage: uuid
      stageUuid: "0166ec7a-ba37-8b2e-b7b2-586c3fed58b1"
version: 2
---
# classify/tax/id — stamp the tax-ID's type-label

A beforeChange hook-factory that reads a document's tax-ID and [[country]] (by dotted path, defaulting to the canonical top-level layout, or nested `tax.vatNumber` for Customers/Vendors) and writes back a normalised type-label — `"EIK / Bulstat"`, `"VAT (BG)"`, `"EIN"`, `"GSTIN"` — drawn from the per-country format registry. The point: downstream code branches on a stable label instead of re-running country regexes. No match (or non-string input) is a clean no-op — the document passes through untouched and unlabelled.

Matter-twin: `src/classify/tax/id/index.ts` (`classifyTaxId` hook-factory over `country-specifics`' `classifyTaxId(country, value)`). Composes [[tax]] · [[id]] · [[country]].

**Law — [[law]]: the type-label is derived once, at write time, from the [[country]] registry — so downstream branches on a normalised label, never a free-form regex; an unrecognised id leaves the document untouched (no false label).**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-3166-1:2020 country-codes alpha-2`
