---
name: accounts
description: "Use when managing bank account master data — IBAN (ISO-13616 mod-97 validated), BIC, account name, purpose (operating/payroll/tax/reserve/FX), GL cash account link, currency, country auto-derived from IBAN; separate from statement transactions. The cash-account master collection."
atomPath: "bank/accounts"
coordinate: "bank/accounts · 7/descent · 7611d111"
contentUuid: "969999a0-a51b-515b-a3e3-0a4b3f92a0cc"
diamondUuid: "da2f542f-a9c1-820f-85fb-518235af09f1"
uuid: "7611d111-ce40-82d2-a7d1-a99689d11622"
horo: 7
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
  computationUuid: "f1d02cd6-895a-8383-a370-6620620b81d2"
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
      stageUuid: "cce6edc3-9d61-8675-8eef-ccb521a14d11"
    - stage: seal
      stageUuid: "fcf888b0-1283-88af-8dae-8956a4e2219d"
    - stage: uuid
      stageUuid: "6c2fb2b7-c477-851c-9542-8d848f2fe2cb"
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
