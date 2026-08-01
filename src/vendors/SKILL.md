---
name: vendors
description: "Use when managing purchase-side party master data — vendor identity, VAT/tax classification, IBAN/BIC bank details, payment terms, AP ledger defaults, and IRS 1099 eligibility. The supplier/vendor master and accounts-payable party registry."
atomPath: vendors
coordinate: "vendors · 2/share · 74696745"
contentUuid: "9ffe8b2a-3d0c-5e23-b340-f49d281ba696"
diamondUuid: "78267faf-2041-80ea-844f-9193f52cf845"
uuid: "74696745-3bd0-886f-9905-4179e54c65cc"
horo: 2
typography:
  partition: vendors
  bondDegree: 0
standards:
  - "EN-16931:2017 §BG-4 seller"
  - "EN-16931:2017 §BG-4 seller`"
  - "GDPR Art.6(1)(b) lawful-basis-contract"
  - "ISO-13616-1:2020 iban"
  - "ISO-13616-1:2020 iban`"
  - "ISO-17442-1"
  - "ISO-17442-1:2020 lei"
  - "ISO-17442-1:2020 lei`"
  - "ISO-20022 pain.001 customer-credit-transfer-initiation"
  - "ISO-20022 pain.001 customer-credit-transfer-initiation`"
  - "ISO-20022 pain.008 customer-direct-debit-initiation"
  - "ISO-20022 pain.008 customer-direct-debit-initiation`"
  - "ISO-3166-1:2020 country-codes via-addresses"
  - "ISO-3166-1:2020 country-codes via-addresses`"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-9001"
  - "ISO-9362:2022 bic"
  - "ISO-9362:2022 bic`"
  - "US-GAAP ASC-405 liabilities"
  - "US-IRS Form-1099 information-return"
  - "W3C-PROV-O"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "069614cf-e4d4-8db4-b556-6feb03047c24"
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
      stageUuid: "76153e19-3865-80a4-bf75-cc4d3e3ca4f2"
    - stage: seal
      stageUuid: "ce22f689-243f-8da3-a84a-a3b4ecd061d6"
    - stage: uuid
      stageUuid: "621c9647-d3da-8e2e-8e15-1f5916e139e7"
version: 2
---
# vendors

[[identity]] — [[standard]] party registry for purchase-side operations. Master data for all vendor relationships: legal identity, tax classification, bank details, payment terms, and ledger defaults. Composes [[vendors/vendor/scorecards]] · [[vendors/vendor/quotes]].

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-3166-1:2020 country-codes via-addresses`
- `@standard ISO-13616-1:2020 iban`
- `@standard ISO-9362:2022 bic`
- `@standard ISO-17442-1:2020 lei`
- `@standard ISO-20022 pain.001 customer-credit-transfer-initiation`
- `@standard ISO-20022 pain.008 customer-direct-debit-initiation`
- `@standard EN-16931:2017 §BG-4 seller`

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
