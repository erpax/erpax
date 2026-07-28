---
name: id
description: "Use when a tax-ID needs a normalised type-label stamped onto the document — a beforeChange hook that matches the raw number against the per-country regex registry so downstream code branches on a label, not a free-form match."
atomPath: "classify/tax/id"
coordinate: "classify/tax/id · 1/base · a9767983"
contentUuid: "abe2b16c-510a-5f28-9612-37bb3d4ff187"
diamondUuid: "964c30e8-ba37-841b-a9b7-e2c75324e044"
uuid: "a9767983-b904-807b-b9be-8a0e76a1a596"
horo: 1
bonds:
  in:
    - animal
    - broadcast
    - channel
    - cvd
    - database
    - facility
    - group
    - id
    - identity
    - law
    - merge
    - number
    - plan
    - product
    - property
    - reservation
    - tax
    - uses
    - uuid
  out:
    - animal
    - broadcast
    - channel
    - cvd
    - database
    - facility
    - group
    - id
    - identity
    - law
    - merge
    - number
    - plan
    - product
    - property
    - reservation
    - uses
    - uuid
typography:
  partition: classify
  bondDegree: 58
  neighbors: []
standards:
  - "EU-Taxonomy-2020/852"
  - "ISO-3166-1"
  - "ISO-3166-1:2020 country-codes alpha-2"
  - "ISO-3166-1:2020 country-codes alpha-2`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - country
    - id
    - law
    - tax
  matrix:
    - animal
    - broadcast
    - channel
    - cvd
    - database
    - facility
    - group
    - id
    - identity
    - law
    - merge
    - number
    - plan
    - product
    - property
    - reservation
    - uses
    - uuid
  backlinks:
    - animal
    - broadcast
    - channel
    - cvd
    - database
    - facility
    - group
    - id
    - identity
    - law
    - merge
    - number
    - plan
    - product
    - property
    - reservation
    - uses
    - uuid
signatures:
  computationUuid: "b56df856-e919-8a2a-95ee-a8c2ee424bd7"
  stages:
    - stage: path
      stageUuid: "24c533f5-84e8-8f9d-83c9-1063160e5331"
    - stage: trinity
      stageUuid: "b5b291f2-cec9-818a-819d-2ecd5dd4d90d"
    - stage: boundary
      stageUuid: "a04dd499-33a7-80a1-85f5-da4743d0fdfd"
    - stage: links
      stageUuid: "eab96a84-5895-8ffe-8c99-ba2efb002bf7"
    - stage: horo
      stageUuid: "19e298e7-7864-88d5-990c-12928f9c2751"
    - stage: seal
      stageUuid: "265c4b61-2379-844c-9b22-925e14afcb7c"
    - stage: uuid
      stageUuid: "05641680-d47d-891a-9700-1ee0dc993679"
version: 2
---
# classify/tax/id — stamp the tax-ID's type-label

A beforeChange hook-factory that reads a document's tax-ID and [[country]] (by dotted path, defaulting to the canonical top-level layout, or nested `tax.vatNumber` for Customers/Vendors) and writes back a normalised type-label — `"EIK / Bulstat"`, `"VAT (BG)"`, `"EIN"`, `"GSTIN"` — drawn from the per-country format registry. The point: downstream code branches on a stable label instead of re-running country regexes. No match (or non-string input) is a clean no-op — the document passes through untouched and unlabelled.

Matter-twin: `src/classify/tax/id/index.ts` (`classifyTaxId` hook-factory over `country-specifics`' `classifyTaxId(country, value)`). Composes [[tax]] · [[id]] · [[country]].

**Law — [[law]]: the type-label is derived once, at write time, from the [[country]] registry — so downstream branches on a normalised label, never a free-form regex; an unrecognised id leaves the document untouched (no false label).**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-3166-1:2020 country-codes alpha-2`
