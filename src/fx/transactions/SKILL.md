---
name: transactions
description: "Use when logging or auditing IAS-21 FX events — spot conversions, period-end monetary-item revaluations, hedge settlements, or consolidation translation adjustments; tracing exchangeRate to the currency-rates master; booking the resulting FX gain/loss journal entry. The IAS-21 FX conversion and revaluation event register."
atomPath: "fx/transactions"
coordinate: "fx/transactions · 8/crest · b928adb8"
contentUuid: "5f2d1221-683e-5197-9f3a-5bf67434424a"
diamondUuid: "7837a21a-8cc0-8e72-b55f-73fade63e888"
uuid: "b928adb8-88f5-81ca-8bea-9568f3cbb3f8"
horo: 8
typography:
  partition: fx
  bondDegree: 54
standards:
  - "IFRS IAS-21 §21 §23 §28 §29 effects-of-changes-in-foreign-exchange-rates"
  - "IFRS IAS-21 §39 foreign-currency-translation"
  - "IFRS IAS-32 §11 financial-instruments-presentation (every FX-revaluation row meets the IAS-32 financial-instrument definition)"
  - "IFRS IFRS-7 §22 hedging-disclosures (when FX-revaluation is part of a designated hedge per IFRS-9)"
  - "ISO-4217:2015 currency-codes from-to-currency-pair"
  - "ISO-4217:2015 currency-codes from-to-currency-pair`"
  - "ISO-8601-1:2019 date-time transaction-date"
  - "ISO-8601-1:2019 date-time transaction-date`"
  - "SOX §404 internal-controls fx-control TOM-FX-01"
  - "US-GAAP ASC-830-10-45 foreign-currency-translation"
  - "US-GAAP ASC-830-20 foreign-currency-transactions"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "77d41192-e678-89ef-a3a1-93db7d585462"
  stages:
    - stage: path
      stageUuid: "f4e0d4d1-e66c-8343-bb9c-44d5c6c8fd88"
    - stage: trinity
      stageUuid: "dcc0f0ec-3e2a-8391-a450-0b8868a85eda"
    - stage: boundary
      stageUuid: "4b813ccc-4ebd-8ab6-884a-a4db16157557"
    - stage: links
      stageUuid: "de806bbc-35a1-8166-8d14-29aa9b2c1742"
    - stage: horo
      stageUuid: "17a4b4e8-a81a-89fc-8fd0-0a59eb021bd7"
    - stage: seal
      stageUuid: "64793975-f9ff-82f3-8d9b-6ac2d532036e"
    - stage: uuid
      stageUuid: "2755135c-91a7-84c8-84c4-8ffab61814d9"
version: 2
---
# fx-transactions

FX Transactions — IAS-21 §28-29 monetary-item re-translation entries.

A [[trinity]] node — schema, `seed.ts`, `index.test.ts` co-located, one folder, [[fractal]]-addressed; the panel renders `index.ts`, so the schema is not restated here.

Each row is one durable FX conversion / revaluation event (`transactionKind`: spot · period-end revaluation · hedge settlement · consolidation translation) — the audit evidence for the FX gain/loss P&L line. Distinct from [[currency/rates]], the rate-table master: this records the events, that holds the rates a row's `exchangeRate` is sourced from.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes from-to-currency-pair`
- `@standard ISO-8601-1:2019 date-time transaction-date`

- ISO-4217:2015 currency-codes from-to-currency-pair
- ISO-8601-1:2019 date-time transaction-date
- IFRS IAS-21 §21 §23 §28 §29 effects-of-changes-in-foreign-exchange-rates
- IFRS IAS-21 §39 foreign-currency-translation
- IFRS IAS-32 §11 financial-instruments-presentation (every FX-revaluation row meets the IAS-32 financial-instrument definition)
- IFRS IFRS-7 §22 hedging-disclosures (when FX-revaluation is part of a designated hedge per IFRS-9)
- US-GAAP ASC-830-10-45 foreign-currency-translation
- US-GAAP ASC-830-20 foreign-currency-transactions
- ISO-19011:2018 audit-trail fx-revaluation-evidence
- SOX §404 internal-controls fx-control TOM-FX-01
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[accounting]] · [[transaction]] · [[currency/rates]] · [[journal/entries]] · [[horo]] (status) · [[standard]] · [[proof]] (audit-trail).

**Law — [[law]]: each FX transaction is one durable conversion or revaluation event whose `exchangeRate` is sourced from the [[currency/rates]] master (never invented) — it is the IAS-21 audit evidence for the FX gain/loss line, distinct from the rate table it reads.**
