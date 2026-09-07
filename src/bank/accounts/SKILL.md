---
name: accounts
description: "Use when managing bank account master data — IBAN (ISO-13616 mod-97 validated), BIC, account name, purpose (operating/payroll/tax/reserve/FX), GL cash account link, currency, country auto-derived from IBAN; separate from statement transactions. The cash-account master collection."
atomPath: "bank/accounts"
coordinate: "bank/accounts · 5/round · 6c03f107"
contentUuid: "771f5fc0-157c-5351-ba3f-22d541e5fc16"
diamondUuid: "147966d7-4a57-8f95-b2ab-26733490a7c7"
uuid: "6c03f107-f915-8d81-ad74-6ea93fdcb29f"
horo: 5
typography:
  partition: bank
  bondDegree: 44
standards:
  - "EU-Intrastat-Reg-2019/2152"
  - "EU-Taxonomy-2020/852"
  - "IFRS IAS-7 statement-of-cash-flows cash-and-equivalents"
  - "ISO-13616-1"
  - "ISO-13616-1:2020 iban"
  - "ISO-13616-1:2020 iban`"
  - "ISO-20022"
  - "ISO-20022 financial-messaging account-identification"
  - "ISO-20022 financial-messaging account-identification`"
  - "ISO-4217"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1"
  - "ISO-9362"
  - "ISO-9362:2022 bic"
  - "ISO-9362:2022 bic`"
  - "ISO/IEC-29119"
  - "SOX §404 internal-controls cash-management"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "216bd963-4dc2-8306-91ab-635714012fa2"
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
      stageUuid: "aef4cfcf-76bf-800d-9732-4f7417fffea3"
    - stage: seal
      stageUuid: "fcf888b0-1283-88af-8dae-8956a4e2219d"
    - stage: uuid
      stageUuid: "47d52341-4ba3-825c-b3bf-54fb97482441"
version: 2
---
# bank-accounts

Bank Accounts — master data, separate from BankStatements (transactions).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-13616-1:2020 iban`
- `@standard ISO-9362:2022 bic`
- `@standard ISO-20022 financial-messaging account-identification`
- `@standard ISO-4217:2015 currency-codes`

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
