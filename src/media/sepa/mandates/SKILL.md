---
name: mandates
description: "Use when managing SEPA Direct Debit mandates (pain.008) — mandate id, debtor IBAN/BIC, creditor identifier, signature date, CORE/B2B instrument, sequence-state (FRST→RCUR), 36-month expiry rule, revocation, and linkage to PaymentRuns. The EPC130-08 SDD mandate register."
atomPath: media/sepa/mandates
coordinate: media/sepa/mandates · 2/share · c83fd891
contentUuid: "88537a20-79d8-50b2-b735-dcb7efe4f5ce"
diamondUuid: "75b450c1-f952-8c9c-9b84-67d008c05dc9"
uuid: "c83fd891-ef16-8015-9d66-873b7ddfb573"
horo: 2
bonds:
  in:
    - accounting
    - horo
    - identity
    - law
    - proof
    - runs
    - standard
    - transaction
  out:
    - accounting
    - horo
    - identity
    - law
    - proof
    - runs
    - standard
    - transaction
typography:
  partition: media
  bondDegree: 24
  neighbors: []
standards:
  - "EPC130-08 sepa-direct-debit-rulebook"
  - "GDPR Art.6(1)(b) lawful-basis-contract"
  - "IFRS IFRS-9 financial-instruments"
  - "ISO-13616-1:2020 iban"
  - "ISO-19011:2018 audit-trail mandate-evidence"
  - "ISO-20022 pain.008 customer-direct-debit-initiation"
  - "ISO-8601-1:2019 date-time signature-date expiry-date"
  - "ISO-9362"
  - "ISO-9362:2022 bic"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-310 receivables"
bindings: []
neighbors:
  wikilink:
    - accounting
    - horo
    - identity
    - law
    - proof
    - standard
    - transaction
  matrix:
    - accounting
    - horo
    - identity
    - law
    - proof
    - runs
    - standard
    - transaction
  backlinks:
    - accounting
    - horo
    - identity
    - law
    - proof
    - runs
    - standard
    - transaction
signatures:
  computationUuid: "63eddd5e-7c23-8f43-a98d-058897200781"
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
      stageUuid: "2ce0fd3f-f70d-8c9a-b71c-6f1bb8f0fe27"
    - stage: seal
      stageUuid: "a7a20b80-2a12-8364-94c6-3c4ffa0a4dd1"
    - stage: uuid
      stageUuid: "b8e15172-8e92-8372-80cb-0998ca31c16c"
version: 2
---
# sepa-mandates

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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
