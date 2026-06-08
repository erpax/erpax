---
name: accounts
description: "Use when managing bank account master data — IBAN (ISO-13616 mod-97 validated), BIC, account name, purpose (operating/payroll/tax/reserve/FX), GL cash account link, currency, country auto-derived from IBAN; separate from statement transactions. The cash-account master collection."
atomPath: bank/accounts
coordinate: bank/accounts · 7/descent · 05c0dbb2
contentUuid: "c502f81c-4ec8-5be9-9c5e-bddf54326c7e"
diamondUuid: "40972207-9913-88e0-9bf5-1fe183c9f35e"
uuid: "05c0dbb2-bbe8-85d5-9214-905664312129"
horo: 7
bonds:
  in:
    - access
    - accounting
    - auth
    - bank
    - escrow
    - hooks
    - identity
    - party
    - reconciliations
    - runs
  out:
    - access
    - accounting
    - auth
    - escrow
    - hooks
    - identity
    - party
    - reconciliations
    - runs
typography:
  partition: bank
  bondDegree: 0
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
  - "EU-2022/1925"
  - "EU-2022/2065"
  - "EU-2022/2554"
  - "EU-2022/2555"
  - "EU-2022/868"
  - "EU-Intrastat-Reg-2019/2152"
  - "EU-Taxonomy-2020/852"
  - "IFRS IAS-7 statement-of-cash-flows cash-and-equivalents"
  - "ILO-C001"
  - "ISO-13616-1"
  - "ISO-13616-1:2020 iban"
  - "ISO-19011:2018 audit-trail bank-account-master"
  - "ISO-20022"
  - "ISO-20022 financial-messaging account-identification"
  - "ISO-4217"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1"
  - "ISO-9362"
  - "ISO-9362:2022 bic"
  - "SOX §404 internal-controls cash-management"
bindings: []
neighbors:
  wikilink:
    - access
    - accounting
    - auth
    - hooks
    - identity
    - party
    - runs
  matrix:
    - access
    - accounting
    - auth
    - escrow
    - hooks
    - identity
    - party
    - reconciliations
    - runs
  backlinks:
    - access
    - accounting
    - auth
    - escrow
    - hooks
    - identity
    - party
    - reconciliations
    - runs
signatures:
  computationUuid: "5b41f9f5-8ea8-8bba-9124-fac80c8d148c"
  stages:
    - stage: path
      stageUuid: "60b94686-1fac-88a8-a05f-29a6cb9baafb"
    - stage: trinity
      stageUuid: "678579c9-a9a0-8961-b6af-a534b2a3a876"
    - stage: boundary
      stageUuid: "fd5c2d0f-8bf5-8bbd-af4b-56992b6fd353"
    - stage: links
      stageUuid: "1550b6cd-8401-8c89-ac53-91016a54c928"
    - stage: horo
      stageUuid: "cbb736f1-432b-856e-af26-1b95b60d9a76"
    - stage: seal
      stageUuid: "1920324e-3087-8b0e-8da1-cf127899a70b"
    - stage: uuid
      stageUuid: "190ee6ee-b59d-88f2-b12a-f5052e999727"
version: 2
---
# bank-accounts

Bank Accounts — master data, separate from BankStatements (transactions).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-13616-1:2020 iban
- ISO-9362:2022 bic
- ISO-20022 financial-messaging account-identification
- ISO-4217:2015 currency-codes
- IFRS IAS-7 statement-of-cash-flows cash-and-equivalents
- ISO-19011:2018 audit-trail bank-account-master
- SOX §404 internal-controls cash-management
- ISO-27001 A.5.23 cloud-service-tenant-isolation
- ISO-27002 §8.24 use-of-cryptography iban-bic-encryption

Composes: [[bank/accounts/payment/runs]] · [[accounting]] · [[access]] · [[auth]] · [[hooks]] · [[identity]] · [[party]].
