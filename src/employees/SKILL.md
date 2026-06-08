---
name: employees
description: "Use when managing workforce records — onboarding an employee, recording compensation (IAS 19 base salary, FTE ratio, bonus, pension, PTO), storing GDPR-classified identity and payroll bank account, linking to the actor-party user, and driving the payroll cycle via time-entries and payroll runs. The GDPR-protected workforce master (admin/payroll-officer access only)."
atomPath: employees
coordinate: employees · 5/round · 60349565
contentUuid: "64279b27-6d78-5621-a564-c06b5a41acdd"
diamondUuid: "4e0ca784-8d2d-8068-8542-0d2558c0fbd4"
uuid: "60349565-84b5-8bfe-aff6-80b8c8c71f42"
horo: 5
bonds:
  in:
    - attrition
    - bookings
    - commissions
    - compensation
    - competencies
    - engagement
    - entries
    - identity
    - law
    - payments
    - quota
    - reports
    - requests
    - reviews
    - runs
    - satisfaction
    - shifts
    - tenure
    - territory
    - training
  out:
    - attrition
    - bookings
    - commissions
    - compensation
    - competencies
    - engagement
    - entries
    - identity
    - law
    - payments
    - quota
    - reports
    - requests
    - reviews
    - runs
    - satisfaction
    - shifts
    - tenure
    - territory
    - training
typography:
  partition: employees
  bondDegree: 0
  neighbors: []
standards:
  - "EU-2022/1925"
  - "EU-2022/2065"
  - "EU-2022/2554"
  - "EU-2022/2555"
  - "EU-2022/868"
  - "GDPR Art.30 records-of-processing-activities"
  - "GDPR Art.6(1)(b) lawful-basis-contract"
  - "GDPR Art.9 special-categories-of-personal-data"
  - "IFRS IAS-19 employee-benefits"
  - "IFRS-2"
  - "ISO-13616-1"
  - "ISO-13616-1:2020 iban payroll-bank-account"
  - "ISO-17442-1"
  - "ISO-17442-1:2020 lei employer-identifier"
  - "ISO-19011:2018 audit-trail employee-master"
  - "ISO-3166-1:2020 country-codes citizenship work-country"
  - "ISO-3166-2"
  - "ISO-3166-2:2020 subdivision-codes"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time hire-date termination-date"
  - "ISO-9362"
  - "ISO-9362:2022 bic payroll-bank-account"
  - "SOX §404 internal-controls payroll-master"
  - "US-GAAP"
  - "US-GAAP ASC-710 compensation-general"
  - "US-GAAP ASC-715 compensation-retirement-benefits"
bindings: []
neighbors:
  wikilink:
    - commissions
    - entries
    - identity
    - law
    - payments
    - reports
    - requests
    - reviews
    - runs
  matrix:
    - attrition
    - bookings
    - commissions
    - compensation
    - competencies
    - engagement
    - entries
    - identity
    - law
    - payments
    - quota
    - reports
    - requests
    - reviews
    - runs
    - satisfaction
    - shifts
    - tenure
    - territory
    - training
  backlinks:
    - attrition
    - bookings
    - commissions
    - compensation
    - competencies
    - engagement
    - entries
    - identity
    - law
    - payments
    - quota
    - reports
    - requests
    - reviews
    - runs
    - satisfaction
    - shifts
    - tenure
    - territory
    - training
signatures:
  computationUuid: "a3a8f604-babe-855b-a4f1-f7fc44e113cf"
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
      stageUuid: "7335a0bb-cc83-8d6d-8a67-7338987e8bdb"
    - stage: seal
      stageUuid: "bf21df0c-b3f4-8738-a50f-3d8674bfeb57"
    - stage: uuid
      stageUuid: "8914982f-5024-8c34-b611-3c166b386174"
version: 2
---
# employees

Employees — workforce master record for payroll, benefits, time tracking.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

**Law — [[law]]: the employees collection is the GDPR-protected workforce master (admin/payroll-officer access only) — it links the worker to the actor-party [[identity]], holds IAS-19 compensation, and drives the payroll cycle through time-entries and payroll runs; a single-folder collection node (no scatter, no drift).**

## Standards
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
