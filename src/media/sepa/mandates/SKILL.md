---
name: mandates
description: "Use when managing SEPA Direct Debit mandates (pain.008) — mandate id, debtor IBAN/BIC, creditor identifier, signature date, CORE/B2B instrument, sequence-state (FRST→RCUR), 36-month expiry rule, revocation, and linkage to PaymentRuns. The EPC130-08 SDD mandate register."
atomPath: "media/sepa/mandates"
coordinate: "media/sepa/mandates · 7/descent · fbe00e8d"
contentUuid: "b5bfea3b-d33f-541d-b527-3efa5c5f93af"
diamondUuid: "b83e872a-8e4d-88ae-a602-64b5e99fe65c"
uuid: "fbe00e8d-1400-8145-af98-cce9d8ef1c3f"
horo: 7
typography:
  partition: media
  bondDegree: 24
standards:
  - "EPC130-08 sepa-direct-debit-rulebook"
  - "GDPR Art.6(1)(b) lawful-basis-contract"
  - "IFRS IFRS-9 financial-instruments"
  - "ISO-13616-1:2020 iban"
  - "ISO-13616-1:2020 iban`"
  - "ISO-20022 pain.008 customer-direct-debit-initiation"
  - "ISO-20022 pain.008 customer-direct-debit-initiation`"
  - "ISO-8601-1:2019 date-time signature-date expiry-date"
  - "ISO-8601-1:2019 date-time signature-date expiry-date`"
  - "ISO-9362:2022 bic"
  - "ISO-9362:2022 bic`"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-310 receivables"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "98769e95-5b7a-87b3-b68f-c619909822d9"
  stages:
    - stage: path
      stageUuid: "2d8ed2c6-c904-862e-9179-375a89532ffa"
    - stage: trinity
      stageUuid: "07e803b9-5a3f-86cf-beda-4e34c4f44c04"
    - stage: boundary
      stageUuid: "72f30153-8215-897a-9a4e-ae0ff08c1144"
    - stage: links
      stageUuid: "df826c80-5d83-856d-b715-d789cbed1856"
    - stage: horo
      stageUuid: "34fb9eb4-9a72-841a-95cb-c061ffe20c85"
    - stage: seal
      stageUuid: "a7a20b80-2a12-8364-94c6-3c4ffa0a4dd1"
    - stage: uuid
      stageUuid: "3da5e2cc-a8c5-8564-860d-6bad2f609ba0"
version: 2
---
# sepa-mandates

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-20022 pain.008 customer-direct-debit-initiation`
- `@standard ISO-13616-1:2020 iban`
- `@standard ISO-9362:2022 bic`
- `@standard ISO-8601-1:2019 date-time signature-date expiry-date`

- ISO-20022 pain.008 customer-direct-debit-initiation
- ISO-13616-1:2020 iban
- ISO-9362:2022 bic
- ISO-8601-1:2019 date-time signature-date expiry-date
- IFRS IFRS-9 financial-instruments
- US-GAAP ASC-310 receivables
- ISO-19011:2018 audit-trail mandate-evidence
- SOX §404 internal-controls
- GDPR Art.6(1)(b) lawful-basis-contract
- EPC130-08 sepa-direct-debit-rulebook
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[accounting]] · [[proof]] · [[identity]] · [[horo]] · [[transaction]] · [[standard]].

**Law — [[law]]: a SEPA mandate is the debtor's standing authorization (pain.008) — its sequence-state walks FRST → RCUR on the [[horo]] ring, it expires 36 months after the last collection, and a revoked or expired mandate can authorize no PaymentRun.**
