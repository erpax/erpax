---
name: employees
description: "Use when managing workforce records — onboarding an employee, recording compensation (IAS 19 base salary, FTE ratio, bonus, pension, PTO), storing GDPR-classified identity and payroll bank account, linking to the actor-party user, and driving the payroll cycle via time-entries and payroll runs. The GDPR-protected workforce master (admin/payroll-officer access only)."
atomPath: employees
coordinate: "employees · 5/round · 2e448c23"
contentUuid: "8752d94a-f92f-5d18-a15b-ea94c5d3231a"
diamondUuid: "e01cb464-b26b-8a2c-8c59-082bc6a82f8c"
uuid: "2e448c23-d66e-862e-bfa3-6ed03cd684f0"
horo: 5
typography:
  partition: employees
  bondDegree: 41
standards:
  - "GDPR Art.30 records-of-processing-activities"
  - "GDPR Art.6(1)(b) lawful-basis-contract"
  - "GDPR Art.9 special-categories-of-personal-data"
  - "IFRS IAS-19 employee-benefits"
  - "IFRS-2"
  - "ISO-13616-1"
  - "ISO-13616-1:2020 iban payroll-bank-account"
  - "ISO-13616-1:2020 iban payroll-bank-account`"
  - "ISO-17442"
  - "ISO-17442-1"
  - "ISO-17442-1:2020 lei employer-identifier"
  - "ISO-17442-1:2020 lei employer-identifier`"
  - "ISO-3166-1:2020 country-codes citizenship work-country"
  - "ISO-3166-1:2020 country-codes citizenship work-country`"
  - "ISO-3166-2"
  - "ISO-3166-2:2020 subdivision-codes"
  - "ISO-3166-2:2020 subdivision-codes`"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time hire-date termination-date"
  - "ISO-8601-1:2019 date-time hire-date termination-date`"
  - "ISO-9362"
  - "ISO-9362:2022 bic payroll-bank-account"
  - "ISO-9362:2022 bic payroll-bank-account`"
  - "SOX §404 internal-controls payroll-master"
  - "US-GAAP"
  - "US-GAAP ASC-710 compensation-general"
  - "US-GAAP ASC-715 compensation-retirement-benefits"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "7d13121b-6ea9-88f7-bfa2-3e17ef814e6f"
  stages:
    - stage: path
      stageUuid: "e797237f-685b-8805-af56-4d8208d09bd4"
    - stage: trinity
      stageUuid: "bb97fbc3-6f32-8690-953d-593362f74839"
    - stage: boundary
      stageUuid: "a36c6ef8-2c76-8bc9-9083-24698bdb5ba7"
    - stage: links
      stageUuid: "232dd4bb-5fb3-8ecf-b9e7-8dadc1713eaa"
    - stage: horo
      stageUuid: "36ce39b5-02ec-8834-a660-50178a37f548"
    - stage: seal
      stageUuid: "ee8c2064-781d-8161-9878-b8e2a3a94c4e"
    - stage: uuid
      stageUuid: "6f23d757-3826-88c7-bac7-ab310c89a507"
version: 2
---
# employees

Employees — workforce master record for payroll, benefits, time tracking.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

**Law — [[law]]: the employees collection is the GDPR-protected workforce master (admin/payroll-officer access only) — it links the worker to the actor-party [[identity]], holds IAS-19 compensation, and drives the payroll cycle through time-entries and payroll runs; a single-folder collection node (no scatter, no drift).**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-3166-1:2020 country-codes citizenship work-country`
- `@standard ISO-3166-2:2020 subdivision-codes`
- `@standard ISO-13616-1:2020 iban payroll-bank-account`
- `@standard ISO-9362:2022 bic payroll-bank-account`
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time hire-date termination-date`
- `@standard ISO-17442-1:2020 lei employer-identifier`

- ISO-3166-1:2020 country-codes citizenship work-country
- ISO-3166-2:2020 subdivision-codes
- ISO-13616-1:2020 iban payroll-bank-account
- ISO-9362:2022 bic payroll-bank-account
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time hire-date termination-date
- ISO-17442-1:2020 lei employer-identifier
- IFRS IAS-19 employee-benefits
- US-GAAP ASC-710 compensation-general
- US-GAAP ASC-715 compensation-retirement-benefits
- ISO-19011:2018 audit-trail employee-master
- SOX §404 internal-controls payroll-master
- GDPR Art.6(1)(b) lawful-basis-contract
- GDPR Art.9 special-categories-of-personal-data
- GDPR Art.30 records-of-processing-activities
- ISO-27001 A.5.23 cloud-service-tenant-isolation
- ISO-27002 §5.34 privacy-and-protection-of-pii
- ISO-27002 §8.11 data-masking

Composes: [[employees/expense/reports]] · [[employees/leave/requests]] · [[bank/accounts/payroll/runs]] · [[employees/performance/reviews]] · [[employees/sales/commissions]] · [[employees/share/based/payments]] · [[employees/time/entries]].
