---
name: fx-transactions
description: The fx-transactions collection — FX Transactions — IAS-21 §28-29 monetary-item re-translation entries
---

# fx-transactions

FX Transactions — IAS-21 §28-29 monetary-item re-translation entries.

A [[trinity]] node — schema, `seed.ts`, `index.test.ts` co-located, one folder, [[fractal]]-addressed; the panel renders `index.ts`, so the schema is not restated here.

Each row is one durable FX conversion / revaluation event (`transactionKind`: spot · period-end revaluation · hedge settlement · consolidation translation) — the audit evidence for the FX gain/loss P&L line. Distinct from [[CurrencyRates]], the rate-table master: this records the events, that holds the rates a row's `exchangeRate` is sourced from.

## Standards
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

Composes: [[accounting]] · [[transaction]] · [[CurrencyRates]] · [[JournalEntries]] · [[horo]] (status) · [[standard]] · [[proof]] (audit-trail).
