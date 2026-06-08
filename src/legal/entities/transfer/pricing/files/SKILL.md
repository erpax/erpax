---
name: files
description: "Use when documenting intercompany transfer pricing per OECD BEPS Action 13 — Master File, Local File, and Country-by-Country Report per jurisdiction per fiscal year — TP method, CbCR aggregates, Pillar Two applicability, filing deadlines and status. The BEPS Action 13 TP documentation register."
atomPath: legal/entities/transfer/pricing/files
coordinate: legal/entities/transfer/pricing/files · 4/weave · 3f477147
contentUuid: "7931f50e-8159-5bf6-bfa1-5b45a46d1535"
diamondUuid: "e5d5f337-9751-8a3b-8247-64b6d28df87c"
uuid: "3f477147-e711-8574-854b-50f4cf294758"
horo: 4
bonds:
  in:
    - accounting
    - entities
    - identity
    - proof
    - standard
    - transaction
  out:
    - accounting
    - entities
    - identity
    - proof
    - standard
    - transaction
typography:
  partition: legal
  bondDegree: 18
  neighbors: []
standards:
  - "EU 2016/881 administrative-cooperation-tax"
  - "EU DAC-4 country-by-country-reporting"
  - "ISO-19011:2018 audit-trail tp-evidence"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time"
  - "OECD BEPS Action 13 transfer-pricing-documentation"
  - OECD Pillar Two GloBE (15% global minimum tax)
  - "OECD TPG 2022 transfer-pricing-guidelines"
bindings: []
neighbors:
  wikilink:
    - accounting
    - identity
    - proof
    - standard
    - transaction
  matrix:
    - accounting
    - entities
    - identity
    - proof
    - standard
    - transaction
  backlinks:
    - accounting
    - entities
    - identity
    - proof
    - standard
    - transaction
signatures:
  computationUuid: "c0d1df2d-3295-84b2-a67e-5a72b3d2cebc"
  stages:
    - stage: path
      stageUuid: "56b105eb-b9db-83ca-86e1-6d6b4038f9bc"
    - stage: trinity
      stageUuid: "5f839b27-f56b-8cb3-8fa2-604a44a14f0a"
    - stage: boundary
      stageUuid: "9bb82934-9e64-86ea-a3a7-4e8c448db080"
    - stage: links
      stageUuid: "6d42e2cb-64c3-8ce0-92f9-7a63cfba443b"
    - stage: horo
      stageUuid: "5f978834-d9f9-8b9b-800e-43f5ac5269a3"
    - stage: seal
      stageUuid: "7334f663-3215-8e0e-8982-e3a326d600e4"
    - stage: uuid
      stageUuid: "e451d770-b41e-8f6a-8586-48b39439baa6"
version: 2
---
# transfer-pricing-files

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

Composes [[accounting]] (ledger patterns, currency fields, audit trails), [[transaction]] (relates to intercompany-transactions), [[identity]] (legal entities), [[proof]] (evidence attestations), and [[standard]] (OECD/EU compliance frameworks).

## Standards
- ISO-8601-1:2019 date-time
- ISO-4217:2015 currency-codes
- OECD BEPS Action 13 transfer-pricing-documentation
- OECD TPG 2022 transfer-pricing-guidelines
- EU DAC-4 country-by-country-reporting
- EU 2016/881 administrative-cooperation-tax
- OECD Pillar Two GloBE (15% global minimum tax)
- ISO-19011:2018 audit-trail tp-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation
