---
name: validation
description: "Use when checking that a postal address is complete and well-formed for its declared country — country-aware required components and postal-code pattern checks, returning human-readable errors (empty ⇒ valid) ready for a Payload beforeValidate throw."
atomPath: address/validation
coordinate: address/validation · 2/share · 7c60afaf
contentUuid: "cb0772b3-6fe3-5c8d-83c0-1e2744d6e544"
diamondUuid: "2241bcaa-0e9d-8b47-b3ce-c753f4fa6a54"
uuid: "7c60afaf-fecb-863c-9e26-b2860dda0ced"
horo: 2
bonds:
  in:
    - address
    - country
    - law
    - locality
    - postal
    - region
  out:
    - address
    - country
    - law
    - locality
    - postal
    - region
typography:
  partition: address
  bondDegree: 18
  neighbors: []
standards:
  - "COSO-ERM-2017"
  - "EU-2017/1132"
  - "EU-2017/828"
  - "EU-Taxonomy-2020/852"
  - "GDPR Art.5(1)(c) data-minimisation collect-only-fields-the-format-requires"
  - "GDPR Art.5(1)(c) data-minimisation — only the fields the format requires"
  - "ISO-19011:2018 audit-trail address-validation"
  - "ISO-19160-4"
  - "ISO-19160-4:2017 addressing components-and-conceptual-model"
  - "ISO-19160-4:2017 addressing · UPU-S42 international-postal-addressing"
  - "ISO-3166-1"
  - "ISO-3166-1:2020 country-codes alpha-2"
  - "UPU-S42"
  - "UPU-S42 international-postal-addressing"
bindings: []
neighbors:
  wikilink:
    - address
    - country
    - law
    - locality
    - postal
    - region
  matrix:
    - address
    - country
    - law
    - locality
    - postal
    - region
  backlinks:
    - address
    - country
    - law
    - locality
    - postal
    - region
signatures:
  computationUuid: "9a567355-7c52-8e8b-a853-7b78aefe3a16"
  stages:
    - stage: path
      stageUuid: "509641d0-0cde-868c-98b4-70d9f17ce1a8"
    - stage: trinity
      stageUuid: "730e5718-01ae-8825-87c1-7ad19465f6b7"
    - stage: boundary
      stageUuid: "954b04ea-d05c-816e-9e8c-a556779dad7e"
    - stage: links
      stageUuid: "82b9d3dd-6383-8feb-ab13-a1a3839d291b"
    - stage: horo
      stageUuid: "7867e46c-725e-8fd0-b084-e232222f8df2"
    - stage: seal
      stageUuid: "fe3373b5-ec30-8e79-b7e8-bd55abba4c5f"
    - stage: uuid
      stageUuid: "c7b66784-c7c8-82e0-a6be-e1d6c14cb02c"
version: 2
---
# address/validation — the country-aware address validator

The canonical check that an address satisfies the format of its country. `validateAddress` reads the per-country format from `@/config/address-formats`, coalesces the plugin/collection field aliases (`addressLine1`→`street1`, `city`→`locality`, `state`→`subdivision`) to the canonical components, and returns `{ valid, errors, missing }`. Required components vary by country (US/CA require subdivision, BG/DE/FR don't); the postal code is checked against the country pattern only when present (HK has none). A blank country is draft-state and skips validation unless a `fallbackCountry` forces one.

Matter-twin: `src/address/validation/index.ts` (`validateAddress` · `AddressLike` · `AddressValidationResult`). Composes [[address]] · [[country]] · [[postal]] · [[locality]] · [[region]].

**Law — [[law]]: an address is valid only against its declared country's format — required components and the postal pattern are looked up, never US-centric hard-coded; empty country ⇒ draft ⇒ valid, empty errors ⇒ valid.**

@standard ISO-19160-4:2017 addressing · UPU-S42 international-postal-addressing
@compliance GDPR Art.5(1)(c) data-minimisation — only the fields the format requires
