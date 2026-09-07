---
name: validation
description: "Use when checking that a postal address is complete and well-formed for its declared country — country-aware required components and postal-code pattern checks, returning human-readable errors (empty ⇒ valid) ready for a Payload beforeValidate throw."
atomPath: "address/validation"
coordinate: "address/validation · 7/descent · 83a8b8ef"
contentUuid: "d9f9244c-5a06-5751-9e6e-9ebc3e3469d4"
diamondUuid: "72118fe8-dac3-899e-8fa1-52c261c5b2cf"
uuid: "83a8b8ef-37a6-8329-895e-6f4645b6ba08"
horo: 7
typography:
  partition: address
  bondDegree: 18
standards:
  - "COSO-ERM-2017"
  - "EU-Taxonomy-2020/852"
  - "GDPR Art.5(1)(c) data-minimisation collect-only-fields-the-format-requires"
  - "GDPR Art.5(1)(c) data-minimisation — only the fields the format requires"
  - "ISO-19160-4"
  - "ISO-19160-4:2017 addressing components-and-conceptual-model"
  - "ISO-19160-4:2017 addressing · UPU-S42 international-postal-addressing"
  - "ISO-3166-1"
  - "ISO-3166-1:2020 country-codes alpha-2"
  - "UPU-S42"
  - "UPU-S42 international-postal-addressing"
bindings: []
signatures:
  computationUuid: "3d7c32e3-1004-8add-a528-eef8d66aeef9"
  stages:
    - stage: path
      stageUuid: "509641d0-0cde-868c-98b4-70d9f17ce1a8"
    - stage: trinity
      stageUuid: "730e5718-01ae-8825-87c1-7ad19465f6b7"
    - stage: boundary
      stageUuid: "7cafa1f4-dbed-8517-b750-16c457c47a27"
    - stage: links
      stageUuid: "82b9d3dd-6383-8feb-ab13-a1a3839d291b"
    - stage: horo
      stageUuid: "c0964987-7741-87c8-bcdb-fc594b08a540"
    - stage: seal
      stageUuid: "6d5501f0-1ad2-80d9-aa3c-0808dd20bd96"
    - stage: uuid
      stageUuid: "361bb4b8-d157-8909-a6e9-46b5b3062680"
version: 2
---
# address/validation — the country-aware address validator

The canonical check that an address satisfies the format of its country. `validateAddress` reads the per-country format from `@/config/address/formats`, coalesces the plugin/collection field aliases (`addressLine1`→`street1`, `city`→`locality`, `state`→`subdivision`) to the canonical components, and returns `{ valid, errors, missing }`. Required components vary by country (US/CA require subdivision, BG/DE/FR don't); the postal code is checked against the country pattern only when present (HK has none). A blank country is draft-state and skips validation unless a `fallbackCountry` forces one.

Matter-twin: `src/address/validation/index.ts` (`validateAddress` · `AddressLike` · `AddressValidationResult`). Composes [[address]] · [[country]] · [[postal]] · [[locality]] · [[region]].

**Law — [[law]]: an address is valid only against its declared country's format — required components and the postal pattern are looked up, never US-centric hard-coded; empty country ⇒ draft ⇒ valid, empty errors ⇒ valid.**

@standard ISO-19160-4:2017 addressing · UPU-S42 international-postal-addressing
@compliance GDPR Art.5(1)(c) data-minimisation — only the fields the format requires
