---
name: validation
description: "Use when checking that a postal address is complete and well-formed for its declared country — country-aware required components and postal-code pattern checks, returning human-readable errors (empty ⇒ valid) ready for a Payload beforeValidate throw."
atomPath: "address/validation"
coordinate: "address/validation · 4/weave · 518c5671"
contentUuid: "e8da616c-62f6-50f9-b59e-85b52e2172e0"
diamondUuid: "fe0cb8d8-ac64-86f5-bf55-75d451495fe1"
uuid: "518c5671-ab2c-8f25-abcf-f9f4f13f50f8"
horo: 4
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
  computationUuid: "621b2d68-d1a6-882a-a0bd-5473f65ef937"
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
      stageUuid: "6b2289af-3f20-8d16-b376-7aee7a1d4dd7"
    - stage: seal
      stageUuid: "6d5501f0-1ad2-80d9-aa3c-0808dd20bd96"
    - stage: uuid
      stageUuid: "2df5a40c-baa9-819e-925e-2fba0206d064"
version: 2
---
# address/validation — the country-aware address validator

The canonical check that an address satisfies the format of its country. `validateAddress` reads the per-country format from `@/config/address/formats`, coalesces the plugin/collection field aliases (`addressLine1`→`street1`, `city`→`locality`, `state`→`subdivision`) to the canonical components, and returns `{ valid, errors, missing }`. Required components vary by country (US/CA require subdivision, BG/DE/FR don't); the postal code is checked against the country pattern only when present (HK has none). A blank country is draft-state and skips validation unless a `fallbackCountry` forces one.

Matter-twin: `src/address/validation/index.ts` (`validateAddress` · `AddressLike` · `AddressValidationResult`). Composes [[address]] · [[country]] · [[postal]] · [[locality]] · [[region]].

**Law — [[law]]: an address is valid only against its declared country's format — required components and the postal pattern are looked up, never US-centric hard-coded; empty country ⇒ draft ⇒ valid, empty errors ⇒ valid.**

@standard ISO-19160-4:2017 addressing · UPU-S42 international-postal-addressing
@compliance GDPR Art.5(1)(c) data-minimisation — only the fields the format requires
