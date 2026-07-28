---
name: transactions
description: "Use when logging or auditing IAS-21 FX events — spot conversions, period-end monetary-item revaluations, hedge settlements, or consolidation translation adjustments; tracing exchangeRate to the currency-rates master; booking the resulting FX gain/loss journal entry. The IAS-21 FX conversion and revaluation event register."
atomPath: "fx/transactions"
coordinate: "fx/transactions · 5/round · 847cc3cc"
contentUuid: "ed576894-327e-529d-bd04-41c95adea568"
diamondUuid: "75602304-a48c-8682-be2b-db32bd739f90"
uuid: "847cc3cc-6919-8652-9f9f-da0055019d0d"
horo: 5
bonds:
  in:
    - accounting
    - entries
    - fractal
    - hedge
    - horo
    - law
    - proof
    - rates
    - standard
    - transaction
    - trinity
  out:
    - accounting
    - entries
    - fractal
    - hedge
    - horo
    - law
    - proof
    - rates
    - standard
    - transaction
    - trinity
typography:
  partition: fx
  bondDegree: 54
  neighbors: []
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
neighbors:
  wikilink:
    - accounting
    - entries
    - fractal
    - horo
    - law
    - proof
    - rates
    - standard
    - transaction
    - trinity
  matrix:
    - accounting
    - entries
    - fractal
    - hedge
    - horo
    - law
    - proof
    - rates
    - standard
    - transaction
    - trinity
  backlinks:
    - accounting
    - entries
    - fractal
    - hedge
    - horo
    - law
    - proof
    - rates
    - standard
    - transaction
    - trinity
signatures:
  computationUuid: "4458b46e-4c31-8136-80c8-4284bc78eb8f"
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
      stageUuid: "17aeb367-b3b6-801d-91fc-d6e194a646b1"
    - stage: seal
      stageUuid: "64793975-f9ff-82f3-8d9b-6ac2d532036e"
    - stage: uuid
      stageUuid: "7be286ab-459e-8e56-8291-170ec7687524"
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
