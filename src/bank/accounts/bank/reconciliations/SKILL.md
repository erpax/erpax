---
name: reconciliations
description: "Use when performing or auditing the period-end bank-balance proof — GL cash balance vs. camt.053 bank-statement closing balance, quantified variance, reconciling items (outstanding deposits/cheques/fees/NSF), SOX §404 TOM-CSH-01 evidence. The bank-side period-end balance proof collection."
atomPath: "bank/accounts/bank/reconciliations"
coordinate: "bank/accounts/bank/reconciliations · 2/share · 6c941d4f"
contentUuid: "46106645-a5d4-5b9d-854e-10a00cf4d718"
diamondUuid: "78205831-d9b4-8ebe-8a8d-1eb7aa28c079"
uuid: "6c941d4f-9f29-8393-a796-15d20094dac9"
horo: 2
bonds:
  in:
    - accounting
    - accounts
    - bank
    - proof
    - reconciliation
    - statements
    - transaction
  out:
    - accounting
    - accounts
    - proof
    - reconciliation
    - statements
    - transaction
typography:
  partition: bank
  bondDegree: 25
  neighbors: []
standards:
  - "EU-2002/58"
  - "EU-2015/847"
  - "EU-2015/849"
  - "EU-2019/1150"
  - "EU-2019/1152"
  - "EU-2019/1937"
  - "EU-2019/2161"
  - "EU-2019/770"
  - "EU-2019/771"
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
neighbors:
  wikilink:
    - accounting
    - accounts
    - proof
    - statements
    - transaction
  matrix:
    - accounting
    - accounts
    - proof
    - reconciliation
    - statements
    - transaction
  backlinks:
    - accounting
    - accounts
    - proof
    - reconciliation
    - statements
    - transaction
signatures:
  computationUuid: "a165114a-6996-8c70-ba9e-c298b5ce6ef8"
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
      stageUuid: "b24c1e08-ebdd-8687-ab0a-6935a6f46590"
    - stage: seal
      stageUuid: "283527df-8d07-87e6-9bdd-3cddc021cd9f"
    - stage: uuid
      stageUuid: "502c3ef1-e53e-8b19-ba16-19a95bd3e6cb"
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
