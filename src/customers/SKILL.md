---
name: customers
description: "Use when creating or querying the sale-side party master — customer identity, LEI, IBAN, VAT classification, credit limit, payment terms, accounts-receivable exposure, and GDPR consent. The EN-16931 buyer party collection."
atomPath: customers
coordinate: "customers · 5/round · 56921782"
contentUuid: "72ce847e-8199-5ec4-92c4-c0a550bc5337"
diamondUuid: "b7e09a6a-fc45-835e-bce6-8fab101402c2"
uuid: "56921782-46e3-8221-9dc4-b4a331269cc9"
horo: 5
typography:
  partition: customers
  bondDegree: 63
standards:
  - "ASC-606"
  - "COSO-ERM-2017"
  - "EN-16931"
  - "EN-16931:2017 §BG-7 buyer"
  - "EN-16931:2017 §BG-7 buyer`"
  - "EU-537/2014"
  - "EU-910/2014"
  - "EU-UCC"
  - "GDPR Art.5 data-minimization"
  - "GDPR Art.6(1)(b) lawful-basis-contract"
  - "IAS-1"
  - "IAS-8"
  - "IFRS IFRS-9 financial-instruments accounts-receivable"
  - "IFRS-15"
  - "INCOTERMS-2020"
  - "ISO-13616-1"
  - "ISO-13616-1:2020 iban"
  - "ISO-13616-1:2020 iban`"
  - "ISO-17442"
  - "ISO-17442-1"
  - "ISO-17442-1:2020 lei"
  - "ISO-17442-1:2020 lei`"
  - "ISO-3166-1:2020 country-codes via-addresses"
  - "ISO-3166-1:2020 country-codes via-addresses`"
  - "ISO-4217:2015 currency-codes default-currency"
  - "ISO-4217:2015 currency-codes default-currency`"
  - "ISO-9735"
  - "Peppol-BIS-3.0"
  - SOX
  - "UBL-2.1"
  - "US-GAAP"
  - "US-GAAP ASC-310 receivables"
  - "WCO-HS"
  - eIDAS
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "3c7f7a45-edfa-8046-af69-c2eb52aa7864"
  stages:
    - stage: path
      stageUuid: "06e2401f-1cb1-8548-a990-755d31d88436"
    - stage: trinity
      stageUuid: "9c8c8bc9-1bc5-8370-905a-bf7caa9efef3"
    - stage: boundary
      stageUuid: "683153db-9834-8c9b-9836-9d4376f20979"
    - stage: links
      stageUuid: "76a0cd85-c851-88fd-a4e3-0e34bda9597b"
    - stage: horo
      stageUuid: "1c4546eb-f51b-8fc2-a537-fe2b380a79d2"
    - stage: seal
      stageUuid: "33e367e0-80b1-8bf7-bd57-25b0c02220c7"
    - stage: uuid
      stageUuid: "058ad414-2f97-8348-9090-88cff9778651"
version: 2
---
# customers

Customers — sale-side party master.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes default-currency`
- `@standard ISO-3166-1:2020 country-codes via-addresses`
- `@standard ISO-17442-1:2020 lei`
- `@standard ISO-13616-1:2020 iban`
- `@standard EN-16931:2017 §BG-7 buyer`

- ISO-4217:2015 currency-codes default-currency
- ISO-3166-1:2020 country-codes via-addresses
- ISO-17442-1:2020 lei
- ISO-13616-1:2020 iban
- EN-16931:2017 §BG-7 buyer
- IFRS IFRS-9 financial-instruments accounts-receivable
- US-GAAP ASC-310 receivables
- GDPR Art.6(1)(b) lawful-basis-contract
- GDPR Art.5 data-minimization

Composes: [[customers/sales/orders]] · [[identity]] · [[accounting]] · [[tax]] · [[horo]] · [[standard]].

**Law — [[law]]: a customer is the buyer-side party of record whose receivable exposure may never exceed its credit limit, and whose personal data is held only on a lawful basis and minimized.**
