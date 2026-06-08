---
name: reconciliations
description: "Use when performing or auditing the period-end bank-balance proof — GL cash balance vs. camt.053 bank-statement closing balance, quantified variance, reconciling items (outstanding deposits/cheques/fees/NSF), SOX §404 TOM-CSH-01 evidence. The bank-side period-end balance proof collection."
atomPath: bank/accounts/bank/reconciliations
coordinate: bank/accounts/bank/reconciliations · 4/weave · a0373898
contentUuid: "5cb882c3-b812-5055-bd95-f0d24463e2d0"
diamondUuid: "e10289d6-53ed-8a6b-8ae8-a49edb3a2299"
uuid: "a0373898-725b-89d7-b6c5-2ae8f10c5f37"
horo: 4
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
  - "ISO-19011:2018 §6.4.6 audit-evidence-bank-reconciliation"
  - "ISO-20022"
  - "ISO-20022 camt.053 bank-to-customer-statement (input)"
  - "ISO-4217"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1"
  - "ISO-8601-1:2019 date-time reconciliation-date"
  - "SOX §404 internal-controls TOM-CSH-01 cash-balance-proof"
  - "US-GAAP ASC-230 statement-of-cash-flows"
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
  computationUuid: "8da07600-1341-8e9e-a528-fbd6b02eb6c0"
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
      stageUuid: "fde3a89a-6eb8-8744-92a7-dfa066575bdb"
    - stage: seal
      stageUuid: "283527df-8d07-87e6-9bdd-3cddc021cd9f"
    - stage: uuid
      stageUuid: "b574c6de-e261-8d1c-9261-54bd38be8d3d"
version: 2
---
# bank-reconciliations

Bank Reconciliations — periodic GL ↔ bank balance reconciliation.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time reconciliation-date
- ISO-20022 camt.053 bank-to-customer-statement (input)
- IFRS IAS-7 §6 §44 cash-flow-reconciliation
- US-GAAP ASC-230 statement-of-cash-flows
- ISO-19011:2018 §6.4.6 audit-evidence-bank-reconciliation
- SOX §404 internal-controls TOM-CSH-01 cash-balance-proof
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[gl/accounts/bank/statements]] · [[accounting]] · [[transaction]] · [[proof]] · [[bank/accounts]].
