---
name: reconciliations
description: "Use when performing or auditing the period-end bank-balance proof — GL cash balance vs. camt.053 bank-statement closing balance, quantified variance, reconciling items (outstanding deposits/cheques/fees/NSF), SOX §404 TOM-CSH-01 evidence. The bank-side period-end balance proof collection."
atomPath: "bank/accounts/bank/reconciliations"
coordinate: "bank/accounts/bank/reconciliations · 7/descent · 69b971bd"
contentUuid: "21638ab0-ef3c-5ffd-9831-09044060fab7"
diamondUuid: "067167c8-4a07-8327-abac-4a23deff1754"
uuid: "69b971bd-71e8-8104-a8dc-f371c4fc12d6"
horo: 7
typography:
  partition: bank
  bondDegree: 25
standards:
  - "EU-Intrastat-Reg-2019/2152"
  - "IFRS IAS-7 §6 §44 cash-flow-reconciliation"
  - "ISO-20022"
  - "ISO-20022 camt.053 bank-to-customer-statement (input)"
  - "ISO-20022 camt.053 bank-to-customer-statement (input)`"
  - "ISO-4217"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1"
  - "ISO-8601-1:2019 date-time reconciliation-date"
  - "ISO-8601-1:2019 date-time reconciliation-date`"
  - "SOX §404 internal-controls TOM-CSH-01 cash-balance-proof"
  - "US-GAAP ASC-230 statement-of-cash-flows"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "cf564864-b375-81df-9689-1b1818afb6f4"
  stages:
    - stage: path
      stageUuid: "f0214203-4284-876e-aecf-8ccfee1cdcbb"
    - stage: trinity
      stageUuid: "3b531ca3-a9c8-842d-a481-6799b0b17115"
    - stage: boundary
      stageUuid: "18729a5c-bf73-84da-aa57-148c18296540"
    - stage: links
      stageUuid: "201bee56-8968-8237-87d3-1762516e142f"
    - stage: horo
      stageUuid: "fde6186a-297a-8495-bff7-a2e4951b5d37"
    - stage: seal
      stageUuid: "283527df-8d07-87e6-9bdd-3cddc021cd9f"
    - stage: uuid
      stageUuid: "791984dd-0834-866f-b9b8-3fc3ff6fd708"
version: 2
---
# bank-reconciliations

Bank Reconciliations — periodic GL ↔ bank balance reconciliation.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time reconciliation-date`
- `@standard ISO-20022 camt.053 bank-to-customer-statement (input)`

- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time reconciliation-date
- ISO-20022 camt.053 bank-to-customer-statement (input)
- IFRS IAS-7 §6 §44 cash-flow-reconciliation
- US-GAAP ASC-230 statement-of-cash-flows
- ISO-19011:2018 §6.4.6 audit-evidence-bank-reconciliation
- SOX §404 internal-controls TOM-CSH-01 cash-balance-proof
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[gl/accounts/bank/statements]] · [[accounting]] · [[transaction]] · [[proof]] · [[bank/accounts]].
