---
name: id
description: "Use when a tax-ID needs a normalised type-label stamped onto the document — a beforeChange hook that matches the raw number against the per-country regex registry so downstream code branches on a label, not a free-form match."
atomPath: "classify/tax/id"
coordinate: "classify/tax/id · 2/share · 0483b70e"
contentUuid: "9014c353-9772-59bd-a564-bf6b9d895223"
diamondUuid: "e94de503-c555-8c8d-8528-cc02d8c5ddc7"
uuid: "0483b70e-bb1d-83ce-aa63-fac84a98a25b"
horo: 2
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
  computationUuid: "af655a1b-25db-8698-a7f7-12f993e95000"
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
      stageUuid: "51289dfa-d86d-89ca-a5be-f73b5747841f"
    - stage: seal
      stageUuid: "265c4b61-2379-844c-9b22-925e14afcb7c"
    - stage: uuid
      stageUuid: "5a601b79-d0d1-8a27-8c69-41f22527d30e"
version: 2
---
# classify/tax/id — stamp the tax-ID's type-label

A beforeChange hook-factory that reads a document's tax-ID and [[country]] (by dotted path, defaulting to the canonical top-level layout, or nested `tax.vatNumber` for Customers/Vendors) and writes back a normalised type-label — `"EIK / Bulstat"`, `"VAT (BG)"`, `"EIN"`, `"GSTIN"` — drawn from the per-country format registry. The point: downstream code branches on a stable label instead of re-running country regexes. No match (or non-string input) is a clean no-op — the document passes through untouched and unlabelled.

Matter-twin: `src/classify/tax/id/index.ts` (`classifyTaxId` hook-factory over `country-specifics`' `classifyTaxId(country, value)`). Composes [[tax]] · [[id]] · [[country]].

**Law — [[law]]: the type-label is derived once, at write time, from the [[country]] registry — so downstream branches on a normalised label, never a free-form regex; an unrecognised id leaves the document untouched (no false label).**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-3166-1:2020 country-codes alpha-2`
