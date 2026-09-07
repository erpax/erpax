---
name: employees
description: "Use when managing workforce records — onboarding an employee, recording compensation (IAS 19 base salary, FTE ratio, bonus, pension, PTO), storing GDPR-classified identity and payroll bank account, linking to the actor-party user, and driving the payroll cycle via time-entries and payroll runs. The GDPR-protected workforce master (admin/payroll-officer access only)."
atomPath: employees
coordinate: "employees · 7/descent · 23a3ebb2"
contentUuid: "c3c0895d-302b-5faa-9000-c0402d1433b0"
diamondUuid: "605cc898-6cfe-8468-8c64-a967d3cb1372"
uuid: "23a3ebb2-1568-83ce-8a47-2e75cf3a25cf"
horo: 7
typography:
  partition: employees
  bondDegree: 64
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
  computationUuid: "d3de999f-59f5-816e-88b6-682e75119273"
  stages:
    - stage: path
      stageUuid: "e797237f-685b-8805-af56-4d8208d09bd4"
    - stage: trinity
      stageUuid: "bb97fbc3-6f32-8690-953d-593362f74839"
    - stage: boundary
      stageUuid: "a36c6ef8-2c76-8bc9-9083-24698bdb5ba7"
    - stage: links
      stageUuid: "b5ca5584-c436-8f8d-a253-29ad788d6712"
    - stage: horo
      stageUuid: "77ff72da-31c0-8260-91e8-368fd274caf5"
    - stage: seal
      stageUuid: "ee8c2064-781d-8161-9878-b8e2a3a94c4e"
    - stage: uuid
      stageUuid: "0e137f42-5b18-8923-b839-26e655cc1c55"
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
