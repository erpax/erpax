---
name: runs
description: "Use when processing, auditing, or posting a periodic payroll batch — aggregates approved TimeEntries, computes gross-to-net deductions and employer-side accruals, posts IAS-19/ASC-710 journal entries, emits a pain.001 disbursement file; SOX §404 four-eyes (preparer ≠ authoriser), GDPR-classified personal data. The payroll-run collection."
atomPath: "bank/accounts/payroll/runs"
coordinate: "bank/accounts/payroll/runs · 4/weave · 54aee3ae"
contentUuid: "e7724a59-b71a-5f8f-a8a8-c42ac89495ee"
diamondUuid: "f2bb6576-5bfe-85a9-bce0-4ffdf8e5516d"
uuid: "54aee3ae-62d8-8a47-8fad-a95bdb73cafc"
horo: 4
typography:
  partition: bank
  bondDegree: 42
standards:
  - "EU-Intrastat-Reg-2019/2152"
  - "EU-Taxonomy-2020/852"
  - "GDPR Art.30 records-of-processing-activities"
  - "GDPR Art.6(1)(b) lawful-basis-contract"
  - "IFRS IAS-19 employee-benefits short-term"
  - "IFRS IAS-19 §51 defined-contribution-plans"
  - "IFRS IAS-26 §13 §14 §17 retirement-benefit-plan-reporting (employer-side contributions feed the §17 plan-asset disclosures)"
  - "ISO-13616-1"
  - "ISO-13616-1:2020 iban"
  - "ISO-13616-1:2020 iban`"
  - "ISO-20022"
  - "ISO-20022 pain.001 customer-credit-transfer-initiation"
  - "ISO-20022 pain.001 customer-credit-transfer-initiation`"
  - "ISO-4217"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1"
  - "ISO-8601-1:2019 date-time period payment-date"
  - "ISO-8601-1:2019 date-time period payment-date`"
  - "ISO-9362"
  - "ISO-9362:2022 bic"
  - "ISO-9362:2022 bic`"
  - "ISO/IEC-29119"
  - "SOX §302 disclosure-controls"
  - "SOX §404 internal-controls four-eyes"
  - "US-GAAP ASC-710 compensation-general"
  - "US-GAAP ASC-715 compensation-retirement-benefits"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "aa91c092-6f1e-8481-81c6-545cb5967608"
  stages:
    - stage: path
      stageUuid: "e00cdde0-106c-8683-98dd-e7a809314746"
    - stage: trinity
      stageUuid: "8c600bd2-ad27-8552-a5ba-49fb69940703"
    - stage: boundary
      stageUuid: "dc2c886d-8241-8e5a-93d8-3301f50373a2"
    - stage: links
      stageUuid: "e65d3a74-f07b-85eb-b577-77f53726efe4"
    - stage: horo
      stageUuid: "6001a388-7451-8d83-8c24-cdb63c6660b0"
    - stage: seal
      stageUuid: "74143566-4348-8b45-a1d7-072cfcf61520"
    - stage: uuid
      stageUuid: "614845a7-56b0-80ab-a2c7-24bed82427af"
version: 2
---
# payroll-runs

Payroll Runs — periodic batch payroll: gross-to-net, accruals, disbursement.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

One run per (tenant, period × paySchedule): the close-job aggregates approved
[[employees/time/entries]] + [[Employees]] compensation, computes per-line gross → deductions →
employer accruals → net, then posts the IAS-19 / ASC-710 wages [[transaction]] (a
[[journal/entries]] back-link) and emits the pain.001 [[bank/accounts/payment/runs]] sibling on the
`paymentDate`. Posted runs [[close|period-lock]]; reversals are a separate run.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-20022 pain.001 customer-credit-transfer-initiation`
- `@standard ISO-13616-1:2020 iban`
- `@standard ISO-9362:2022 bic`
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time period payment-date`

- ISO-20022 pain.001 customer-credit-transfer-initiation
- ISO-13616-1:2020 iban
- ISO-9362:2022 bic
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time period payment-date
- IFRS IAS-19 employee-benefits short-term
- IFRS IAS-19 §51 defined-contribution-plans
- IFRS IAS-26 §13 §14 §17 retirement-benefit-plan-reporting (employer-side contributions feed the §17 plan-asset disclosures)
- US-GAAP ASC-710 compensation-general
- US-GAAP ASC-715 compensation-retirement-benefits
- ISO-19011:2018 audit-trail payroll-evidence
- SOX §302 disclosure-controls
- SOX §404 internal-controls four-eyes
- GDPR Art.6(1)(b) lawful-basis-contract
- GDPR Art.30 records-of-processing-activities
- ISO-27001 A.5.23 cloud-service-tenant-isolation
- ISO-27002 §5.4 segregation-of-duties
- ISO-27002 §5.34 privacy-and-protection-of-pii
- ISO-27002 §8.11 data-masking

GDPR-classified personal data ⇒ access tighter than the accounting default
(read: admin · payroll-officer · hr; write: admin · payroll-officer): the
[[privilege]] / segregation-of-duties posture, with SOX §404 four-eyes (preparer ≠
authoriser) enforced via the same `enforceSegregationOfDuties` hook as
[[gl/accounts/period/end/adjustments]].

Composes: [[accounting]] · [[transaction]] · [[entry]] · [[balance]] · [[party]] · [[give]] · [[horo]] · [[close]] · [[identity]] · [[proof]] · [[privilege]] · [[journal/entries]] · [[bank/accounts/payment/runs]] · [[Employees]] · [[employees/time/entries]] · [[cost/centers]].
