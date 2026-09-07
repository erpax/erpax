---
name: vendors
description: "Use when managing purchase-side party master data — vendor identity, VAT/tax classification, IBAN/BIC bank details, payment terms, AP ledger defaults, and IRS 1099 eligibility. The supplier/vendor master and accounts-payable party registry."
atomPath: vendors
coordinate: "vendors · 1/base · ab9e3301"
contentUuid: "4c8371a9-3f05-547e-b778-21e3df924d6a"
diamondUuid: "36993417-3161-87f0-99d7-b08d075d695d"
uuid: "ab9e3301-942a-8157-9484-ef5cc66391fe"
horo: 1
typography:
  partition: vendors
  bondDegree: 22
standards:
  - "EN-16931:2017 §BG-4 seller"
  - "EN-16931:2017 §BG-4 seller`"
  - "GDPR Art.6(1)(b) lawful-basis-contract"
  - "ISO-13616-1:2020 iban"
  - "ISO-13616-1:2020 iban`"
  - "ISO-17442"
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
  computationUuid: "a176568e-55b2-8686-ae62-a69f54d5727d"
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
      stageUuid: "644fefed-c067-8e9d-afcb-85bc685e7c32"
    - stage: seal
      stageUuid: "ac5d9531-8734-8004-9492-f6b35fe6bf0c"
    - stage: uuid
      stageUuid: "011979e0-80db-87f0-b4dd-0e54f684f0e9"
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
