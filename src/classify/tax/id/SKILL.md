---
name: id
description: "Use when a tax-ID needs a normalised type-label stamped onto the document — a beforeChange hook that matches the raw number against the per-country regex registry so downstream code branches on a label, not a free-form match."
atomPath: classify/tax/id
coordinate: classify/tax/id · 8/crest · 2e8b9817
contentUuid: "e178dc92-0c14-5233-a3f0-74b26452cb28"
diamondUuid: "6cd6ab44-7f65-8315-863a-3eaad18baea1"
uuid: "2e8b9817-fbcc-822a-96d2-8d9c9ef647f2"
horo: 8
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
    - vat
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
    - vat
typography:
  partition: classify
  bondDegree: 61
  neighbors: []
standards:
  - "EU-Taxonomy-2020/852"
  - "ISO-19011:2018 audit-trail tax-id-classification-evidence"
  - "ISO-3166-1"
  - "ISO-3166-1:2020 country-codes alpha-2"
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
    - vat
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
    - vat
signatures:
  computationUuid: "3372ec37-8bda-83f5-abc4-6d8f62e7cdf9"
  stages:
    - stage: path
      stageUuid: "24c533f5-84e8-8f9d-83c9-1063160e5331"
    - stage: trinity
      stageUuid: "b5b291f2-cec9-818a-819d-2ecd5dd4d90d"
    - stage: boundary
      stageUuid: "168d1e41-d06c-88af-ada6-39dbd5bf69a7"
    - stage: links
      stageUuid: "eab96a84-5895-8ffe-8c99-ba2efb002bf7"
    - stage: horo
      stageUuid: "fc5c4c8a-2d25-8b97-9600-8f2ea10d8f26"
    - stage: seal
      stageUuid: "265c4b61-2379-844c-9b22-925e14afcb7c"
    - stage: uuid
      stageUuid: "bb6cd955-13fe-8c44-8145-ac8ea04f93f7"
version: 2
---
# classify/tax/id — stamp the tax-ID's type-label

A beforeChange hook-factory that reads a document's tax-ID and [[country]] (by dotted path, defaulting to the canonical top-level layout, or nested `tax.vatNumber` for Customers/Vendors) and writes back a normalised type-label — `"EIK / Bulstat"`, `"VAT (BG)"`, `"EIN"`, `"GSTIN"` — drawn from the per-country format registry. The point: downstream code branches on a stable label instead of re-running country regexes. No match (or non-string input) is a clean no-op — the document passes through untouched and unlabelled.

Matter-twin: `src/classify/tax/id/index.ts` (`classifyTaxId` hook-factory over `country-specifics`' `classifyTaxId(country, value)`). Composes [[tax]] · [[id]] · [[country]].

**Law — [[law]]: the type-label is derived once, at write time, from the [[country]] registry — so downstream branches on a normalised label, never a free-form regex; an unrecognised id leaves the document untouched (no false label).**
