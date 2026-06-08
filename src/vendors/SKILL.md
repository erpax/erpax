---
name: vendors
description: "Use when managing purchase-side party master data — vendor identity, VAT/tax classification, IBAN/BIC bank details, payment terms, AP ledger defaults, and IRS 1099 eligibility. The supplier/vendor master and accounts-payable party registry."
atomPath: vendors
coordinate: vendors · 8/crest · 34860d9f
contentUuid: "ddf50663-c308-538a-8d6f-a4fad58d30a7"
diamondUuid: "91ac3f5d-6a6f-8113-b3ef-ae4b4433333a"
uuid: "34860d9f-e41d-8967-b0ff-e65da8971306"
horo: 8
bonds:
  in:
    - activities
    - identity
    - law
    - party
    - quotes
    - scorecards
    - standard
  out:
    - activities
    - identity
    - law
    - party
    - quotes
    - scorecards
    - standard
typography:
  partition: vendors
  bondDegree: 0
  neighbors: []
standards:
  - "EN-16931:2017 §BG-4 seller"
  - "GDPR Art.6(1)(b) lawful-basis-contract"
  - "ISO-13616-1:2020 iban"
  - "ISO-17442-1"
  - "ISO-17442-1:2020 lei"
  - "ISO-20022 pain.001 customer-credit-transfer-initiation"
  - "ISO-20022 pain.008 customer-direct-debit-initiation"
  - "ISO-3166-1:2020 country-codes via-addresses"
  - "ISO-4217:2015 currency-codes"
  - "ISO-9001"
  - "ISO-9362"
  - "ISO-9362:2022 bic"
  - "US-GAAP ASC-405 liabilities"
  - "US-IRS Form-1099 information-return"
  - "W3C-PROV-O"
bindings: []
neighbors:
  wikilink:
    - identity
    - law
    - quotes
    - scorecards
    - standard
  matrix:
    - activities
    - identity
    - law
    - party
    - quotes
    - scorecards
    - standard
  backlinks:
    - activities
    - identity
    - law
    - party
    - quotes
    - scorecards
    - standard
signatures:
  computationUuid: "4692a811-c938-8ec7-8c4b-820a7d6f7eb6"
  stages:
    - stage: path
      stageUuid: "2a6e8c99-f082-82ff-91e2-e5d52e9d7121"
    - stage: trinity
      stageUuid: "f6a00b3b-b30b-8b00-83a8-0d7aa8c3db31"
    - stage: boundary
      stageUuid: "5f66a145-e2e2-893a-b5e1-9a9e47d37e4c"
    - stage: links
      stageUuid: "1b5d1159-5783-83c7-9049-b3dd23d11d74"
    - stage: horo
      stageUuid: "e6fba55f-d824-8b85-99e2-51dee06c1201"
    - stage: seal
      stageUuid: "ce22f689-243f-8da3-a84a-a3b4ecd061d6"
    - stage: uuid
      stageUuid: "dd746e8f-628c-89c6-894b-99774374c3cf"
version: 2
---
# vendors

[[identity]] — [[standard]] party registry for purchase-side operations. Master data for all vendor relationships: legal identity, tax classification, bank details, payment terms, and ledger defaults. Composes [[vendors/vendor/scorecards]] · [[vendors/vendor/quotes]].

## Standards
- ISO-4217:2015 currency-codes
- ISO-3166-1:2020 country-codes via-addresses
- ISO-13616-1:2020 iban
- ISO-9362:2022 bic
- ISO-17442-1:2020 lei
- ISO-20022 pain.001 customer-credit-transfer-initiation
- ISO-20022 pain.008 customer-direct-debit-initiation
- EN-16931:2017 §BG-4 seller
- US-GAAP ASC-405 liabilities
- US-IRS Form-1099 information-return
- GDPR Art.6(1)(b) lawful-basis-contract

Composes: [[vendors/vendor/scorecards]] · [[vendors/vendor/quotes]].

**Law — [[law]]: vendors is the purchase-side party master — one [[identity]] per supplier carrying legal identity, tax classification, bank details, payment terms and AP ledger defaults; the accounts-payable party registry.**
