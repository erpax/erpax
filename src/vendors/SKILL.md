---
name: vendors
description: "Use when managing purchase-side party master data — vendor identity, VAT/tax classification, IBAN/BIC bank details, payment terms, AP ledger defaults, and IRS 1099 eligibility. The supplier/vendor master and accounts-payable party registry."
atomPath: vendors
coordinate: "vendors · 7/descent · 7c2cd0da"
contentUuid: "186acf80-c037-5778-9420-eea0ea31b006"
diamondUuid: "7233b5bd-38cd-89bf-9aa0-f1758ea43063"
uuid: "7c2cd0da-771a-80ad-81fd-483d6536f35b"
horo: 7
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
  computationUuid: "9a8623c9-6975-85c1-8a56-50cc3c2304cf"
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
      stageUuid: "f931c594-0a6a-80bc-b317-8ae5b75bf291"
    - stage: seal
      stageUuid: "ac5d9531-8734-8004-9492-f6b35fe6bf0c"
    - stage: uuid
      stageUuid: "c87bb3c5-40bd-8270-98bd-77b43518e782"
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
