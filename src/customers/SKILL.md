---
name: customers
description: "Use when creating or querying the sale-side party master — customer identity, LEI, IBAN, VAT classification, credit limit, payment terms, accounts-receivable exposure, and GDPR consent. The EN-16931 buyer party collection."
atomPath: customers
coordinate: customers · 1/base · bb79375b
contentUuid: "033645bc-406c-5b01-a876-3a19707e646e"
diamondUuid: "b5ccb30b-70ef-8c2d-81b7-fbd3bc00d5b9"
uuid: "bb79375b-1f9b-83dd-94bd-b8c3ab9e095a"
horo: 1
bonds:
  in:
    - accounting
    - activities
    - bookings
    - churn
    - dunning
    - engagement
    - horo
    - identity
    - law
    - memos
    - orders
    - party
    - prospect
    - retention
    - satisfaction
    - segments
    - sla
    - standard
    - tax
    - territory
    - upsell
  out:
    - accounting
    - activities
    - bookings
    - churn
    - dunning
    - engagement
    - horo
    - identity
    - law
    - memos
    - orders
    - party
    - prospect
    - retention
    - satisfaction
    - segments
    - sla
    - standard
    - tax
    - territory
    - upsell
typography:
  partition: customers
  bondDegree: 0
  neighbors: []
standards:
  - "ASC-606"
  - "COSO-ERM-2017"
  - "EN-16931"
  - "EN-16931:2017 §BG-7 buyer"
  - "EU-2014/55"
  - "EU-2017/1132"
  - "EU-2017/828"
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
  - "ISO-17442-1"
  - "ISO-17442-1:2020 lei"
  - "ISO-3166-1:2020 country-codes via-addresses"
  - "ISO-4217:2015 currency-codes default-currency"
  - "ISO-9735"
  - "Peppol-BIS-3.0"
  - SOX
  - "UBL-2.1"
  - "US-GAAP"
  - "US-GAAP ASC-310 receivables"
  - "WCO-HS"
  - eIDAS
bindings: []
neighbors:
  wikilink:
    - accounting
    - horo
    - identity
    - law
    - orders
    - standard
    - tax
  matrix:
    - accounting
    - activities
    - bookings
    - churn
    - dunning
    - engagement
    - horo
    - identity
    - law
    - memos
    - orders
    - party
    - prospect
    - retention
    - satisfaction
    - segments
    - sla
    - standard
    - tax
    - territory
    - upsell
  backlinks:
    - accounting
    - activities
    - bookings
    - churn
    - dunning
    - engagement
    - horo
    - identity
    - law
    - memos
    - orders
    - party
    - prospect
    - retention
    - satisfaction
    - segments
    - sla
    - standard
    - tax
    - territory
    - upsell
signatures:
  computationUuid: "385db9ef-79eb-8d15-bfce-20cbe24c5dc9"
  stages:
    - stage: path
      stageUuid: "06e2401f-1cb1-8548-a990-755d31d88436"
    - stage: trinity
      stageUuid: "9c8c8bc9-1bc5-8370-905a-bf7caa9efef3"
    - stage: boundary
      stageUuid: "bbb9defc-13e6-819a-a27b-c62bd99c24cb"
    - stage: links
      stageUuid: "76a0cd85-c851-88fd-a4e3-0e34bda9597b"
    - stage: horo
      stageUuid: "284e5cb8-1362-8c5d-8182-ff060526c9ac"
    - stage: seal
      stageUuid: "06983341-9c4d-8ff2-8f93-343a2d9d2c9b"
    - stage: uuid
      stageUuid: "f66275d0-a028-8904-a9c3-a059cbb80da6"
version: 2
---
# customers

Customers — sale-side party master.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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
