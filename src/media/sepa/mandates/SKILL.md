---
name: mandates
description: "Use when managing SEPA Direct Debit mandates (pain.008) — mandate id, debtor IBAN/BIC, creditor identifier, signature date, CORE/B2B instrument, sequence-state (FRST→RCUR), 36-month expiry rule, revocation, and linkage to PaymentRuns. The EPC130-08 SDD mandate register."
atomPath: "media/sepa/mandates"
coordinate: "media/sepa/mandates · 8/crest · 5fdd1adf"
contentUuid: "6168c9ea-a5f0-5340-973e-ed135ec6242a"
diamondUuid: "5fc6e667-9c91-8331-8e33-a0d41a857a94"
uuid: "5fdd1adf-aec6-8140-b8f3-070a26a79159"
horo: 8
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
  computationUuid: "8aac8c80-8f49-87c2-8711-b92c79193097"
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
      stageUuid: "cd842306-a89c-89d8-9a98-73c619a1678e"
    - stage: seal
      stageUuid: "a7a20b80-2a12-8364-94c6-3c4ffa0a4dd1"
    - stage: uuid
      stageUuid: "ac7088e3-26d9-8dca-b4dd-3e276d3c37b1"
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
