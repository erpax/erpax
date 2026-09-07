---
name: validation
description: "Use when checking that a postal address is complete and well-formed for its declared country — country-aware required components and postal-code pattern checks, returning human-readable errors (empty ⇒ valid) ready for a Payload beforeValidate throw."
atomPath: "address/validation"
coordinate: "address/validation · 5/round · aadf1645"
contentUuid: "850d44c4-5f99-5da3-a521-776cb70d1d5e"
diamondUuid: "d8fcf33b-83f1-81a7-b200-5b452818c2ca"
uuid: "aadf1645-a169-8f2b-84a9-bfa4ed7e57ed"
horo: 5
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
  computationUuid: "a6a09d8c-c514-8ff7-9eda-1d528e9d886f"
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
      stageUuid: "c7130a8a-c452-8367-8027-964f8d5c03f7"
    - stage: seal
      stageUuid: "6d5501f0-1ad2-80d9-aa3c-0808dd20bd96"
    - stage: uuid
      stageUuid: "31324756-3c67-8ecd-8707-fc55b69d8396"
version: 2
---
# address/validation — the country-aware address validator

The canonical check that an address satisfies the format of its country. `validateAddress` reads the per-country format from `@/config/address/formats`, coalesces the plugin/collection field aliases (`addressLine1`→`street1`, `city`→`locality`, `state`→`subdivision`) to the canonical components, and returns `{ valid, errors, missing }`. Required components vary by country (US/CA require subdivision, BG/DE/FR don't); the postal code is checked against the country pattern only when present (HK has none). A blank country is draft-state and skips validation unless a `fallbackCountry` forces one.

Matter-twin: `src/address/validation/index.ts` (`validateAddress` · `AddressLike` · `AddressValidationResult`). Composes [[address]] · [[country]] · [[postal]] · [[locality]] · [[region]].

**Law — [[law]]: an address is valid only against its declared country's format — required components and the postal pattern are looked up, never US-centric hard-coded; empty country ⇒ draft ⇒ valid, empty errors ⇒ valid.**

@standard ISO-19160-4:2017 addressing · UPU-S42 international-postal-addressing
@compliance GDPR Art.5(1)(c) data-minimisation — only the fields the format requires
